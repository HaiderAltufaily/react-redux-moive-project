import "./App.css";
import React, { Suspense, useEffect } from "react";

import BookmarkContainer from "./Containers/BookmarkContainer/BookmarkContainer";
import NavBarContainer from "./Containers/NavBarContainer/NavBarContainer";
import HomeContainer from "./Containers/HomeContainer/HomeContainer";
import SingleActorContainer from "./Containers/SingleActorContainer/SingleActorContainer";
import SingleMovieContainer from "./Containers/SingleMovieContainer/SingleMovieContainer";
import { Route, Switch } from "react-router";
import ScrollToTop from "./Utilities/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { auth } from "./Firebase/Firebase";
import { loginHandler } from "./Redux/Slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) user.getIdToken().then((res) => dispatch(loginHandler(res)));
    });
    return unsub;
  }, []);
  const MoviesContainer = React.lazy(() =>
    import("./Containers/MoviesContainer/MoviesContainer")
  );
  const ActorContainer = React.lazy(() =>
    import("./Containers/ActorContainer/ActorContainer")
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Suspense
      fallback={
        <Stack align="center" justify="center" bg="black" h="100vh">
          <Spinner size="xl" color="white" />
        </Stack>
      }
    >
      <Box maxW="100vw" overflow="hidden">
        <ScrollToTop />
        <NavBarContainer />
        {/* <FooterContainer /> */}
        <Switch>
          <Route exact path="/actors">
            <ActorContainer />
          </Route>
          {isLoggedIn && (
            <Route exact path="/bookmarks">
              <BookmarkContainer />
            </Route>
          )}

          <Route path="/" exact>
            <HomeContainer />
          </Route>
          <Route exact path="/movies/:genreId">
            <MoviesContainer />
          </Route>
          <Route exact path="/actors/:actorId">
            <SingleActorContainer />
          </Route>
          <Route exact path="/movies/movie/:movieId">
            <SingleMovieContainer />
          </Route>

          <Route path="*">
            <HomeContainer />
          </Route>
        </Switch>
      </Box>
    </Suspense>
  );
}

export default App;
