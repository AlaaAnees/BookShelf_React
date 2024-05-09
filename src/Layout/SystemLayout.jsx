import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Box } from "@mui/material";

function SystemLayout() {
  return (
    <>
      <Navbar />
      <Box sx={{ pt: "72px" }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default SystemLayout;
