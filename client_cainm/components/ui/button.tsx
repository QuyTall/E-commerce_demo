import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }

    // Map variant to tailwind classes (đơn giản hóa cho bạn dễ dùng)
    let variantClass = "bg-slate-900 text-white hover:bg-slate-800"; // Default style
    if (variant === "outline") variantClass = "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900";
    if (variant === "ghost") variantClass = "hover:bg-slate-100 hover:text-slate-900";
    if (className?.includes("bg-orange-600")) variantClass = ""; // Override nếu có class màu riêng

    return (
      <Comp
        className={cn(baseStyles, variantClass, "h-10 px-4 py-2", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }