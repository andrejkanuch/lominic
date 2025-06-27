import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { SVGProps } from "react";
import { Loader } from "lucide-react";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    'disabled:pointer-events-none [&[class~="disabled"]]:opacity-50 [&[class~="disabled"]]:text-slate-500 [&[class~="disabled"]]:bg-none [&[class~="disabled"]]:bg-transparent'
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary:
          "border-2 border-solid border-[var(--role-color)] text-[var(--role-color)]",
        text: " bg-transparent font-normal underline",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-[38px] border px-8 py-[7px]",
        base: "h-[48px] px-8 py-3 text-sm",

        "icon-sm": "p-2",
        "icon-base": "p-2.5",
      },
      iconOnly: {
        false: "rounded-full",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      iconOnly: false,
    },
    compoundVariants: [
      {
        variant: "text",
        size: ["base", "sm", "icon-base", "icon-sm"],
        className: "h-auto p-0",
      },
    ],
  }
);

const iconVariants = cva("inline-block items-center justify-center", {
  variants: {
    size: {
      sm: "size-6",
      base: "size-6",
      "icon-xs": "size-3",
      "icon-sm": "size-5",
      "icon-base": "size-6",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const getLoadingIconStroke = (variant: ButtonProps["variant"]) => {
  if (variant === "default" || !variant) {
    return "#FFFFFF";
  }

  if (variant === "secondary") {
    return "#000000";
  }

  return "#000000";
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.FC<SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<SVGProps<SVGSVGElement>>;
  icon?: React.FC<SVGProps<SVGSVGElement>>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      asChild = false,
      isLoading,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      icon: Icon,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, iconOnly }), {
          disabled,
        })}
        ref={ref}
        disabled={disabled || isLoading}
        style={style}
        {...props}
      >
        {isLoading && (
          <Loader
            className={cn(
              iconVariants({ size }),
              "animate-spin text-transparent"
            )}
            stroke={getLoadingIconStroke(variant)}
          />
        )}
        {typeof LeftIcon !== "undefined" && !isLoading && (
          <LeftIcon className={cn(iconVariants({ size }))} />
        )}
        {props.children}
        {typeof RightIcon !== "undefined" && !isLoading && (
          <RightIcon className={cn(iconVariants({ size, className }))} />
        )}
        {typeof Icon !== "undefined" && !isLoading && (
          <Icon className={cn(iconVariants({ size, className }))} />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
