import React, { useState, useRef, useEffect } from "react";
import "./profile.scss";
import LeaderPic from "./../../vendor/decorate/profile-avatar.png";

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
          <div className="profile__pic">
            <img src={LeaderPic} width="100" height="100" alt="Изображение профиля"/>
          </div>
          <div className="profile__username">Анонимный Котик</div>
          <div className="profile__hint">Хочешь изменить профиль? <br/> Сначала <a href="#">войди</a> или <a href="#">зарегистрируйся</a>!</div>
          <ul className="profile__awards-list">
            {[...Array(10)].map((_, index) => (
              <li className="profile__awards-item" key={index}>
                <img
                  src={require(`./../../vendor/decorate/awards/cat-${index + 1}-close.png`)}
                  width={115}
                  alt={`Награда котика ${index + 1}`}
                  className="profile__awards-image"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
