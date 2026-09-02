import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement | null;
  color?: "destructive" | "secondary" | "primary";
};

export default function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = null,
  color = "secondary",
}: PlaceholderProps) {
  return (
    <div className="flex flex-1 flex-col self-center items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: `w-16 h-16 text-${color}`,
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {button || <div className="h-8" />}
    </div>
  );
}
