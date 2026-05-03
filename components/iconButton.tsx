import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  iconClassName?: string;
}

export default function IconButton({
  icon: Icon,
  label,
  onClick,
  iconClassName = "w-5 h-5",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-amber-700 text-white p-2 rounded-md hover:bg-amber-800 hover:text-gray-300 transition-colors"
    >
      <Icon className={iconClassName} />
      {label}
    </button>
  );
}
