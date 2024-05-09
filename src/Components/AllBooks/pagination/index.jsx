import Pagination from '@mui/material/Pagination';

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
    <div className="pagination-container">
        <Pagination sx={{marginBottom:'20px'}} size='large' variant="outlined"  shape="rounded"  count={totalPages} page={currPage} onChange={handlePageChange} color="secondary" />

    </div>
  );
}
