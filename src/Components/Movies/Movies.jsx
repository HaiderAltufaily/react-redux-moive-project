import {
  Box,
  Image,
  Flex,
  Text,
  HStack,
  Badge,
  Icon,
  Skeleton,
  LinkBox,
  VStack,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  loadMoviesPages,
  moviesByGenre,
} from "../../Redux/Slices/moviesFilterSlice";

import { FaImdb } from "react-icons/fa";
import { Link as ReachLink } from "react-router-dom";
import Bookmark from "../../Utilities/Bookmark";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useState } from "react";
import Cookies from "js-cookie";

const imageUrl = "https://image.tmdb.org/t/p/w500/";
export default function Movies() {
  const language = Cookies.get("i18next");
  const { genreId } = useParams();
  const [bottom, setBottom] = useState(false);
  const [page, setPage] = useState(1);
  const genres = useSelector((state) => state.moviesFilter.allGenres.list);
  const movies = useSelector((state) => state.moviesFilter.moviesByGenre.list);
  const moviesStatus = useSelector(
    (state) => state.moviesFilter.moviesByGenre.status
  );

  const dispatch = useDispatch();
  // eslint-disable-next-line

  useBottomScrollListener(() => setBottom(true));

  useEffect(() => {
    let changePage;
    let time;
    if (bottom === true) {
      changePage = setTimeout(() => setPage(page + 1), 500);
      time = setTimeout(() => {
        setBottom(false);
      }, 2000);
    }
    return () => {
      changePage && clearTimeout(changePage);
      time && clearTimeout(time);
    };
  }, [bottom]);

  useEffect(() => {
    dispatch(moviesByGenre({ genreId, language }));
    setPage(1);
  }, [genreId, language]);
  useEffect(() => {
    if (page > 1) dispatch(loadMoviesPages({ genreId, page: page, language }));
  }, [page, language]);

  // get genre names instead of id's

  const newMovies = movies.map((movie) => {
    const newIds = movie.genre_ids?.map((id) => {
      const genre = genres?.find((genre) => {
        return genre?.id === id;
      });
      return genre?.name;
    });

    return { ...movie, genre_ids: newIds };
  });
  if (moviesStatus !== "success")
    return (
      <Stack align="center" justify="center" bg="black" h="100vh">
        <Spinner size="xl" color="white" />
      </Stack>
    );
  return (
    <Box bg="black" minH="100vh" spacing="5">
      <Flex
        direction={["column", "row", "row", "row"]}
        justify="center"
        wrap="wrap"
        spacing="5"
        bg="black"
      >
        {newMovies.map((movie) => {
          return (
            <Flex
              direction="column"
              key={movie.id}
              color="white"
              bg="whiteAlpha.300"
              boxShadow="lg"
              w="15rem"
              m="1rem"
              minH="100%"
              position="relative"
            >
              <LinkBox
                as={ReachLink}
                to={`/movies/movie/${movie.id}`}
                key={movie.id}
                _hover={{ transform: "translateY(-10px)" }}
                transition="ease-in-out 0.1s"
              >
                {" "}
                {movie.poster_path && (
                  <Image
                    objectFit="fill"
                    boxSize="15rem"
                    fallback={<Skeleton h="100%"></Skeleton>}
                    src={`${imageUrl}/${movie.poster_path}`}
                  />
                )}
                <Box textAlign="center">
                  <Text fontWeight="bold" fontSize="lg" as="h2">
                    {" "}
                    {movie.title}{" "}
                  </Text>
                </Box>
              </LinkBox>
              <VStack p="3">
                <HStack wrap="wrap">
                  {movie.genre_ids.map((id) => {
                    return (
                      <Text fontSize="small" key={id}>
                        {" "}
                        {id}{" "}
                      </Text>
                    );
                  })}
                </HStack>
                <HStack spacing="1">
                  <Icon color="#dc6208" boxSize={6} as={FaImdb} />{" "}
                  <Badge> {movie.vote_average} </Badge>
                </HStack>
                <Bookmark movie={movie} />
              </VStack>{" "}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
