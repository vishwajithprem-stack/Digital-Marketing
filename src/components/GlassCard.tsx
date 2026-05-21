import { PropsWithChildren } from "react";

interface GlassCardProps extends PropsWithChildren {
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return <div className={`glass-panel rounded-[1.75rem] p-6 md:p-7 ${className}`}>{children}</div>;
}
