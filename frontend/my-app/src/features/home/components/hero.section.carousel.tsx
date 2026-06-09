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
                </div>
            </div>
        </section>
    );
};