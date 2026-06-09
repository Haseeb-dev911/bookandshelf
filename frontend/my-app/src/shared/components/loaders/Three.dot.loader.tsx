import styles from "./Three.dot.loader.module.css";

export function ThreeDotLoader() {
    return (
        <div className='flex flex-col justify-center items-center h-[95vh]'>
            <div className={`${styles.loader}`}></div>
        </div>
    );
}