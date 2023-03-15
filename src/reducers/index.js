const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeElement: "all",
  filtersLoadingStatus: "idle",
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
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "DELETE_HERO":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.id),
      };
    case "ADD_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
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
      };
    default:
      return state;
  }
};

export default reducer;
