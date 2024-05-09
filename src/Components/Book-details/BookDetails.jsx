import { Box, Grid, useTheme } from "@mui/material";

import BookInfo from "./Book-details-components/BookInfo";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ReviewDescription from "./Book-details-components/ReviewDescription";

function BookDetails() {
  const theme = useTheme();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const getBookById = useCallback(async (id) => {
    try {
      let { data } = await axios.get(`http://localhost:3000/book/id/${id}`);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  });
  useEffect(() => {
    getBookById(id).then((data) => setBook(data));
  }, []);

  if (!book) return <div>Loading....</div>;
  return (
    <>
      <div className="container">
        <Box sx={{ my: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  "&>img": {
                    transition: "all .15s ease-in-out",
                    height: { xs: "320px", md: "340px" },
                    width: { xs: "226px", md: "233px" },
                  },
                  textAlign: "start",
                }}
              >
                <img src={book.thumbnailUrl} alt="" />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <BookInfo book={book} />
            </Grid>
          </Grid>
          <ReviewDescription book={book} theme={theme} />
        </Box>
      </div>
    </>
  );
}

export default BookDetails;
