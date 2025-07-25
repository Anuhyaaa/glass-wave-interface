import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-lg hover:scale-[1.02] elegant-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:scale-[1.02]",
        outline:
          "border border-glass-border bg-glass-bg backdrop-blur-md hover:bg-glass-bg-intense hover:border-primary/30 hover:shadow-lg hover:scale-[1.02] elegant-hover",
        secondary:
          "bg-gradient-secondary text-secondary-foreground hover:shadow-lg hover:scale-[1.02] elegant-hover",
        ghost: "hover:bg-glass-bg hover:backdrop-blur-md hover:scale-[1.02] transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:scale-[1.02]",
        glass: "bg-glass-bg border border-glass-border backdrop-blur-xl text-foreground hover:bg-glass-bg-intense hover:shadow-lg hover:scale-[1.02] elegant-hover",
        premium: "bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.05] pulse-glow elegant-hover font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
