import React from "react";
import "./popup.scss";

const Popup = ({ text }) => {
  return (
    <>
      <div className="popup">
        <div className="popup__text">
          <div className="popup__close">
            <span className="popup__dash"></span>
            <span className="popup__dash"></span>
          </div>
          { text }
        </div>  
      </div>  
    </> 
  );
}

export default Popup;