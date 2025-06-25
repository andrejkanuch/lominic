import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";
import { Asterisk, Info } from "lucide-react";

const labelVariants = cva(
  "inline-block text-sm font-medium leading-none dark:text-white"
);

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> &
  VariantProps<typeof labelVariants> & {
    required?: boolean;
    tooltip?: { title?: string; text: string };
    tag?: string;
  };

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, children, required, tooltip, tag, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    <div className="flex items-center gap-0.5">
      {children}
      {required && (
        <Asterisk className="size-3 text-streamOrange dark:text-streamOrange" />
      )}
      {tag && <span className="ml-0.5 font-normal text-slate-500">{tag}</span>}
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Info className="ml-1 size-3 text-slate-400 dark:text-slate-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <>
                <p className="text-sm">{tooltip.title}</p>
                <p className="text-xs font-normal text-slate-500">
                  {tooltip.text}
                </p>
              </>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
