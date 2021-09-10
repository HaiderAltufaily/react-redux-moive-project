import {
  Box,
  Link,
  Text,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  LinkBox,
} from "@chakra-ui/react";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReachLink } from "react-router-dom";

import { allGenres } from "../../Redux/Slices/moviesFilterSlice";

import SignIn from "./SignIn";
import UserProfile from "./UserProfile";
import AlertModal from "./Alert";

import Languages from "./Languages";
import Search from "./Search";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export default function NavBar() {
  const genresList = useSelector((state) => state.moviesFilter.allGenres.list);
  const language = Cookies.get("i18next");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allGenres(language));
  }, [language]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Box
      borderBottom="#dc6208 solid 0.2rem"
      px="10"
      h="4rem"
      bg="blackAlpha.800"
      color="white"
    >
      <Flex h="100%" align="center" justify="space-between">
        <HStack spacing="10">
          <Link mr="10" as={ReachLink} to="/">
            <Text
              letterSpacing="1px"
              as="h1"
              fontSize="lg"
              fontWeight="bold"
              rounded="full"
            >
              TMDB
            </Text>
          </Link>
          <Search />
        </HStack>

        <HStack fontSize="lg" spacing="5">
          <Link borderRadius="30px" to="/" as={ReachLink}>
            {t("home")}
          </Link>

          <Menu>
            <MenuButton> {t("movies")} </MenuButton>
            <MenuList bg="black" h="15rem" overflow="auto" fontSize="md">
              {genresList.map(
                (genre) =>
                  genre.name !== "Documentary" && (
                    <LinkBox
                      key={genre.id}
                      to={`/movies/${genre.id}`}
                      as={ReachLink}
                    >
                      <MenuItem
                        bg="whiteAlpha.300"
                        _hover={{ background: "whiteAlpha.500" }}
                        color="white"
                        key={genre.id}
                      >
                        {genre.name}{" "}
                      </MenuItem>
                    </LinkBox>
                  )
              )}
            </MenuList>
          </Menu>
          <Link to="/actors" as={ReachLink}>
            {t("actors")}
          </Link>

          {isLoggedIn ? (
            <Link to="/bookmarks" as={ReachLink}>
              {t("bookmarks")}
            </Link>
          ) : (
            <AlertModal />
          )}
        </HStack>

        {isLoggedIn && (
          <HStack>
            {" "}
            <UserProfile />
            <SignIn />
          </HStack>
        )}

        {!isLoggedIn && <SignIn />}
        <Box mr="10">
          <Languages />
        </Box>
      </Flex>
    </Box>
  );
}
