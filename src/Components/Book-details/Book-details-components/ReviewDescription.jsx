import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Review from "./Review";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
function ReviewDescription({ theme, book }) {
  const [route, setRout] = useState("desc");
  // book.review = [
  //   {
  //     userName: "mounir",
  //     comment: "lorem tetste lorem tetste lorem tetste lorem tetste",
  //     stars: 3,
  //   },
  //   {
  //     userName: "mounir",
  //     comment: "lorem tetste lorem tetste lorem tetste lorem tetste",
  //     stars: 3,
  //   },
  //   {
  //     userName: "mounir",
  //     comment: "lorem tetste lorem tetste lorem tetste lorem tetste",
  //     stars: 3,
  //   },
  // ];
  return (
    <>
      <div className="container">
        <Grid
          container
          sx={{
            my: 5,
            [theme.breakpoints.up("xs")]: {
              borderTop: "none",
            },
            [theme.breakpoints.up("lg")]: {
              borderTop: `1px solid ${theme.colors.text.light}`,
            },
          }}
        >
          <Grid
            item
            xs={12}
            lg={3}
            sx={{
              [theme.breakpoints.up("xs")]: {
                borderBottom: `1px solid ${theme.colors.text.light}`,
                borderRight: "none",
                padding: 2,
                pl: 0,
              },
              [theme.breakpoints.up("lg")]: {
                padding: 4,
                borderBottom: "none",
                borderRight: `1px solid ${theme.colors.text.light}`,
              },
            }}
          >
            <Stack
              spacing={2}
              direction={{ xs: "row", lg: "column" }}
              sx={{ alignItems: { xs: "center", lg: "start" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "42px",
                  width: "182px",
                }}
              >
                <Typography
                  onClick={() => setRout("desc")}
                  sx={{
                    transition: "all .15s ease-in-out",
                    cursor: "pointer",
                    color: theme.colors.text.dark,
                    fontWeight: 700,
                    fontSize: route === "desc" ? "1.8rem" : "1.5rem",
                    opacity: route === "desc" ? 1 : 0.8,
                  }}
                  component="p"
                >
                  Description
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "42px",
                  width: "149px",
                }}
              >
                <Typography
                  onClick={() => setRout("review")}
                  sx={{
                    transition: "all .15s ease-in-out",
                    cursor: "pointer",
                    color: theme.colors.text.dark,
                    fontWeight: 700,
                    fontSize: route === "review" ? "1.8rem" : "1.5rem",
                    opacity: route === "review" ? 1 : 0.8,
                  }}
                  component="p"
                >
                  Reviews
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            lg={9}
            p={4}
            sx={{
              [theme.breakpoints.down("lg")]: {
                px: 0,
              },
            }}
          >
            {route == "desc" && (
              <Typography
                sx={{
                  color: "#7e7da9",
                  fontSize: "1.2rem",
                }}
                component="p"
              >
                {book.longDescription}
              </Typography>
            )}
            {route === "review" && (
              <>
                {book.review.length ? (
                  book.review.map((rev) => (
                    <Review review={rev} theme={theme} key={rev} />
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: theme.colors.text.dark,
                      fontSize: "1.8rem",
                    }}
                  >
                    <ErrorOutlineIcon />
                    <Typography>There's no reviews</Typography>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ReviewDescription;
