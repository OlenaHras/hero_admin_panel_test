import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { addHero } from "../../actions";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [hero, setHero] = useState({});

  const { filters } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const handleInputChange = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    const newHero = {
      ...hero,
      id: uuidv4(),
    };

    request(
      "http://localhost:3001/heroes",
      "POST",
      JSON.stringify(newHero)
    ).then(dispatch(addHero(newHero)));
    e.target.reset();
  };

  const options = filters.map(({ name }) => {
    if (name === "all") {
      return null;
    }
    return (
      <option className="text-capitalize" key={name} value={name}>
        {name}
      </option>
    );
  });

  return (
    <form
      id="form"
      onSubmit={(e) => onSubmitClick(e)}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          onChange={handleInputChange}
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="description"
          onChange={handleInputChange}
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          onChange={handleInputChange}
        >
          <option>Я владею элементом...</option>
          {options}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
