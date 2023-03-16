const initialState = {
  filters: [],
  activeElement: "all",
  filtersLoadingStatus: "idle",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
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

export default filters;
