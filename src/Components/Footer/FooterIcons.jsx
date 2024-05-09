import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, IconButton, Stack } from "@mui/material";
import "./Footer.css";
import styled from "@emotion/styled";

const IconButtonCust = styled(IconButton)(({ theme }) => ({
  color: "#8d27ae",
  border: "1px solid #d877f9",
  transition: "all .15s ease-in-out",
  "&:hover": {
    backgroundColor: "#8d27ae",
    color: "#fff",
  },
}));

function FooterIcons() {
  return (
    <>
      <Stack direction={"row"} spacing={1} sx={{ mb: 2 }}>
        <IconButtonCust aria-label="delete">
          <FacebookRoundedIcon fontSize="inherit" />
        </IconButtonCust>
        <IconButtonCust aria-label="delete">
          <YouTubeIcon fontSize="inherit" />
        </IconButtonCust>
        <IconButtonCust aria-label="delete">
          <TwitterIcon fontSize="inherit" />
        </IconButtonCust>
        <IconButtonCust aria-label="delete">
          <LinkedInIcon fontSize="inherit" />
        </IconButtonCust>
        <IconButtonCust aria-label="delete">
          <InstagramIcon fontSize="inherit" />
        </IconButtonCust>
      </Stack>
    </>
  );
}

export default FooterIcons;
