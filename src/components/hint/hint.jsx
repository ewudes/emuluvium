import React, { useEffect, useRef, useCallback } from "react";
import "./hint.scss";

const Hint = ({scheme, mode}) => {
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
      <div className={`${mode === 'black' && 'hint--black'} hint hint--left`}>
        { scheme.R &&
          <div className={`${mode === 'black' && 'hint__restart--black'} hint__restart`}>
            <span className="tetrogrid__hint-label">{scheme.R}</span>
          </div>
        }
        <div className={`${mode === 'black' && 'hint__pause--black'} hint__pause`}>
          <span className="tetrogrid__hint-label">{scheme.SPACE}</span>
        </div>
      </div>
      <div className={`${mode === 'black' && 'hint--black'} hint hint--right`}>
        <div className={`${mode === 'black' && 'hint__spin--black'} hint__spin`}>
          <span className="tetrogrid__hint-label">{scheme.UP}</span>
        </div>
        <div className={`${mode === 'black' && 'hint__fast--black'} hint__fast`}>
          <span className="tetrogrid__hint-label">{scheme.DOWN}</span>
        </div>
        { (scheme.LEFT || scheme.RIGHT) &&
          <div className={`${mode === 'black' && 'hint__move--black'} hint__move`}>
            <span className="tetrogrid__hint-label">{scheme.LEFT}/{scheme.RIGHT}</span>
          </div>
        }

      </div> 
    </> 
  );
}

export default Hint;