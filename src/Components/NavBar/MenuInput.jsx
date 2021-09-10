import React, { useEffect } from "react";
import { Box, useMenuItem, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  emptySearchResults,
  getSearchResult,
  setSearchValue,
} from "../../Redux/Slices/searchSlice";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
const language = Cookies.get("i18next");
const navigationKeys = ["ArrowUp", "ArrowDown", "Escape"];

const MenuInput = (props) => {
  const { t } = useTranslation();
  const searchValue = useSelector((state) => state.search.searchValue);
  useEffect(() => {
    if (searchValue !== "")
      dispatch(getSearchResult({ searchValue, language }));
    else dispatch(emptySearchResults());
  }, [searchValue]);

  const dispatch = useDispatch();
  const { role, ...rest } = useMenuItem(props);

  return (
    <Box px="3" role={role}>
      <Input
        placeholder={t("search_movies")}
        color="white"
        bg="whiteAlpha.300"
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        size="md"
        autoComplete="false"
        {...rest}
        onKeyDown={(e) => {
          if (!navigationKeys.includes(e.key)) {
            e.stopPropagation();
          }
        }}
      />
    </Box>
  );
};
export default MenuInput;
