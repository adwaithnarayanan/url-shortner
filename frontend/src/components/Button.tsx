import React from "react";

type ButtonPropType = {
  type?: "submit" | "showUrls" | "edit" | "delete";
  children: React.ReactNode;
  handleClick?: () => void;
  disabled?: boolean;
};

const Button = ({ type, children, disabled, handleClick }: ButtonPropType) => {
  let btnStyle = "";

  if (type === "submit")
    btnStyle = "bg-three text-white px-3 py-1 rounded-sm w-full";
  else if (type === "showUrls")
    btnStyle = "bg-three text-white px-3 py-1 rounded-md";
  else if (type === "edit")
    btnStyle =
      "text-secondary  hover:bg-[rgba(0,0,0,0.1)] rounded-full px-1 py-1 text-xs";
  else if (type === "delete")
    btnStyle =
      "text-red-700 hover:bg-[rgba(0,0,0,0.2)] rounded-full p-[2px] text-xs";
  return (
    <button
      type={type === "submit" ? type : "button"}
      disabled={disabled ? disabled : false}
      onClick={handleClick}
      className={btnStyle}
    >
      {children}
    </button>
  );
};

export default Button;
