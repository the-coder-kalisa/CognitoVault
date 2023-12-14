import React, { useState, useEffect } from "react";
import { AddBtnIcon, CheckmarkIcon } from "./core/icons";

interface Props {
  id: string;
  image: React.ReactNode;
  name: string;
  by: string;
  getAdded: (added: boolean) => void;
}

const OneImpBox: React.FC<Props> = ({ name, by, image, getAdded }) => {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    getAdded(added);
  }, [added]);
  return (
    <div className="border-b border-[#0C21C1] flex gap-2  py-1 my-1 justify-between px-2 w-full">
      <div className="w-[70%] flex justify-between gap-2">
        <div className="w-10 h-10 rounded-full">{image}</div>
        <div className="w-[90%]">
          <p>{name}</p>
          <p className="text-gray-400 text-xs">{by}</p>
        </div>
      </div>
      <button className="w-[5%]" onClick={() => setAdded(!added)}>
        {added ? <CheckmarkIcon /> : <AddBtnIcon />}
      </button>
    </div>
  );
};

export default OneImpBox;
