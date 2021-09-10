import { configureStore } from "@reduxjs/toolkit";
import actorsSlice from "../Slices/actorsSlice";
import movies from "../Slices/moviesSlice";
import moviesFilterSlice from "../Slices/moviesFilterSlice";
import searchSlice from "../Slices/searchSlice";
import authSlice from "../Slices/authSlice";
import bookmarksSlice from "../Slices/bookmarksSlice";
import translationSlice from "../Slices/translationSlice";
const store = configureStore({
  reducer: {
    movies: movies,
    actors: actorsSlice,
    moviesFilter: moviesFilterSlice,
    search: searchSlice,
    auth: authSlice,
    bookmarks: bookmarksSlice,
    translation: translationSlice,
  },
});
export default store;
