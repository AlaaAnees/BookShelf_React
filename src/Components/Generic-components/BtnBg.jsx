import { Button, useTheme } from "@mui/material";

function BtnBg({ label, mr, ml, mt, mb, m, sx, onClick: handleClick }) {
  const theme = useTheme();

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: theme.palette.button.main,
          p: `8px 16px
          `,
          mr,
          ml,
          mt,
          mb,
          m,
          borderRadius: "7px",
          "&:hover": { backgroundColor: "#8d27ae" },
          "&:active": { backgroundColor: "#651c7d" },
          [theme.breakpoints.down("sm")]: {
            padding: "12px 11px",
            borderRadius: "7px",

            fontSize: "0.8rem",
          },
          ...sx,
        }}
        disableElevation
        disableRipple
      >
        {label}
      </Button>
    </>
  );
}

export default BtnBg;
