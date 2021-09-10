import { Box } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useEffect } from "react";

import { BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase/Firebase";
import { addBookmarks, removeBookmarks } from "../Redux/Slices/bookmarksSlice";
import AlertModal from "./AlertModal";
import SuccessAlert from "./SuccessAlert";

function Bookmark({ movie, size = 23, bottom = 0, top, right = 0 }) {
  const id = useSelector((state) => state.auth.userId);
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const isBooked = bookmarks.find((mov) => mov.id === movie.id);
  const [showAlert, setShowAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  useEffect(() => {
    const hideAlert = setTimeout(() => {
      setShowAlert(false);
      setShowRemoveAlert(false);
    }, 2000);
    return () => clearTimeout(hideAlert);
  }, [showAlert, bookmarks]);
  async function handleBookmark() {
    if (id) {
      if (!isBooked) {
        dispatch(addBookmarks(movie));
        await setDoc(
          doc(db, "Users", id),
          {
            bookmarks: [...bookmarks, movie],
          },
          { merge: true }
        );
      }
      setShowAlert(true);
      setShowRemoveAlert(false);
    }
  }

  async function handleRemoveBookmark(movie) {
    const userRef = doc(db, "Users", id);
    const docSnap = await getDoc(userRef);
    const bookmarks = docSnap.data().bookmarks;
    const newBookMarks = bookmarks.filter((mov) => {
      return movie.id !== mov.id;
    });
    dispatch(removeBookmarks(newBookMarks));
    await setDoc(
      doc(db, "Users", id),
      {
        bookmarks: newBookMarks,
      },
      { merge: true }
    );
    setShowRemoveAlert(true);
    setShowAlert(false);
  }

  return (
    <Box p="3" position="absolute" bottom={bottom} right={right} top={top}>
      {!isBooked ? (
        isLoggedIn ? (
          <BsBookmarkPlus
            cursor="pointer"
            onClick={() => handleBookmark(movie)}
            size={size}
          />
        ) : (
          <AlertModal size={size} />
        )
      ) : (
        <BsBookmarkFill
          onClick={() => handleRemoveBookmark(movie)}
          cursor="pointer"
          size={size}
        />
      )}
      {showAlert && <SuccessAlert text={t("add_bookmarks")} />}
      {showRemoveAlert && <SuccessAlert text={t("remove_bookmarks")} />}
    </Box>
  );
}

export default Bookmark;
