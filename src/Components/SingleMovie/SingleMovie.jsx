import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  Stack,
  Button,
  Spinner,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { similarMovies } from "../../Redux/Slices/moviesFilterSlice";
import {
  movieActors,
  movieDetails,
  movieInEnglish,
} from "../../Redux/Slices/moviesSlice";
import { Link as ReachLink } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import Bookmark from "../../Utilities/Bookmark";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const imageUrl = "https://image.tmdb.org/t/p/w500/";
export default function SingleMovie() {
  const language = Cookies.get("i18next");
  const [actorNum, setActorNum] = useState({ first: 0, second: 5 });
  const [movieNum, setMovieNum] = useState({ first: 0, second: 5 });
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const changeMoviesLanguage = useSelector(
    (state) => state.translation.changeMoviesLanguage
  );
  const movie = useSelector((state) => state.movies.movieDetails.list);
  const similarMovs = useSelector(
    (state) => state.moviesFilter.similarMovies.list
  );

  const similarMovsStatus = useSelector(
    (state) => state.moviesFilter.similarMovies.status
  );
  const actorsStatus = useSelector((state) => state.movies.movieActors.status);
  const movieStatus = useSelector((state) => state.movies.movieDetails.status);
  const englishMovie = useSelector((state) => state.movies.movieInEnglish.list);

  const actors = useSelector((state) => state.movies.movieActors.list);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(similarMovies({ movieId, language, changeMoviesLanguage }));
    dispatch(movieActors({ movieId, language }));
    dispatch(movieDetails({ movieId, language }));
    dispatch(movieInEnglish({ movieId }));
    setActorNum({
      first: 0,
      second: 5,
    });
    setMovieNum({
      first: 0,
      second: 5,
    });
  }, [movieId]);
  if (
    actorsStatus !== "success" ||
    similarMovsStatus !== "success" ||
    movieStatus !== "success"
  )
    return (
      <Stack align="center" justify="center" bg="black" h="100vh">
        <Spinner size="xl" color="white" />
      </Stack>
    );
  return (
    <Box overflow="hidden" maxW="100vw" p="6" bg="black" minH="100vh">
      {movieStatus === "success" && actorsStatus === "success" && (
        <Flex direction={{ lg: "row", md: "row", base: "column" }}>
          <Image
            borderRadius="10px"
            h={{ lg: "lg", base: "sm" }}
            fallback={<Skeleton boxSize="lg"></Skeleton>}
            src={`${imageUrl}/${movie.poster_path}`}
          />

          <Flex
            bg="whiteAlpha.500"
            color="white"
            p="5"
            direction="column"
            borderRadius="10px"
            ml={{ lg: "5", base: "0" }}
            w={{ lg: "50%", base: "100%" }}
            h={{ lg: "lg", base: "auto" }}
            boxShadow="lg"
            position="relative"
            mr={{ lg: "5", base: "0" }}
          >
            <Bookmark movie={movie} size={39} top="0" />
            <Stack borderBottom="#dc6208 solid 0.2rem">
              <Text
                textAlign="left"
                fontWeight="bold"
                fontSize="4xl"
                flexBasis="20%"
              >
                {movie.original_title}
              </Text>
              <Flex wrap="wrap" justify="space-between">
                <HStack spacing="2">
                  {movie.genres.slice(0, 3).map((genre) => (
                    <Text key={genre.id} fontSize="lg" color="gray.200">
                      {genre.name}
                    </Text>
                  ))}
                </HStack>
                <HStack>
                  <Text fontSize="lg" fontWeight="semibold">
                    {" "}
                    {t("directed_by")}
                  </Text>
                  {actors.crew.slice(0, 1).map((crew) => (
                    <Text
                      fontSize="lg"
                      color="gray.200"
                      fontWeight="bold"
                      key={crew.id}
                    >
                      {" "}
                      {crew.name}
                    </Text>
                  ))}
                </HStack>
              </Flex>
            </Stack>
            <Stack
              textAlign={language === "ar" && movie.overview ? "right" : "left"}
              justify="space-evenly"
              flexBasis="80%"
            >
              <Text p="5" fontWeight="semibold" fontSize="lg" color="white">
                {movie.overview ? movie.overview : englishMovie.overview}
              </Text>

              {movie.videos && (
                <Button
                  bg="#dc6208"
                  _hover={{ background: "#f56d09", textDecoration: "none" }}
                  m="auto"
                  as={Link}
                  isExternal
                  href={`https://www.youtube.com/watch?v=${movie.videos?.results[0]?.key}`}
                >
                  {t("trailer")} <ExternalLinkIcon mx="2" />{" "}
                </Button>
              )}
            </Stack>
          </Flex>
          {actorsStatus === "success" && (
            <Image
              borderRadius="10px"
              ml={{ lg: "5", base: "0" }}
              fallback={<Skeleton boxSize="lg"></Skeleton>}
              h={{ lg: "lg", base: "sm" }}
              d={{ lg: "block", base: "none" }}
              src={`${imageUrl}/${actors.cast[0]?.profile_path}`}
            />
          )}
        </Flex>
      )}

      <Text
        color="whiteAlpha.900"
        my="5"
        ml="8"
        fontWeight="semibold"
        fontSize="4xl"
        letterSpacing="1px"
      >
        {t("actors")}
      </Text>
      {actors.cast && (
        <Flex wrap="wrap" mt="5" justify="space-evenly" bg="black">
          <IconButton
            alignSelf="center"
            mr="3"
            d={{ base: "none", lg: "block", md: "block" }}
            icon={language === "ar" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
            onClick={() => {
              if (actorNum.first !== 0)
                setActorNum((prevNum) => {
                  return {
                    first: prevNum.first - 5,
                    second: prevNum.second - 5,
                  };
                });
            }}
          />
          {actors.cast.slice(actorNum.first, actorNum.second).map((actor) => {
            return (
              <Link
                to={`/actors/${actor.id}`}
                as={ReachLink}
                key={actor.id}
                _hover={{ transform: "scale(1.1)" }}
                transition="ease-in-out 0.1s"
              >
                <Flex
                  my={{ base: "3", lg: "0" }}
                  color="white"
                  bg="whiteAlpha.300"
                  mr="3"
                  direction="column"
                  key={actor.id}
                  w={{ base: "10rem", lg: "15rem" }}
                >
                  {" "}
                  <Image
                    objectFit="cover"
                    boxSize={{ base: "10rem", lg: "15rem" }}
                    src={`${imageUrl}/${actor.profile_path}`}
                    borderRadius="5px"
                    fallback={
                      <Skeleton
                        boxSize={{ base: "10rem", lg: "15rem" }}
                      ></Skeleton>
                    }
                  />{" "}
                  <Text fontSize="lg" textAlign="center" p="5">
                    {" "}
                    {actor.name}{" "}
                  </Text>
                </Flex>
              </Link>
            );
          })}{" "}
          <IconButton
            alignSelf="center"
            icon={language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            d={{ base: "none", lg: "block", md: "block" }}
            onClick={() => {
              if (actors.cast.length >= actorNum.second)
                setActorNum((prevNum) => {
                  return {
                    first: prevNum.first + 5,
                    second: prevNum.second + 5,
                  };
                });
            }}
          />
        </Flex>
      )}
      <Text
        color="whiteAlpha.900"
        my="5"
        ml="8"
        fontWeight="semibold"
        fontSize="4xl"
        letterSpacing="1px"
      >
        {t("similarMovies")}
      </Text>

      <Flex wrap="wrap" mt="5" justify="space-evenly" bg="black">
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
        {similarMovsStatus === "success" &&
          similarMovs.slice(movieNum.first, movieNum.second).map((movie) => {
            return (
              <Link
                key={movie.id}
                as={ReachLink}
                to={`/movies/movie/${movie.id}`}
                _hover={{ transform: "scale(1.1)" }}
                transition="ease-in-out 0.1s"
              >
                <Flex
                  my={{ base: "3", lg: "0" }}
                  color="white"
                  bg="whiteAlpha.300"
                  mr="3"
                  direction="column"
                  key={movie.id}
                  w={{ base: "10rem", lg: "15rem" }}
                >
                  {" "}
                  <Image
                    objectFit="cover"
                    boxSize={{ base: "10rem", lg: "15rem" }}
                    borderRadius="5px"
                    src={`${imageUrl}/${movie.poster_path}`}
                    fallback={
                      <Skeleton
                        boxSize={{ base: "10rem", lg: "15rem" }}
                      ></Skeleton>
                    }
                  />{" "}
                  <Text fontSize="lg" textAlign="center" p="5">
                    {" "}
                    {movie.title}{" "}
                  </Text>
                </Flex>
              </Link>
            );
          })}{" "}
        <IconButton
          alignSelf="center"
          icon={language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          d={{ base: "none", lg: "block", md: "block" }}
          onClick={() => {
            if (movieNum.second < 20)
              return setMovieNum((prevNum) => {
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
