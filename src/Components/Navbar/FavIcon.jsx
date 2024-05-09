import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function FavIcon({ count = 0, path }) {
  return (
    <Link to={"/profile"}>
      <IconButton aria-label="favorite">
        <StyledBadge badgeContent={count} color="secondary">
          <FavoriteIcon fontSize="large" />
        </StyledBadge>
      </IconButton>
    </Link>
  );
}

export default FavIcon;
