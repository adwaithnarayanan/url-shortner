import React from "react";

type ButtonPropType = {
  type: "submit";
  children: React.ReactNode;
};

const Button = ({ type, children }: ButtonPropType) => {
  return (
    <button type={type} className={`bg-three text-white `}>
      {children}
    </button>
  );
};

export default Button;
