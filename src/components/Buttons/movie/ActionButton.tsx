import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "outline" | "primary" | "warning";
  size?: "sm" | "xs";
  className?: string;
  disabled?: boolean;
  tooltip?: ReactNode;
}

export const ActionButton = ({
  children,
  icon,
  onClick,
  href,
  variant = "outline",
  size = "sm",
  className = "",
  disabled = false,
  tooltip,
}: ActionButtonProps) => {
  const baseStyles =
    "px-4 rounded -lg text-base font-semibold flex items-center justify-center gap-2";

  const variantStyles = {
    outline: "border",
    primary: "bg-primary text-white hover:bg-primary/90",
    warning: "bg-yellow-400 hover:bg-yellow-500 text-black",
    default: "",
  };

  const button = (
    <Button
      size={size}
      variant={variant === "outline" ? "outline" : "default"}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
      {icon}
    </Button>
  );

  const content = href ? (
    <a href={href} className="w-full">
      {button}
    </a>
  ) : (
    button
  );

  if (!tooltip) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
