import React, { useState, useRef, useEffect } from "react";
import "./profile.scss";

const Profile = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const overlayRef = useRef(null);
  const nameRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      overlayRef.current &&
      !overlayRef.current.contains(event.target) &&
      nameRef.current &&
      !nameRef.current.contains(event.target)
    ) {
      setIsOverlayVisible(false);
    }
  };

  useEffect(() => {
    if (isOverlayVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOverlayVisible]);

  const handleNameClick = () => {
    setIsOverlayVisible((prev) => !prev);
  };

  return (
    <div className="profile">
      <div
        className="profile__name"
        onClick={handleNameClick}
        ref={nameRef}
      >
        Анонимный Котик
      </div>
      {isOverlayVisible && (
        <div
          className={`profile__overlay profile__overlay--true`}
          ref={overlayRef}
        >
          <ul className="profile__list">
            <li className="profile__item">Аватар</li>
            <li className="profile__item">Анонимный Котик</li>
            <li className="profile__item">Любимая игра: N/A</li>
            <li className="profile__item">Всего очков: N/A</li>
            <li className="profile__item">Всего время: N/A</li>
            <li className="profile__item">Ранг: N/A</li>
            <li className="profile__item">Найдено котиков: N/A</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
