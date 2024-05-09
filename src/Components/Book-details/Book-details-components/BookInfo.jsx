import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import Qty from "./Qty";
import BtnBg from "../../Generic-components/BtnBg";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Contexts/CartContext";
import { BookContext } from "../../../context/BookContext";
import { useNavigate } from "react-router-dom";

function BookInfo({ book }) {
  const { decrementFromCart, addToCart, cartItems } = useContext(CartContext);
  const theme = useTheme();
  const foundBook = cartItems.filter((item) => item.book._id === book._id);
  const [qty, setQty] = useState(foundBook[0]?.quantity || 0);
  let { getToken } = useContext(BookContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!getToken()) {
      navigate("/login");
    } else {
      if (!qty) {
        setQty((qty) => qty + 1);
        addToCart(book._id);
      }
    }
  };

  return (
    <>
      {" "}
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: theme.colors.text.dark,
            mb: 3,
            transition: "all .15s ease-in-out",
            fontSize: { xs: "2.5rem", xl: "3rem" },
          }}
          component="h2"
        >
          {book.title}
        </Typography>

        <Typography
          sx={{
            color: "#7e7da9",
            fontSize: "1.2rem",
            mb: 3,
          }}
          component="p"
        >
          {book.shortDescription}
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: theme.colors.text.dark,
              fontWeight: 700,
              fontSize: "1.2rem",
              mr: 2,
            }}
            component="p"
          >
            Category:
          </Typography>
          {book.categories.map((ctgry) => (
            <Chip
              label={ctgry}
              key={ctgry}
              sx={{
                bgcolor: theme.colors.text.light,
                color: theme.colors.text.dark,
              }}
            />
          ))}
        </Stack>

        <Typography
          sx={{
            color: theme.colors.text.dark,
            fontWeight: 700,
            fontSize: "1.2rem",
            mb: 1,
            "&>span": { color: theme.colors.text.light },
          }}
          component="p"
        >
          Publish Date:{" "}
          <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
        </Typography>
        <Typography
          sx={{
            color: theme.colors.text.dark,
            fontWeight: 700,
            fontSize: "1.2rem",
            mb: 3,
            "&>span": { color: theme.colors.text.light },
          }}
          component="p"
        >
          Number of Pages: <span>{book.pageCount}</span>
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "2.4rem",
            color: theme.colors.text.main,
            mb: 3,
            "&>span": {
              fontSize: "1.4rem",
              color: theme.colors.text.light,
            },
            "& > .title": {
              fontSize: "1.6rem",
              color: theme.colors.text.dark,
              mr: 1,
            },
          }}
          component="p"
        >
          <span className="title">Price:</span>
          <span>$</span>
          {book.price}
        </Typography>
        {/* Quantity buttons */}
        {!!qty && (
          <Qty
            id={book._id}
            decrementFromCart={decrementFromCart}
            addToCart={addToCart}
            qty={qty}
            price={book.price}
            setQty={setQty}
            bookQty={book.quantity}
          />
        )}
        {!qty && (
          <BtnBg onClick={handleClick} label={"Add To Cart"} sx={{ mt: 1 }} />
        )}
      </Box>
    </>
  );
}

export default BookInfo;
