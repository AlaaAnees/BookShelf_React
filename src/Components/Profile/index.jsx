import { Container, Table, Button, Modal, Box, Typography, TableCell, TableBody, TableRow, TableHead, TableContainer, Snackbar,  Alert } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import api from '../../Interceptors/Auth';
import classes from './profile.module.css';
import BubbleLoading from '../staticComponents/bubbleLoading';
 
import Review from './Review';
import { BookContext } from '../../context/BookContext';

const Profile = () => {
  
  const [user, setUser] = useState();
  const [showReviewModal, setShowReviewModal] = useState(false); 
  const [selectedBookId, setSelectedBookId] = useState(null); 
  const [showSnackbar, setShowSnackbar] = useState(false);
  const[bookName,setBookName]=useState();
  const[allFavs,setAllFavs]=useState();
  const { favCount,setFavCount } = useContext(BookContext);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  const fetchData = async () => {
    const res = await api.get('http://localhost:3000/user/profile');
    setUser(res.data);
  };
  useEffect(() => {
 
    const fetchFavs = async () => {
      const res = await api.get('http://localhost:3000/user/allfavs');
      setAllFavs(res.data.data);
    
    };
    fetchData();
    fetchFavs();
  }, [setUser]);
  const handleCloseModal = () => {
    setShowReviewModal(false);
  };
  const removeFav = async (bookId) => {
    console.log("book",bookId)
    const res = await api.post('http://localhost:3000/user/delete-favourite',{bookId});
    console.log(res)
    if(res){
setFavCount(favCount-1)
setAllFavs(prevFavs => prevFavs.filter(item => item._id !== bookId));
    } 
  };
  const addReview = (bookId,bookName) => {
    setSelectedBookId(bookId); 
    setBookName(bookName)
 
    setShowReviewModal(true); 
  };

  if (!user) return <BubbleLoading/>;

  return (
    <Container className={classes.profileContainer}>
           <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Review added successfully!
        </Alert>
        
      </Snackbar>
      
      <div className={classes.profileHeader}>
        <div className={`mb-3 ${classes.userImage}`}>
          <img src={`http://localhost:3000/assets/${user.image}`} alt="Profile Image" className={classes.profileImage} />
        </div>
        <h1 className="user-name display-2">{user?.name}</h1>
        <p className="user-email fs-5">{user?.email}</p>
      </div>
      <div className="user-books">
        <h2 className="text-center mb-4 mt-5 fs-1">My Books</h2>
        <div className="table-responsive">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.purchased?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.book.title}</TableCell>
                    <TableCell>{item.book.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{new Date(item.date).toISOString().split('T')[0]}</TableCell>
                    <TableCell>
                      <Button
                        className={classes.reviewBtn}
                        onClick={() => addReview(item.book._id,item.book.title)}
                      >
                        Add Review
                        
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="user-favs">
        <h2 className="text-center mb-4 mt-5 fs-1">My Favorits</h2>
        <div className="table-responsive">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Page Count</TableCell>

                
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allFavs?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.pageCount}</TableCell>
                  
                    <TableCell>
                      <Button
                        className={classes.reviewBtn}
                        
                        onClick={() => removeFav(item._id)}
                      >
                       Remove
                        
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
 
      <Modal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)} 
      >
        <Box className={classes.modalContainer}>
          <Typography sx={{textAlign:'center', fontWeight:'bold'}}  variant="h6" gutterBottom>
            Add Review on {bookName} Book
          </Typography>
         
          <Typography id="modal-modal-description" sx={{ }}>
      <Review handleCloseModal={handleCloseModal} bookId={selectedBookId} setShowSnackbar={setShowSnackbar}/>
    </Typography>
      
         
        </Box>
      </Modal>
    </Container>
  );
};

export default Profile;
