import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-transparent text-primary dark:text-red-500",
        success: "text-purple-700 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-100",
      }
    },
    defaultVariants: {
      variant: "warning",
    }
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({
  label,
  variant,
}: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};