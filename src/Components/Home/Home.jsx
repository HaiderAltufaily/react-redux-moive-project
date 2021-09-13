import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Image,
  IconButton,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  LinkBox,
  Stack,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  getPopularMovies,
  getTrendingMovies,
} from "../../Redux/Slices/moviesSlice";
import { FaImdb } from "react-icons/fa";

import Bookmark from "../../Utilities/Bookmark";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const imageUrl = "https://image.tmdb.org/t/p/w500/";
export default function Home() {
  const changeMoviesLanguage = useSelector(
    (state) => state.translation.changeMoviesLanguage
  );
  const language = Cookies.get("i18next");
  const { t } = useTranslation();

  const [movieNum, setMovieNum] = useState({
    first: 0,
    second: 5,
  });
  const [trendingNum, setTrendingNum] = useState({
    first: 0,
    second: 5,
  });
  const popularMovies = useSelector((state) => state.movies.popular.list);
  const trendingMovies = useSelector((state) => state.movies.trending.list);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.moviesFilter.allGenres.list);
  const popularMoviesStatus = useSelector(
    (state) => state.movies.popular.status
  );
  const trendingMoviesStatus = useSelector(
    (state) => state.movies.trending.status
  );
  const newPopularMovies = popularMovies?.map((movie) => {
    const newIds = movie.genre_ids.map((id) => {
      const genre = genres?.find((genre) => {
        return genre?.id === id;
      });
      return genre?.name;
    });

    return { ...movie, genre_ids: newIds };
  });
  const newTrendingMovies = trendingMovies?.map((movie) => {
    const newIds = movie.genre_ids.map((id) => {
      const genre = genres?.find((genre) => {
        return genre?.id === id;
      });
      return genre?.name;
    });

    return { ...movie, genre_ids: newIds };
  });
  useEffect(() => {
    dispatch(getPopularMovies({ language, changeMoviesLanguage }));
    dispatch(getTrendingMovies({ language, changeMoviesLanguage }));
    setMovieNum({
      first: 0,
      second: 5,
    });
    setTrendingNum({
      first: 0,
      second: 5,
    });
  }, [language, changeMoviesLanguage]);
  if (trendingMoviesStatus !== "success" || popularMoviesStatus !== "success")
    return (
      <Stack align="center" justify="center" bg="black" h="100vh">
        <Spinner size="xl" color="white" />
      </Stack>
    );
  return (
    <Box bg="black" minH="100vh" py="5" px="3">
      <Text
        p="4"
        textAlign="center"
        bg="whiteAlpha.100"
        color="white"
        as="h1"
        fontWeight="bold"
        fontSize="4xl"
      >
        {t("popular")}
      </Text>
      <Flex wrap="wrap" py="3" justify="space-evenly">
        <IconButton
          d={{ base: "none", lg: "block" }}
          alignSelf="center"
          icon={language === "ar" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
          mr="3"
          onClick={() => {
            if (movieNum.first !== 0)
              setMovieNum((prevNum) => {
                return {
                  first: prevNum.first - 5,
                  second: prevNum.second - 5,
                };
              });
          }}
        />
        {newPopularMovies
          .slice(movieNum.first, movieNum.second)
          .map((movie) => (
            <Flex
              direction="column"
              key={movie.id}
              color="white"
              bg="whiteAlpha.300"
              boxShadow="lg"
              // overflow="hidden"
              w={{ base: "10rem", lg: "15rem" }}
              minH="100%"
              my={{ base: "3", lg: "0" }}
              position="relative"
            >
              {" "}
              <LinkBox
                as={ReachLink}
                to={`/movies/movie/${movie.id}`}
                key={movie.id}
                _hover={{ transform: "translateY(-20px)" }}
                transition="ease-in-out 0.1s"
              >
                <Image
                  objectFit="fill"
                  boxSize={{ base: "10rem", lg: "15rem" }}
                  fallback={<Skeleton boxSize="15rem"></Skeleton>}
                  src={`${imageUrl}/${movie.poster_path}`}
                />{" "}
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={{ base: "sm", lg: "lg" }}
                  as="h2"
                >
                  {" "}
                  {movie.title}{" "}
                </Text>
              </LinkBox>
              <VStack p="3">
                <HStack>
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
                <Box p="3" position="absolute" bottom="0" right="0">
                  <Bookmark movie={movie} />
                </Box>
              </VStack>
            </Flex>
          ))}
        <IconButton
          d={{ base: "none", lg: "block" }}
          alignSelf="center"
          icon={language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          onClick={() => {
            if (popularMovies.length > movieNum.second)
              setMovieNum((prevNum) => {
                return {
                  first: prevNum.first + 5,
                  second: prevNum.second + 5,
                };
              });
          }}
        />
      </Flex>
      <Text
        p="4"
        textAlign="center"
        bg="whiteAlpha.100"
        color="white"
        as="h1"
        fontWeight="bold"
        fontSize="4xl"
      >
        {t("trending")}
      </Text>
      <Flex wrap="wrap" py="3" justify="space-evenly">
        <IconButton
          d={{ base: "none", lg: "block" }}
          alignSelf="center"
          icon={language === "ar" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
          mr="3"
          onClick={() => {
            if (trendingNum.first !== 0)
              setTrendingNum((prevNum) => {
                return {
                  first: prevNum.first - 5,
                  second: prevNum.second - 5,
                };
              });
          }}
        />
        {newTrendingMovies
          .slice(trendingNum.first, trendingNum.second)
          .map((movie) => (
            <Flex
              direction="column"
              key={movie.id}
              color="white"
              bg="whiteAlpha.300"
              boxShadow="lg"
              // overflow="hidden"
              w={{ base: "10rem", lg: "15rem" }}
              minH="100%"
              my={{ base: "3", lg: "0" }}
              position="relative"
            >
              <LinkBox
                as={ReachLink}
                to={`/movies/movie/${movie.id}`}
                key={movie.id}
                _hover={{ transform: "translateY(-20px)" }}
                transition="ease-in-out 0.1s"
              >
                <Image
                  objectFit="fill"
                  boxSize={{ base: "10rem", lg: "15rem" }}
                  src={`${imageUrl}/${movie.poster_path}`}
                  fallback={
                    <Skeleton
                      boxSize={{ base: "10rem", lg: "15rem" }}
                    ></Skeleton>
                  }
                />{" "}
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="lg"
                  as="h2"
                >
                  {" "}
                  {movie.title}{" "}
                </Text>
              </LinkBox>
              <VStack p="3">
                <HStack>
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
              </VStack>
            </Flex>
          ))}
        <IconButton
          d={{ base: "none", lg: "block" }}
          alignSelf="center"
          icon={language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          onClick={() => {
            if (trendingMovies.length > trendingNum.second)
              setTrendingNum((prevNum) => {
                return {
                  first: prevNum.first + 5,
                  second: prevNum.second + 5,
                };
              });
          }}
        />
      </Flex>
    </Box>
  );
}
