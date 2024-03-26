import React from "react";
import Github from "../assets/github.png";

function Navbar() {
  const handleClick = () => {};

  return (
    <nav className="navbar w-full bg-violet-300 flex justify-between items-center h-20 px-40">
      <div className="logo font-bold text-xl text-black">{"<Pass-Store/>"}</div>
      
      <a href="https://github.com/TheAJ25" target="_blank"><button
        onClick={handleClick}
        className="flex justify-center items-center gap-0 text-black bg-violet-400 hover:bg-violet-400 rounded-full pr-2 pl-1 py-0.5 font-bold w-fit border-2 border-violet-500 text-sm"
      >
        <img className="p-1 mr-0" width={35} src={Github} alt="eye" />
        Github
      </button></a>
    </nav>
  );
}

export default Navbar;
