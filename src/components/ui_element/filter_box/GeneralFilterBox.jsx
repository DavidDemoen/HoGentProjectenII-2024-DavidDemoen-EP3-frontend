import { useState } from "react";
import { useFilterBoxContext } from "../../../context/ui_context/FilterBox.context";
import "../../../../styles/ui_element/filter_styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function GeneralFilterBox({ type, name, onClick, category, isOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  const { getFilterBoxStyles } = useFilterBoxContext();
  const { box, p, hover, open } = getFilterBoxStyles(category);

  const handleClick = () => {
    onClick(type);
  };

  return (
    <>
      <div
        style={box}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <p
          style={
            isOpen ? { ...p, ...open } : isHovered ? { ...p, ...hover } : p
          }
        >
          {name}
        </p>
        {/* <div className="filter-arrow-box">
          <FontAwesomeIcon
            icon="chevron-down"
            className={`arrow ${isOpen ? "open" : ""}`}
          />
        </div> */}
      </div>
    </>
  );
}
