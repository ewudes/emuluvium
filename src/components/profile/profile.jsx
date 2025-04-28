import React from "react";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__name">Анонимный Котик</div>
      <div className="profile__overlay">
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
    </div>
  );
}

export default Profile;