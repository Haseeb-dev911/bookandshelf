import {
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[#1a1a1a]"
        >
          {label}
        </label>

        <textarea
          ref={ref}
          id={id}
          {...props}
          className={`w-full rounded-xl border bg-[#FFF9F5] px-4 py-3 text-sm text-gray-800 outline-none transition-all resize-none
            ${
              error
                ? "border-red-500"
                : "border-[#e8d5c4]"
            }
            focus:border-[#c4956a]
            focus:ring-2
            focus:ring-[#c4956a]/20`}
        />

        {error && (
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";