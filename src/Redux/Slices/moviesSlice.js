import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrendingMovies = createAsyncThunk(
  "movies/trendingMovies",
  async (language) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=e8fe6c13def75cda44726ea251c4fb8c&language=${language}`
      )
      .then((response) => {
        return response.data;
      });
  }
);
export const getPopularMovies = createAsyncThunk(
  "movies/popularMovies",
  async (language) => {
    return axios
      .get(
        ` https://api.themoviedb.org/3/movie/popular?api_key=e8fe6c13def75cda44726ea251c4fb8c&language=${language}`
      )
      .then((response) => {
        return response.data;
      });
  }
);
export const movieActors = createAsyncThunk(
  "movies/movieActors",
  async ({ movieId }) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e8fe6c13def75cda44726ea251c4fb8c`
      )
      .then((response) => {
        return response.data;
      });
  }
);
export const movieDetails = createAsyncThunk(
  "movies/movieDetails",
  async ({ movieId, language }) => {
    return axios
      .get(
        `http://api.themoviedb.org/3/movie/${movieId}?api_key=e8fe6c13def75cda44726ea251c4fb8c&append_to_response=videos&language=${language}`
      )
      .then((response) => {
        return response.data;
      });
  }
);
export const movieInEnglish = createAsyncThunk(
  "movies/movieInEnglish",
  async ({ movieId }) => {
    return axios
      .get(
        `http://api.themoviedb.org/3/movie/${movieId}?api_key=e8fe6c13def75cda44726ea251c4fb8c&append_to_response=videos&language=en`
      )
      .then((response) => {
        return response.data;
      });
  }
);

const movies = createSlice({
  name: "movies",
  initialState: {
    popular: { status: "", list: [] },
    trending: { status: "", list: [] },
    movieActors: { status: "", list: [] },
    movieDetails: { status: "", list: [] },
    movieInEnglish: { status: "", list: [] },
  },
  extraReducers: {
    [getTrendingMovies.pending]: (state) => {
      state.trending.status = "loading";
    },
    [getTrendingMovies.fulfilled]: (state, action) => {
      state.trending.status = "success";
      state.trending.list = action.payload.results;
    },
    [getTrendingMovies.rejected]: (state) => {
      state.trending.status = "error";
    },
    [getPopularMovies.pending]: (state) => {
      state.popular.status = "loading";
    },
    [getPopularMovies.fulfilled]: (state, action) => {
      state.popular.status = "success";
      state.popular.list = action.payload.results;
    },
    [getPopularMovies.rejected]: (state) => {
      state.popular.status = "error";
    },
    [movieActors.pending]: (state) => {
      state.movieActors.status = "loading";
    },
    [movieActors.fulfilled]: (state, action) => {
      state.movieActors.status = "success";
      state.movieActors.list = action.payload;
    },
    [movieActors.rejected]: (state) => {
      state.movieActors.status = "error";
    },
    [movieDetails.pending]: (state) => {
      state.movieDetails.status = "loading";
    },
    [movieDetails.fulfilled]: (state, action) => {
      state.movieDetails.status = "success";
      state.movieDetails.list = action.payload;
    },
    [movieInEnglish.rejected]: (state) => {
      state.movieInEnglish.status = "error";
    },
    [movieInEnglish.pending]: (state) => {
      state.movieInEnglish.status = "loading";
    },
    [movieInEnglish.fulfilled]: (state, action) => {
      state.movieInEnglish.status = "success";
      state.movieInEnglish.list = action.payload;
    },
    [movieInEnglish.rejected]: (state) => {
      state.movieInEnglish.status = "error";
    },
  },
});
export default movies.reducer;
