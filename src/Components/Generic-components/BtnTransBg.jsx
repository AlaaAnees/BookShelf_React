import { Button, useTheme } from "@mui/material";

function BtnTransBg({ label, mr, ml, mt, mb, m, sx, onClick: handleClick }) {
  const theme = useTheme();

  return (
    <>
      <Button
        onClick={handleClick}
        variant="containd"
        sx={{
          bgcolor: "transparent",
          p: `8px 16px  `,
          mr,
          ml,
          mt,
          mb,
          m,
          borderRadius: "7px",
          border: `1px solid ${theme.palette.button.main}`,
          color: theme.palette.button.main,
          "&:hover": {
            backgroundColor: "#8d27ae",
            color: "#fff",
            border: "1px solid transparent",
          },
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

export default BtnTransBg;
