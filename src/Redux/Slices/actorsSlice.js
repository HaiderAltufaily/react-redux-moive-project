import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getActors = createAsyncThunk(
  "actors/getActors",
  async (page = 1) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=e8fe6c13def75cda44726ea251c4fb8c&language=en-US&page=${page}`
      )
      .then((response) => {
        return response.data;
      });
  }
);
export const getActorDetails = createAsyncThunk(
  "actors/actorDetails",
  async ({ actorId, language }) => {
    return axios
      .get(
        ` https://api.themoviedb.org/3/person/${actorId}?api_key=e8fe6c13def75cda44726ea251c4fb8c&language=${language}`
      )
      .then((response) => {
        return response.data;
      });
  }
);
export const getEnglishActor = createAsyncThunk(
  "actors/getEnglishActor",
  async ({ actorId }) => {
    return axios
      .get(
        ` https://api.themoviedb.org/3/person/${actorId}?api_key=e8fe6c13def75cda44726ea251c4fb8c&language=en`
      )
      .then((response) => {
        return response.data;
      });
  }
);

export const getActorMovies = createAsyncThunk(
  "actors/actorMovies",
  async ({ actorId, language }) => {
    return axios
      .get(
        ` https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=e8fe6c13def75cda44726ea251c4fb8c&language=${language}`
      )
      .then((response) => {
        return response.data;
      });
  }
);

const actorsSlice = createSlice({
  name: "actors",
  initialState: {
    actors: {
      status: "",
      list: [],
    },
    actorDetails: {
      status: "",
      list: [],
    },
    actorMovies: {
      status: "",
      list: [],
    },
    englishActor: {
      status: "",
      list: [],
    },
  },
  reducers: {
    resetActors(state) {
      state.actors.list = [];
    },
  },
  extraReducers: {
    [getActors.pending]: (state) => {
      state.actors.status = "loading";
    },
    [getActors.fulfilled]: (state, action) => {
      state.actors.status = "success";
      state.actors.list = [...state.actors.list, ...action.payload.results];
    },
    [getActors.rejected]: (state) => {
      state.actors.status = "error";
    },
    [getActorDetails.pending]: (state) => {
      state.actorDetails.status = "loading";
    },
    [getActorDetails.fulfilled]: (state, action) => {
      state.actorDetails.status = "success";
      state.actorDetails.list = action.payload;
    },
    [getActorDetails.rejected]: (state) => {
      state.actorDetails.status = "error";
    },
    [getActorMovies.pending]: (state) => {
      state.actorMovies.status = "loading";
    },
    [getActorMovies.fulfilled]: (state, action) => {
      state.actorMovies.status = "success";
      state.actorMovies.list = action.payload;
    },
    [getActorMovies.rejected]: (state) => {
      state.actorMovies.status = "error";
    },
    [getEnglishActor.pending]: (state) => {
      state.englishActor.status = "loading";
    },
    [getEnglishActor.fulfilled]: (state, action) => {
      state.englishActor.status = "success";
      state.englishActor.list = action.payload;
    },
    [getEnglishActor.rejected]: (state) => {
      state.englishActor.status = "error";
    },
  },
});
export const { resetActors } = actorsSlice.actions;
export default actorsSlice.reducer;
