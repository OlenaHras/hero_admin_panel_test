import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    addHero: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
      // state.heroes.push(action.payload);
    },
    deleteHero: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
      // state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
        // state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);
export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeElement,
  selectAll,
  (filter, heroes) => {
    if (filter === "all") {
      return heroes;
    } else {
      return heroes.filter((hero) => hero.element === filter);
    }
  }
);
export const { addHero, deleteHero } = actions;