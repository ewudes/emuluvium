import React, { useEffect, useRef, useCallback } from "react";
import "./hint.scss";

const Hint = ({scheme}) => {
  const keyToClassMap = {
      ArrowUp: ".hint__spin",
      ArrowLeft: ".hint__move",
      ArrowRight: ".hint__move",
      ArrowDown: ".hint__fast",
      Space: ".hint__pause",
      KeyR: ".hint__restart"
    };
    
    const isPausedRef = useRef(false);
    
    const handleKeyDown = useCallback((event) => {
      if (isPausedRef.current && event.code !== "Space") return;
      
      const hintSelector = keyToClassMap[event.code];
      if (hintSelector) {
        const hintElement = document.querySelector(hintSelector);
        if (hintElement) {
          hintElement.classList.add("pressed");
        }
        
        if (event.code === "Space") {
          isPausedRef.current = !isPausedRef.current;
        }
      }
    }, []);
    
    const handleKeyUp = useCallback((event) => {
      if (isPausedRef.current && event.code !== "Space") return;
      
      const hintSelector = keyToClassMap[event.code];
      if (hintSelector) {
        const hintElement = document.querySelector(hintSelector);
        if (hintElement) {
          hintElement.classList.remove("pressed");
        }
      }
    }, []);
    
    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [handleKeyDown, handleKeyUp]);
  
  return (
    <>
      <div className="hint hint--left">
        <div className="hint__restart">
          <span className="tetrogrid__hint-label">{scheme.R}</span>
        </div>
        <div className="hint__pause">
          <span className="tetrogrid__hint-label">{scheme.SPACE}</span>
        </div>
      </div>
      <div className="hint hint--right">
        <div className="hint__spin">
          <span className="tetrogrid__hint-label">{scheme.UP}</span>
        </div>
        <div className="hint__fast">
          <span className="tetrogrid__hint-label">{scheme.DOWN}</span>
        </div>
        <div className="hint__move">
          <span className="tetrogrid__hint-label">{scheme.LEFT}/{scheme.RIGHT}</span>
        </div>
      </div> 
    </> 
  );
}

export default Hint;