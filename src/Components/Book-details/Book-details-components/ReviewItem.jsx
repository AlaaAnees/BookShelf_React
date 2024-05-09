import { Rating, styled } from "@mui/material";

function ReviewItem({ theme, value }) {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: theme.colors.bg.main,
    },
    emptyStar: {
      color: "green",
    },
    "& .MuiRating-iconHover": {
      color: theme.colors.bg.dark,
    },
  });
  return <StyledRating defaultValue={value} sx={{ mb: 2 }} readOnly />;
}

export default ReviewItem;
