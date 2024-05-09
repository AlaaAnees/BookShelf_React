
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { BookContext } from '../../../context/BookContext';
import './pagination.css';

export default function PaginationOutlined() {
  const { booksPages, booksPerPage, setCurrPage, currPage } = useContext(BookContext);

  const totalPages = Math.ceil(booksPages?.length / booksPerPage);

  const handlePageChange = (event, value) => {
    setCurrPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} page={currPage} onChange={handlePageChange} />
    </Stack>
  );
}
