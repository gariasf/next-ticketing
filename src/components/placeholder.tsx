import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  button?: React.ReactNode
};

export function Placeholder({ label, icon = <LucideMessageSquareWarning  />, button  }: PlaceholderProps) {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-start gap-y-2 min-h-[240px]">
        {cloneElement(icon, { className: "w-16 h-16" })}
        <h2 className="text-lg text-center">{label}</h2>
        {button}
    </div>
  );
}
