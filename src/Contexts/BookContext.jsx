import { createContext, useCallback, useEffect, useState } from "react";
import api from "../Interceptors/Auth";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState();
  const [originalBooks, setOriginalBooks] = useState();
  const [booksPages, setBooksPages] = useState();
  const [categories, setCategories] = useState();
  const [authors, setAuthors] = useState();
  const [search, setSearch] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [booksPerPage] = useState(20);
  const [checkedCategory, setCheckedCategory] = useState("");
  const [checkedAuthors, setCheckedAuthors] = useState("");
  const [favCount, setFavCount] = useState(0);

  const lastBookIndex = currPage * booksPerPage;
  const firstBookIndex = lastBookIndex - booksPerPage;

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get("http://localhost:3000/book/genre/all");
      setCategories(res.data);
      res.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);
  const getFavNumbers = useCallback(async () => {
    const res = await api.get("http://localhost:3000/user/favs");

    if (res.data.message === "success") {
      setFavCount(res.data.data);
    }
  }, []);

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await api.get("http://localhost:3000/book/author/all");
      setAuthors(res.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }, []);

  const fetchDataByCategory = useCallback(async (cat) => {
    try {
      const res = await api.get(`http://localhost:3000/book/genre/${cat}`);
      setOriginalBooks(res.data);
      setBooksPages(res.data);
    } catch (error) {
      console.error("Error fetching books by category:", error);
    }
  }, []);

  const fetchDataByAuthor = useCallback(async (selectedAuthor) => {
    try {
      const res = await api.get(
        `http://localhost:3000/book/author/${selectedAuthor}`
      );
      setOriginalBooks(res.data);
      setBooksPages(res.data);
    } catch (error) {
      console.error("Error fetching books by author:", error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("http://localhost:3000/book/all");

      setOriginalBooks(res.data);
      setBooksPages(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);
  // useEffect(() => {
  //   getFavNumbers();
  // }, [getFavNumbers]);

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchAuthors();
  }, [fetchData, fetchCategories, fetchAuthors]);

  useEffect(() => {
    if (checkedCategory) {
      fetchDataByCategory(checkedCategory);
    }
    if (checkedAuthors) {
      fetchDataByAuthor(checkedAuthors);
    }
  }, [checkedCategory, checkedAuthors, fetchDataByCategory, fetchDataByAuthor]);

  useEffect(() => {
    const getPagesData = () => {
      if (booksPages) {
        const currBooks = booksPages.slice(firstBookIndex, lastBookIndex);
        setBooks(currBooks);
      }
    };
    getPagesData();
  }, [booksPages, firstBookIndex, lastBookIndex]);

  useEffect(() => {
    if (search) {
      const filteredBooks = originalBooks?.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setBooksPages(filteredBooks);
      setCurrPage(1);
    } else {
      setBooksPages(originalBooks);
    }
  }, [originalBooks, search]);
  const addReview = async (comment, stars, bookId) => {
    const res = await api.post("http://localhost:3000/book/add-review", {
      bookId,
      comment,
      stars,
    });
  };

  return (
    <div>
      <BookContext.Provider
        value={{
          setCheckedAuthors,
          fetchDataByCategory,
          checkedAuthors,
          fetchDataByAuthor,
          authors,
          checkedCategory,
          setCheckedCategory,
          books,
          search,
          setSearch,
          booksPages,
          booksPerPage,
          setCurrPage,
          setBooksPages,
          currPage,
          categories,
          fetchData,
          addReview,
          originalBooks,
          favCount,
          setFavCount,
          getFavNumbers,
          getToken,
        }}
      >
        {children}
      </BookContext.Provider>
    </div>
  );
};

export default BookContextProvider;
