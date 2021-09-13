import { createSlice } from "@reduxjs/toolkit";

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    english: {
      sign_in: "Sign In",
      home: "Home",
      movies: "Movies",
      actors: "Actors",
      bookmarks: "Bookmarks",
      search: "Search",
      search_movies: "Search Movies",
      popular: "Popular Movies",
      trending: "Trending Movies",
      bookmarks_alert_header: "Please Sign In First",
      bookmarks_alert_body: "Sign in now to view your bookmarks!",
      bookmarks_alert_close: "Later",
      directed_by: "Directed By:",
      trailer: "Watch Trailer",
      similarMovies: "Similar Movies You May Like",
      birthday: "Birthday",
      deathday: "DeathDay",
      popularity: "Popularity",
      change_movies: "Change Moives?",
      change_movies_body: "Do u want to exclusivly include english movies?",
      yes: "Yes",
      no: "No",
    },
    arabic: {
      sign_in: "تسجيل الدخول",
      home: "الرئيسية",
      movies: "الأفلام",
      actors: "الممثلين",
      bookmarks: "المفضلة",
      search: "بحث",
      search_movies: "ابحث عن الأفلام",
      popular: "الأفلام الشعبية",
      trending: "الأفلام الرائجة",
      bookmarks_alert_header: "يرجى تسجيل الدخول",
      bookmarks_alert_body: "قم بتسجيل الدخول الان لرؤية المفضلة",
      bookmarks_alert_close: "لاحقا",
      directed_by: "الاخراج:",
      trailer: "مشاهدة الاعلان",
      similarMovies: "أفلام مشابهة قد تعجبك",
      birthday: "ولد في",
      deathDay: "توفي في",
      popularity: "الشهرة",
      change_movies: "هل تريد تغيير االأفلام؟",
      change_movies_body: "هل تريد عرض الأفلام العربية حصرا؟",
      yes: "نعم",
      no: "كلا",
    },
    changeMoviesLanguage: false,
  },
  reducers: {
    setChangeMoviesLanguage(state, action) {
      state.changeMoviesLanguage = action.payload;
    },
  },
});
export const { setChangeMoviesLanguage } = translationSlice.actions;
export default translationSlice.reducer;
