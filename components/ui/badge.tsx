import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "flex-center border mx-3 my-[2px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent px-2 rounded-sm w-min bg-gradient-to-r from-purple-600 to-blue-600 text-destructive-foreground hover:bg-destructive/80",
        normal:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        inactive:
          "bg-gray-300 dark:bg-gray-400 dark:text-slate-50 px-2 rounded-sm w-min",
        qn_tag:
          "bg-purple2blue dark:bg-dark-gradient bg-clip-text text-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  bgClassName?: string;
}

function Badge({ bgClassName, className, variant, ...props }: BadgeProps) {
  return (
    <div className={bgClassName}>
      <div className={cn(badgeVariants({ variant }), className)} {...props} />
    </div>
  );
}

export { Badge, badgeVariants };
