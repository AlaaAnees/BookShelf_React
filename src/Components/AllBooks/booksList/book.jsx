import { useCallback, useContext, useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";
import classes from "./book.module.css";

import api from "../../../Interceptors/Auth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Contexts/CartContext";
import { BookContext } from "../../../context/BookContext";
const Book = (props) => {
  const [showIcons, setShowIcons] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const { fetchCart } = useContext(CartContext);
  const { favCount, setFavCount, getToken } = useContext(BookContext);
  const navigate = useNavigate();
  const checkFav = useCallback(async () => {
    try {
      const bookId = props._id;
      const response = await api.post(
        "http://localhost:3000/user/check-favourite",
        { bookId }
      );
      if (response.data.favourited === true) {
        setIsAddedToFav(true);
      } else {
        setIsAddedToFav(false);
      }
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  }, [props._id]);
  const checkCart = useCallback(async () => {
    try {
      const response = await api.get("http://localhost:3000/cart");
      response.data.cart.map((item) => {
        item.book._id == props._id
          ? setIsAddedToCart(true)
          : setIsAddedToCart(false);
      });
    } catch (error) {
      console.error("Error checking cart:", error);
    }
  }, [props._id]);
  useEffect(() => {
    checkFav();
    checkCart();
  }, [checkCart, checkFav]);

  const handleMouseEnter = () => {
    setShowIcons(true);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };

  const handleAddFav = async () => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    const bookId = props._id;

    if (!isAddedToFav) {
      try {
        await api.post("http://localhost:3000/user/add-favourite", { bookId });
        setIsAddedToFav(true);
        setFavCount(favCount + 1);
      } catch (error) {
        console.error("Error adding item to favorite", error);
      }
    } else {
      try {
        await api.post("http://localhost:3000/user/delete-favourite", {
          bookId,
        });
        setFavCount(favCount - 1);
        setIsAddedToFav(false);
      } catch (error) {
        console.error("Error removing item to favorite", error);
      }
    }
  };
  const handleAddCart = async () => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    const bookId = props._id;

    if (!isAddedToCart) {
      try {
        await api.post("http://localhost:3000/cart/add-book", { bookId });
        setIsAddedToCart(true);
        fetchCart();
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      try {
        const bookId = props._id;
        const res = await api.patch(
          "http://localhost:3000/cart/decrement-book",
          { bookId }
        );

        setIsAddedToCart(false);
        fetchCart();
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const handleView = () => {
    if (!getToken()) {
      navigate("/login");
    } else {
      navigate(`/book/${props._id}`);
    }
  };
  return (
    <div
      className={classes.bookContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.bookImageContainer}>
        <img
          className={classes.bookImage}
          src={props.thumbnailUrl}
          alt="book image"
        />
        {showIcons && (
          <div className={classes.overlayIcons}>
            <div
              className={
                isAddedToFav
                  ? `${classes.iconContainer} ${classes.iconContainerAdded}`
                  : classes.iconContainer
              }
            >
              <BsFillHeartFill
                className={
                  isAddedToFav ? `${classes.iconActive}` : `${classes.icon}`
                }
                onClick={handleAddFav}
              />
            </div>
            <div
              className={
                isAddedToCart
                  ? `${classes.iconContainer} ${classes.iconContainerAdded}`
                  : classes.iconContainer
              }
            >
              <ShoppingCartIcon
                className={
                  isAddedToCart ? `${classes.iconActive}` : `${classes.icon}`
                }
                onClick={handleAddCart}
              ></ShoppingCartIcon>
            </div>
            <div className={classes.iconContainer}>
              <RemoveRedEyeIcon className={classes.icon} onClick={handleView} />
            </div>
          </div>
        )}
      </div>
      <div className={classes.bookInfo}>
        <div
          className="d-flex"
          style={{ justifyContent: "start", alignItems: "center" }}
        >
          <StarIcon sx={{ color: "#fe7a01", fontSize: "22px" }} />
          <span style={{ margin: "0 10px", fontSize: "12px" }}>
            {isNaN(
              (
                props.review.reduce((acc, curr) => acc + curr.stars, 0) /
                props.review.length
              ).toFixed(1)
            )
              ? 0
              : (
                  props.review.reduce((acc, curr) => acc + curr.stars, 0) /
                  props.review.length
                ).toFixed(1)}
          </span>
          <span>|</span>
          <span style={{ margin: "0 10px", fontSize: "12px" }}>
            {props.review.length} reviews
          </span>
        </div>
        {/*  background-color: var(--dark-purple); */}
        <div className="d-flex flex-column" style={{ maxWidth: "300px" }}>
          <span
            style={{
              color: "var(--text-color)",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {props.categories[0]}
          </span>

          <span
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {props.title}
          </span>
          <span style={{ color: "var(--gray-font)", fontSize: "12px" }}>
            {props.authors[0]}
          </span>
          <span style={{ fontWeight: "bold" }}>${props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
