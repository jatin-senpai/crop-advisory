import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
        primary: "bg-green-600 text-white hover:bg-green-700 shadow-md",
        secondary: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-md",
        outline: "border-2 border-green-600 text-green-600 hover:bg-green-50",
        ghost: "text-stone-600 hover:bg-stone-100",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});
