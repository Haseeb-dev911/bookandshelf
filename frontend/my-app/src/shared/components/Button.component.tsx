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