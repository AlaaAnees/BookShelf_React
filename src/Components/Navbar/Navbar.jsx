import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CartIcon from "./CartIcon";
import "./Navbar.css";
import BtnBg from "../Generic-components/BtnBg";

import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useApp } from "../../Contexts/appContext";
import api from "../../Interceptors/Auth";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { grey } from "@mui/material/colors";

import { BookContext } from "../../context/BookContext";
import FavIcon from "./FavIcon";

const routes = [
  { name: "Home", path: "" },
  { name: "Books", path: "/allBooks" },
];
const logo = "BookShelf";
function Navbar() {
  const { cartCount, setCartCount, fetchCart } = useContext(CartContext);
  const { setFavCount, favCount, getFavNumbers } = useContext(BookContext);

  const { logout } = useApp();
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState(null);

  // const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getToken = () => {
    return localStorage.getItem("token");
  };
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await api.get("http://localhost:3000/user/profile");
      setUser(data);
    };
    const fetchFavNumbers = async () => {
      await getFavNumbers();
    };
    fetchFavNumbers();
    fetchUser();

    // fetchFavNumbers();
  }, [getFavNumbers]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary-light shadow-sm fixed-top py-1">
        <div className="container-lg">
          <a
            className="navbar-brand color-main fw-semibold"
            href="#"
            onClick={() => navigate("/")}
          >
            {/* <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.8rem",
                "&>span": {
                  color: grey[800],
                  fontSize: "1.2rem",
                },
              }}
            >
              Book
              <span>Shelf</span>
            </Typography> */}
            <img
              src="./../../../public/new logo.png"
              style={{ maxHeight: "50px", width: "150px", borderRadius: "5px" }}
            />
          </a>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title color-main fw-semibold"
                id="offcanvasNavbarLabel"
              >
                {logo}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body align-items-center ">
              {/* Routes */}
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                {routes.map((route) => (
                  <li className="nav-item " key={route.name}>
                    <NavLink
                      className={`${({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "active"
                          : ""} nav-link `}
                      to={route.path}
                    >
                      {route.name}
                    </NavLink>
                  </li>
                ))}
                {user && (
                  <li
                    className="nav-item d-lg-none "
                    onClick={() => {
                      logout();
                      setUser(null);
                      setFavCount(0);
                      setCartCount(0);
                      navigate("/");
                    }}
                  >
                    <a className="nav-link">Log out</a>
                  </li>
                )}
              </ul>
              <Box>
                {getToken() ? (
                  <>
                    {user && (
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                        onClick={() => {
                          navigate("/profile");
                        }}
                        sx={{
                          mr: 1,
                          cursor: "pointer",
                          padding: " 4px 8px",

                          borderRadius: " 7px",
                          "&:hover": {
                            backgroundColor: theme.colors.bg.light2,
                            border: `1px solid b ${theme.colors.bg.main}`,
                          },
                        }}
                      >
                        <Avatar
                          alt="Mohamed"
                          src={`http://localhost:3000/assets/${user.image}`}
                        />
                        <Typography
                          sx={{
                            color: theme.colors.text.main,
                            fontWeight: 700,
                          }}
                        >
                          {user?.name || "Un known"}
                          {/* {user.name} */}
                        </Typography>
                      </Stack>
                    )}
                  </>
                ) : (
                  <>
                    {!user && (
                      <BtnBg
                        sx={{
                          mt: { xs: 2, lg: 0 },
                        }}
                        onClick={() => {
                          navigate("/login");
                        }}
                        label={"Sign in"}
                      />
                    )}
                  </>
                )}
              </Box>
            </div>
          </div>

          <Box
            sx={{
              ml: "auto ",
              mr: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <CartIcon count={cartCount} path={"/cart"} />
          </Box>
          <Box
            sx={{
              ml: "auto ",
              mr: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <FavIcon count={favCount} path={"/profile"} />
          </Box>
          {user && (
            <Button
              variant="contained"
              onClick={() => {
                setCartCount(0);
                logout();
                setUser(null);
                setFavCount(0);
                navigate("/");
              }}
              sx={{
                bgcolor: theme.palette.button.main,
                p: `5px 11px
          `,

                mr: 1,
                borderRadius: "7px",
                "&:hover": { backgroundColor: "#8d27ae" },
                "&:active": { backgroundColor: "#651c7d" },

                [theme.breakpoints.down("lg")]: {
                  // padding: "12px 11px",
                  // borderRadius: "7px",

                  // fontSize: "0.8rem",
                  display: "none",
                },
              }}
              disableElevation
              disableRipple
            >
              Log out
            </Button>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
