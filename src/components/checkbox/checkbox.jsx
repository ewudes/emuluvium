import React from "react";
import "./checkbox.scss";

const Checkbox = ({label, id, checked}) => {
  return (
    <>
      <input className="checkbox__input" type="checkbox" id={id} checked={checked} />
      <label className="checkbox__label" for={id}>{label}</label>
    </>
  );
}

export default Checkbox;