import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mb-3 border rounded ">
      <div className="d-flex justify-content-between align-items-center p-3 text-bold ">
        <div className="d-flex justify-content-between items-center">
          {header}
        </div>
        <div
          onClick={handleClick}
          className="border rounded border-dark  cursor-pointer "
        >
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border rounded">{children}</div>}
    </div>
  );
}
export default ExpandablePanel;
