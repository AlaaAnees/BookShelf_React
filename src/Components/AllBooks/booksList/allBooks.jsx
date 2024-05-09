import { useContext } from 'react';
import { BookContext } from '../../../context/BookContext';
import BubbleLoading from '../../staticComponents/bubbleLoading';
import { Container } from 'react-bootstrap';
import { Grid } from '@mui/material';
import Book from './book';
import Index from '../pagination';

const AllBooks = () => {
    const { books, search, originalBooks } = useContext(BookContext);
    
    if (!books) return <div><BubbleLoading></BubbleLoading></div>;

    let booksToRender = books;
    if (search) {
        booksToRender = books.filter(book =>
            book.title.toLowerCase().includes(search.toLowerCase())
        );
        
    }

    return (
        <div>
            <div className='fw-bold'><h2>Books</h2></div>
             <span style={{color:'var(--gray-font)'}} className='fs-6'>over {originalBooks.length-5}+ books available here, find it now!</span> 
            <Container maxwidth="lg" style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
           
                <Grid container spacing={3}>
                    {booksToRender.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book._id} >
                            <Book {...book} />
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={12} md={12}>
                        <Index />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default AllBooks;
