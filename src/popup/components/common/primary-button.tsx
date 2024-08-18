import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const PrimaryButton = ({
  title,
  className,
  type,
  onClick,
}: {
  title: string;
  className?: string;
  type?: "button" | "reset" | "submit"
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <Button className={cn("bg-blue-700 hover:bg-blue-700/60 rounded-full px-6 py-2 text-white text-lg font-medium", className)}onClick={onClick} type={type}>{title}</Button>;
};

export default PrimaryButton;
