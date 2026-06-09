
# Directory Structure
```
src/app/app.tsx
src/app/router/Auth.router.tsx
src/app/router/Main.router.tsx
src/app/router/routes.path.ts
src/assets/cat romance.jpg
src/assets/cat-anime.jpg
src/assets/cat-biography.png
src/assets/cat-business.jpg
src/assets/cat-comedy.jpg
src/assets/cat-history.jpg
src/assets/hero img.jpg
src/assets/hero.png
src/assets/hero.section.images/0.jpg
src/assets/hero.section.images/1.jpg
src/assets/hero.section.images/2.jpg
src/assets/hero.section.images/3.jpg
src/assets/hero.section.images/4.jpg
src/assets/hero.section.images/5.jpg
src/assets/hero.section.images/6.jpg
src/assets/hero.section.images/6839b92bb2e96fe02de52c8e_noise.avif
src/assets/hero.section.images/7.jpg
src/assets/hero.section.images/8.jpg
src/assets/hero.section.images/9.jpg
src/assets/images/forgot-pass.png
src/assets/images/image-1.png
src/assets/images/image-2.png
src/assets/images/library.png
src/assets/images/login.jpg
src/assets/images/logo.png
src/assets/images/reset pass.png
src/assets/images/reset-book.png
src/assets/images/sign-up side image.png
src/assets/new arr 1.png
src/assets/new arr 2.png
src/assets/new arr 3.png
src/assets/new arr 4.png
src/assets/react.svg
src/assets/screen copy.png
src/assets/screen.png
src/assets/tab over book.jpg
src/assets/vite.svg
src/components/ui/accordion.tsx
src/components/ui/button-variants.tsx
src/components/ui/button.tsx
src/components/ui/combobox.tsx
src/components/ui/command.tsx
src/components/ui/dialog.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/input-group.tsx
src/components/ui/input.tsx
src/components/ui/popover.tsx
src/components/ui/sheet.tsx
src/components/ui/textarea.tsx
src/features/auth/components/login.tsx
src/features/auth/components/LoginForm.tsx
src/features/auth/components/Reset.password.tsx
src/features/auth/components/Reset.password.verify.form.tsx
src/features/auth/components/Reset.password.verify.tsx
src/features/auth/components/ResetPasswordForm.tsx
src/features/auth/components/Signup.tsx
src/features/auth/components/SignupForm.tsx
src/features/auth/components/Update.password.form.tsx
src/features/auth/components/Update.password.tsx
src/features/auth/components/Verify.opt.credentail.tsx
src/features/auth/components/VerifyOtpForm.tsx
src/features/auth/hooks/useTimer.ts
src/features/auth/index.ts
src/features/auth/layout/Auth.sidebar.layout.tsx
src/features/auth/pages/LoginPage.tsx
src/features/auth/pages/Reset.password.email.page.tsx
src/features/auth/pages/Reset.password.verify.tsx
src/features/auth/pages/ResetPassword.tsx
src/features/auth/pages/SignupPage.tsx
src/features/auth/pages/Verify.signup.otp.tsx
src/features/auth/routes/Auth.gaurd.update.password.tsx
src/features/auth/routes/Auth.guard.tsx
src/features/auth/routes/Auth.reset.session.guard.tsx
src/features/auth/service/authService.ts
src/features/auth/types/email.forget.password.types.ts
src/features/auth/types/form.opt.verify.types.ts
src/features/auth/types/index.types.ts
src/features/auth/types/locations.types.ts
src/features/auth/types/login.form.types.ts
src/features/auth/types/signup.account.types.ts
src/features/home/components/BridgingEras.tsx
src/features/home/components/Footer.tsx
src/features/home/components/hero.section.carousel.module.scss
src/features/home/components/hero.section.carousel.tsx
src/features/home/components/Hero.tsx
src/features/home/components/NewArrivals.tsx
src/features/home/components/SearchSection.tsx
src/features/home/components/ShopByCategory.tsx
src/features/home/components/TrustBar.tsx
src/features/home/pages/HomePage.tsx
src/features/home/types.ts
src/features/listing/components/ActiveListings.tsx
src/features/listing/components/NoListings.tsx
src/features/listing/index.ts
src/features/listing/pages/ListingsPage.tsx
src/features/sellUpload/components/add.book.form.tsx
src/features/sellUpload/components/BookListingPage.tsx
src/features/sellUpload/index.tsx
src/features/sellUpload/quries/upload.book.metadata.query.ts
src/features/sellUpload/service/upload.book.service.ts
src/features/sellUpload/types/images.upload.type.ts
src/features/sellUpload/types/upload.form.type.ts
src/features/sellUpload/utils/upload.book.assets.helper.ts
src/index.css
src/lib/queryClient.ts
src/lib/utils.ts
src/main.tsx
src/quries/locations.query.ts
src/services/apiClient.ts
src/services/locationService.ts
src/shared/components/Alert.dialog.message.tsx
src/shared/components/BookCard/EBookCard.tsx
src/shared/components/BookCard/UsedBookCard.tsx
src/shared/components/Button.component.tsx
src/shared/components/Button/Button.tsx
src/shared/components/DialogComponent.message.tsx
src/shared/components/Header.tsx
src/shared/components/Input.tsx
src/shared/components/Layout/Footer/Footer.tsx
src/shared/components/Layout/Navbar/Navbar.tsx
src/shared/components/loaders/Loader.tsx
src/shared/components/loaders/Three.dot.loader.module.css
src/shared/components/loaders/Three.dot.loader.tsx
src/shared/components/Logo.tsx
src/shared/components/Menu.modal.module.scss
src/shared/components/Menu.modal.tsx
src/shared/components/select.options.tsx
src/shared/components/toaster.css
src/shared/components/Toaster.tsx
src/shared/customHooks/toogle.eye.hook.ts
src/shared/utils/format.formhook.errors.ts
src/shared/utils/global.error.axios.forms.ts
src/shared/utils/toast.global.ts
```

# Files

## File: src/app/app.tsx
```typescript
import { RouterProvider } from 'react-router-dom';
import { MianRouter } from './router/Main.router';
import { ToasterPopup } from '@/shared/components/Toaster';

const App = () => {
  return <>
    <RouterProvider router={MianRouter} />
    <ToasterPopup />
  </>;
};

export default App;
```

## File: src/app/router/Auth.router.tsx
```typescript
import { RouteObject } from "react-router-dom";

import { AUTH_ROUTES_PATH } from './routes.path';

import {
    LoginPage,
    ResetPasswordEmailPage,
    ResetPasswordVerifyTokenPage,
    SignupPage,
    UpdatePasswordPage,
    VerifySignOtpPage
} from "@/features/auth/index";

import { AuthGuardOTPVerifyCredientails } from "@/features/auth/routes/Auth.guard";
import { AuthGaurdResetSessionPage } from "@/features/auth/routes/Auth.reset.session.guard";
import { AuthGaurdUpdatePasswordSessionPage } from "@/features/auth/routes/Auth.gaurd.update.password";


export const AuthRouter: RouteObject[] = [
    {
        path: AUTH_ROUTES_PATH.signup,
        element: <SignupPage />
    },
    {
        path: AUTH_ROUTES_PATH.login,
        element: <LoginPage />
    },
    {
        path: AUTH_ROUTES_PATH.verification,
        element:
            <AuthGuardOTPVerifyCredientails>
                <VerifySignOtpPage />
            </AuthGuardOTPVerifyCredientails>
    },
    {
        path: AUTH_ROUTES_PATH.passwordResetRequest,
        element: < ResetPasswordEmailPage />
    },
    {
        path: AUTH_ROUTES_PATH.passwordResetVerify,
        element:
            <AuthGaurdResetSessionPage>
                <ResetPasswordVerifyTokenPage />
            </AuthGaurdResetSessionPage>
    },
    {
        path: AUTH_ROUTES_PATH.passwordResetConfirm,
        element:
            <AuthGaurdUpdatePasswordSessionPage>
                <UpdatePasswordPage />
            </AuthGaurdUpdatePasswordSessionPage>
    }
];
```

## File: src/app/router/Main.router.tsx
```typescript
import { createBrowserRouter } from 'react-router-dom';

import { AuthRouter } from './Auth.router';

import { HomePage } from '@/features/home/pages/HomePage';
import { AuthSidebarLayout } from '@/features/auth/layout/Auth.sidebar.layout';
import { ListingsPage } from '@/features/listing';
import { BookListingPage } from '@/features/sellUpload';
import { USER_ROUTES_PATH } from './routes.path';

export const MianRouter = createBrowserRouter([
  {
    element: <AuthSidebarLayout />,
    children: [
      ...AuthRouter
    ]
  },
  {
    path: USER_ROUTES_PATH.home,
    element: < HomePage />
  },
  {
    path: USER_ROUTES_PATH.sell,
    element: <ListingsPage />
  },
  {
    path: USER_ROUTES_PATH.uploadBookToSell,
    element: <BookListingPage />
  },

]);
```

## File: src/app/router/routes.path.ts
```typescript
export const AUTH_ROUTES_PATH = {
  signup: "/signup",
  login: "/login",
  verification: "/verification",
  passwordResetRequest: "/password/reset/request",
  passwordResetVerify: "/password/reset/verify/:sessionId",
  passwordResetConfirm: "/password/reset/confirm/:sessionId",
};

export const AUTH_ROUTE_BUILDER = {
  passwordResetVerify: (sessionId: string) => `/password/reset/verify/${sessionId}`,

  passwordResetConfirm: (sessionId: string) => `/password/reset/confirm/${sessionId}`,
};

export const USER_ROUTES_PATH = {
  home: "/",
  sell: "/sell",
  uploadBookToSell: "/sell/upload",

};
```

## File: src/assets/react.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/assets/vite.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
```

## File: src/components/ui/accordion.tsx
```typescript
import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          " pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

## File: src/components/ui/button-variants.tsx
```typescript
import { cva } from "class-variance-authority";


export const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
                outline:
                    "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
                ghost:
                    "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default:
                    "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                icon: "size-8",
                "icon-xs":
                    "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                "icon-sm":
                    "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
                "icon-lg": "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);
```

## File: src/components/ui/button.tsx
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## File: src/components/ui/combobox.tsx
```typescript
"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react";

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn("group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
};
```

## File: src/components/ui/command.tsx
```typescript
import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

## File: src/components/ui/dialog.tsx
```typescript
import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
```

## File: src/components/ui/dropdown-menu.tsx
```typescript
import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn("z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
```

## File: src/components/ui/input-group.tsx
```typescript
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
```

## File: src/components/ui/input.tsx
```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
```

## File: src/components/ui/popover.tsx
```typescript
import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
```

## File: src/components/ui/sheet.tsx
```typescript
import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-3 right-3"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

## File: src/components/ui/textarea.tsx
```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
```

## File: src/features/auth/components/login.tsx
```typescript
import { Link } from "react-router-dom";

import logo from '@/assets/images/logo.png';

import { LoginForm } from "./LoginForm";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";


export const LoginComponent = () => {
    return <div className="order-2 w-full lg:w-1/2 overflow-y-scroll scrollbar-hide">
        <div className="w-full shrink-0 flex flex-col px-10 md:px-16 lg:px-20 py-10 overflow-y-auto bg-white 
          order-1 scrollbar-hide">

            <div className="mb-14">
                <Link to="/">
                    <img
                        alt="BookShelf"
                        className="h-14 w-auto object-contain"
                        src={logo}
                    />
                </Link>
            </div>
            <div className="mb-8">
                <h1 className="text-[36px]  text-[#1a1a1a] leading-tight mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Welcome back
                </h1>
                <p className="text-sm text-gray-500"
                >
                    Please enter your details to sign in.
                </p>
            </div>

            <LoginForm />

            <p
                className="mt-10 text-center text-sm text-gray-500 "

            >
                Don't have an account?{" "}
                <Link className="font-semibold text-[#8b5e3c] hover:underline"
                    to={AUTH_ROUTES_PATH.signup}>
                    Sign up
                </Link>
            </p>
        </div>
    </div >;
};
```

## File: src/features/auth/components/LoginForm.tsx
```typescript
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginFormSchema, loginFormType } from '../types/login.form.types';

import { authService } from '../service/authService';

import { Button } from '@/shared/components/Button.component';
import { Input } from '@/shared/components/Input';
import { DialogComponent } from '@/shared/components/DialogComponent.message';

import { formatFormHookErrors } from '@/shared/utils/format.formhook.errors';
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';
import { showToast } from '@/shared/utils/toast.global';

export const LoginForm = () => {

  const navigate = useNavigate();

  const { register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      remember: false
    }
  });

  const onSubmit = async (data: loginFormType) => {
    try {
      console.log(data);

      const response = await authService.login(data);

      if (response.payload.OPT_SESSION) {
        showToast("Please verify your account to continue.");
        navigate(AUTH_ROUTES_PATH.verification);

      } else navigate("/");

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) return formatFormHookErrors(error, setError);

        return setError("root", {
          message: "Connection temporary delayed. Please check your network and try again shortly.",
        });
      }

      if (error.request) return setError("root", {
        message: "Server is currently busy or unreachable. Please check your connection and try again.",
      });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

      <Input
        label="Email"
        id="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        id="password"
        isPassword={true}
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <label
          className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <input
            className="w-4 h-4 rounded border-gray-300 text-[#8b5e3c] focus:ring-[#c4956a]/30"
            id="remember-me"
            type="checkbox"
            {...register("remember")}
          />
          Remember me
        </label>
        <Link className="text-sm font-semibold text-[#8b5e3c] hover:underline"
          to={AUTH_ROUTES_PATH.passwordResetRequest}>
          Forgot password?
        </Link>
      </div>

      <Button ButtonType="submit" disabled={isSubmitting}>
        Sign in
      </Button>

      <div className="flex items-center mt-5 my-2 
      text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
        <span className="px-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>or continue with</span>
      </div>
      {errors.root &&
        <DialogComponent title={errors.root?.message?.includes("attempts") ?
          "Too Many Attempts" : "Request Could Not Be Completed"}
          description={errors.root.message}
          open={!!errors.root}
          onclose={() => clearErrors("root")}
        />
      }
    </form >
  );
};
```

## File: src/features/auth/components/Reset.password.tsx
```typescript
import { Link } from "react-router-dom";

import { ResetPasswordEmailForm } from "./ResetPasswordForm";
import { Logo } from "@/shared/components/Logo";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function ResetPasswordEmailComponent() {
    return (
        <div className="order-2 w-full lg:w-1/2 overflow-y-scroll scrollbar-hide flex items-center">
            <div className='w-full shrink-0 flex flex-col px-10 md:px-16 lg:px-20 py-10 overflow-y-auto bg-white 
          order-1 overflow-y-auto scrollbar-hide'>
                <Logo />
                <div className="mb-8">
                    <h1
                        className="text-[28px] font-bold text-[#1a1a1a] leading-tight mb-2 mt-5"
                    >
                        Reset password
                    </h1>
                    <p
                        className="text-sm text-gray-500 max-w-xs"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <ResetPasswordEmailForm />

                <div className="flex items-center mt-5 my-2 
                   text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                    <span className="px-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>or</span>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Remember your password?{' '}
                    <Link className="font-semibold text-[#8b5e3c] hover:underline" to={AUTH_ROUTES_PATH.login}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
```

## File: src/features/auth/components/Reset.password.verify.form.tsx
```typescript
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../service/authService";

import { optTypeVerifyAccount, otpSchemaVerifyAccount } from "../types/form.opt.verify.types";

import { AUTH_ROUTE_BUILDER, AUTH_ROUTES_PATH } from "@/app/router/routes.path";

import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button.component";
import { showError, showLoading, showSuccess } from "@/shared/utils/toast.global";
import { DialogComponent } from "@/shared/components/DialogComponent.message";




const TIMER_KEY = "book_shelf_verify_opt_reset_password";
const DURATION = 60;

export function VerifyResetPasswordTokenForm() {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState<number>(DURATION);

    const [attempt, setAttempt] = useState<number>(0);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
        clearErrors
    } = useForm<optTypeVerifyAccount>(
        {
            resolver: zodResolver(otpSchemaVerifyAccount),
            mode: "onChange"
        }
    );

    useEffect(() => {

        const updateTimer = () => {
            const start = sessionStorage.getItem(TIMER_KEY);

            if (!start) {
                setTimeLeft(0);
                return;
            }

            const elapsed = Math.floor(
                (Date.now() - Number(start)) / 1000
            );

            const remaining = DURATION - elapsed;

            if (remaining <= 0) {
                setTimeLeft(0);

                sessionStorage.removeItem(TIMER_KEY);

                return;
            }

            setTimeLeft(remaining);
        };

        if (!sessionStorage.getItem(TIMER_KEY)) {
            sessionStorage.setItem(
                TIMER_KEY,
                String(Date.now())
            );
        }

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);


    const onSubmit = async (data: optTypeVerifyAccount) => {
        if (!sessionId) {
            showError("This session link is invalid. Please try again.");
            return;
        }

        try {
            const { payload: { passwordsessionId } } = await authService.requestPasswordVerify(sessionId, data.token);

            navigate(AUTH_ROUTE_BUILDER.passwordResetConfirm(passwordsessionId));
            sessionStorage.removeItem(TIMER_KEY);

            showSuccess("Verified. Proceed to reset.");
        } catch (error: any) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 401) {
                    showError("Session expired. Please request a new verification email.");
                    navigate(AUTH_ROUTES_PATH.passwordResetRequest);
                    return;
                }

                if (error.response) return formatFormHookErrors(error, setError);

                return setError("root", {
                    message: "Connection temporary delayed. Please check your network and try again shortly.",
                });
            }

            if (error.request) return setError("root", {
                message: "Server is currently busy or unreachable. Please check your connection and try again.",
            });
        }
    };

    const handleResend = async () => {
        try {
            if (!sessionId) {
                showError("This session link is invalid. Please try again.");
                return;
            }

            if (attempt >= 5) {
                setError("root", {
                    message: "You have reached the maximum number of OTP attempts. Please try again later."
                });
                return;
            }

            const { payload: { attemptCounter } } = await authService.requestPasswordTokenResend(sessionId);
            setAttempt(attemptCounter);
            if (attempt <= 5) return;


            showLoading("Sending email...");
            sessionStorage.setItem(TIMER_KEY, String(Date.now()));

            setTimeout(() => {
                setTimeLeft(DURATION);
                toast.dismissAll();
                showSuccess("Verification email sent.");
            }, 2500);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    formatFormHookErrors(error, setError);
                    return;
                }

            }
            showError("Couldn’t send email. Try again.");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-4"
            >

                <Input
                    label=""
                    placeholder="Enter the OTP"
                    error={errors.token?.message}
                    {...register("token")}
                />


                <Button
                    ButtonType="submit"
                    disabled={isSubmitting}>
                    Verify & Continue
                </Button>

            </form >
            <hr className="mb-4" />
            {(attempt >= 5) ? (
                <p className="textblack text-[14px] text-center">
                    OTP attempts limit reached. You can try again after a short delay.
                </p>

            ) : timeLeft > 55 ? (
                <p className="text-black black text-[14px] text-center flex w-full justify-center items-end gap-1">
                    Resend available in {timeLeft}s
                </p>
            ) : (
                <p
                    className="black cursor-pointer text-[14px] text-center flex w-full justify-center items-end gap-1"
                >
                    Click to re-send token? <button className="hover:underline cursor-pointer" onClick={handleResend}>resend token</button>
                </p>
            )
            }

            {errors.root &&
                <DialogComponent title={errors.root?.message?.includes("attempts") ?
                    "Too Many Attempts" : "Request Could Not Be Completed"}
                    description={errors.root.message}
                    open={!!errors.root}
                    onclose={() => clearErrors("root")}
                />
            }
        </>
    );
};
```

## File: src/features/auth/components/Reset.password.verify.tsx
```typescript
import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';

import { VerifyResetPasswordTokenForm } from "./Reset.password.verify.form";
import { Logo } from "@/shared/components/Logo";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function VerifyResetPasswordToken() {
    return (
        <div className="flex w-full lg:w-1/2 h-screen order-2 relative" >
            <div className="absolute top-8 left-8">
                <Link to={AUTH_ROUTES_PATH.passwordResetRequest} replace className="flex items-center gap-2 text-sm
                         text-[#5c4a3d] hover:text-[#2C2118] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                        <ArrowLeft />
                    </span>
                </Link>
            </div>

            <div className="flex-grow flex items-center justify-center p-4">
                <div className=" rounded-3xl p-10 md:p-12 w-full max-w-md  border border-white">
                    <div className="flex justify-center items-center ">
                        <Logo />
                    </div>

                    <h1 className="text-[24px] font-bold text-[#4a2e1b] mb-3 text-center">
                        Verify Your Identity
                    </h1>
                    <p className="font-body-md text-[14px] text-body-md mb-5 text-on-surface-variant leading-relaxed">
                        Enter the 6-digit code sent to your email to reset your password.
                    </p>
                    <VerifyResetPasswordTokenForm />
                </div>
            </div>

        </div>
    );
};
```

## File: src/features/auth/components/ResetPasswordForm.tsx
```typescript
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AUTH_ROUTE_BUILDER } from '@/app/router/routes.path';

import { authService } from '../service/authService';

import { passswordForgetEmailPageType, passwordForgetEmailPageSchema } from '../types/email.forget.password.types';

import { formatFormHookErrors } from '@/shared/utils/format.formhook.errors';

import { Button } from '@/shared/components/Button.component';
import { Input } from '@/shared/components/Input';
import { DialogComponent } from '@/shared/components/DialogComponent.message';
import { showSuccess } from '@/shared/utils/toast.global';

export function ResetPasswordEmailForm() {
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
        clearErrors } = useForm<passswordForgetEmailPageType>(
            { resolver: zodResolver(passwordForgetEmailPageSchema), mode: "onSubmit" }
        );

    const submitEmail = async (data: passswordForgetEmailPageType) => {
        try {
            const { payload: { sessionId } } = await authService.requestPasswordResetEmailSender(data.email);
            showSuccess("OTP sent. Check your email.");
            navigate(AUTH_ROUTE_BUILDER.passwordResetVerify(sessionId));

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) return formatFormHookErrors(error, setError);

                return setError("root", {
                    message: "Connection temporary delayed. Please check your network and try again shortly.",
                });
            }

            if (error.request) return setError("root", {
                message: "Server is currently busy or unreachable. Please check your connection and try again.",
            });
        }
    };

    return (
        <>
            <form className="space-y-5" onSubmit={handleSubmit(submitEmail)}>
                <Input
                    label="Email"
                    type="text"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Button
                    ButtonType="submit"
                    disabled={isSubmitting}>
                    Send Reset Token
                </Button>
            </form>

            {errors.root &&
                <DialogComponent title={errors.root?.message?.includes("attempts") ?
                    "Too Many Attempts" : "Request Could Not Be Completed"}
                    description={errors.root.message}
                    open={!!errors.root}
                    onclose={() => clearErrors("root")}
                />
            }
        </>
    );
};
```

## File: src/features/auth/components/Signup.tsx
```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { SignupForm } from './SignupForm';
import { Logo } from '@/shared/components/Logo';
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';

export const SignupComponent: React.FC = () => {
  return (
    <div className="flex w-full lg:w-1/2 h-screen order-2 bg-white">

      <div className={`w-full h-full shrink-0 flex flex-col px-10 md:px-16 lg:px-20 py-10 overflow-y-auto bg-white 
          order-1 overflow-y-auto scrollbar-hide`}>

        <Logo />
        <div className="flex justify-center flex-col grow">
          <div className="mb-8 mt-10">
            <h1
              className="text-[36px] font-bold text-[#1a1a1a] leading-tight mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Create account
            </h1>
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Join our community of intentional readers.
            </p>
          </div>

          <SignupForm />

          <div className="flex items-center  my-2 text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
            <span className="px-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Or</span>
          </div>
          <p
            className="mt-2 text-center text-sm text-gray-500 mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Already have an account?{' '}
            <Link
              className="font-semibold text-[#8b5e3c] hover:underline"
              to={AUTH_ROUTES_PATH.login}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
```

## File: src/features/auth/components/SignupForm.tsx
```typescript
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/components/Button.component';
import { Input } from '@/shared/components/Input';
import { SearchableSelect } from "@/shared/components/select.options";
import { DialogComponent } from '@/shared/components/DialogComponent.message';
import { showToast } from '@/shared/utils/toast.global';

import { signUpFeildsValidationSchema, signUpFieldsValidationTypes } from '../types/signup.account.types';

import { formatFormHookErrors } from '@/shared/utils/format.formhook.errors';
import { AUTH_ROUTES_PATH } from '@/app/router/routes.path';
import { useCities, useCountries } from '@/quries/locations.query';

import { authService } from '@/features/auth/service/authService';

export function SignupForm() {
  const navigate = useNavigate();

  const { register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError, clearErrors } = useForm<signUpFieldsValidationTypes>({
      resolver: zodResolver(signUpFeildsValidationSchema),
      mode: "onBlur"
    });


  const { data: countries } = useCountries();

  const selectedCountryId = useWatch({ control, name: "country" });
  const { data: cities = [] } = useCities(selectedCountryId || "");


  const onSubmit = async (data: signUpFieldsValidationTypes) => {
    try {
      await authService.signup(data);

      showToast("Please verify your account to continue.");
      navigate(AUTH_ROUTES_PATH.verification);

    } catch (error: any) {

      if (axios.isAxiosError(error)) {
        if (error.response) return formatFormHookErrors(error, setError);

        return setError("root", {
          message: "Connection temporary delayed. Please check your network and try again shortly.",
        });
      }

      if (error.request) return setError("root", {
        message: "Server is currently busy or unreachable. Please check your connection and try again.",
      });

    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Full Name"
        id="name"
        placeholder="Enter the name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email Address"
        id="email"
        placeholder="Enter the email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
            htmlFor="country"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Country
          </label>

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                ref={field.ref}
                items={countries ?? []}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select Country"
                error={errors.country?.message}
              />
            )}
          />

          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
            htmlFor="city"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            City
          </label>

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                ref={field.ref}
                items={cities ?? []}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select City"
                error={errors.city?.message}
              />
            )}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Password"
          id="password"
          isPassword={true}
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirm"
          id="confirmPassword"
          isPassword={true}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <Button ButtonType="submit" disabled={isSubmitting}>
        Sign up
      </Button>

      {errors.root &&
        <DialogComponent title={errors.root?.message?.includes("attempts")
          || errors.root?.message?.includes("requests")
          ? "System Busy" : "Request Could Not Be Completed"}

          description={errors.root.message}
          open={!!errors.root}
          onclose={() => clearErrors("root")}
        />
      }
    </form>
  );
};
```

## File: src/features/auth/components/Update.password.form.tsx
```typescript
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../service/authService";
import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";

import { ResetUpdatePasswordFormDataType, resetUpdatePasswordSchema } from "../types/email.forget.password.types";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button.component";
import { DialogComponent } from "@/shared/components/DialogComponent.message";
import { showError } from "@/shared/utils/toast.global";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function SetNewPasswordAfterOTPVerificationForm() {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
        clearErrors,
    } = useForm<ResetUpdatePasswordFormDataType>({
        resolver: zodResolver(resetUpdatePasswordSchema),
        defaultValues: { "sessionId": sessionId }
    });


    const onSubmit = async (data: ResetUpdatePasswordFormDataType) => {
        try {
            await authService.updatePasswordCOnfirm(data);
            navigate("/login");

        } catch (error: any) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 404) {
                    showError("Session expired. Please request a new verification email.");
                    navigate(AUTH_ROUTES_PATH.passwordResetRequest);
                    return;
                }
                if (error.response) return formatFormHookErrors(error, setError);

                return setError("root", {
                    message: "Connection temporary delayed. Please check your network and try again shortly.",
                });
            }

            if (error.request) return setError("root", {
                message: "Server is currently busy or unreachable. Please check your connection and try again.",
            });
        }
    };


    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex order-2 flex-col">

                <div className="mb-5">

                    <Input
                        label="New password"
                        placeholder="Enter password"
                        error={errors.password?.message}
                        isPassword={true}
                        {...register("password")}
                    />
                </div>

                <Input
                    label="Confirm password"
                    placeholder="Enter confirm password"
                    error={errors.confirmPassword?.message}
                    isPassword={true}
                    {...register("confirmPassword")}
                />

                <Button ButtonType="submit" disabled={isSubmitting}>
                    Update Password
                </Button>
            </form>
            {errors.root &&
                <DialogComponent
                    title="Unable to update password"
                    description={errors?.root.message}
                    open={!!errors?.root.message}
                    onclose={() => clearErrors("root")}
                />
            }
        </>
    );
}
```

## File: src/features/auth/components/Update.password.tsx
```typescript
import { Logo } from "@/shared/components/Logo";
import { SetNewPasswordAfterOTPVerificationForm } from "./Update.password.form";

export function SetNewPasswordAfterOTPVerification() {

    return (<>
        <div className="flex w-full lg:w-1/2 h-screen order-2 relative" >

            <div className="grow flex items-center justify-center p-4">

                <div className=" rounded-3xl p-10 md:p-12 w-full max-w-md  border border-white">
                    <div className="flex justify-center items-center ">
                        <Logo />
                    </div>

                    <h1 className="text-[24px] font-bold text-[#4a2e1b] mb-3 text-center">
                        Set a new password
                    </h1>
                    <p className="font-body-md text-[14px] text-body-md mb-5 text-on-surface-variant leading-relaxed">
                        Use at least 8 characters with a mix of letters, numbers, and symbols for better security.
                    </p>

                    <SetNewPasswordAfterOTPVerificationForm />
                </div >
            </div>
        </div>
    </>);
};
```

## File: src/features/auth/components/Verify.opt.credentail.tsx
```typescript
import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { VerifyOtpForm } from '../components/VerifyOtpForm';
import { Logo } from "@/shared/components/Logo";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

export function VerifyOtpPageCredentails() {

    return (
        <div className="flex w-full lg:w-1/2 h-screen order-2 relative" >
            <div className="absolute top-8 left-8">
                <Link to="/login" className="flex items-center gap-2 text-sm
                         text-[#5c4a3d] hover:text-[#2C2118] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                        <ArrowLeft />
                    </span>
                </Link>
            </div>

            <div className="grow flex items-center justify-center p-4">

                <div className=" rounded-3xl p-10 md:p-12 w-full max-w-md  border border-white">
                    <div className="flex justify-center items-center ">
                        <Logo />
                    </div>

                    <h1 className="text-[24px] font-bold text-[#4a2e1b] mb-3 text-center">
                        Verify Your Identity
                    </h1>
                    <p className="font-body-md text-[14px] text-body-md mb-5 text-on-surface-variant leading-relaxed">
                        We've sent a 6-digit code to your email. Enter it below to continue.
                    </p>
                    <VerifyOtpForm />


                    <div className="flex items-center mt-5 my-2 text-xs text-gray-400 before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                        <span className="px-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Or</span>
                    </div>
                    <p className="text-sm text-center text-gray-500">
                        Changed your mind? <Link to={AUTH_ROUTES_PATH.login} className="text-black hover:underline font-medium">Return to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
```

## File: src/features/auth/components/VerifyOtpForm.tsx
```typescript
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../service/authService";

import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button.component";

import { optTypeVerifyAccount, otpSchemaVerifyAccount } from "../types/form.opt.verify.types";
import { DialogComponent } from "@/shared/components/DialogComponent.message";

import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";
import { showError, showLoading, showSuccess } from "@/shared/utils/toast.global";
import toast from "react-hot-toast";

const TIMER_KEY = "book_shelf_verify_opt_account";
const DURATION = 120;

export const VerifyOtpForm = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<number>(DURATION);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
    setError
  } = useForm<optTypeVerifyAccount>(
    {
      resolver: zodResolver(otpSchemaVerifyAccount),
      mode: "onChange"
    }
  );

  useEffect(() => {
    const updateTimer = () => {
      const start = localStorage.getItem(TIMER_KEY);

      if (!start) {
        setTimeLeft(0);
        return;
      }

      const elapsed = Math.floor(
        (Date.now() - Number(start)) / 1000
      );

      const remaining = DURATION - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);

        localStorage.removeItem(TIMER_KEY);

        return;
      }

      setTimeLeft(remaining);
    };

    if (!localStorage.getItem(TIMER_KEY)) {
      localStorage.setItem(
        TIMER_KEY,
        String(Date.now())
      );
    }

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const submitToken = async (data: optTypeVerifyAccount) => {
    // submit token
    try {
      await authService.verifyToken(data);

      localStorage.removeItem(TIMER_KEY);
      toast.dismissAll();
      showSuccess("Account verified.");

      navigate("/", { replace: true });

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 429) return setError("root", {
          message: err.response?.data?.errors[0].message
        });

        return formatFormHookErrors(err, setError);
      }
      setError("root", {
        message: "Something went wrong!"
      });
    }
  };

  const handleResendToken = async () => {
    // resend token
    try {

      await authService.resendToken();
      showLoading("Sending email...");

      localStorage.setItem(
        TIMER_KEY,
        String(Date.now())
      );

      setTimeout(() => {

        toast.dismissAll();
        showSuccess("Verification email sent.");
        setTimeLeft(DURATION);
      }, 3000);

    } catch {
      showError("Couldn’t send email. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitToken)}
      className="w-full space-y-4"
    >
      <Input
        label="Enter the Otp"
        placeholder="Enter OTP"
        {...register("token", { required: true })}
        isPassword={false}
        error={errors.token?.message}
      />

      <div className="flex justify-center items-center">
        <Button
          ButtonType="submit"
          disabled={isSubmitting}
        >
          Verify & Continue
        </Button>
      </div>

      {timeLeft > 0 ? (
        <p className="text-black black  text-[14px] text-center flex w-full justify-center items-end gap-1">
          Resend available in : {timeLeft}s
        </p>
      ) : (<button type="button" className="black cursor-pointer text-[14px] text-center
       flex w-full justify-center items-end gap-1">
        Click to re-send token?
        <p className="hover:underline" onClick={handleResendToken}>resend token</p>
      </button>
      )
      }

      {errors.root &&
        <DialogComponent
          title="Verfication Failed"
          description={errors?.root.message}
          open={!!errors?.root.message}
          onclose={() => clearErrors("root")}
        />
      }
    </form >
  );
};
```

## File: src/features/auth/hooks/useTimer.ts
```typescript
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "otp-expiry";

export const useTimer = (initialSeconds: number = 60) => {
  const getRemainingTime = () => {
    const expiry = localStorage.getItem(STORAGE_KEY);

    if (!expiry) return 0;

    const diff = Math.floor((Number(expiry) - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  };

  const [timeLeft, setTimeLeft] = useState<number>(getRemainingTime);

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = prev - 1;

        if (updated <= 0) {
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // start / resend OTP
  const startTimer = useCallback(() => {
    const expiryTime = Date.now() + initialSeconds * 1000;

    localStorage.setItem(STORAGE_KEY, String(expiryTime));
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  return {
    timeLeft,
    formattedTime,
    startTimer,
    isActive: timeLeft > 0,
  };
};
```

## File: src/features/auth/index.ts
```typescript
export { SignupPage } from './pages/SignupPage';
export { VerifySignOtpPage } from './pages/Verify.signup.otp';

export { LoginPage } from './pages/LoginPage';

export { ResetPasswordEmailPage } from './pages/Reset.password.email.page';
export { ResetPasswordVerifyTokenPage } from './pages/Reset.password.verify';
export { UpdatePasswordPage } from './pages/ResetPassword';
```

## File: src/features/auth/layout/Auth.sidebar.layout.tsx
```typescript
import { Outlet } from 'react-router-dom';
import signupIllustration from '../../../assets/images/sign-up side image.png';


export const AuthSidebarLayout = () => {
    return (
        <div className='flex flex-row h-[95vh]'>
            <div className={`hidden lg:flex lg:w-1/2 vh-100 md:block flex-1 relative order-1`}>
                <img
                    alt={signupIllustration}
                    className="  w-full h-full object-cover object-center rounded-4xl p-5"
                    src={signupIllustration}
                />
            </div>

            <Outlet />
        </div>
    );
};
```

## File: src/features/auth/pages/LoginPage.tsx
```typescript
import { LoginComponent } from "../components/login";

export const LoginPage = () => {
  return <LoginComponent />;
};
```

## File: src/features/auth/pages/Reset.password.email.page.tsx
```typescript
import { ResetPasswordEmailComponent } from '../components/Reset.password';

export function ResetPasswordEmailPage() {
    return <ResetPasswordEmailComponent />;
};
```

## File: src/features/auth/pages/Reset.password.verify.tsx
```typescript
import { VerifyResetPasswordToken } from "../components/Reset.password.verify";

export function ResetPasswordVerifyTokenPage() {
    return <VerifyResetPasswordToken />;
}
```

## File: src/features/auth/pages/ResetPassword.tsx
```typescript
import { SetNewPasswordAfterOTPVerification } from "../components/Update.password";

export function UpdatePasswordPage() {
    return <SetNewPasswordAfterOTPVerification />;
}
```

## File: src/features/auth/pages/SignupPage.tsx
```typescript
import { SignupComponent } from "../components/Signup";

export const SignupPage = () => {
  return (
    <SignupComponent />
  );
};
```

## File: src/features/auth/pages/Verify.signup.otp.tsx
```typescript
import { VerifyOtpPageCredentails } from "../components/Verify.opt.credentail";

export function VerifySignOtpPage() {
  return <VerifyOtpPageCredentails />;
};
```

## File: src/features/auth/routes/Auth.gaurd.update.password.tsx
```typescript
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

import { showError } from "@/shared/utils/toast.global";

import { authService } from "../service/authService";

import Loader from "@/shared/components/loaders/Loader";
import { AlertDialogComponent } from "@/shared/components/Alert.dialog.message";

export function AuthGaurdUpdatePasswordSessionPage({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const { sessionId } = useParams();

    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

    useEffect(() => {
        if (!sessionId) {
            navigate(AUTH_ROUTES_PATH.passwordResetRequest);
            return;
        };

        const checkPageValidate = async () => {
            try {
                await authService.requestPasswordConfirmGuard(sessionId);
                setStatus("success");
            } catch {
                showError("This link is invalid or has expired.");
                setStatus("error");
            }
        };
        checkPageValidate();
    });

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center w-full h-screen order-2">
                <Loader />
            </div>
        );
    }

    if (status === "error") {
        return <AlertDialogComponent
            title="Session Expired or Invalid"
            description="To continue resetting your password, please request a new reset link."
            open={true}
            redirectTo={AUTH_ROUTES_PATH.passwordResetRequest}
            actionLabel={"Request new Link"}
        />;
    }

    return children;
};
```

## File: src/features/auth/routes/Auth.guard.tsx
```typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "@/shared/components/loaders/Loader";
import { AlertDialogComponent } from "@/shared/components/Alert.dialog.message";
import { authService } from "../service/authService";

export function AuthGuardOTPVerifyCredientails(
    { children }: { children: React.ReactNode }) {

    const navigate = useNavigate();

    const [isloading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        const checkPageValidate = async () => {
            try {
                await authService.guardVerifyToken();
                setLoading(false);
            } catch {
                setLoading(false);
                setError(true);
            }
        };
        checkPageValidate();
    }, [navigate]);

    if (isloading) {
        return (
            <div className="flex justify-center items-center w-full h-screen order-2">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <AlertDialogComponent
                    title="Access Denied"
                    description="This verification link is invalid or has expired.
                     Please return to the login page to authenticate."
                    open={true}
                />
            </>
        );
    }


    return children;
};
```

## File: src/features/auth/routes/Auth.reset.session.guard.tsx
```typescript
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import Loader from "@/shared/components/loaders/Loader";
import { showError } from "@/shared/utils/toast.global";
import { authService } from "../service/authService";
import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";
import { AlertDialogComponent } from "@/shared/components/Alert.dialog.message";

export function AuthGaurdResetSessionPage({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const { sessionId } = useParams();

    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

    useEffect(() => {
        if (!sessionId) {
            navigate(AUTH_ROUTES_PATH.passwordResetRequest);
            return;
        }

        const checkPageValidate = async () => {
            try {
                const response = await authService.requestPasswordVerifyGuard(sessionId);
                console.log(response);

                setStatus("success");
            } catch {
                setStatus("error");
                showError("This link is invalid or has expired.");
            }
        };
        checkPageValidate();
    });

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center w-full h-screen order-2">
                <Loader />
            </div>
        );
    }

    if (status === "error") {
        return <AlertDialogComponent
            title="Session Expired or Invalid"
            description="To continue resetting your password, please request a new reset link."
            open={true}
            redirectTo={AUTH_ROUTES_PATH.passwordResetRequest}
            actionLabel={"Request new Link"}
        />;
    }

    return children;
};
```

## File: src/features/auth/service/authService.ts
```typescript
import { api } from "@/services/apiClient";

import { signUpFieldsValidationTypes } from "../types/signup.account.types";
import { optTypeVerifyAccount } from '../types/form.opt.verify.types';
import type { LoginCredentials } from '../types/index.types';
import { ResetUpdatePasswordFormDataType } from '../types/email.forget.password.types';

const endpoints = {
  // auth
  signup: '/auth/signup',
  verifyToken: '/auth/verify-token',
  gaurdVerifyToken: "/auth/verify-token",
  resendToken: '/auth/resend-token',
  login: '/auth/login',

  // auth password forget
  passwordResetRequestEmail: '/auth/password-reset/request',
  passwordResetVerify: "/auth/password-reset/opt-verify/",
  passwordResetConfirm: "/auth/password-reset/password/",

};

export const authService = {
  signup: async (data: signUpFieldsValidationTypes) => {
    const response = await api.post(endpoints.signup, data);
    return response.data;
  },

  verifyToken: async (data: optTypeVerifyAccount) => {
    const response = await api.post(endpoints.verifyToken, data);
    return response.data;
  },

  guardVerifyToken: async () => {
    return await api.get(endpoints.gaurdVerifyToken);
  },

  resendToken: async () => {
    const response = await api.get(endpoints.resendToken);
    return response.data;
  },

  login: async (credentials: LoginCredentials) => {
    const response = await api.post(endpoints.login, credentials);
    return response.data;
  },

  // reset password Authentication Service
  requestPasswordResetEmailSender: async (email: string) => {
    const response = await api.post(endpoints.passwordResetRequestEmail, { email });
    return response.data;
  },

  requestPasswordVerifyGuard: async (sessionId: string) => {
    const response = await api.get(endpoints.passwordResetVerify + sessionId);
    return response.data;
  },

  requestPasswordVerify: async (sessionId: string, token: string) => {
    const response = await api.post(endpoints.passwordResetVerify + sessionId, { token });
    return response.data;
  },

  requestPasswordTokenResend: async (sessionId: string) => {
    const response = await api.patch(endpoints.passwordResetVerify + sessionId);
    return response.data;
  },

  requestPasswordConfirmGuard: async (sessionId: string) => {
    const response = await api.get(endpoints.passwordResetConfirm + sessionId);
    return response.data;
  },

  updatePasswordCOnfirm: async (data: ResetUpdatePasswordFormDataType) => {
    const response = await api.patch(endpoints.passwordResetConfirm, data);
    return response.data;
  }
};
```

## File: src/features/auth/types/email.forget.password.types.ts
```typescript
import z from "zod";

export const passwordForgetEmailPageSchema = z.object({
    email: z.string().trim().min(1, "Email is required")
        .email("Email format is invalid")
});

export type passswordForgetEmailPageType = z.infer<typeof passwordForgetEmailPageSchema>;

export const resetUpdatePasswordSchema = z
    .object({
        sessionId: z.string()
            .uuid({ message: "Invalid or expired session link. Please request a new one." }),
        password: z.string()
            .trim()
            .min(1, "Password cannot be empty")
            .min(8, "Minimum 8 characters")
            .regex(/[A-Za-z]/, "Must include letters")
            .regex(/\d/, "Must include numbers"),
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesnot match",
        path: ["confirmPassword"],
    });

export type ResetUpdatePasswordFormDataType = z.infer<typeof resetUpdatePasswordSchema>;
```

## File: src/features/auth/types/form.opt.verify.types.ts
```typescript
import z from "zod";

export const otpSchemaVerifyAccount = z.object({
    token: z
        .string()
        .min(6, "OTP must be 6 digits")
        .max(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type optTypeVerifyAccount = z.infer<typeof otpSchemaVerifyAccount>;
```

## File: src/features/auth/types/index.types.ts
```typescript
export interface LoginCredentials {
  email?: string;
  password?: string;
}
```

## File: src/features/auth/types/locations.types.ts
```typescript
export interface countryDatatype {
    id: number,
    name: string,
    phoneCode: string,
    flagUrl: string
}

export interface cityDatatype {
    id: number,
    name: string
}
```

## File: src/features/auth/types/login.form.types.ts
```typescript
import z from "zod";

export const loginFormSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
    password: z.string().trim().min(1, "Password is required"),
    remember: z.boolean().optional()
});

export type loginFormType = z.infer<typeof loginFormSchema>;
```

## File: src/features/auth/types/signup.account.types.ts
```typescript
import z from "zod";

export const signUpFeildsValidationSchema = z.object({
    name: z.string({
        invalid_type_error: "Name is required",
        required_error: "Name is required"
    })
        .trim()
        .min(1, "Name cannot be empty")
        .min(2, "Minimum 2 characters")
        .regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),

    email: z.string({
        invalid_type_error: "Email is required",
        required_error: "Email is required"
    })
        .trim()
        .min(1, "Email cannot be empty")
        .email("Invalid email format"),

    password: z.string({
        invalid_type_error: "Password is required",
        required_error: "Password is required"
    })
        .trim()
        .min(1, "Password cannot be empty")
        .min(8, "Minimum 8 characters")
        .regex(/[A-Za-z]/, "Must include letters")
        .regex(/\d/, "Must include numbers"),

    confirmPassword: z.string({
        invalid_type_error: "Confirm password is required",
        required_error: "Confirm password is required"
    })
        .trim()
        .min(1, "Confirm password cannot be empty")
        .min(8, "Minimum 8 characters"),

    country: z.string({
        invalid_type_error: "Country is required",
        required_error: "Country is required"
    })
        .trim()
        .min(1, "Country is required")
        .regex(/^\d+$/, "Only numbers are allowed"),

    city: z.string({
        invalid_type_error: "City is required",
        required_error: "City is required"
    })
        .trim()
        .min(1, "City is required")
        .regex(/^\d+$/, "Only numbers are allowed")

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnot match",
    path: ["confirmPassword"]
});


export type signUpFieldsValidationTypes = z.infer<typeof signUpFeildsValidationSchema>;
```

## File: src/features/home/components/BridgingEras.tsx
```typescript
import React from 'react';
import bridgingImg from '../../../assets/tab over book.jpg';

const BridgingEras: React.FC = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
          <img alt="Bridging Eras" className="w-full h-full object-cover" src={bridgingImg}/>
        </div>
        <div className="max-w-md text-center md:text-left order-1 md:order-2 mx-auto md:mx-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Bridging Eras.</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Trade your physical library for digital credits, or find a new home for your pre-loved favorites. We believe every book deserves to be read, whether illuminated by a bedside lamp or a backlit screen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-mahogany text-white px-8 py-3 rounded-custom text-sm font-bold tracking-widest uppercase hover:bg-mahogany-dark transition-colors">
              Start a Trade
            </button>
            <button className="border border-mahogany text-mahogany px-8 py-3 rounded-custom text-sm font-bold tracking-widest uppercase hover:bg-mahogany-dark hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgingEras;
```

## File: src/features/home/components/Footer.tsx
```typescript
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mahogany text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold italic mb-8">Bookshelf</h3>
        <nav className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest mb-12">
          <a className="hover:text-accent-gold transition-colors" href="#">About Us</a>
          <a className="hover:text-accent-gold transition-colors" href="#">Shipping Policy</a>
          <a className="hover:text-accent-gold transition-colors" href="#">Privacy</a>
          <a className="hover:text-accent-gold transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-accent-gold transition-colors" href="#">Contact</a>
          <a className="hover:text-accent-gold transition-colors" href="#">FAQ</a>
        </nav>
        <p className="text-xs text-white/50">
          © 2026 Bookshelf. Preserving the tactile history of every page.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
```

## File: src/features/home/components/hero.section.carousel.module.scss
```scss
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

.carouselMain {
    height: 100vh;
    width: 100%;
    padding: 0px 20px 0px 20px;

    @media screen and (max-width:991px) {
        height: 80vh;
    }

    @media screen and (min-width:0px) and (max-width:769px) {
        height: 100vh;
    }

    height: max-content;
}

.heroCarosusel {
    padding-top: 10rem;
    padding-bottom: 3rem;
    width: 100%;
}

.containerLarger {
    width: 100%;
    max-width: 100%;
    height: max-content;
    margin: auto;
    display: flex;
    // justify-content: center;
    // align-items: center;
    flex-direction: column;
    gap: 20px;
}

.containerLargerChild {
    position: relative;
    will-change: transform;
}

.heroSectionHeading {
    font-size: 6rem;
    font-weight: 100;
    font-family: "Anton", sans-serif;

    @media (max-width:620px) {
        font-size: 3rem
    }

    @media (max-width:820px) {
        font-size: 4rem;
    }
}

.swiperCarsouelShadow {
    z-index: 4;
    background-image: linear-gradient(270deg, #09080a00, #09080a 66%);
    width: 12.375rem;
    min-height: 27.3rem;
    position: absolute;
}

.swiperRightShadow {
    // bottom: 0px;
    background: linear-gradient(90deg, #000000 34%, #09080a00);
    left: -20px;
    top: -2px;

    @media (max-width:620px) {
        left: -80px;
    }
}

.swiperLeftShadow {
    // background-image: linear-gradient(270deg, #09080a 34%, #09080a00);
    top: -2px;
    right: -20px;
    background: linear-gradient(270deg, #000000 34%, #09080a00);

    @media (max-width:620px) {
        right: -80px;
    }
}

@keyframes spreadGap {
    0% {
        gap: 0px;
    }

    100% {
        gap: 65px;
    }
}

@keyframes spreadGapMobile {
    0% {
        gap: 0px;
    }

    100% {
        gap: 30px;
    }
}

.tractImages {
    gap: 0px;
    animation: spreadGap 1.2s ease forwards;
    animation-delay: 0.5s;

    @media screen and (max-width:620px) {
        animation: spreadGapMobile 1.2s ease forwards;
        animation-delay: 0.5s;
    }
}

.heroSectionRotate::before {
    content: "";
    position: absolute;
    top: -40px;
    left: 0%;
    width: 100%;
    height: 50px;
    background: black;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    z-index: 2;
}

.heroSectionRotate::after {
    content: "";
    position: absolute;
    left: 0%;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background: black;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
    z-index: 2;
}

.imageCarsuelWidth {
    width: 200px;

    @media screen and (max-width:620px) {
        width: 160px;
    }
}
```

## File: src/features/home/components/hero.section.carousel.tsx
```typescript
import { motion } from "motion/react";
import styles from "./hero.section.carousel.module.scss";
const imageModules = import.meta.glob(
    "../../../assets/hero.section.images/*.{jpg,jpeg,png,webp}",
    { eager: true, import: "default" }
);

import backgroundImage from "@/assets/hero.section.images/6839b92bb2e96fe02de52c8e_noise.avif";

const images = Object.values(imageModules) as string[];

export const Carousel = () => {
    const loopImages = [...images, ...images];

    return (
        <section className={`w-full bg-black overflow-hidden
        flex items-center ${styles.carouselMain}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className={`${styles.heroCarosusel}`}>
                <div className={`${styles.containerLarger}`}>

                    <h1 className={`text-white text-center mb-3.5
                         ${styles.heroSectionHeading}`}>Shelves of Distinction</h1>

                    <div className={`${styles.containerLargerChild} z-[1] ${styles.heroSectionRotate}`}>
                        <div className={`${styles.swiperCarsouelShadow} ${styles.swiperLeftShadow}`}></div>

                        <motion.div
                            className={`flex w-full h-full ${styles.tractImages}`}
                            animate={{ x: [0, "-50%"] }}
                            style={{ width: "max-content" }}
                            transition={{
                                duration: 40,
                                ease: "linear",
                                repeat: Infinity,
                                delay: 0.6
                            }}

                        >
                            {loopImages.map((src, index) => (
                                <div
                                    key={index}
                                    className={`flex-shrink-0 deadadeda overflow-hidden ${styles.imageCarsuelWidth}`}
                                >
                                    <img
                                        src={src}
                                        alt={`slide-${index}`}
                                        className="object-cover"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </motion.div>

                        <div className={`${styles.swiperCarsouelShadow} ${styles.swiperRightShadow}`}></div>
                    </div>

                    <p className="text-center text-red-800 relative z-3 ">
                        Where carefully chosen books shape refined thinking and timeless ideas.
                    </p>
                </div>
            </div>
        </section>
    );
};
```

## File: src/features/home/components/Hero.tsx
```typescript
import React from 'react';
import heroImg from '../../../assets/hero img.jpg';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[650px] overflow-hidden bg-surface" id="hero">
      {/* Background Image */}
      <img alt="Elegant Home Library" className="absolute inset-0 w-full h-full object-cover object-top opacity-90" src={heroImg}/>
      
      {/* Gradient Overlays for Blending */}
      {/* Dark overlay for text readability at the top/middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
      
      {/* Surface color gradient at the bottom to blend with the next section */}
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white pb-16 pt-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl leading-tight drop-shadow-md">The Tactile Soul of Every Story.</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl font-light opacity-95 drop-shadow-sm">Explore a curated collection of rare pre-loved treasures and modern digital classics.</p>
        <button className="bg-mahogany hover:bg-mahogany-dark text-white px-10 py-3 rounded-custom text-sm font-bold tracking-widest transition-colors uppercase shadow-lg">
          Begin Exploring
        </button>
      </div>
    </section>
  );
};

export default Hero;
```

## File: src/features/home/components/NewArrivals.tsx
```typescript
import React from "react";
import type { Book } from "../types";
import gatsbyImg from "../../../assets/new arr 1.png";
import duneImg from "../../../assets/new arr 2.png";
import prideImg from "../../../assets/new arr 3.png";
import orwellImg from "../../../assets/new arr 4.png";

const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 4.5,
    reviewsCount: 1240,
    description:
      "A masterpiece of the Jazz Age, charting the rise and fall of the enigmatic Jay Gatsby...",
    price: 24.0,
    originalPrice: 32.0,
    image: gatsbyImg,
    badge: { text: "Used", type: "used" },
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    rating: 5.0,
    reviewsCount: 860,
    description:
      "The epic saga of political intrigue and mystical destiny set on the desert planet Arrakis.",
    price: 9.99,
    originalPrice: 16.99,
    image: duneImg,
    badge: { text: "Digital", type: "digital" },
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    rating: 4.8,
    reviewsCount: 3980,
    description:
      "A timeless comedy of manners, marriage, and money in 19th-century England.",
    price: 150.0,
    originalPrice: 200.0,
    image: prideImg,
    badge: { text: "First Edition", type: "first-edition" },
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    rating: 4.7,
    reviewsCount: 2300,
    description:
      "The definitive dystopian novel about totalitarianism and the power of the surveillance state.",
    price: 12.0,
    originalPrice: 16.0,
    image: orwellImg,
    badge: { text: "Used", type: "used" },
  },
];

const getBadgeClasses = (type: string) => {
  switch (type) {
    case "used":
      return "bg-mahogany/10 text-mahogany";
    case "digital":
      return "bg-red-100 text-red-800";
    case "first-edition":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const NewArrivals: React.FC = () => {
  return (
    <section className="py-12" style={{ backgroundColor: "#d8c2ad" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-mahogany text-center sm:text-left">
            New Arrivals
          </h2>
          <button className="border border-mahogany text-mahogany px-6 py-2 rounded-full font-bold text-xs hover:bg-mahogany hover:text-white transition-colors">
            View All Curations
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="product-card p-3 flex flex-col group h-full"
            >
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-md bg-surface-dim">
                <img
                  alt={book.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  src={book.image}
                />
                <span
                  className={`absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${getBadgeClasses(book.badge.type)}`}
                >
                  {book.badge.text}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-[10px] text-gray-600 mb-2">
                  by {book.author}
                </p>
                <div className="flex items-center gap-1 mb-3 text-accent-gold text-[10px]">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(book.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 ml-1">
                    {book.rating.toFixed(1)} •{" "}
                    {book.reviewsCount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                  {book.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-surface-dim pt-3">
                <div>
                  <span className="text-lg font-bold text-mahogany">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through ml-2">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                </div>
                <button className="bg-mahogany text-white px-4 py-1.5 rounded-custom text-[11px] font-bold hover:bg-mahogany-dark transition-colors">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
```

## File: src/features/home/components/SearchSection.tsx
```typescript
import React from 'react';

const SearchSection: React.FC = () => {
  return (
    <section className="py-24" style={{ backgroundColor: '#b27a5d' }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Find Your Next Chapter</h2>
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </div>
          <input className="w-full bg-white border-none rounded-lg py-4 pl-12 pr-6 text-mahogany placeholder-gray-400 shadow-lg focus:ring-2 focus:ring-mahogany" placeholder="Search by title, author, or ISBN..." type="text"/>
        </div>
        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {['Fiction', 'History', 'Philosophy', 'Science', 'Poetry'].map((category) => (
            <button key={category} className="bg-white/90 hover:bg-white text-mahogany px-5 py-2 rounded-full text-sm font-bold transition-colors">
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
```

## File: src/features/home/components/ShopByCategory.tsx
```typescript
import React from "react";
import type { Category } from "../types";
import animeImg from "../../../assets/cat-anime.jpg";
import businessImg from "../../../assets/cat-business.jpg";
import comedyImg from "../../../assets/cat-comedy.jpg";
import romanceImg from "../../../assets/cat romance.jpg";
import biographyImg from "../../../assets/cat-biography.png";
import historyImg from "../../../assets/cat-history.jpg";

const categories: Category[] = [
  {
    id: "1",
    name: "Anime",
    countText: "1500+ Manga",
    image: animeImg,
  },
  {
    id: "2",
    name: "Business",
    countText: "600+ Books",
    image: businessImg,
  },
  {
    id: "3",
    name: "Comedy",
    countText: "410+ Humor",
    image: comedyImg,
  },
  {
    id: "4",
    name: "Romance",
    countText: "800+ Novels",
    image: romanceImg,
  },
  {
    id: "5",
    name: "Biography",
    countText: "700+ Stories",
    image: biographyImg,
  },
  {
    id: "6",
    name: "History",
    countText: "500+ Titles",
    image: historyImg,
  },
];

const ShopByCategory: React.FC = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold">Shop by Category</h2>
          <a
            className="text-sm font-bold flex items-center gap-1 group"
            href="#"
          >
            View all categories
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card bg-surface-container-low p-6 text-center rounded-custom cursor-pointer"
            >
              <div className="h-32 mb-4 flex items-center justify-center">
                <img
                  alt={`${category.name} Category`}
                  className="max-h-full"
                  src={category.image}
                />
              </div>
              <h4 className="font-bold mb-1">{category.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-tighter">
                {category.countText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
```

## File: src/features/home/components/TrustBar.tsx
```typescript
import React from "react";
import type { Feature } from "../types";

const features: Feature[] = [
  {
    id: "1",
    title: "Curated Classics",
    description: "Hand-selected vintage treasures and modern masterpieces.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
    ),
  },
  {
    id: "2",
    title: "Sustainable Reading",
    description: "Give every book a second life and reduce waste.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    ),
  },
  {
    id: "3",
    title: "Global Rare Finds",
    description: "Access to a worldwide network of rare and used book seekers.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  },
  {
    id: "4",
    title: "Secure Exchange",
    description:
      "Safe, verified trades for your physical and digital libraries.",
    icon: (
      <svg
        className="w-6 h-6 text-mahogany"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
      </svg>
    ),
  },
];

const TrustBar: React.FC = () => {
  return (
    <section className="bg-surface py-24 border-b border-surface-dim">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4"
          >
            <div className="bg-surface-dim p-2 rounded-lg shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-600 hidden md:block">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
```

## File: src/features/home/pages/HomePage.tsx
```typescript
import { Header } from '@/shared/components/Header';
import TrustBar from '../components/TrustBar';
import ShopByCategory from '../components/ShopByCategory';
import NewArrivals from '../components/NewArrivals';
import BridgingEras from '../components/BridgingEras';
import SearchSection from '../components/SearchSection';
import Footer from '../components/Footer';

import { Carousel } from "../components/hero.section.carousel";

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />


      <main className="grow">
        <Carousel />
        <TrustBar />
        <ShopByCategory />
        <NewArrivals />
        <BridgingEras />
        <SearchSection />
      </main>
      <Footer />
    </div>
  );
};
```

## File: src/features/home/types.ts
```typescript
export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  reviewsCount: number;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: {
    text: string;
    type: 'used' | 'digital' | 'first-edition';
  };
}

export interface Category {
  id: string;
  name: string;
  countText: string;
  image: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
```

## File: src/features/listing/components/ActiveListings.tsx
```typescript
import { Button } from '../../../shared/components/Button/Button';
import libraryImg from '../../../assets/images/library.png'; // Mock image placeholder

const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 24.00,
    image: libraryImg,
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 9.99,
    image: libraryImg,
  },
  {
    id: '3',
    title: 'Pride & Prejudice',
    author: 'Jane Austen',
    price: 150.00,
    image: libraryImg,
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    price: 12.00,
    image: libraryImg,
  },
];

export const ActiveListings = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto mt-20 px-4 md:px-6 lg:px-10 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-on-surface mb-2">Your Listed Books</h1>
          <p className="text-on-surface-variant text-sm md:text-base">
            Manage your current listings, track conditions, and update prices.
          </p>
        </div>
        <Button
          variant="primary"
          className="rounded-full px-6 py-2.5 bg-[#3c1e16] hover:bg-[#2a150f] text-white flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          ADD NEW LISTING
        </Button>
      </div>

      <div className="bg-[#f2ece4] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-on-surface-variant">Type:</span>
          <div className="flex gap-2">
            <span className="bg-[#4b5545] text-white text-xs font-semibold px-4 py-1.5 rounded-full cursor-pointer">All Types</span>
            <span className="bg-surface text-on-surface-variant text-xs font-semibold px-4 py-1.5 rounded-full cursor-pointer hover:bg-surface-container">Physical</span>
            <span className="bg-surface text-on-surface-variant text-xs font-semibold px-4 py-1.5 rounded-full cursor-pointer hover:bg-surface-container">Digital</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-on-surface-variant">Sort By:</span>
          <select className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm text-on-surface outline-none cursor-pointer">
            <option>Recently Added</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_LISTINGS.map((book) => (
          <div key={book.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#f4ebd9] flex items-center justify-center p-6 relative">
              <img src={book.image} alt={book.title} className="max-w-full max-h-full object-contain drop-shadow-lg" />
            </div>
            <div className="p-5 flex flex-col h-full">
              <h3 className="font-playfair font-bold text-xl text-on-surface mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-on-surface-variant text-sm mb-4">{book.author}</p>
              
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-0.5">LIST PRICE</span>
                  <span className="font-serif font-bold text-2xl text-on-surface">${book.price.toFixed(2)}</span>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## File: src/features/listing/components/NoListings.tsx
```typescript
import { USER_ROUTES_PATH } from '@/app/router/routes.path';
import { BookCopy, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NoListings = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-20 px-4">

      <BookCopy size={50} />
      <h1 className="text-4xl font-playfair font-bold text-on-surface mb-2 mt-10 text-center">
        Begin Your Chapter
      </h1>
      <p className="text-on-surface-variant text-center max-w-[500px] mb-4">
        You haven’t listed any books for sale yet.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link to={USER_ROUTES_PATH.uploadBookToSell}
          className="pt-2 pb-2 pr-5 pl-5 border-black border rounded-2xl cursor-pointer transition-all duration-300 ease-out
      hover:bg-black hover:border-mahogany hover:text-white
      hover:shadow-[0_4px_20px_rgba(141,46,46,0.15)] /* Subtle brand glow */
      active:scale-98"
        >
          <span className="material-symbols-outlined text-[16px] flex gap-2">
            List you book <CirclePlus  />
          </span>
        </Link>
      </div>
    </div>
  );
};
```

## File: src/features/listing/index.ts
```typescript
export { ListingsPage } from './pages/ListingsPage';
```

## File: src/features/listing/pages/ListingsPage.tsx
```typescript
import { NoListings } from '../components/NoListings';
import { ActiveListings } from '../components/ActiveListings';
import { useState } from 'react';
import { Header } from '@/shared/components/Header';
// import { ThreeDotLoader } from '@/shared/components/loaders/Three.dot.loader';

export const ListingsPage = () => {
  const [hasListings, setHasListings] = useState(false);

  return (
    <>
      {/* <ThreeDotLoader /> */}

      <Header />
      <div className="flex flex-col h-[95vh]">
        <main className="flex-1">
          {hasListings ? <ActiveListings /> : <NoListings />}
        </main>

        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setHasListings(!hasListings)}
            className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-50 hover:opacity-100 transition-opacity"
          >
            Toggle Mock State (Currently: {hasListings ? 'Has Listings' : 'Empty'})
          </button>
        </div>

      </div>

    </>
  );
};
```

## File: src/features/sellUpload/components/add.book.form.tsx
```typescript
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";


// import { formatFormHookErrors } from "@/shared/utils/format.formhook.errors";

import { bookUploadValidationSchema } from "../types/upload.form.type";
import type { bookUploadValidationType } from "../types/upload.form.type";
import { imageStateType } from "../types/images.upload.type";
import { uploadAssetHelperProduct } from "../utils/upload.book.assets.helper";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Loader from "@/shared/components/loaders/Loader";

import { bookUploadService } from "../service/upload.book.service";
import { BookOldUploadMetaData } from "../quries/upload.book.metadata.query";
import { useCities } from "@/quries/locations.query";
import { SearchableSelect } from "@/shared/components/select.options";

export function BookUploadForm() {

  // ----------------- User Form MetaData  -----------------
  const { data } = BookOldUploadMetaData();

  const { data: cities = [] } = useCities(data?.payload?.locationPayload.countryId || "");

  // ----------------- Handle Images States -----------------
  const [images, setImages] = useState<imageStateType[]>([]);
  const [isuploading, setIsUploading] = useState<boolean>(false);

  // ----------------- Handle Images States -----------------
  const { register,
    handleSubmit,
    formState: { errors },
    setError, setValue, control } = useForm<bookUploadValidationType>({
      resolver: zodResolver(bookUploadValidationSchema)
    });

  // ----------------- Handle Form Submit -----------------
  const onSubmit = (data: bookUploadValidationType) => {
    console.log("Validated Form Data:", data);
  };

  // ----------------- Handle Images Upload -----------------
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    if ((images.length + fileList.length) > 12)
      return setError("root", { message: "You can upload a maximum of 12 files." });

    setIsUploading(true);

    const uploadingResult: boolean = await uploadAssetHelperProduct(fileList, setError, setImages);

    setValue("images", images, {
      shouldValidate: true
    });
    setIsUploading(uploadingResult);
  };

  // ----------------- Handle Images Remove States -----------------
  const handleRemoveImage = (public_id: string) => {
    setImages((pre) =>
      pre.filter((image) => image.public_id !== public_id)
    );
  };


  // ----------------- Default values use effect -------------------
  useEffect(() => {
    if (!data?.payload) return;

    setValue("country", data?.payload?.locationPayload.countryId.toString());
    setValue("city", data?.payload?.locationPayload?.cityId.toString());

  }, [data, setValue]);

  // ------------------ Form HTML -----------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">

      <div className="mb-8">
        <h2 className="text-3xl  text-[#2C2520] mb-2">List Your Pre-Loved Book</h2>
      </div>

      {/* listing the accordian */}
      <Accordion
        type="single"
        collapsible
        defaultValue="step-1"
        className="w-full gap-4 border-0"
      >
        {/* category accoridans */}
        <AccordionItem value="step-1" className="w-full">
          <AccordionTrigger className="w-full ">Select Category</AccordionTrigger >
          <AccordionContent className="">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Category</label>
              <select
                {...register("categoryId")}
                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#FCFDFD] focus:border-black outline-none transition text-sm text-black appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select a category...</option>
                <option value="History">History</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="Biography">Biography</option>
              </select>
              {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
            </div >
          </AccordionContent>
        </AccordionItem>

        {/* country accoridans */}
        <AccordionItem value="step-2" className="">
          <AccordionTrigger>Select your city</AccordionTrigger>
          <AccordionContent className="data-[state=open]:h-auto">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">City to sell</label>

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <SearchableSelect
                    ref={field.ref}
                    items={cities ?? []}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select City"
                    error={errors.city?.message}
                  />
                )}
              />

              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-3">
          <AccordionTrigger>Fill the book form</AccordionTrigger>
          <AccordionContent>
            <div className="h-auto space-y-5">
              <div className="flex items-center gap-4 mb-6">
                <label htmlFor="file-upload" className="text-xl font-semibold text-gray-800">Upload Images</label>
              </div>
              <label htmlFor="file-upload" className="group relative flex flex-col items-center justify-center w-full aspect-[4/3] max-h-[260px] border-2 border-dashed border-gray-300 rounded-3xl bg-gray-50/50 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer text-center p-6">
                <input
                  onChange={handleImageUpload}
                  id="file-upload"
                  type="file"
                  multiple
                  disabled={isuploading}
                  accept="image/*, vedio/*"
                  className=" hidden" />
                <div className="mb-4 text-gray-700 group-hover:scale-120 transition-transform duration-200 flex items-center justify-center">
                  <Upload />
                </div>
                <p className="text-gray-600 font-medium mb-4">Upload your image here</p>

                {isuploading ? <Loader /> :
                  <span className="transition-transform duration-200 px-5 py-1.5 bg-white border hover:scale-120 border-gray-200 text-sm font-medium text-gray-700 rounded-lg shadow-2xs group-hover:bg-gray-50 group-hover:border-gray-300 ">
                    Browse
                  </span>
                }
              </label>

              <div className="flex flex-wrap gap-2 w-full">
                {images.map((image) => (
                  <div
                    key={image.public_id}
                    className="relative w-23 h-23 shrink-0 rounded-xl overflow-hidden border border-gray-100 shadow-2xs group"
                  >
                    <img
                      src={image.secure_url}
                      alt="upload image"
                      className="w-full h-full object-cover"
                    />

                    {(image.isUploading) ?
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-10">
                        <Loader /></div> : <button
                          type="button"
                          onClick={() => handleRemoveImage(image.public_id)}
                          className="absolute top-2 right-1 bg-white text-gray-700 p-0.5 rounded-full shadow-xs hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center z-10"
                          aria-label={`Remove`}>
                        <X className="w-2.5 h-2.5 stroke-[2.5]" />
                      </button>
                    }
                  </div>
                ))}
              </div >


              {/* --- Book Title --- */}
              < div >
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g., The Great Gatsby"
                  {...register("title")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#FCFDFD] focus:border-black outline-none transition text-sm text-black"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors?.title.message}</p>}
              </div >

              {/* --- Simple Description --- */}
              < div >
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Description & Condition</label>
                <textarea
                  rows={5}
                  placeholder="Describe the book's history, condition, or any unique details here..."
                  {...register("description")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md bg-[#FCFDFD] focus:border-black outline-none transition text-sm resize-none text-black"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div >

              {/* --- Price --- */}
              < div >
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">Price</label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">$</span>
                  <input
                    type="text"
                    placeholder="0.00"
                    {...register("price")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-r-md bg-[#FCFDFD] focus:border-black outline-none transition text-sm text-black"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div >

              {/* --- Action Buttons --- */}
              < div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4" >
                <div className="flex gap-6">
                  <button type="button" className="text-sm font-bold tracking-wider uppercase text-gray-500 hover:text-black transition">Cancel</button>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#1C0D02] hover:bg-opacity-90 text-white font-medium px-8 py-3.5 rounded-md text-sm transition tracking-wide shadow-sm"
                >
                  PUBLISH LISTING
                </button>
              </div>
            </div >
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </form >
  );
};
```

## File: src/features/sellUpload/components/BookListingPage.tsx
```typescript
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { USER_ROUTES_PATH } from "@/app/router/routes.path";

import { BookUploadForm } from "./add.book.form";

export function BookListingPage() {
  return (
    <div className="min-h-screen py-10 px-4 font-sans antialiased text-[#1A1A1A]">

      {/* Top Header Area */}
      <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
        <Link
          to={USER_ROUTES_PATH.sell}
          className="flex items-center  text-sm font-medium hover:opacity-70 transition text-[#1A1A1A]"
        >
          <ArrowLeft />

        </Link>

        <h1 className="text-2xl font-semibold tracking-wide text-[#1A1A1A]">
          Upload Book
        </h1>
        <div></div>
      </div>

      <div className="max-w-3xl  mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8 sm:p-12">
        <BookUploadForm />
      </div>

    </div>
  );
};
```

## File: src/features/sellUpload/index.tsx
```typescript
export { BookListingPage } from "./components/BookListingPage";
```

## File: src/features/sellUpload/quries/upload.book.metadata.query.ts
```typescript
import { useQuery } from "@tanstack/react-query";
import { bookUploadService } from "../service/upload.book.service";

export const BookOldUploadMetaData = () => {
    return useQuery<any>({
        queryKey: ["upload-book-form-metadata"],
        queryFn: bookUploadService.getuploadBookFormMetaData
    });
};
```

## File: src/features/sellUpload/service/upload.book.service.ts
```typescript
import { api } from "@/services/apiClient";


const endpoints = {
    getbookUploadSignature: "/old-book/upload-signature",
    postAssetRecordSignature: "/old-book/upload-signature/queue",
    getUploadBookMetadata: "/old-book/add-book/metadata"
};

export const bookUploadService = {
    getUploadSignature: async () => {
        const response = await api.get(endpoints.getbookUploadSignature);
        return response.data;
    },

    uploadCloudinaryViaSignature: async (cloudName: string,
        formData: FormData,
        resourceType: string) => {
        const response = await api.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            formData,
            { withCredentials: false }
        );
        return response.data;
    },

    getuploadBookFormMetaData: async () => {
        const response = await api.get(endpoints.getUploadBookMetadata);
        return response.data;
    },

    createAssetRecordSignature: async (public_id: string,
        resource_type: string) => {

        await api.post(endpoints.postAssetRecordSignature, { public_id, resource_type });
    }
};
```

## File: src/features/sellUpload/types/images.upload.type.ts
```typescript
import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
    "image/jpeg", "image/jpg", "image/png", "image/webp",
    "video/mp4", "video/webm", "video/quicktime"
];

export const fileUploadValidation = z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE,
        { message: "File size must be under 10MB" })

    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type),
        { message: "Only standard images and MP4 videos are allowed." });


export type imageStateType = {
    public_id: string,
    secure_url: string,
    format: string,
    resource_type: "image" | "video",
    isUploading: boolean
}
```

## File: src/features/sellUpload/types/upload.form.type.ts
```typescript
import { z } from "zod";

const imageValidationSchema = z.object({
  // Image validation
  public_id: z.string({
    required_error: "Cloudinary Image ID is required"
  }).min(1),

  secure_url: z.string({
    required_error: "Image URL is required"
  }).url("Invalid image URL format"),

  format: z.string({
    required_error: "Image format is required"
  }).max(50, "Error in Format, Upload Again"),

  resource_type: z.enum(["image", "video"], {
    invalid_type_error: "Resource must be an image or video",
    required_error: "Resource type is required"
  }),

  isUploading: z.boolean().optional()
});


export const bookUploadValidationSchema = z.object({
  
  // Upload product form validation
  title: z.string({ required_error: "Title is requried" })
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(254, "Title must be 254 characters or fewer"),

  description: z.string()
    .trim()
    .min(10, "Minimum description of is required")
    .max(2000, "Description must be 2000 characters or fewer"),

  price: z.number({ required_error: "Price is required", invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than zero")
    .max(1000000, "Price exceeds maximum allowed value")
    .multipleOf(0.01, "Price cannot have more than 2 decimal places"),

  condition: z.enum(["new ", "good", "fair", "poor"],
    {
      errorMap: () => ({
        message: "Please select a valid book condition"
      })
    }),

  categoryId: z.string({ required_error: "Category is required" })
    .uuid("Invalid Category selection"),

  city: z.string({ required_error: "City id requried" })
    .uuid("Invalid City, Try again."),

  country: z.string({ required_error: "City id requried" })
    .uuid("Invalid Country, Try again."),


  customFields: z.record(z.any(), {
    required_error: "These fields are required"
  }),

  images: z.array(imageValidationSchema)
    .min(1, "You must upload one image of the book")
    .max(12, "You cannot upload more then 12 images")
    .refine(
      (image) => image.every((img) => img.isUploading !== true),
      { message: "Please wait for all images to finsh uploading!" })
});

export type bookUploadValidationType = z.infer<typeof bookUploadValidationSchema>;
```

## File: src/features/sellUpload/utils/upload.book.assets.helper.ts
```typescript
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetError } from "react-hook-form";

import { bookUploadService } from "../service/upload.book.service";

import { fileUploadValidation, imageStateType } from "../types/images.upload.type";
import { bookUploadValidationType } from "../types/upload.form.type";



export async function uploadAssetHelperProduct(fileList: File[],
    setError: UseFormSetError<bookUploadValidationType>,
    setImages: Dispatch<SetStateAction<imageStateType[]>>
): Promise<boolean> {

    for (const image of fileList) {
        // uploading images to cloud
        const validateImage = fileUploadValidation.safeParse(image);
        if (!validateImage.success) {
            setError("root", { message: validateImage.error.errors[0].message });
            return false;
        }

        const temparyIdImage = `temp_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
        const localPreviewURL = URL.createObjectURL(image);

        const [resourceType, resourceFormat] = image.type.split("/");

        if (resourceType !== "image" && resourceType !== "video") {
            setError("root", {
                message: "Only images and videos are allowed"
            });
            return false;
        }
        
        const placeHolderItem: imageStateType = {
            public_id: temparyIdImage,
            secure_url: localPreviewURL,
            isUploading: true,
            resource_type: resourceType,
            format: resourceFormat
        };


        setImages((pre) => [...pre, placeHolderItem]);

        try {
            const { payload } = await bookUploadService.getUploadSignature();
            const formData = new FormData();

            formData.append("file", image);
            formData.append("api_key", payload.apiKey);
            formData.append("timestamp", payload.timestamp);
            formData.append("signature", payload.signature);
            formData.append("folder", payload.folder);

            const uploadToCloudinaryResponse = await bookUploadService.
                uploadCloudinaryViaSignature(payload.cloudName, formData, resourceType);

            await bookUploadService.createAssetRecordSignature(uploadToCloudinaryResponse.public_id,
                uploadToCloudinaryResponse.resource_type);

            setImages((preImages) =>
                preImages.map((img) => img.public_id === temparyIdImage ?
                    {
                        public_id: uploadToCloudinaryResponse.public_id,
                        secure_url: uploadToCloudinaryResponse.secure_url,
                        format: uploadToCloudinaryResponse.format,
                        resource_type: uploadToCloudinaryResponse.resource_type,
                        isUploading: false
                    } : img)
            );

        } catch (error: any) {

            if (axios.isAxiosError(error)) {
                setError("root", {
                    message: "Connection temporary delayed. Please check your network and try again shortly.",
                });
                return false;
            }
            if (error.request)
                setError("root", {
                    message: "Server is currently busy or unreachable. Please check your connection and try again.",
                });
            return false;
        }

    };
    return true;
}
```

## File: src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@custom-variant dark (&:is(.dark *));


body {
  overflow-x: hidden;
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

@theme {
  --color-tertiary-container: #7c6442;
  --color-on-tertiary-container: #ffe4c1;
  --color-surface-container-low: #f6f3f2;
  --color-surface-container-high: #eae7e7;
  --color-surface-variant: #e5e2e1;
  --color-on-primary: #ffffff;
  --color-primary-container: #8b5e3c;
  --color-surface-container-lowest: #ffffff;
  --color-secondary: #5e5e5b;
  --color-on-error-container: #93000a;
  --color-error-container: #ffdad6;
  --color-on-tertiary: #ffffff;
  --color-surface-container-highest: #e5e2e1;
  --color-on-primary-container: #ffe3d1;
  --color-surface-bright: #fdf9ef;
  --color-on-secondary-fixed: #1b1c19;
  --color-secondary-container: #e1dfdb;
  --color-surface-container: #f0eded;
  --color-outline-variant: #d5c3b8;
  --color-tertiary: #624c2c;
  --color-on-secondary-container: #63635f;
  --color-primary-fixed: #ffdcc5;
  --color-surface: #fdf9ef;
  --color-on-primary-fixed-variant: #653d1e;
  --color-on-tertiary-fixed: #281801;
  --color-on-secondary-fixed-variant: #474744;
  --color-background: #fdf9ef;
  --color-inverse-surface: #313030;
  --color-on-secondary: #ffffff;
  --color-on-surface: #1c1b1b;
  --color-outline: #83746b;
  --color-secondary-fixed: #e4e2dd;
  --color-on-tertiary-fixed-variant: #584324;
  --color-inverse-on-surface: #f3f0ef;
  --color-secondary-fixed-dim: #c8c6c2;
  --color-on-surface-variant: #51443c;
  --color-surface-tint: #805533;
  --color-surface-dim: #dcd9d9;
  --color-on-primary-fixed: #301400;
  --color-inverse-primary: #f4bb92;
  --color-on-error: #ffffff;
  --color-primary-fixed-dim: #f4bb92;
  --color-error: #ba1a1a;
  --color-primary: #6f4627;
  --color-on-background: #1c1b1b;
  --color-mahogany: #4a1a14;
  --color-mahogany-dark: #3a140f;
  --color-accent-gold: #c5a059;
  --spacing-unit: 8px;
  --spacing-stack-lg: 32px;
  --spacing-container-max: 1280px;
  --spacing-margin-desktop: 64px;
  --spacing-stack-sm: 8px;
  --spacing-gutter: 24px;
  --spacing-margin-mobile: 20px;
  --spacing-stack-md: 16px;
  --font-label-sm: "Plus Jakarta Sans", sans-serif;
  --font-body-md: "Plus Jakarta Sans", sans-serif;
  --font-display-lg-mobile: "Playfair Display", serif;
  --font-title-lg: "Plus Jakarta Sans", sans-serif;
  --font-body-lg: "Plus Jakarta Sans", sans-serif;
  --font-label-md: "Plus Jakarta Sans", sans-serif;
  --font-display-lg: "Playfair Display", serif;
  --font-headline-md-mobile: "Playfair Display", serif;
  --font-headline-md: "Playfair Display", serif;
}

@layer utilities {
  .bg-glass {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
  }

  .shadow-ambient {
    box-shadow:
      0 10px 25px -5px rgba(139, 94, 60, 0.1),
      0 8px 10px -6px rgba(139, 94, 60, 0.1);
  }

  .shadow-ambient-lg {
    box-shadow:
      0 20px 25px -5px rgba(139, 94, 60, 0.15),
      0 10px 10px -5px rgba(139, 94, 60, 0.1);
  }

  .book-card {
    border: 1px solid #f9f7f2;
  }

  .material-symbols-outlined {
    font-variation-settings:
      "FILL" 0,
      "wght" 400,
      "GRAD" 0,
      "opsz" 24;
  }

  .walnut-border {
    border-color: rgba(106, 91, 91, 0.3);
  }
}

@layer base {
  body {
    min-height: 100vh;
    margin: 0;
    font-family: "Roboto", sans-serif !important;
    /* background-color: var(--color-surface); */
    color: var(--color-mahogany);
    @apply bg-background text-foreground;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 700;
  }

  * {
    @apply border-border outline-ring/50;
  }

  html {
    @apply font-sans;
  }
}

@layer utilities {
  .category-card {
    transition: transform 0.2s ease-in-out;
  }

  .category-card:hover {
    transform: translateY(-4px);
  }

  .product-card {
    background-color: #f7f3e9;
    border-radius: 8px;
  }

  .rounded-custom {
    border-radius: 8px;
  }
}

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: 'Geist Variable', sans-serif;
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@keyframes button-pop {
  0% {
    transform: scale(0.95);
  }

  40% {
    transform: scale(1.02);
    /* Over-shoots slightly for the spring bounce */
  }

  100% {
    transform: scale(1);
  }
}

.animate-btn-pop:active {
  transform: scale(0.99);
  transition: transform 0.05s ease-out;
  transition: transform 0.08s ease-out;
}

.animate-btn-pop {
  will-change: transform;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

::selection {
  background-color: #8D2E2E;
  color: #ffffff;
}

::-moz-selection {
  background-color: #8D2E2E;
  color: #ffffff;
}
```

## File: src/lib/queryClient.ts
```typescript
import { QueryClient } from "@tanstack/react-query";
import { experimental_createQueryPersister } from "@tanstack/query-persist-client-core";

const localStoragePersister = experimental_createQueryPersister({
    storage: window.localStorage,
    prefix: "bookshelf-cache",
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24,
            refetchOnWindowFocus: false,
            retry: 1,
            persister: localStoragePersister.persisterFn,
        },
    },
});
```

## File: src/lib/utils.ts
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## File: src/main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';

import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <App />

    </QueryClientProvider>
  </React.StrictMode>,
);
```

## File: src/quries/locations.query.ts
```typescript
import { useQuery } from "@tanstack/react-query";

import { locationService } from "@/services/locationService";
import { cityDatatype, countryDatatype } from "@/features/auth/types/locations.types";

export const useCountries = () => {
    return useQuery<countryDatatype[]>({
        queryKey: ["countries"],
        queryFn: locationService.getCountries,
    });
};

export const useCities = (countryId: string) => {
    return useQuery<cityDatatype[]>({
        queryKey: ["cities", countryId],
        queryFn: () => locationService.getCities(countryId),
        enabled: !!countryId
    });
};
```

## File: src/services/apiClient.ts
```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});
```

## File: src/services/locationService.ts
```typescript
import { api } from './apiClient';

const endpoints = {
  locations: {
    countries: '/seed/getCountry',
    cities: (countryId: string | number) => `/seed/getCity/${countryId}`,
  }
};

export const locationService = {
  getCountries: async () => {    
    const response = await api.get(endpoints.locations.countries);

    const data = response.data;

    return data?.payload ?? [];
  },

  getCities: async (countryId: string | number) => {
    const response = await api.get(endpoints.locations.cities(countryId));

    const data = response.data;
    return data?.payload ?? [];
  }
};
```

## File: src/shared/components/Alert.dialog.message.tsx
```typescript
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


interface dialogType {
    title: string;
    description: string | undefined;
    open: boolean;
    redirectTo?: string;
    actionLabel?: string;
}

export function AlertDialogComponent({
    title, description, open, redirectTo = "/login", actionLabel = "Login to continue"
}: dialogType) {
    return (
        <Dialog
            open={!!open}
        >
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="[&>button]:hidden"
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button type="button" className="cursor-pointer">
                        <Link className="w-full h-full text-center mt-2" to={redirectTo} replace>{actionLabel}</Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
```

## File: src/shared/components/BookCard/EBookCard.tsx
```typescript
interface EBookCardProps {
  title: string;
  author: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  hiddenOnMobile?: boolean;
  hiddenOnTablet?: boolean;
}

const EBookCard = ({ title, author, rating, reviewsCount, imageUrl, hiddenOnMobile, hiddenOnTablet }: EBookCardProps) => {
  return (
    <div className={`bg-surface-container-low rounded-xl p-4 shadow-ambient hover:shadow-ambient-lg transition-all duration-300 border border-outline-variant/30 ${hiddenOnMobile ? 'hidden md:block' : ''} ${hiddenOnTablet ? 'hidden lg:block' : ''}`}>
      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
        <img alt="E-book Cover" className="w-full h-full object-cover" src={imageUrl} />
      </div>
      <h3 className="font-title-lg text-body-md font-bold text-on-surface truncate">{title}</h3>
      <p className="font-body-md text-label-md text-on-surface-variant mb-2">{author}</p>
      <div className="flex items-center gap-1">
        <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        <span className="font-label-sm text-on-surface">{rating} <span className="text-on-surface-variant font-normal">({reviewsCount} reviews)</span></span>
      </div>
    </div>
  );
};

export default EBookCard;
```

## File: src/shared/components/BookCard/UsedBookCard.tsx
```typescript
interface UsedBookCardProps {
  title: string;
  condition: string;
  conditionClass: string;
  sellerRating: number;
  price: string;
  imageUrl: string;
}

const UsedBookCard = ({ title, condition, conditionClass, sellerRating, price, imageUrl }: UsedBookCardProps) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient border border-outline-variant/20 hover:-translate-y-1 transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img alt="Physical Book" className="w-full h-full object-cover" src={imageUrl} />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-title-lg text-body-md font-bold text-on-surface">{title}</h3>
          <span className={`${conditionClass} text-[10px] font-bold uppercase px-2 py-1 rounded`}>{condition}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
          <p className="font-label-sm text-on-surface-variant">Seller Rating: {sellerRating.toFixed(1)}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-title-lg text-primary">{price}</span>
          <button className="text-primary font-label-md hover:bg-primary/5 px-3 py-1 rounded-full border border-primary/20">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default UsedBookCard;
```

## File: src/shared/components/Button.component.tsx
```typescript
import { ReactNode, Ref } from "react";
import Loader from "./loaders/Loader";

interface buttonType {
    ButtonType: "submit" | "reset" | "button",
    disabled: boolean,
    children: ReactNode,
    ref?: Ref<HTMLButtonElement>
}

export function Button(
    { ButtonType, disabled, children, ref }: buttonType

) {
    return (
        <button
            ref={ref}
            type={ButtonType}
            disabled={disabled}
            className={`px-6 py-3
            bg-[#c4956a] text-white 
             rounded-xl text-sm
            animate-btn-pop
            shadow-sm active:shadow-inner
            font-medium text-sm py-3.5 rounded-xl transition-colors duration-200
            disabled:opacity-70 disabled:cursor-not-allowed
            mt-7  flex items-center w-full justify-center gap-2 cursor-pointer`}
        >
            {(disabled) ?
                <Loader /> : children}
        </button>
    );
}
```

## File: src/shared/components/Button/Button.tsx
```typescript
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "";
  
  const variants = {
    primary: "bg-[#2C2118] hover:bg-[#3d2e22] text-white",
    outline: "border border-[#e8d5c4] bg-white hover:bg-[#FFF9F5] text-gray-700 font-medium"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
```

## File: src/shared/components/DialogComponent.message.tsx
```typescript
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface dialogType {
    title: string,
    description: string | undefined,
    open: boolean,
    onclose: () => void
}

export function DialogComponent({ title, description, open, onclose }: dialogType) {
    return (
        <Dialog
            open={!!open}
            onOpenChange={(isOpen: boolean) => { if (!isOpen) onclose(); }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className="cursor-pointer" onClick={onclose}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
```

## File: src/shared/components/Header.tsx
```typescript
import { Link } from 'react-router-dom';


import {
  CreditCardIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  User,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenuModal } from './Menu.modal';


export function Header() {
  return (
    <div className="fixed top-6 left-0 right-0 z-10 flex justify-center px-4 pointer-events-none">
      <header className="bg-white pointer-events-auto rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-surface-dim px-6 py-3 w-full max-w-[1100px] flex items-center justify-between gap-6">
        <MenuModal />
        <div className="flex items-center gap-3 w-[170px] h-[50px] shrink-0">
          <h1
            style={{ fontFamily: "'Cinzel', serif", fontSize: "25px" }}
          >
            Book&Shelf
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex md:flex-1 max-w relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className='h-4 w-4' color='#9ca3af' />
          </div>
          <input
            className="w-full bg-transparent border border-surface-dim rounded-full py-2 pl-11 pr-4 text-[14px] text-gray-700 focus:outline-none focus:border-[var(--foreground)] placeholder-gray-400"
            placeholder="Search books, authors"
            type="text"
          />
        </div>


        <div className="flex items-center gap-5 shrink-0 text-gray-600 relative">
          <button className="hover:text-mahogany transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>

          <button className="hover:text-mahogany transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>

          <div className="relative">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" ><User /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"
                className="w-56 overflow-hidden text-[17px]"            >
                <Link to="/cart">
                  <DropdownMenuItem className='text-[17px]'>
                    <UserIcon />
                    Cart
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className='text-[17px]'>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className='text-[17px]'>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-[17px]' variant="destructive">
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header >
    </div >
  );
};
```

## File: src/shared/components/Input.tsx
```typescript
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
  ref: React.Ref<HTMLInputElement>
}

export function Input({ label, error, isPassword = false, ref, ...props }: InputProps) {

  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : "text";

  return (
    <div>
      <label
        className="block text-sm font-medium text-[#1a1a1a] mb-1.5"
        htmlFor={props.id}
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={ref}
          className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-[#e8d5c4]'
            } bg-[#FFF9F5] px-4 py-3 ${isPassword ? 'pr-12' : ''
            } text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#c4956a] focus:ring-2 focus:ring-[#c4956a]/20 transition-all`}
          type={inputType}
          {...props}
        />

        {isPassword && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            <span className="material-symbols-outlined w-3 h-3 text-[10px] cursor-pointe">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
```

## File: src/shared/components/Layout/Footer/Footer.tsx
```typescript
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8 bg-inverse-surface border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <span className="font-display-lg text-headline-md text-inverse-on-surface">BookShelf</span>
          <p className="font-body-md text-body-md text-surface-variant">© 2024 BookShelf Marketplace. Scholarly Excellence.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider mb-2">Company</h4>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">About</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Careers</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider mb-2">Legal</h4>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Privacy Policy</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Terms of Service</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-label-sm text-label-sm text-inverse-on-surface uppercase tracking-wider mb-2">Support</h4>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Help Center</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" to="#">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## File: src/shared/components/Layout/Navbar/Navbar.tsx
```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 h-[64px] flex items-center justify-between gap-4">

        {/* Left: Logo + Search */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img alt="BookShelf" className="h-[34px] w-auto" src={logo} />
          </Link>
          <div className="hidden lg:flex items-center bg-surface-container-lowest border border-outline-variant/60 rounded-full px-3 py-1.5 gap-2 w-44">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline w-full"
              placeholder="Search books, authors"
              type="text"
            />
          </div>
        </div>

        {/* Center: Nav Links — hidden below lg */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            className="text-sm font-semibold text-primary border-b-2 border-primary pb-0.5 transition-all duration-200"
            to="/"
          >Home</Link>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Browse</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Sell</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">E-Books</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Categories</a>
          <a className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">About</a>
        </div>

        {/* Right: Icons + Hamburger */}
        <div className="flex items-center gap-1 shrink-0">
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
            <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          </button>
          <Link to="/login">
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
              <span className="material-symbols-outlined text-[22px]">account_circle</span>
            </button>
          </Link>
          {/* Hamburger — only below lg */}
          <button
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 px-6 py-4 flex flex-col gap-1 shadow-lg">
          {/* Mobile Search */}
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant/60 rounded-full px-3 py-2 gap-2 mb-3">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
            <input
              className="bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-outline w-full"
              placeholder="Search books, authors"
              type="text"
            />
          </div>
          <Link
            className="text-sm font-semibold text-primary py-3 px-2 border-b border-outline-variant/20"
            to="/"
            onClick={() => setMobileOpen(false)}
          >Home</Link>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>Browse</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>Sell</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>E-Books</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 border-b border-outline-variant/20 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>Categories</a>
          <a className="text-sm text-on-surface-variant py-3 px-2 hover:text-primary" href="#" onClick={() => setMobileOpen(false)}>About</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
```

## File: src/shared/components/loaders/Loader.tsx
```typescript
function Loader() {
  return (
    <>
      <div className="animate-spin h-5 w-5 border-2 border-white-500 border-t-transparent rounded-full flex items-center justify-center"></div>
    </>
  );
}

export default Loader;
```

## File: src/shared/components/loaders/Three.dot.loader.module.css
```css
/* HTML: <div class="loader"></div> */
.loader {
    width: 40px;
    aspect-ratio: 4;
    --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
    background:
        var(--_g) 0% 50%,
        var(--_g) 50% 50%,
        var(--_g) 100% 50%;
    background-size: calc(100%/3) 100%;
    animation: l7 1s infinite linear;
}

@keyframes l7 {
    33% {
        background-size: calc(100%/3) 0%, calc(100%/3) 100%, calc(100%/3) 100%
    }

    50% {
        background-size: calc(100%/3) 100%, calc(100%/3) 0%, calc(100%/3) 100%
    }

    66% {
        background-size: calc(100%/3) 100%, calc(100%/3) 100%, calc(100%/3) 0%
    }
}
```

## File: src/shared/components/loaders/Three.dot.loader.tsx
```typescript
import styles from "./Three.dot.loader.module.css";

export function ThreeDotLoader() {
    return (
        <div className='flex flex-col justify-center items-center h-[95vh]'>
            <div className={`${styles.loader}`}></div>
        </div>
    );
}
```

## File: src/shared/components/Logo.tsx
```typescript
import { Link } from "react-router-dom";
import logo from '@/assets/images/logo.png';

export const Logo = () => {
    return (<Link to="/">
        <img
            alt="BookShelf"
            className="h-14 w-auto object-contain"
            src={logo}
        />
    </Link>);
};
```

## File: src/shared/components/Menu.modal.module.scss
```scss
.menuModalButton {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10;
    border: 1px solid black;
    border-radius: 30px;
    height: 55px;
    width: 55px;
}
```

## File: src/shared/components/Menu.modal.tsx
```typescript
import { NavLink } from "react-router-dom";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import styles from "./Menu.modal.module.scss";

export function MenuModal() {
    return (
        <div >
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className={`
                            relative group overflow-hidden
                            bg-white text-gray-800 font-medium
                            px-5 py-6 rounded-xl
                            border-2 border-b-4 border-gray-200 active:border-b-2
                            shadow-[0_4px_0_0_rgba(229,231,235,1)] active:shadow-none
                            transition-all duration-150 ease-out
                            hover:bg-gray-50 hover:-translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(229,231,235,1)] hover:border-b-[6px]
                            active:translate-y-[2px]
                            cursor-pointer 
                            flex items-center justify-center gap-2
                            ${styles.menuModalButton}
                        `}
                    >
                        <span className="relative z-10 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110">
                            <Menu className="w-5 h-5 text-gray-700  transition-colors" />
                        </span>
                    </Button>

                </SheetTrigger>
                <SheetContent side="right" className="w-full 
                sm:max-w-md border-none bg-white animate-t p-8 flex flex-col
                 justify-between h-full rounded-tl-2xl rounded-bl-2xl ">

                    <div>
                        <div className="flex justify-start gap-6 mb-12">
                            <SheetClose asChild>
                                <button className="w-12 h-12 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors focus:outline-none">
                                    <X className="w-5 h-5" />
                                </button>
                            </SheetClose>
                            <SheetTitle className="relative version-link w-fit transition-all duration-500 ease-out 
                        hover:text-mahogany group flex items-center">Menu</SheetTitle>
                        </div>

                        <nav
                            style={{ fontFamily: "'Cinzel', serif" }}
                            className="flex flex-col gap-6 text-[45px] leading-none text-gray-800 font-medium select-none"
                        >
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Browse', href: '/browse' },
                                { label: 'Sell', href: '/sell' },
                                { label: 'E-Books', href: '/ebooks' },
                                { label: 'Categories', href: '/categories' },
                                { label: 'About', href: '/about' },
                            ].map((link, index) => (
                                <NavLink
                                    key={index}
                                    to={link.href}
                                    className={({ isActive }) => `
                                    relative version-link w-fit flex items-center transition-all duration-500 ease-out select-none 
                                    active:scale-95 group
                                    ${isActive
                                            ? 'text-mahogany tracking-widest pl-4'
                                            : 'text-gray-400 hover:text-gray-800 hover:tracking-widest hover:pl-4'
                                        }
                                     `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span
                                                className={`
                                                    absolute left-0 top-1/2 -translate-y-1/2 bg-mahogany 
                                                    rounded-full aspect-square transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                                                    ${isActive
                                                        ? 'w-2 h-2 opacity-100 scale-100'
                                                        : 'w-2 h-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100' // Hidden by default, pops up nicely on hover
                                                    }
                                             `}
                                            />
                                            <span className="relative transition-transform duration-500 ease-out">
                                                {link.label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div >
    );
}
```

## File: src/shared/components/select.options.tsx
```typescript
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectItem {
    id: string | number;
    name: string;
    [key: string]: any;
}

interface SearchableSelectProps {
    items: SelectItem[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabledPlaceholder?: string;
    disabled?: boolean;
    error?: string;
    ref?: React.Ref<HTMLButtonElement>;
}

export const SearchableSelect = ({
    items,
    value,
    onChange,
    placeholder = "Select option...",
    disabledPlaceholder = "Disabled",
    disabled = false,
    error,
    ref,
}: SearchableSelectProps) => {
    
    const safeItems = items || [];

    const selectedItem = safeItems.find(
        (item) => item.id.toString() === value
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    ref={ref}
                    type="button"
                    disabled={disabled}
                    className={`flex w-full items-center justify-between rounded-[0.625rem] border 
          ${error ? 'border-red-500' : 'border-[#e8d5c4]'} 
          bg-[#FFF9F5] px-4 py-3 text-sm text-gray-800 transition-all 
          focus:outline-none focus:border-[#c4956a] focus:ring-2 focus:ring-[#c4956a]/20 
          disabled:opacity-50 text-left max-[400px]:text-[13px]`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {selectedItem
                        ? selectedItem.name
                        : (disabled ? disabledPlaceholder : placeholder)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0 dynamic-popover-width" align="start">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {safeItems.map((item) => (
                                <CommandItem
                                    className="cursor-pointer"
                                    key={item.id}
                                    value={item.name} 
                                    onSelect={() => {
                                        onChange(item.id.toString());
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4 cursor-pointer",
                                            value === item.id.toString() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
```

## File: src/shared/components/toaster.css
```css
/* ==================== TOASTER ANIMATIONS ==================== */

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

@keyframes slideOutDown {
    from {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }

    to {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }
}

/* ==================== TOASTER CONTAINER ==================== */

.react-hot-toast {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif;
    animation: slideInUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards !important;
}

.react-hot-toast.after-leave {
    animation: slideOutDown 0.3s ease-in forwards !important;
}

/* ==================== TOASTER POSITION ==================== */

div[role="status"] {
    min-height: auto;
}

/* ==================== CLOSE BUTTON STYLING ==================== */

.react-hot-toast button {
    margin-left: auto;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    min-width: 32px;
    min-height: 32px;
    color: inherit;
    opacity: 0.6;
    font-size: 18px;
    line-height: 1;
}

.react-hot-toast button:hover {
    background: rgba(0, 0, 0, 0.15);
    opacity: 1;
    transform: scale(1.05);
}

.react-hot-toast button:active {
    transform: scale(0.95);
}

/* ==================== SUCCESS TOAST ==================== */

.react-hot-toast-success {
    background: rgba(240, 253, 245, 0.85) !important;
}

.react-hot-toast-success button {
    background: rgba(16, 185, 129, 0.1);
    color: #065F46;
}

.react-hot-toast-success button:hover {
    background: rgba(16, 185, 129, 0.2);
}

/* ==================== ERROR TOAST ==================== */

.react-hot-toast-error {
    background: rgba(254, 242, 242, 0.85) !important;
}

.react-hot-toast-error button {
    background: rgba(239, 68, 68, 0.1);
    color: #7F1D1D;
}

.react-hot-toast-error button:hover {
    background: rgba(239, 68, 68, 0.2);
}

/* ==================== LOADING TOAST ==================== */

.react-hot-toast-loading {
    background: rgba(31, 41, 55, 0.92) !important;
}

.react-hot-toast-loading button {
    background: rgba(255, 255, 255, 0.1);
    color: #F3F4F6;
}

.react-hot-toast-loading button:hover {
    background: rgba(255, 255, 255, 0.15);
}

/* ==================== ICON ANIMATION ==================== */

.react-hot-toast svg {
    animation: pulse 2s ease-in-out infinite;
    opacity: 0.9;
}

/* ==================== RESPONSIVE DESIGN ==================== */

@media (max-width: 640px) {
    .react-hot-toast {
        min-width: 300px !important;
        max-width: 90vw !important;
    }

    .react-hot-toast button {
        min-width: 28px;
        min-height: 28px;
        font-size: 16px;
    }
}

/* ==================== ACCESSIBILITY ==================== */

.react-hot-toast:focus-visible {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
}

.react-hot-toast button:focus-visible {
    outline: 2px solid #3B82F6;
    outline-offset: 0;
}

/* ==================== BACKDROP IMPROVEMENT ==================== */

.react-hot-toast {
    backdrop-filter: blur(24px) !important;
    -webkit-backdrop-filter: blur(24px) !important;
}

/* ==================== TEXT RENDERING ==================== */

.react-hot-toast {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
}
```

## File: src/shared/components/Toaster.tsx
```typescript
import { Toaster } from "react-hot-toast";

export function ToasterPopup() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#f7f7f7",
                    color: "#2A241F",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    letterSpacing: "0.2px",
                    maxWidth: "360px",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    boxShadow: "0 18px 50px rgba(60, 40, 20, 0.10)",
                    border: "1px solid rgba(0,0,0,0.06)",
                },
                success: {
                    style: {
                        background: "#f7f7f7",
                        color: "#1A1A1A",
                        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
                    },
                    iconTheme: {
                        primary: "#22C55E",
                        secondary: "#FFFFFF",
                    },
                },
                error: {
                    style: {
                        background: "#f7f7f7",
                        color: "#1A1A1A",
                        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
                    },
                    iconTheme: {
                        primary: "#EF4444",
                        secondary: "#FFFFFF",
                    },
                },
                loading: {
                    style: {
                        background: "#f7f7f7",
                        color: "#black",
                        borderRadius: "16px",
                        padding: "14px 16px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                },
            }}
        />
    );
}
```

## File: src/shared/customHooks/toogle.eye.hook.ts
```typescript
import { useState } from "react";

export function useToogleEye(
    initialValue: boolean = false,
): [boolean, () => void] {

    const [value, setValue] = useState(initialValue);
    const toogle = () => setValue(!value);
    return [value, toogle];
}
```

## File: src/shared/utils/format.formhook.errors.ts
```typescript
import axios from "axios";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

type typeformError<T> = {
    field: Path<T>,
    message: string
}

export const formatFormHookErrors = <T extends FieldValues>(error: any,
    setError: UseFormSetError<T>) => {
        
    if (axios.isAxiosError(error)) {
        error.response?.data?.errors.forEach((e: typeformError<T>) => {
            setError(e.field, { message: e.message });
        });
    }
};
```

## File: src/shared/utils/global.error.axios.forms.ts
```typescript
// import axios from "axios";
// import { UseFormSetError } from "react-hook-form";
// import { NavigateFunction } from "react-router-dom";

// type HandleApiErrorProps = {
//     error: unknown;
//     navigate: NavigateFunction;
//     setError: UseFormSetError<any>;
// };

// export function handleApiError({
//     error,
//     setError,
//     navigate
// }: HandleApiErrorProps) {

//     if (!axios.isAxiosError(error)) {
//         setError("root", {
//             message: "Unexpected error occurred."
//         });
//         return;
//     }

//     const status = error.response?.status;
//     if (status === 401) {
//         showError("Session expired.");

//         navigate(
//             AUTH_ROUTES_PATH.passwordResetRequest
//         );
//         return;
//     }

//     if (status === 422) {
//         formatFormHookErrors(error, setError);
//         return;
//     }

//     if (!error.response) {
//         setError("root", {
//             message: "Network error."
//         });

//         return;
//     }

//     setError("root", {
//         message: "Something went wrong."
//     });
// }
```

## File: src/shared/utils/toast.global.ts
```typescript
import toast from "react-hot-toast";

export const showToast = (message: string) => {
    toast(message);
};

export const showSuccess = (message: string) => {
    toast.success(message);
};

export const showError = (message: string) => {
    toast.error(message);
};

export const showLoading = (message: string) => {
    return toast.loading(message, {
        duration: 2500
    });
};

export const dismissToast = (id: string) => {
    toast.dismiss(id);
};
``