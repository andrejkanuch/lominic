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
            "flex items-center overflow-hidden border rounded-lg bg-white",
            "focus-within:ring-2 focus-within:ring-pulse-500 focus-within:border-transparent transition-all duration-300",
            invalid
              ? "border-red-500 focus-within:ring-red-500"
              : "border-gray-300",
            disabled && "bg-gray-100 cursor-not-allowed",
            inputWrapperVariants({ size })
          )}
        >
          {icon && (
            <div
              className={cn(
                "text-gray-500 ps-4 h-full flex items-center justify-center bg-white shrink-0",
                disabled && "bg-gray-100"
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
              "w-full px-4 py-3 text-gray-900 placeholder:text-gray-400",
              "focus-visible:outline-none",
              "disabled:placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed",
              "bg-white",
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
                "text-gray-500 pr-4 h-full flex items-center justify-center bg-white shrink-0"
              )}
            >
              {rightAddon}
            </div>
          )}
          {clearable && value && (
            <div
              className={cn(
                "text-gray-500 pe-4 h-full flex items-center justify-center bg-white shrink-0"
              )}
            >
              <X
                onClick={handleClear}
                className="size-5 shrink-0 cursor-pointer text-gray-500 hover:text-gray-600 transition-colors"
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
