import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";
import { Gap } from "./Gap";

const categories = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [collection, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://665fceab5425580055b0f212.mockapi.io/photos?${categoryId ? `category=${categoryId}` : ""}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setCollection(json);
      })
      .catch((error) => {
        console.warn(error);
        alert("Could not fetch collection");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              onClick={() => {
                setCategoryId(index);
              }}
              className={categoryId === index ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <Gap />
        ) : (
          collection
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
