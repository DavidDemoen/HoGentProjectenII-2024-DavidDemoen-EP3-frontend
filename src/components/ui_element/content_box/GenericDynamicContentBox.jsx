import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { useState } from "react";
import "../../../../styles/ui_element/dynamicContentBox_styles.css";

export function GenericDynamicContentBox({ renderFunction, header }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={handleClick} className="dyn-contentbox-header">
        <p>{header}</p>
        {isOpen ? (
          <RiArrowDropDownLine size="2rem" />
        ) : (
          <RiArrowDropUpLine size="2rem" onClick={() => setIsOpen(!isOpen)} />
        )}
      </div>
      <div className="dyn-contentbox-body">{isOpen && renderFunction()}</div>
    </>
  );
}
