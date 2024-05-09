import { Box, Typography } from "@mui/material";
import ReviewItem from "./ReviewItem";

function Review({ theme, review }) {
  return (
    <Box
      sx={{
        width: "80%",
        mx: { lg: "auto" },
        mr: { xs: "auto" },
        mb: 3,

        borderBottom: `1px solid ${theme.colors.text.light}`,
      }}
    >
      <ReviewItem theme={theme} value={review?.stars || 4} />
      <Typography
        sx={{
          color: theme.colors.text.dark || "#7e7da9",
          fontSize: "1.2rem",
          mb: 1,
        }}
        component="p"
      >
        {review?.comment ||
          ` Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste est,
        itaque corrupti tenetur blanditiis minima?`}
      </Typography>
      <Typography
        sx={{
          color: theme.colors.text.dark || "#7e7da9",
          fontSize: "1.2rem",
          fontWeight: 700,
          mb: 1,
        }}
        component="p"
      >
        {review?.userName || `Mohamed Mounir`}
      </Typography>
    </Box>
  );
}

export default Review;
