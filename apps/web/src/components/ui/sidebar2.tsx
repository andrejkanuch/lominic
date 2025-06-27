import * as React from "react";
import { SVGProps } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SidebarHeaderProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  collapsedIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, icon: Icon, collapsedIcon: CollapsedIcon, ...props }, ref) => (
    <div
      className={cn(
        "flex flex-none justify-center pt-4 sm:justify-start sm:pl-5 sm:pt-5",
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="hidden sm:block">
        <Icon />
      </div>

      {typeof CollapsedIcon !== "undefined" && (
        <div className="block sm:hidden">
          <CollapsedIcon />
        </div>
      )}
    </div>
  )
);

export interface SidebarItemProps
  extends React.BaseHTMLAttributes<HTMLDivElement> {
  text?: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  rightAddon?: React.FC;
  isActive?: boolean;
}

const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  (
    { className, text, icon: Icon, rightAddon: RightAddon, isActive, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex flex-row justify-center gap-3 rounded-[4px] sm:justify-start items-center sm:px-3 sm:py-2 sm:hover:bg-slate-50 cursor-pointer transition-colors duration-200",
          isActive
            ? "sm:border-[var(--role-color)] sm:bg-slate-50 sm:border-l-4"
            : "sm:border-transparent sm:hover:border-slate-50 sm:border-l-4",
          className
        )}
        ref={ref}
        {...props}
      >
        {typeof Icon !== "undefined" && (
          <div
            className={cn(
              "rounded-lg p-2 sm:p-0 hover:bg-slate-50 size-6 grid place-content-center",
              isActive && "bg-slate-50"
            )}
          >
            <Icon
              className={
                isActive ? "text-[var(--role-color)]" : "text-slate-500"
              }
            />
          </div>
        )}

        {text && (
          <div className="hidden grow truncate font-normal leading-[24px] sm:block">
            {text}
          </div>
        )}

        {typeof RightAddon !== "undefined" && <RightAddon />}
      </div>
    );
  }
);

const SidebarItemGroup = React.forwardRef<
  HTMLDivElement,
  React.BaseHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "flex flex-none flex-col gap-2.5  border-b-[1px] pb-4 text-base font-medium sm:px-3",
      className
    )}
    ref={ref}
    {...props}
  >
    {props.children}
  </div>
));

export interface SidebarCollapsibleItemGroupProps {
  value: string;
}

const SidebarCollapsibleItemGroup = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> &
    SidebarCollapsibleItemGroupProps
>(({ className, value, children, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn("sm:px-3", className)}
    {...props}
  >
    <AccordionPrimitive.Item
      value={value}
      className="rounded-lg sm:hover:bg-slate-50"
    >
      {children}
    </AccordionPrimitive.Item>
  </AccordionPrimitive.Root>
));

export interface SidebarCollapsibleItemGroupTriggerProps {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  isActive?: boolean;
}

const SidebarCollapsibleItemGroupTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    SidebarCollapsibleItemGroupTriggerProps
>(({ className, icon: Icon, isActive, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center text-start justify-center w-full text-lg sm:px-3 sm:py-2 gap-3 rounded-lg font-medium [&[data-state=open]>svg]:rotate-180",
        isActive && "sm:bg-slate-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex-none rounded-lg p-2 sm:p-0 hover:bg-slate-50",
          isActive && "bg-slate-50"
        )}
      >
        <Icon className={cn("text-slate-500", isActive && "text-slate-900")} />
      </div>

      <div className="hidden grow gap-3 sm:block">{children}</div>

      <ChevronDown className="hidden size-6 flex-none transition-transform duration-200 sm:block" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

const SidebarCollapsibleItemGroupContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-base transition-all pl-10 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));

const SidebarFooter = React.forwardRef<HTMLDivElement, React.BaseHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "flex grow flex-col items-center justify-end gap-1 pb-[24px] sm:flex-row sm:items-end sm:justify-center",
        className
      )}
      ref={ref}
    >
      {props.children}
    </div>
  )
);

const Sidebar = React.forwardRef<HTMLDivElement, React.BaseHTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "flex h-full w-[60px] flex-col justify-start px-[20px] gap-[40px] sm:w-[260px]",
        className
      )}
      ref={ref}
      {...props}
    >
      {props.children}
    </div>
  )
);

export {
  Sidebar,
  SidebarCollapsibleItemGroup,
  SidebarCollapsibleItemGroupContent,
  SidebarCollapsibleItemGroupTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarItemGroup,
};
