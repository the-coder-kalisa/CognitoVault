import React, { useState, useEffect } from "react";
import { AddBtnIcon, CheckmarkIcon } from "./core/icons";
import { ClipLoader } from "react-spinners";

interface Props {
  id: string;
  icon: string;
  name: string;
  by: string;
}
//@ts-ignore
const OneImpBox: React.FC<Props> = ({ id, icon, name, by }) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let timer: any;
    if (loading) {
      timer = setTimeout(() => {
        setAdded(true);
        setLoading(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="border-b border-[#0C21C1] flex gap-2  py-1 my-1 justify-between px-2 w-full">
      <div className="w-[70%] flex justify-between gap-2">
        <div className="w-10 h-10 rounded-full bg-red-500"></div>
        <div className="w-[90%]">
          <p>{name}</p>
          <p className="text-gray-400 text-xs">{by}</p>
        </div>
      </div>
      <button className="w-[5%]" onClick={() => setLoading(true)}>
        {loading ? (
          <ClipLoader color="white" size={15} />
        ) : added ? (
          <CheckmarkIcon />
        ) : (
          <AddBtnIcon />
        )}
      </button>
    </div>
  );
};

export default OneImpBox;
