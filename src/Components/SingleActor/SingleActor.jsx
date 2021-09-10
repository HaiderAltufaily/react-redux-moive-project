import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Spinner,
  IconButton,
  LinkBox,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getActorDetails,
  getActorMovies,
  getEnglishActor,
} from "../../Redux/Slices/actorsSlice";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const imageUrl = "https://image.tmdb.org/t/p/w500/";
export default function SingleActor() {
  const { t } = useTranslation();
  const language = Cookies.get("i18next");

  const [movieNum, setMovieNum] = useState({
    first: 0,
    second: 5,
  });
  const { actorId } = useParams();
  const dispatch = useDispatch();
  const actor = useSelector((state) => state.actors.actorDetails.list);
  const actorStatus = useSelector((state) => state.actors.actorDetails.status);
  const actorMovies = useSelector((state) => state.actors.actorMovies.list);
  const actorMoviesStatus = useSelector(
    (state) => state.actors.actorMovies.status
  );
  const englishActor = useSelector((state) => state.actors.englishActor.list);

  useEffect(() => {
    dispatch(getActorDetails({ actorId, language }));
    dispatch(getActorMovies({ actorId, language }));
    dispatch(getEnglishActor({ actorId }));
    setMovieNum({
      first: 0,
      second: 5,
    });
  }, [actorId]);

  if (actorMoviesStatus !== "success" || actorStatus !== "success")
    return (
      <Stack align="center" justify="center" bg="black" h="100vh">
        <Spinner size="xl" color="white" />
      </Stack>
    );

  return (
    <Box p="6" bg="black" minH="100vh">
      <Flex direction={["column,row,row,row"]}>
        <Image
          borderRadius="10px"
          h="lg"
          fallback={<Skeleton boxSize="lg"></Skeleton>}
          src={`${imageUrl}/${actor.profile_path}`}
        />
        <Flex
          bg="whiteAlpha.500"
          color="white"
          p="5"
          direction="column"
          borderRadius="10px"
          ml="5"
          w="50%"
          h="lg"
          boxShadow="lg"
        >
          <Stack borderBottom="#dc6208 solid 0.2rem">
            <Text
              textAlign={"left"}
              fontWeight="bold"
              fontSize="4xl"
              flexBasis="20%"
            >
              {actor.name}
            </Text>
            <Flex justify="space-between">
              <Text fontSize="lg" color="gray.200">
                {" "}
                {t("birthday")}: {actor.birthday}{" "}
              </Text>{" "}
              <Text>
                {" "}
                {t("popularity")}: {actor.popularity}{" "}
              </Text>
              {actor.deathday && (
                <Text fontSize="lg" color="gray.200">
                  {t("deathDay")}: {actor.deathday}
                </Text>
              )}
            </Flex>
          </Stack>
          <Stack overflow="hidden" justify="space-evenly" flexBasis="80%">
            <Text
              textAlign={
                actor.biography && language === "ar" ? "right" : "left"
              }
              p="5"
              fontWeight="semibold"
              fontSize="lg"
              color="white"
            >
              {actor.biography
                ? actor.biography?.slice(0, 1000) + "..."
                : englishActor.biography?.slice(0, 1000) + "..."}
            </Text>{" "}
          </Stack>
        </Flex>

        {actorMovies.cast && (
          <Image
            borderRadius="10px"
            ml="5"
            h="lg"
            fallback={<Skeleton boxSize="lg"></Skeleton>}
            src={`${imageUrl}/${actorMovies?.cast[0]?.poster_path}`}
          />
        )}
      </Flex>
      <Text
        color="whiteAlpha.900"
        my="5"
        ml="8"
        fontWeight="semibold"
        fontSize="4xl"
        letterSpacing="1px"
      >
        {t("movies")}
      </Text>
      <Flex mt="5" justify="space-evenly" bg="black">
        <IconButton
          alignSelf="center"
          mr="3"
          icon={language === "ar" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
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
        {actorMovies.cast &&
          actorMovies.cast
            .slice(movieNum.first, movieNum.second)
            .map((movie) => {
              return (
                <LinkBox
                  to={`/movies/movie/${movie.id}`}
                  as={ReachLink}
                  key={movie.id}
                  _hover={{ transform: "scale(1.1)" }}
                  transition="ease-in-out 0.1s"
                >
                  <Flex
                    direction="column"
                    w="15rem"
                    color="white"
                    bg="whiteAlpha.300"
                    mr="3"
                  >
                    {" "}
                    <Image
                      boxSize="15rem"
                      src={`${imageUrl}/${movie.poster_path}`}
                      borderRadius="5px"
                      fallback={<Skeleton boxSize="15rem"></Skeleton>}
                    />{" "}
                    <Stack minH="3rem" justify="center" align="center">
                      <Text fontSize="lg" textAlign="center">
                        {" "}
                        {movie.title}{" "}
                      </Text>
                    </Stack>
                  </Flex>
                </LinkBox>
              );
            })}{" "}
        <IconButton
          alignSelf="center"
          icon={language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          onClick={() => {
            if (actorMovies.cast.length >= movieNum.second)
              setMovieNum((prevNum) => {
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
