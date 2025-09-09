import clsx from "clsx";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<string, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-400",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    };

    const sizes: Record<string, string> = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-xs",
      lg: "h-10 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
