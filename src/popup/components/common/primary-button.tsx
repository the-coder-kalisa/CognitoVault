import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const PrimaryButton = ({
  title,
  className,
  type,
  disabled = false,
  onClick,
}: {
  title: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      disabled={disabled}
      className={cn(
        "bg-blue-700 hover:bg-blue-700/60 rounded-full px-6 py-2 text-white text-lg font-medium disabled:bg-blue-400",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
