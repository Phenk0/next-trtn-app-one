import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement | null;
};

export default function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = null,
}: PlaceholderProps) {
  return (
    <div className="flex flex-1 flex-col self-center items-center justify-center gap-y-2">
      {cloneElement(icon, { className: "w-16 h-16 text-red-500" })}
      <h2 className="text-lg text-center">{label}</h2>
      {button || <div className="h-8" />}
    </div>
  );
}
