import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";

import "./Footer.css";
import FooterIcons from "./FooterIcons";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
function Footer() {
  const theme = useTheme();
  const navigate = useNavigate();
  let items1 = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/allBooks" },
    { name: "Favourite", path: "/profile" },
    { name: "Profile", path: "/profile" },
    { name: "Cart", path: "/cart" },
  ];
  let items2 = [
    "45B MiddleTown St., Cairo",
    " 67890, cairo",
    "123-456-7890",
    "Terms",
    "Privecy Policy",
  ];

  return (
    <>
      <Box
        className="shadow-lg"
        sx={{ mt: 5, pt: 5, pb: 4, bgcolor: theme.colors.bg.light }}
        component={"footer"}
      >
        <div className="container">
          <Grid container>
            <Grid item md={6} lg={4}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  color: theme.colors.text.main,
                  "&>span": {
                    color: grey[800],
                    fontSize: "1.2rem",
                  },
                }}
              >
                Book
                <span>Shelf</span>
              </Typography>

              <Typography
                variant="body2"
                component="h2"
                sx={{ "&>span": { color: theme.colors.text.main } }}
              >
                Millions of books at your fingertips! <span>BookShelf</span>'s
                website lets you browse by genre, search for favorites, and get
                personalized picks. Secure checkout and speedy delivery bring
                your next literary escape right to your door.
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, my: 2 }}
                component="h2"
              >
                Follow Us
              </Typography>
              <FooterIcons />
            </Grid>

            <Grid item xs={12} md={6} lg={4} sx={{ px: { lg: 3, xs: 0 } }}>
              {/* Links grid */}
              <Grid container>
                <Grid item xs={6}>
                  <Stack spacing={0}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700 }}
                      component="h2"
                    >
                      Explore
                    </Typography>
                    {items1.map((item) => (
                      <Typography
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        variant="subtitle2"
                        sx={{
                          mb: "4px",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                            color: theme.colors.text.main,
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700 }}
                      component="h2"
                    >
                      BookShelf
                    </Typography>
                    {items2.map((item) => (
                      <Typography
                        key={item}
                        variant="subtitle2"
                        sx={{ mb: "4px" }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} lg={4}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Don't miss the newest books
                </Typography>
                <Typography variant="body2">
                  Get the latest news and information about your favorite
                  authors or books
                </Typography>
              </Box>

              <Stack direction={"row"} sx={{ mt: 2 }}>
                <input
                  type="text"
                  placeholder="Enter your email here"
                  className="subscription-input"
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#8d27ae",
                    p: "14px",
                    borderRadius: "12px",
                    "&:hover": { backgroundColor: "#8d27ae" },
                    "&:active": { backgroundColor: "#651c7d" },
                    [theme.breakpoints.down("sm")]: {
                      padding: "12px 11px",
                      borderRadius: " 12px",

                      fontSize: "0.8rem",
                    },
                  }}
                  disableElevation
                  disableRipple
                >
                  Subscribe
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}

export default Footer;
