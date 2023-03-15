const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeElement: "all",
  filtersLoadingStatus: "idle",
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        filteredHeroes:
          state.activeElement === "all"
            ? action.payload
            : action.payload.filter(
                (hero) => hero.element === state.activeElement
              ),
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "DELETE_HERO":
      let newHeroList = state.heroes.filter((hero) => hero.id !== action.id);
      return {
        ...state,
        heroes: newHeroList,
        filteredHeroes:
          state.activeElement === "all"
            ? newHeroList
            : newHeroList.filter(
                (hero) => hero.element === state.activeElement
              ),
      };
    case "ADD_HERO":
      let createdHeroList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: createdHeroList,
        filteredHeroes:
          state.activeElement === "all"
            ? createdHeroList
            : createdHeroList.filter(
                (hero) => hero.element === state.activeElement
              ),
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTER_ELEMENT":
      return {
        ...state,
        activeElement: action.payload,
        filteredHeroes:
          action.payload === "all"
            ? state.heroes
            : state.heroes.filter((hero) => hero.element === action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
