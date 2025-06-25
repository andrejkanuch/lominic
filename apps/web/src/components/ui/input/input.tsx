import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useFormField } from "../form";
import { ErrorMessage } from "./ErrorMessage";
import { HelperText } from "./HelperText";
import { InputProps } from "./types";
import { inputWrapperVariants } from "./variants";
import { X } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      type,
      size,
      icon,
      rightAddon,
      clearable,
      errorMessage,
      required,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    // Try to get form context, but don't fail if not available
    let resetField: ((name: string) => void) | undefined;
    let getFieldState: ((name: string) => any) | undefined;
    let name: string | undefined;
    let invalid = false;

    try {
      const formContext = useFormContext();
      resetField = formContext.resetField;
      getFieldState = formContext.getFieldState;

      const fieldContext = useFormField();
      name = fieldContext.name;
      invalid = getFieldState(name).invalid;
    } catch (error) {
      // Component is not within a form context, continue without form features
    }

    const handleClear = () => {
      if (resetField && name) {
        resetField(name);
      }
    };

    return (
      <div>
        <div
          className={cn(
            "flex items-center overflow-hidden border rounded-md border-slate-200",
            "dark:border-slate-600 dark:focus-within:border-streamBlue",
            "focus-within:border-streamBlue bg-white",
            invalid &&
              "border-streamRed focus-within:border-streamRed dark:focus-within:border-streamRed font-normal",
            inputWrapperVariants({ size })
          )}
        >
          {icon && (
            <div
              className={cn(
                "text-slate-500 ps-4 h-full flex items-center justify-center bg-slate-50 shrink-0",
                "dark:text-slate-400 dark:bg-slate-900",
                disabled && "bg-slate-100"
              )}
            >
              {icon}
            </div>
          )}
          <input
            formNoValidate
            value={value}
            type={type}
            disabled={disabled}
            className={cn(
              "text-base",
              "flex w-full h-full text-slate-900 px-4 py-2 placeholder:text-slate-400",
              "focus-visible:outline-none",
              "dark:text-white dark:bg-slate-900 dark:disabled:placeholder-slate-500 dark:disabled:text-slate-500 dark:placeholder:text-slate-500",
              "disabled:placeholder-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed input-autofill",
              disabled ? "bg-slate-100" : "bg-slate-50",
              icon && "ps-2.5",
              rightAddon && "pr-2.5",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightAddon && (
            <div
              className={cn(
                "text-slate-500 pr-4 h-full flex items-center justify-center bg-slate-50 shrink-0",
                "dark:text-slate-400 dark:bg-slate-900"
              )}
            >
              {rightAddon}
            </div>
          )}
          {clearable && value && (
            <div
              className={cn(
                "text-slate-500 pe-4 h-full flex items-center justify-center bg-slate-50 shrink-0",
                "dark:text-slate-400 dark:bg-slate-900"
              )}
            >
              <X
                onClick={handleClear}
                className="size-5 shrink-0 cursor-pointer text-slate-500 dark:text-slate-400"
              />
            </div>
          )}
        </div>
        {helperText && <HelperText helperText={helperText} />}
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
