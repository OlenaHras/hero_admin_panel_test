import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHero,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeElement,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      } else {
        return heroes.filter((hero) => hero.element === filter);
      }
    }
  );

  // const filteredHeroes = useSelector((state) => {
  //   if (state.filters.activeElement === "all") {
  //     return state.heroes.heroes;
  //   } else {
  //     return state.heroes.heroes.filter(
  //       (hero) => hero.element === state.filters.activeElement
  //     );
  //   }
  // });
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector((state) => state.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => {
        dispatch(heroesFetched(data));
      })
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const handleDeleteHero = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE").then(
        dispatch(deleteHero(id))
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          onDelete={() => handleDeleteHero(id)}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
