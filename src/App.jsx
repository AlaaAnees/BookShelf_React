import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { AppProvider } from "./Contexts/appContext";
import AllBooksPage from "./Pages/allBooks";
import BookContextProvider from "./context/BookContext";
import ProfilePage from "./Pages/profile";
import Join from "./Pages/Join.jsx";
import SystemLayout from "./Layout/SystemLayout.jsx";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./Contexts/CartContext";
import { ThemeProvider, createTheme } from "@mui/material";
import AdminPage from "./Pages/adminPage.jsx";
import BookDetails from "./Components/Book-details/BookDetails.jsx";
function App() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
      },
    },
    palette: {
      book: {
        main: "#8d27ae",
      },
      button: {
        main: "#8d27ae",
        hover: "#8d27ae",
        active: "#651c7d",
      },
      bg: {
        main: "#8d27ae",
      },
      text: {
        main: "#414082",
      },
    },
    colors: {
      bg: {
        main: "#8d27ae",
        light: "#f0e3f4",
        light2: "#ddc3e6",
      },
      text: {
        main: "#8d27ae",
        dark: "#414082",
        light: "#a9a8c7",
        light2: "#7e7da9",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <CartProvider>
            <BookContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<SystemLayout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>

                    <Route path="/cart" element={<CartPage></CartPage>}></Route>
                     <Route
                      path="/allBooks"
                      element={<AllBooksPage></AllBooksPage>}
                    ></Route> 
                    <Route path="/book/:id" element={<BookDetails />}></Route>
                    <Route
                      path="/profile"
                      element={<ProfilePage></ProfilePage>}
                    ></Route>
                  </Route>
                  <Route path="/admin" element={<AdminPage />}></Route>
                  <Route path="/login" element={<Join></Join>}></Route>
                </Routes>
              </BrowserRouter>
            </BookContextProvider>
          </CartProvider>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
