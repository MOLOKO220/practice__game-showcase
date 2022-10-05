import React from "react";
import "./GameItem.scss";

interface gameDateProps {
  name: string;
  img: string;
  date: string;
  rating: string;
}

const GameItem: React.FC<gameDateProps> = (props) => {
  return (
    <div className="GameItem">
      <h6>{props.name}</h6>
      <img src={props.img} />
      <div>
        Релиз: <span>{props.date}</span>
      </div>
      <div>
        Рейтинг: <span>{props.rating}</span>
      </div>
    </div>
  );
};

export default GameItem;
