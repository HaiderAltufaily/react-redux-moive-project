import { SearchIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuItem,
  Button,
  MenuList,
  Link,
  MenuDivider,
  Image,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import React from "react";
import MenuInput from "./MenuInput";
import { useDispatch, useSelector } from "react-redux";
import { emptySearchResults } from "../../Redux/Slices/searchSlice";
import { useTranslation } from "react-i18next";
const imageUrl = "https://image.tmdb.org/t/p/w500/";
function Search() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchResults = useSelector((state) => state.search.searchResult.list);
  return (
    <Menu>
      <MenuButton
        bg="transparent"
        color="white"
        leftIcon={<SearchIcon />}
        as={Button}
        _hover={{ background: "transparent" }}
        _active={{ background: "transparent" }}
        outline="none"
        border="none"
      >
        {t("search")}
      </MenuButton>
      <MenuList p="3" bg="black" w="25rem">
        <MenuInput />
        <MenuDivider />
        {searchResults.slice(0, 4).map((movie) => (
          <Link
            to={`/movies/movie/${movie.id}`}
            as={ReachLink}
            _hover={{ textDecoration: "none", color: "gray" }}
            key={movie.id}
          >
            <MenuItem
              p="0"
              my="1"
              _hover={{ background: "none", textDecoration: "none" }}
            >
              <Flex
                w="100%"
                my="2"
                onClick={() => dispatch(emptySearchResults())}
              >
                <Image
                  boxSize="5rem"
                  src={`${imageUrl}/${movie.poster_path}`}
                />
                <Box p="4" w="100%" bg="whiteAlpha.300">
                  <Text as="h1">{movie.title}</Text>
                </Box>
              </Flex>{" "}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}

export default Search;
