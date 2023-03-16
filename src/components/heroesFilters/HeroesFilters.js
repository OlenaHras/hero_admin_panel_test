import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filterElement } from "../../actions";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, activeElement, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters").then((data) =>
      dispatch(filtersFetched(data))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  }

  const handleClick = (element) => {
    dispatch(filterElement(element));
  };

  const buttons = filters.map(({ name, className }) => {
    const active = name === activeElement;
    const clazz = active ? `${className} active` : className;
    return (
      <button
        onClick={() => handleClick(name)}
        key={name}
        className={`btn ${clazz} text-capitalize`}
      >
        {name}
      </button>
    );
  });

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group gap-2">{buttons}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
