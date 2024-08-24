import React, { useState, useEffect } from "react";
import AddBtnIcon from "@/icons/add.svg";
import CheckmarkIcon from "@/icons/check.svg";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  id: string;
  image: React.ReactNode;
  name: string;
  desc: string;
  getAdded?: (added: boolean) => void;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const VaultBox: React.FC<Props> = ({
  name,
  index,
  desc,
  image,
  getAdded,
  onClick,
  className,
}) => {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    getAdded && getAdded(added);
  }, [added]);
  return (
    <div
      className={cn(
        "border-b border-[#0C21C1] flex gap-2  py-2 my-2 justify-between px-2 w-full",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="text-lg">{index + 1}.</div>
        <div className="w-[46px] h-[46px] rounded-full">{image}</div>
        <div>
          <p className="text-base">{name}</p>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
      </div>
      {getAdded && (
        <button className="w-[5%]" onClick={() => setAdded(!added)}>
          {added ? <CheckmarkIcon /> : <AddBtnIcon />}
        </button>
      )}
    </div>
  );
};

export default VaultBox;
