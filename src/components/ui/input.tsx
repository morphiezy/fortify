import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, ...props }, ref) => {
    const form = useFormContext();
    const error = form ? form.getFieldState(name!, form.formState).error : null;

    return (
      <div className="flex flex-col space-y-2.5 font-inter font-medium">
        {label ? (
          <label htmlFor={name}>
            <p className="text-sm text-silver">{label}</p>
          </label>
        ) : (
          false
        )}
        <div>
          <input
            type={type}
            autoComplete="off"
            className={cn(
              "w-full h-12 sm:h-14 bg-onyx rounded-xl sm:rounded-2xl p-3 sm:p-5 text-sm sm:text-base text-silver border duration-300 transition-all outline-none placeholder:text-[#535455] disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500 focus-visible:border-red-500"
                : "border-graphite focus-visible:border-sapphire",
              className,
            )}
            ref={ref}
            name={name}
            id={name}
            {...props}
          />
          {error?.message ? (
            <span className="text-xs text-red-500">{error.message}</span>
          ) : (
            false
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
