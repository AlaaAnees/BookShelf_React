import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";
function Qty({
  qty,
  setQty,
  price,
  bookQty,
  decrementFromCart,
  addToCart,
  id,
}) {
  const theme = useTheme();
  const decreamentCart = () => {
    if (qty > 0) {
      setQty((qty) => qty - 1);
      decrementFromCart(id);
    }
  };
  const increamentCart = () => {
    if (qty < bookQty) {
      setQty((qty) => qty + 1);
      addToCart(id);
    }
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Box
          sx={{
            bgcolor: grey[300],
            width: "120px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            mr: 3,
          }}
        >
          <IconButton
            onClick={decreamentCart}
            aria-label="cart"
            sx={{ color: theme.colors.text.main }}
          >
            <RemoveIcon />
          </IconButton>
          <span className="qty fs-5 mt-1">{qty}</span>
          <IconButton
            onClick={increamentCart}
            aria-label="cart"
            sx={{ color: theme.colors.text.main }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        {qty > 1 && (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "2rem",
              color: theme.colors.text.main,

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
            <span className="title">Total Price:</span>
            <span>$</span>
            {price * qty}
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default Qty;
