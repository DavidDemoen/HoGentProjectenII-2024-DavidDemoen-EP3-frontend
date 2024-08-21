import "../../../../styles/ui_element/searchbox_styles.css";
import React, { useRef, useEffect } from "react";

export function SearchBox({ search, setSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={({ currentTarget: input }) => setSearch(input.value)}
          ref={inputRef}
        />
      </div>
    </>
  );
}
