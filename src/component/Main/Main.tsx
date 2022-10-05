import React, { useEffect, useState, useRef } from "react";
import "./Main.scss";

import GameItem from "../GameItem/GameItem";

// инплементировать поес по названию

const Main: React.FC = () => {
  // hooks
  const [render, setRender] = useState(0);

  const [games, setGames] = useState<any[]>([]);
  const platforms = useRef<any[]>([]);

  const [plarotmsUrl, setPlarotmsUrl] = useState("null");
  // Пагинация
  const pageCaunt = useRef(1);

  // url
  const url = `https://api.rawg.io/api/games?key=c163d84d1a6b402a916553fa9ce60fb5&${
    plarotmsUrl !== "null" ? `platforms=${plarotmsUrl}` : ""
  }`;

  useEffect(() => {
    // стартовый набор игр
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGames(data.results);
      })
      .catch((error) => console.log(error));

    // Получаем список платформ
    fetch(
      "https://api.rawg.io/api/platforms?key=c163d84d1a6b402a916553fa9ce60fb5"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        platforms.current = data.results;
      })
      .catch((error) => console.log(error));
  }, []);

  // Пагинация
  function Pagination() {
    // увеличиваем счётчик страницы
    pageCaunt.current = pageCaunt.current + 1;

    fetch(url + `&page=${pageCaunt.current}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGames([...games, ...data.results]);
      });
  }

  // поиск
  function serch() {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setGames(data.results);
      });
  }

  // Сортировка по рейтингу
  function sortRatings() {
    // проверяем в каком положения отсортировано и сортерум в обратном
    if (games[0].ratings_count < games[games.length - 1].ratings_count) {
      games.sort(function (a, b) {
        if (a.ratings_count < b.ratings_count) {
          return 1;
        }
        if (a.ratings_count > b.ratings_count) {
          return -1;
        }
        return 0;
      });
    } else {
      games.sort(function (a, b) {
        if (a.ratings_count > b.ratings_count) {
          return 1;
        }
        if (a.ratings_count < b.ratings_count) {
          return -1;
        }
        return 0;
      });
    }
    setRender(render + 1);
  }

  // Сортировка по дате релиза игры
  function sortRelease() {
    // преобразовать дату в простое число
    if (
      +new Date(games[0].released) < +new Date(games[games.length - 1].released)
    ) {
      games.sort(function (a, b) {
        if (+new Date(a.released) < +new Date(b.released)) {
          return 1;
        }
        if (+new Date(a.released) > +new Date(b.released)) {
          return -1;
        }
        return 0;
      });
    } else {
      games.sort(function (a, b) {
        if (+new Date(a.released) > +new Date(b.released)) {
          return 1;
        }
        if (+new Date(a.released) < +new Date(b.released)) {
          return -1;
        }
        return 0;
      });
    }
    setRender(render + 1);
  }

  return (
    <main className="Main">
      <header>
        <header>
          <h5>TestTasc</h5>
          <input type="text" placeholder="Поиск" />
        </header>
        <main>
          <button onClick={sortRatings}>Сортировка рейтингу </button>
          <button onClick={sortRelease}>Сортировка дате релиза</button>
          <select
            onChange={(e) => {
              setPlarotmsUrl(e.target.value);
              serch();
            }}
          >
            <option value="null">All</option>
            {platforms.current.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </main>
      </header>
      <main>
        <main>
          {games.map((el: any) => {
            return (
              <GameItem
                key={el.id}
                name={el.name}
                img={el.background_image}
                date={el.released}
                rating={el.ratings_count}
              />
            );
          })}
        </main>
        <footer>
          {/* Пагинация */}
          <button onClick={Pagination}>More</button>
        </footer>
      </main>
    </main>
  );
};

export default Main;
