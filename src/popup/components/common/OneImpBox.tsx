import React, { useState, useEffect } from "react";
import AddBtnIcon from "@/icons/add.svg";
import CheckmarkIcon from "@/icons/check.svg";
interface Props {
  id: string;
  image: React.ReactNode;
  name: string;
  desc: string;
  getAdded: (added: boolean) => void;
}

const OneImpBox: React.FC<Props> = ({ name, desc, image, getAdded }) => {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    getAdded(added);
  }, [added]);
  return (
    <div className="border-b border-[#0C21C1] flex gap-2  py-2 my-2 justify-between px-2 w-full">
      <div className="flex justify-between gap-2">
        <div className="w-[46px] h-[46px] rounded-full">{image}</div>
        <div >
          <p className="text-base">{name}</p>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
      </div>
      <button className="w-[5%]" onClick={() => setAdded(!added)}>
        {added ? <CheckmarkIcon /> : <AddBtnIcon />}
      </button>
    </div>
  );
};

export default OneImpBox;
