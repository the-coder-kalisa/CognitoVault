import React, { useState, useEffect } from "react";
import AddBtnIcon from "@/icons/add.svg";
import CheckmarkIcon from "@/icons/check.svg";
import { cn } from "@/lib/utils";

// Define the props expected by the VaultBox component
interface Props {
  index: number; // Index of the item
  id: string; // Unique identifier for the item
  image: React.ReactNode; // Image or icon to display
  name: string; // Name of the item
  desc: string; // Description of the item
  getAdded?: (added: boolean) => void; // Optional callback to notify if item was added
  className?: string; // Optional additional CSS classes
  onClick?: React.MouseEventHandler<HTMLDivElement>; // Optional click handler for the container
}

// Functional component to display a box for a vault item
const VaultBox: React.FC<Props> = ({
  name,
  index,
  desc,
  image,
  getAdded,
  onClick,
  className,
}) => {
  const [added, setAdded] = useState(false); // State to track if the item is added

  // Notify parent component if the added state changes
  useEffect(() => {
    if (getAdded) {
      getAdded(added);
    }
  }, [added]);

  return (
    <div
      className={cn(
        "border-b border-[#0C21C1] flex gap-2 py-2 my-2 justify-between px-2 w-full", // Base styling for the component
        className
      )}
      onClick={onClick} // Click handler for the entire component
    >
      <div className="flex justify-between items-center gap-2">
        <div className="text-lg">{index + 1}.</div>
        <div className="w-[46px] h-[46px] rounded-full">{image}</div>{" "}
        <div>
          <p className="text-base">{name}</p>
          <p className="text-gray-400 text-sm">{desc}</p>{" "}
        </div>
      </div>
      {getAdded && (
        <button className="w-[5%]" onClick={() => setAdded(!added)}>
          {added ? <CheckmarkIcon /> : <AddBtnIcon />}{" "}
        </button>
      )}
    </div>
  );
};

export default VaultBox;
