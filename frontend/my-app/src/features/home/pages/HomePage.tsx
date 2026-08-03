import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePLPListings } from '@/features/PLP/queries/plp.queries';
import { useProfileDataQuery } from '@/features/profile-setting/services/query.service';
import { settingService } from '@/features/profile-setting/services/setting.page.service';
import { useQueryClient } from '@tanstack/react-query';
import { USER_ROUTES_PATH } from '@/app/router/routes.path';
import toast from 'react-hot-toast';
import defaultAvatarImg from '@/assets/default-img.jpg';

// Assets
import heroImg from '@/assets/hero img.jpg';

// Horizontal scroll images
import artherImg from '@/assets/Horizontal scroll/ARTHER.jpg';
import harryImg from '@/assets/Horizontal scroll/Harry.jpg';
import hideSeekImg from '@/assets/Horizontal scroll/Hide&Seek.jpg';
import kindBirdsImg from '@/assets/Horizontal scroll/Kind birds.jpg';
import psychoImg from '@/assets/Horizontal scroll/psycho.jpg';
import trueLoveImg from '@/assets/Horizontal scroll/true love.jpg';

// Scrollable cards illustrations
import boysIll from '@/assets/scrollable cards/boys illustration.avif';
import familyIll from '@/assets/scrollable cards/family illustration.avif';
import girlIll from '@/assets/scrollable cards/girl illustration.avif';
import tableIll from '@/assets/scrollable cards/table illustration.avif';
import threeIll from '@/assets/scrollable cards/three illustration.avif';

// Footer brand image
import footerLogoImg from '@/assets/images/LOGO BOOK&SHELF FOOTER.png';

gsap.registerPlugin(ScrollTrigger);

// Shelf Stack / Scrollable cards data (matching illustrations & tailored colors)
const STAFF_PICK_BOOKS = [
  {
    t: 'The Night Circus',
    a: 'Erin Morgenstern',
    note: '“Read past your bedtime. We won’t tell.”',
    bgColor: '#3D2514',
    img: boysIll,
  },
  {
    t: 'Project Hail Mary',
    a: 'Andy Weir',
    note: '“Zero gravity, maximum plot twists and unexpected friendships.”',
    bgColor: '#6B311B',
    img: familyIll,
  },
  {
    t: 'The Song of Achilles',
    a: 'Madeline Miller',
    note: '“Keep tissues within arm’s reach — a masterpiece of devotion.”',
    bgColor: '#4A2A14',
    img: girlIll,
  },
  {
    t: 'Piranesi',
    a: 'Susanna Clarke',
    note: '“A labyrinthine house with more infinite rooms than human sense.”',
    bgColor: '#7A5B2B',
    img: tableIll,
  },
  {
    t: 'Klara and the Sun',
    a: 'Kazuo Ishiguro',
    note: '“Last card in the stack, first in our hearts — timeless emotion.”',
    bgColor: '#523318',
    img: threeIll,
  },
];

// Signature shelf gallery using horizontal scroll asset images
const SIGNATURE_SHELF = [
  { t: 'The King Arthur', a: 'Classic Legend', tag: 'FICTION', img: artherImg },
  { t: 'Harry Potter', a: 'J.K. Rowling', tag: 'FANTASY', img: harryImg },
  { t: 'Hide & Seek', a: 'Mystery Thriller', tag: 'THRILLER', img: hideSeekImg },
  { t: 'Kind Birds', a: 'Nature & Life', tag: 'POETRY', img: kindBirdsImg },
  { t: 'Psycho', a: 'Robert Bloch', tag: 'HORROR', img: psychoImg },
  { t: 'True Love', a: 'Romance Anthology', tag: 'ROMANCE', img: trueLoveImg },
];

export function HomePage() {
  const shouldRunPreloader = () => {
    const navEntry = window.performance?.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming | undefined;
    const isReload = navEntry?.type === 'reload';
    const hasSeen = sessionStorage.getItem('hasSeenPreloader');
    return isReload || !hasSeen;
  };

  const [isPreloading, setIsPreloading] = useState(() => shouldRunPreloader());
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isScrolledHeader, setIsScrolledHeader] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Auth state — if profile data loads, user is logged in
  const { data: profileData } = useProfileDataQuery();
  const isLoggedIn = !!(profileData?.payload);
  const user = profileData?.payload;
  const avatarUrl = user?.profileImageUrl || defaultAvatarImg;

  const handleLogout = async () => {
    try {
      await settingService.logout();
      queryClient.clear();
      toast.success('Signed out successfully');
      navigate('/');
    } catch {
      toast.error('Failed to sign out. Please try again.');
    }
  };

  // Dynamic Marketplace Query
  const { data: physicalData, isLoading: isPhysicalLoading } = usePLPListings({ type: 'physical' });
  // Dynamic Library Query
  const { data: ebookData, isLoading: isEbookLoading } = usePLPListings({ type: 'ebook' });

  const physicalListings = physicalData?.pages?.[0]?.payload?.listings || [];
  const ebookListings = ebookData?.pages?.[0]?.payload?.listings || [];

  const storyPathRef = useRef<SVGPathElement>(null);
  const hPinRef = useRef<HTMLDivElement>(null);
  const hTrackRef = useRef<HTMLDivElement>(null);
  const printHeadingRef = useRef<HTMLHeadingElement>(null);
  const stampElRef = useRef<HTMLDivElement>(null);
  const stackCardsRef = useRef<HTMLDivElement>(null);

  // Preloader counter & timeline
  useEffect(() => {
    // When preloader is done (SPA navigation), just reveal hero
    if (!isPreloading) {
      gsap.to('[data-hero]', {
        y: 0,
        opacity: 1,
        stagger: 0.09,
        duration: 0.8,
        ease: 'power3.out',
      });
      return;
    }

    // Set hero elements invisible via GSAP immediately (CSS already sets opacity:0)
    gsap.set('[data-hero]', { y: 36, opacity: 0 });

    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setLoadingPercent(Math.floor(counter.v));
      },
      onComplete: () => {
        sessionStorage.setItem('hasSeenPreloader', 'true');
        // Slide preloader up first
        gsap.to('#preloader', {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsPreloading(false);
            ScrollTrigger.refresh();
            // Then animate hero in (preloader is gone now)
            gsap.to('[data-hero]', {
              y: 0,
              opacity: 1,
              stagger: 0.09,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
        });
      },
    });
  }, [isPreloading]);

  // Header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledHeader(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-profile')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  // Page-wide SVG scroll stroke calculation
  useEffect(() => {
    const path = storyPathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    let ticking = false;
    const updateStroke = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      gsap.set(path, { strokeDashoffset: pathLength * (1 - progress) });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateStroke);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateStroke);
    updateStroke();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateStroke);
    };
  }, []);

  // GSAP ScrollTrigger Animations setup
  useEffect(() => {
    if (isPreloading) return;

    const ctx = gsap.context(() => {
      // 1. Typewriter heading
      if (printHeadingRef.current) {
        const fullText = "FROM A LISTING TO YOUR SHELF";
        printHeadingRef.current.innerHTML = `<span id="tw-text"></span><span class="cursor">&nbsp;</span>`;
        const textSpan = printHeadingRef.current.querySelector('#tw-text');

        ScrollTrigger.create({
          trigger: printHeadingRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            let i = 0;
            const iv = setInterval(() => {
              if (textSpan) {
                textSpan.textContent = fullText.slice(0, i);
              }
              i++;
              if (i > fullText.length) clearInterval(iv);
            }, 28);
          },
        });
      }

      // 2. Stamp animation
      if (stampElRef.current) {
        ScrollTrigger.create({
          trigger: stampElRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(stampElRef.current, {
              scale: 1,
              rotate: -12,
              duration: 0.5,
              ease: 'back.out(3)',
            });
          },
        });
      }

      // 3. Horizontal Scroll Gallery
      if (hPinRef.current && hTrackRef.current) {
        const track = hTrackRef.current;
        const distance = track.scrollWidth - window.innerWidth + 80;
        if (distance > 0) {
          gsap.to(track, {
            x: -distance,
            ease: 'none',
            scrollTrigger: {
              trigger: hPinRef.current,
              start: 'top top',
              end: () => `+=${distance + window.innerHeight * 0.6}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // 4. Scroll Stack Cards Scale Down (NO blackening/brightness changes - colors remain constant)
      if (stackCardsRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>('#stackCards .stack-card');
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top top+=112',
              end: 'top top-=260',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }

      // 5. Reveal elements intersection observer replacement
      const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
      revealEls.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => el.classList.add('in-view'),
        });
      });
    });

    return () => ctx.revert();
  }, [isPreloading, physicalListings.length, ebookListings.length]);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg, #F6EFE1)', color: 'var(--ink, #2B1B10)' }}>
      {/* ================= PRELOADER ================= */}
      {isPreloading && (
        <div id="preloader">
          <div className="pl-brand">BookAndShelf</div>
          <div className="pl-mark">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="pl-count">
            <b>{loadingPercent}</b>%
          </div>
          <div className="pl-bar">
            <span style={{ width: `${loadingPercent}%` }} />
          </div>
        </div>
      )}

      {/* ================= PAGE-WIDE SCROLL STROKE SVG ================= */}
      <svg className="page-stroke-svg" viewBox="0 0 700 900" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          ref={storyPathRef}
          d="M486 216C430 178 372 192 369 228C365 279 469 277 522 224C567 184 562 102 500 76C444 55 391 111 435 137C494 172 550 65 462 24C404 -3 366 33 362 65C359 98 386 101 401 95C416 89 419 70 408 53C391 26 344 44 322 68C302 84 295 111 306 138C316 161 337 175 362 170C412 160 396 113 366 100C336 87 261 112 263 158C264 187 277 205 314 205C374 206 428 165 501 161C566 157 674 171 704 213C719 233 723 249 707 268C689 289 646 289 615 261C584 233 574 209 577 175C579 143 598 116 626 110C648 105 670 108 674 127C678 147 636 147 616 142C595 137 583 119 576 99C567 76 574 57 590 39C607 18 641 10 662 27C683 44 671 60 653 74C627 92 592 84 561 65C536 49 500 12 519 -9C532 -23 559 -22 566 1C572 24 563 46 545 68C528 90 502 121 507 158C512 194 553 262 597 265C625 268 658 270 664 240C673 190 617 161 573 187C536 209 527 253 526 300C522 402 665 512 502 623C378 705 90 500 -25 645C-105 750 -132 908 -8 969C215 1078 605 807 654 1085C696 1338 -6 1010 118 1440"
          stroke="#B98A46"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>

      {/* ================= HEADER ================= */}
      <header className={`bs-header ${isScrolledHeader ? 'scrolled' : ''}`}>
        <nav className="wrap flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="logo flex items-center gap-[9px] font-fraunces font-bold text-[1.25rem] text-[var(--ink)]">
            <span className="logo-mark w-[26px] h-[26px] rounded-[6px] bg-gradient-to-br from-[#7A4B25] to-[#A5502E] flex items-center justify-center">
              <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="#F6EFE1" strokeWidth="2">
                <path d="M4 4h7v16H4zM13 4h7v16h-7z" />
              </svg>
            </span>
            BookAndShelf
          </Link>

          {/* Nav links */}
          <ul className="nav-links hidden md:flex gap-[32px] text-[0.9rem] font-medium text-[var(--ink-dim)]">
            <li>
              <Link to={USER_ROUTES_PATH.browse}>Marketplace</Link>
            </li>
            <li>
              <a href="#process">Our Process</a>
            </li>
            <li>
              <a href="#library">Digital Library</a>
            </li>
          </ul>

          {/* CTA — changes based on auth state */}
          <div className="nav-cta flex items-center gap-[16px]">
            {isLoggedIn ? (
              /* ——— Logged-in: avatar + dropdown ——— */
              <div className="nav-profile">
                <button
                  className="nav-avatar-btn"
                  onClick={() => setDropdownOpen(o => !o)}
                  aria-label="Account menu"
                >
                  <img src={avatarUrl} alt={user?.name || 'Profile'} />
                </button>

                <div className={`nav-dropdown${dropdownOpen ? ' open' : ''}`}>
                  {/* Header with name/email */}
                  <div className="nav-dropdown-header">
                    <div className="nav-dropdown-avatar">
                      <img src={avatarUrl} alt={user?.name || 'Profile'} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div className="nav-dropdown-name">{user?.name || 'My Account'}</div>
                      <div className="nav-dropdown-email">{user?.email || ''}</div>
                    </div>
                  </div>

                  {/* Account section */}
                  <div className="nav-dropdown-section">
                    <Link
                      to={USER_ROUTES_PATH.setting}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      Account Settings
                    </Link>
                    <Link
                      to={USER_ROUTES_PATH.wishlist}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      My Wishlist
                    </Link>
                    <Link
                      to={USER_ROUTES_PATH.messages}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Messages
                    </Link>
                  </div>

                  {/* Listings section */}
                  <div className="nav-dropdown-section">
                    <Link
                      to={USER_ROUTES_PATH.sell}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="3" width="16" height="18" rx="1.5" />
                        <path d="M8 7h8M8 11h8M8 15h5" />
                      </svg>
                      My Listings
                    </Link>
                    <Link
                      to={USER_ROUTES_PATH.uploadBookToSell}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 5v14M5 12l7-7 7 7" />
                      </svg>
                      Sell a Book
                    </Link>
                    <Link
                      to={USER_ROUTES_PATH.library}
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                      Digital Library
                    </Link>
                  </div>

                  {/* Sign out */}
                  <div className="nav-dropdown-section">
                    <button
                      className="nav-dropdown-item danger"
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ——— Guest: sign-in + get started ——— */
              <>
                <Link to="/login" className="nav-sign-in">
                  Sign in
                </Link>
                <Link to="/register" className="bs-btn bs-btn-primary">
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero relative pt-[170px] pb-[80px] overflow-hidden">
        <div className="wrap hero-lines text-center">
          <span className="hl display text-[clamp(2.6rem,8vw,6.4rem)] block text-[var(--brown-dark,#2E1D10)]" data-hero>
            WE DON'T
          </span>
          <span className="hl display text-[clamp(2.6rem,8vw,6.4rem)] block text-[var(--brown-dark,#2E1D10)]" data-hero>
            JUST SELL BOOKS.
          </span>
          <span className="hl display text-[clamp(2.6rem,8vw,6.4rem)] block text-[var(--brown-dark,#2E1D10)]" data-hero>
            WE build{' '}
            <span className="hero-media frame inline-flex items-center justify-center w-[clamp(90px,14vw,180px)] h-[clamp(56px,9vw,110px)] vertical-middle mx-[14px] rounded-[8px] overflow-hidden relative -top-[4px]">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <img
                src={heroImg}
                alt="Book hero preview"
                className="w-full h-full object-cover"
              />
            </span>
          </span>
          <span className="hl display accent text-[clamp(2.6rem,8vw,6.4rem)] block text-[var(--rust,#A5502E)]" data-hero>
            A SECOND LIFE.
          </span>

          <div className="hero-sub flex items-center justify-center gap-[14px] mt-[34px] font-mono-ibm text-[0.82rem] tracking-[0.06em] uppercase text-[var(--ink-dim,#7A6A57)]" data-hero>
            <span>Trust</span>
            <span className="dot w-[4px] h-[4px] rounded-full bg-[var(--ink-dim,#7A6A57)]" />
            <span>Access</span>
            <span className="dot w-[4px] h-[4px] rounded-full bg-[var(--ink-dim,#7A6A57)]" />
            <span>Community</span>
          </div>
          <div className="hero-dotline w-full max-w-[640px] mx-auto mt-[38px] h-[1px] bg-repeat-x bg-[length:10px_1px]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(43,27,16,0.2) 40%, transparent 0%)' }} data-hero />
          <div className="hero-actions flex gap-[16px] justify-center mt-[40px] flex-wrap" data-hero>
            <a href="#collection" className="bs-btn bs-btn-primary">
              Browse the marketplace
            </a>
            <a href="#library" className="bs-btn bs-btn-ghost">
              Explore the library
            </a>
          </div>
        </div>
      </section>

      {/* ================= SCROLL STROKE INTRO ================= */}
      <section className="stroke-intro pt-[60px] pb-[10px] text-center">
        <div className="wrap">
          <h2 className="stroke-heading reveal font-fraunces text-[clamp(1.8rem,4.6vw,3.2rem)] text-[var(--brown-dark,#2E1D10)] max-w-[760px] mx-auto relative z-10">
            A book's second life, drawn out one scroll at a time.
          </h2>
          <p className="stroke-intro-sub reveal mt-[16px] font-mono-ibm text-[0.8rem] tracking-[0.08em] uppercase text-[var(--ink-dim,#7A6A57)] relative z-10">
            Keep scrolling — the line finishes as the page does
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="stroke-panel reveal bg-[var(--brown-dark,#2E1D10)] rounded-[24px] mx-0 mb-[110px] py-[70px] px-[40px] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_400px_at_80%_0%,rgba(185,138,70,0.22),transparent_60%)]" />
          <h2 className="display stroke-wordmark text-[clamp(2.6rem,10vw,6.4rem)] text-[var(--bg,#F6EFE1)] relative z-10">
            BOOKANDSHELF
          </h2>
          <div className="stroke-stats grid grid-cols-2 md:grid-cols-4 gap-[24px] mt-[54px] relative z-10">
            <div>
              <span className="font-fraunces font-semibold text-[1.7rem] text-[var(--gold,#B98A46)] block">2024</span>
              <label className="font-mono-ibm text-[0.68rem] uppercase tracking-[0.06em] text-[rgba(246,239,225,0.7)]">Founded in Lahore</label>
            </div>
            <div>
              <span className="font-fraunces font-semibold text-[1.7rem] text-[var(--gold,#B98A46)] block">12k+</span>
              <label className="font-mono-ibm text-[0.68rem] uppercase tracking-[0.06em] text-[rgba(246,239,225,0.7)]">Books rehomed</label>
            </div>
            <div>
              <span className="font-fraunces font-semibold text-[1.7rem] text-[var(--gold,#B98A46)] block">3.4k</span>
              <label className="font-mono-ibm text-[0.68rem] uppercase tracking-[0.06em] text-[rgba(246,239,225,0.7)]">Verified sellers</label>
            </div>
            <div>
              <span className="font-fraunces font-semibold text-[1.7rem] text-[var(--gold,#B98A46)] block">24/7</span>
              <label className="font-mono-ibm text-[0.68rem] uppercase tracking-[0.06em] text-[rgba(246,239,225,0.7)]">Digital library access</label>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ABOUT BAND ================= */}
      <section className="about-band py-[100px] bg-[var(--bg-soft,#EEE2CB)]">
        <div className="wrap about-grid grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-[40px] md:gap-[60px] items-start">
          <div className="reveal">
            <h2 className="font-fraunces font-semibold text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.1] text-[var(--ink,#2B1B10)]">
              BOOKANDSHELF IS ROOTED IN PAGES, PEOPLE, AND THE STORIES THAT CONNECT THEM.
            </h2>
          </div>
          <div className="reveal">
            <p className="text-[var(--ink-dim,#7A6A57)] text-[1.02rem] mt-[18px] max-w-[440px]">
              We're a marketplace and digital library built around trust, accessibility, and books that deserve to be read more than once. Backed by verified sellers and a carefully curated e-book collection, we help every book find its next reader — physical or digital.
            </p>
            <div className="about-tag inline-flex items-center gap-[8px] font-mono-ibm text-[0.7rem] tracking-[0.08em] uppercase text-[var(--ink-dim,#7A6A57)] border border-[var(--line-strong,rgba(43,27,16,0.2))] py-[8px] px-[14px] rounded-full mt-[24px]">
              <i className="w-[6px] h-[6px] rounded-full bg-[var(--rust,#A5502E)] block" /> In-house curation team
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARKETPLACE COLLECTION (DYNAMIC - CLEAN IMAGES WITHOUT SHADING) ================= */}
      <section id="collection" className="py-[110px]">
        <div className="wrap">
          <div className="section-top reveal flex items-end justify-between mb-[50px] gap-[20px] flex-wrap">
            <div>
              <div className="eyebrow">Our collection</div>
              <h2 className="font-fraunces font-semibold text-[clamp(1.9rem,3.4vw,2.6rem)] text-[var(--ink,#2B1B10)]">Fresh off the shelf.</h2>
            </div>
            <Link to={USER_ROUTES_PATH.browse} className="bs-btn bs-btn-ghost">
              Explore marketplace
            </Link>
          </div>

          {/* Dynamic Cards Grid or Empty Space */}
          {isPhysicalLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[360px] rounded-[12px] bg-[var(--bg-soft,#EEE2CB)] animate-pulse" />
              ))}
            </div>
          ) : physicalListings.length > 0 ? (
            <div className="collection-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] reveal-stagger">
              {physicalListings.slice(0, 4).map((book, idx) => {
                const coverImage = book.images?.[0]?.secure_url || SIGNATURE_SHELF[idx % SIGNATURE_SHELF.length].img;
                return (
                  <div key={book.id || idx} className="prod-card">
                    {/* Clean media box - no color shading overlay on images */}
                    <div className="prod-media bg-[var(--bg-soft)]">
                      <img src={coverImage} alt={book.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                      <span className="prod-cond">{book.condition || 'Pre-owned'}</span>
                      <Link to={`/product/${book.id}`} className="prod-overlay">
                        <span>Learn more</span>
                      </Link>
                    </div>
                    <div className="prod-meta">
                      <h4>{book.title}</h4>
                      <div className="price">Rs {book.price}</div>
                    </div>
                    <div className="prod-author">{book.author}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-[60px] text-center text-[var(--ink-dim,#7A6A57)] font-mono-ibm text-[0.9rem]">
              No active physical listings available on shelf right now.
            </div>
          )}
        </div>
      </section>

      {/* ================= PROCESS SECTION (TYPEWRITER & STAMP) ================= */}
      <section id="process" className="py-[110px] bg-[var(--bg-soft,#EEE2CB)]">
        <div className="wrap">
          <div className="process-head text-center max-w-[760px] mx-auto mb-[70px] reveal">
            <div className="eyebrow justify-center">How a book finds you</div>
            <h2 ref={printHeadingRef} className="print-heading mt-[16px] text-[var(--brown-dark,#2E1D10)]">
              FROM A LISTING TO YOUR SHELF<span className="cursor">&nbsp;</span>
            </h2>
          </div>

          <div className="process-steps grid grid-cols-1 md:grid-cols-3 gap-[30px] reveal-stagger">
            <div className="p-step pt-[22px] border-t-2 border-[var(--line-strong,rgba(43,27,16,0.2))]">
              <div className="p-num mono text-[0.7rem] text-[var(--rust,#A5502E)] mb-[10px]">01 / IT BEGINS</div>
              <h3 className="font-fraunces text-[1.15rem] mb-[8px] text-[var(--ink,#2B1B10)]">With a listing</h3>
              <p className="text-[var(--ink-dim,#7A6A57)] text-[0.92rem]">A seller photographs their book, sets a fair price, and describes its condition honestly.</p>
            </div>
            <div className="p-step pt-[22px] border-t-2 border-[var(--line-strong,rgba(43,27,16,0.2))]">
              <div className="p-num mono text-[0.7rem] text-[var(--rust,#A5502E)] mb-[10px]">02 / THEN COMES</div>
              <h3 className="font-fraunces text-[1.15rem] mb-[8px] text-[var(--ink,#2B1B10)]">Verification</h3>
              <p className="text-[var(--ink-dim,#7A6A57)] text-[0.92rem]">Every listing is checked for accuracy, and every seller carries a visible rating history.</p>
            </div>
            <div className="p-step pt-[22px] border-t-2 border-[var(--line-strong,rgba(43,27,16,0.2))]">
              <div className="p-num mono text-[0.7rem] text-[var(--rust,#A5502E)] mb-[10px]">03 / AND FINALLY</div>
              <h3 className="font-fraunces text-[1.15rem] mb-[8px] text-[var(--ink,#2B1B10)]">It's yours</h3>
              <p className="text-[var(--ink-dim,#7A6A57)] text-[0.92rem]">Secure checkout, real-time chat for pickup details, and the book ships to your door.</p>
            </div>
          </div>

          <div className="stamp-wrap reveal mt-[60px]" id="stampWrap">
            <div ref={stampElRef} className="stamp" id="stampEl">
              <span>
                Verified
                <br />
                Listing
                <br />✓ Checked
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FIVE STAFF PICKS SCROLL STACK (ALTERNATING IMAGE/TEXT + CONSTANT COLOR) ================= */}
      <section id="staffpicks" className="stack-section pt-[110px]">
        <div className="wrap">
          <div className="section-top reveal flex items-end justify-between mb-[50px]">
            <div>
              <div className="eyebrow">Shelf stack</div>
              <h2 className="font-fraunces font-semibold text-[clamp(1.9rem,3.4vw,2.6rem)] text-[var(--ink,#2B1B10)]">Five staff picks. One very literal pile.</h2>
            </div>
          </div>

          <div className="stack-pin" ref={stackCardsRef}>
            <div className="stack-cards" id="stackCards">
              {STAFF_PICK_BOOKS.map((b, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="stack-card flex items-center justify-between p-[32px] md:p-[40px] text-[#F6EFE1]"
                    style={{
                      backgroundColor: b.bgColor,
                      zIndex: i + 1,
                    }}
                  >
                    <span className="sc-index mono">
                      0{i + 1} / 0{STAFF_PICK_BOOKS.length}
                    </span>

                    <div className="w-full flex flex-col md:flex-row items-center gap-[36px] justify-between relative z-10">
                      {/* Image on left for odd index (1, 3), Image on right for even index (0, 2, 4) */}
                      {isEven ? (
                        <>
                          <div className="flex-1">
                            <div className="sc-tag text-[var(--gold)] mb-[10px]">Staff pick</div>
                            <h3 className="font-fraunces text-[1.8rem] md:text-[2.2rem] font-semibold leading-tight text-[#F6EFE1]">{b.t}</h3>
                            <div className="sc-author font-mono-ibm text-[0.88rem] opacity-80 mt-[6px]">{b.a}</div>
                            <p className="sc-note font-fraunces italic text-[1.05rem] mt-[18px] opacity-90 leading-relaxed max-w-[480px]">{b.note}</p>
                          </div>
                          <div className="w-[180px] md:w-[240px] h-[220px] md:h-[280px] shrink-0 rounded-[12px] overflow-hidden shadow-2xl border border-white/20">
                            <img src={b.img} alt={b.t} className="w-full h-full object-cover" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-[180px] md:w-[240px] h-[220px] md:h-[280px] shrink-0 rounded-[12px] overflow-hidden shadow-2xl border border-white/20 order-2 md:order-1">
                            <img src={b.img} alt={b.t} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 order-1 md:order-2">
                            <div className="sc-tag text-[var(--gold)] mb-[10px]">Staff pick</div>
                            <h3 className="font-fraunces text-[1.8rem] md:text-[2.2rem] font-semibold leading-tight text-[#F6EFE1]">{b.t}</h3>
                            <div className="sc-author font-mono-ibm text-[0.88rem] opacity-80 mt-[6px]">{b.a}</div>
                            <p className="sc-note font-fraunces italic text-[1.05rem] mt-[18px] opacity-90 leading-relaxed max-w-[480px]">{b.note}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HORIZONTAL SCROLL GALLERY (USING HORIZONTAL SCROLL ASSETS) ================= */}
      <div className="h-pin" id="hPin" ref={hPinRef}>
        <div className="h-viewport">
          <div className="h-heading">
            <div className="eyebrow">Signature shelf</div>
            <h2>Titles readers keep coming back for.</h2>
          </div>
          <div className="h-track" id="hTrack" ref={hTrackRef}>
            {SIGNATURE_SHELF.map((b, idx) => (
              <div
                key={idx}
                className="h-card"
                style={{
                  background: `linear-gradient(180deg, rgba(46,29,16,0.2) 0%, rgba(46,29,16,0.9) 100%), url(${b.img}) center/cover no-repeat`,
                }}
              >
                <span className="hc-tag">{b.tag}</span>
                <div>
                  <div className="hc-title">{b.t}</div>
                  <div className="hc-sub">{b.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MARQUEE ================= */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span>
            <b>Fiction</b> Non-fiction <b>Textbooks</b> Poetry <b>Sci-Fi</b> Biography <b>Classics</b> Self-help
          </span>
          <span>
            <b>Fiction</b> Non-fiction <b>Textbooks</b> Poetry <b>Sci-Fi</b> Biography <b>Classics</b> Self-help
          </span>
        </div>
      </div>

      {/* ================= DIGITAL LIBRARY TEASER (DYNAMIC - CLEAN E-BOOK IMAGES) ================= */}
      <section id="library" className="py-[110px]">
        <div className="wrap">
          <div className="section-top reveal flex items-end justify-between mb-[50px] gap-[20px] flex-wrap">
            <div>
              <div className="eyebrow">Curated by the admin team</div>
              <h2 className="font-fraunces font-semibold text-[clamp(1.9rem,3.4vw,2.6rem)] text-[var(--ink,#2B1B10)]">Your digital shelf, always open.</h2>
            </div>
            <Link to="/library" className="bs-btn bs-btn-primary">
              Open the library
            </Link>
          </div>

          {isEbookLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-[360px] rounded-[12px] bg-[var(--bg-soft,#EEE2CB)] animate-pulse" />
              ))}
            </div>
          ) : ebookListings.length > 0 ? (
            <div className="collection-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] reveal-stagger">
              {ebookListings.slice(0, 4).map((b, idx) => {
                const coverImage = b.images?.[0]?.secure_url || SIGNATURE_SHELF[idx % SIGNATURE_SHELF.length].img;
                return (
                  <div key={b.id || idx} className="prod-card">
                    {/* Clean media box - clear book covers */}
                    <div className="prod-media bg-[var(--bg-soft)]">
                      <img src={coverImage} alt={b.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                      <span className="prod-cond">E-book</span>
                      <Link to={`/product/${b.id}`} className="prod-overlay">
                        <span>Read now</span>
                      </Link>
                    </div>
                    <div className="prod-meta">
                      <h4>{b.title}</h4>
                      <div className="price">{b.price ? `Rs ${b.price}` : 'Free'}</div>
                    </div>
                    <div className="prod-author">{b.author}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-[60px] text-center text-[var(--ink-dim,#7A6A57)] font-mono-ibm text-[0.9rem]">
              No digital e-books in current view.
            </div>
          )}
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="trust-strip py-[90px] bg-[var(--bg-soft,#EEE2CB)]">
        <div className="wrap">
          <div className="section-top reveal mb-[50px]">
            <div>
              <div className="eyebrow">We are trusted</div>
              <h2 className="font-fraunces font-semibold text-[clamp(1.9rem,3.4vw,2.6rem)] text-[var(--ink,#2B1B10)]">Built to protect every trade.</h2>
            </div>
          </div>
          <div className="trust-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] text-center reveal-stagger">
            <div className="trust-item p-[28px_18px] border-r-0 lg:border-r border-[var(--line,rgba(43,27,16,0.1))]">
              <div className="trust-icon w-[44px] h-[44px] rounded-full bg-[var(--bg-soft,#EEE2CB)] border border-[var(--line-strong,rgba(43,27,16,0.2))] flex items-center justify-center mx-auto mb-[16px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A4B25" strokeWidth="1.7">
                  <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                </svg>
              </div>
              <h4 className="font-fraunces text-[0.98rem] mb-[6px] text-[var(--ink,#2B1B10)]">Secure payments</h4>
              <p className="text-[0.82rem] text-[var(--ink-dim,#7A6A57)]">Encrypted checkout, held funds</p>
            </div>
            <div className="trust-item p-[28px_18px] border-r-0 lg:border-r border-[var(--line,rgba(43,27,16,0.1))]">
              <div className="trust-icon w-[44px] h-[44px] rounded-full bg-[var(--bg-soft,#EEE2CB)] border border-[var(--line-strong,rgba(43,27,16,0.2))] flex items-center justify-center mx-auto mb-[16px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A5502E" strokeWidth="1.7">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
                </svg>
              </div>
              <h4 className="font-fraunces text-[0.98rem] mb-[6px] text-[var(--ink,#2B1B10)]">Verified sellers</h4>
              <p className="text-[0.82rem] text-[var(--ink-dim,#7A6A57)]">Identity &amp; rating checks</p>
            </div>
            <div className="trust-item p-[28px_18px] border-r-0 lg:border-r border-[var(--line,rgba(43,27,16,0.1))]">
              <div className="trust-icon w-[44px] h-[44px] rounded-full bg-[var(--bg-soft,#EEE2CB)] border border-[var(--line-strong,rgba(43,27,16,0.2))] flex items-center justify-center mx-auto mb-[16px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A4B25" strokeWidth="1.7">
                  <path d="M21 11.5a8.4 8.4 0 0 1-1 4 8.5 8.5 0 0 1-11.8 3.4L3 20l1.1-5.2A8.5 8.5 0 1 1 21 11.5z" />
                </svg>
              </div>
              <h4 className="font-fraunces text-[0.98rem] mb-[6px] text-[var(--ink,#2B1B10)]">Real-time chat</h4>
              <p className="text-[0.82rem] text-[var(--ink-dim,#7A6A57)]">Message before you commit</p>
            </div>
            <div className="trust-item p-[28px_18px]">
              <div className="trust-icon w-[44px] h-[44px] rounded-full bg-[var(--bg-soft,#EEE2CB)] border border-[var(--line-strong,rgba(43,27,16,0.2))] flex items-center justify-center mx-auto mb-[16px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A5502E" strokeWidth="1.7">
                  <rect x="4" y="3" width="16" height="18" rx="1.5" />
                  <path d="M8 7h8M8 11h8M8 15h5" />
                </svg>
              </div>
              <h4 className="font-fraunces text-[0.98rem] mb-[6px] text-[var(--ink,#2B1B10)]">Curated library</h4>
              <p className="text-[0.82rem] text-[var(--ink-dim,#7A6A57)]">Every e-book reviewed first</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="pt-0 pb-[110px]">
        <div className="wrap">
          <div className="cta-banner reveal relative rounded-[20px] py-[70px] px-[28px] sm:px-[56px] bg-[radial-gradient(ellipse_700px_400px_at_80%_0%,rgba(185,138,70,0.28),transparent_60%),radial-gradient(ellipse_500px_400px_at_10%_100%,rgba(165,80,46,0.22),transparent_60%),var(--brown-dark,#2E1D10)] overflow-hidden text-center">
            <h2 className="font-fraunces text-[#F6EFE1] text-[clamp(1.9rem,3.6vw,2.8rem)] max-w-[640px] mx-auto relative z-10">
              Your next favorite book is already on someone's shelf.
            </h2>
            <p className="text-[rgba(246,239,225,0.65)] mt-[16px] mx-auto max-w-[440px] relative z-10">
              Join for free — list a book to sell or start reading from the library today.
            </p>
            <div className="hero-actions flex gap-[16px] justify-center mt-[30px] relative z-10 flex-wrap">
              <Link to="/register" className="bs-btn bs-btn-primary" style={{ background: '#F6EFE1', color: 'var(--brown-dark)' }}>
                Create your account
              </Link>
              <a href="#process" className="bs-btn bs-btn-ghost" style={{ borderColor: 'rgba(246,239,225,0.3)', color: '#F6EFE1' }}>
                See how it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER WITH MASSIVE BRAND LOGO IMAGE (LARAVEL STYLE) ================= */}
      <footer className="bg-[var(--surface,#FFFCF5)] pt-[64px] pb-[0px] border-t border-[var(--line,rgba(43,27,16,0.1))] overflow-hidden">
        <div className="wrap">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)] gap-[40px] pb-[44px] border-b border-[var(--line,rgba(43,27,16,0.1))]">
            <div className="footer-brand">
              <Link to="/" className="logo flex items-center gap-[9px] font-fraunces font-bold text-[1.25rem] text-[var(--ink,#2B1B10)]">
                <span className="logo-mark w-[26px] h-[26px] rounded-[6px] bg-gradient-to-br from-[#7A4B25] to-[#A5502E] flex items-center justify-center">
                  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="#F6EFE1" strokeWidth="2">
                    <path d="M4 4h7v16H4zM13 4h7v16h-7z" />
                  </svg>
                </span>
                BookAndShelf
              </Link>
              <p className="text-[var(--ink-dim,#7A6A57)] my-[14px] mb-[20px] max-w-[280px] text-[0.9rem]">
                A marketplace for pre-owned books and a curated digital library, built for readers, students, and collectors.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="newsletter flex border border-[var(--line-strong,rgba(43,27,16,0.2))] rounded-full overflow-hidden max-w-[300px]">
                <input type="email" placeholder="you@email.com" className="flex-1 bg-transparent border-none py-[11px] px-[16px] text-[var(--ink,#2B1B10)] text-[0.85rem] outline-none" />
                <button type="submit" className="bg-[var(--brown-deep,#5A371A)] text-[#F6EFE1] px-[18px] font-semibold text-[0.85rem]">
                  Notify me
                </button>
              </form>
            </div>

            <div className="fcol">
              <h5 className="font-mono-ibm text-[0.68rem] tracking-[0.08em] uppercase text-[var(--ink-dim,#7A6A57)] mb-[16px]">Marketplace</h5>
              <ul className="space-y-[11px] text-[0.88rem] text-[var(--ink-dim,#7A6A57)]">
                <li>
                  <Link to={USER_ROUTES_PATH.browse} className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    Browse listings
                  </Link>
                </li>
                <li>
                  <Link to={USER_ROUTES_PATH.uploadBookToSell} className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    Sell a book
                  </Link>
                </li>
                <li>
                  <a href="#process" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    Seller guide
                  </a>
                </li>
              </ul>
            </div>

            <div className="fcol">
              <h5 className="font-mono-ibm text-[0.68rem] tracking-[0.08em] uppercase text-[var(--ink-dim,#7A6A57)] mb-[16px]">Library</h5>
              <ul className="space-y-[11px] text-[0.88rem] text-[var(--ink-dim,#7A6A57)]">
                <li>
                  <Link to="/library" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    All e-books
                  </Link>
                </li>
                <li>
                  <a href="#library" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    New additions
                  </a>
                </li>
                <li>
                  <a href="#library" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    Request a title
                  </a>
                </li>
              </ul>
            </div>

            <div className="fcol">
              <h5 className="font-mono-ibm text-[0.68rem] tracking-[0.08em] uppercase text-[var(--ink-dim,#7A6A57)] mb-[16px]">Company</h5>
              <ul className="space-y-[11px] text-[0.88rem] text-[var(--ink-dim,#7A6A57)]">
                <li>
                  <a href="#process" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    Trust &amp; safety
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-[var(--rust,#A5502E)] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom flex justify-between items-center py-[22px] text-[0.78rem] text-[var(--ink-dim,#7A6A57)] flex-wrap gap-[12px]">
            <span>© 2026 BookAndShelf. All rights reserved.</span>
            <span className="mono">Reading list, always open.</span>
          </div>

          {/* Massive Brand Footer Image (Laravel Style) */}
          <div className="w-full mt-[10px] pb-0 flex justify-center">
            <img
              src={footerLogoImg}
              alt="Book &amp; Shelf Footer Logo"
              className="w-full max-w-[1200px] h-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
export default HomePage;
