import PersonIcon from '@mui/icons-material/Person';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import './admin.css'
import { useCallback, useEffect,  useState } from 'react';
import api from '../../Interceptors/Auth';

import BubbleLoading from '../staticComponents/bubbleLoading';
import ChartArea from './adminChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Container } from 'react-bootstrap';


const AdminHome = () => {
  
   const [allPurchase,setAllPurchase]=useState();
   const [allUsers,setAllUsers]=useState();
   const [allBooks,setAllBooks]=useState();
   const[months,setMonths]=useState();
   const[pricesPerMonth,setPricesMonth]=useState();
  const [purchasedNums,setPurchasedNums]=useState();
   const[totalBooksNums,setTotalBooksNums]=useState();
   const getBooks=useCallback(async()=>{
    const res=await api.get('http://localhost:3000/admin/books')
    console.log(res)
    setAllBooks(res.data.length)
},[])
const getUsers=useCallback(async()=>{
  const res=await api.get('http://localhost:3000/admin/users')
  console.log(res)
  setAllUsers(res.data.length)
},[])
const getAllPUrchases=useCallback(async()=>{
  const res=await api.get('http://localhost:3000/admin/purchases')
  setAllPurchase(res.data.length)
},[])
const getReport=async()=>{
  const res=await api.get('http://localhost:3000/admin/report')
  if(res.data.message=='success'){
    setMonths(res.data.months)
    setPricesMonth(res.data.prices)
    console.log(res.data.prices)
  }

}
const getReportreservation=async()=>{
  const res=await api.get('http://localhost:3000/admin/reservation')
  if(res.data.message=='success'){
    setTotalBooksNums(res.data.totalQuantity)
    console.log(res.data.totalQuantity)
    setPurchasedNums(res.data.totalPurchased)
    console.log(res.data.totalPurchased)

  }

}





useEffect(()=>{
 getUsers();
 getAllPUrchases();
 getBooks();
 getReport();
 getReportreservation()
},[getAllPUrchases, getBooks, getUsers])
if(!allPurchase||!allBooks||!allUsers||!months||!pricesPerMonth) return BubbleLoading
    return (
        <>
        <div className="  p-1">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
            </div>
          </div>
          <div className="row justify-content-lg-evenly justify-content-center gap-lg-0 gap-md-3 mt-5">
            <div className="col-md-4 col-lg-3 col-10 mb-lg-0 mb-2 d-flex flex-column justify-content-between rounded-3 bg-purple-ligth p-0">
              <div className="small-box d-flex justify-content-md-around justify-content-between align-items-center p-sm-4 px-5 py-4 ">
                <div className="text-white">
                  <p className="mb-0 fs-4 fw-bold">{allPurchase}</p>
                  <p className="mb-0 fs-5">Total Purchased</p>
                </div>
                <div className="d-flex align-items-center">
                  <LocalGroceryStoreIcon style={{fontSize:'100px'}} className=" opacity-25"></LocalGroceryStoreIcon>
                </div>
              </div>
              <div className="bg-purple p-0 m-0 w-100 rounded-bottom-3 text-white text-center">
             <Link to="/reservations" className="btn border-0 text-white" >
              more info
              <InfoIcon className=" fs-6 text-white"></InfoIcon>
             </Link>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 col-10 d-flex flex-column justify-content-between mb-lg-0 mb-2 rounded-3 bg-purple-ligth p-0">
              <div className="small-box d-flex justify-content-md-around justify-content-between align-items-center px-sm-4 px-5 py-4">
                <div className="text-white">
                  <p className="mb-0 fs-4 fw-bold">{allUsers}</p>
                  <p className="mb-0 fs-5">Total Users</p>
                </div>
                <div className="d-flex align-items-center ">
                  <PersonIcon style={{fontSize:'100px'}} className=" opacity-25"></PersonIcon>
                </div>
              </div>
              <div className="bg-purple p-0 m-0 w-100 rounded-bottom-3 text-white text-center">
                <Link to="/allusers" className="btn border-0 text-white" >
                 more info
                 <InfoIcon className=" fs-6 text-white"></InfoIcon>
                </Link>
                 </div>
            </div>
            <div className="col-md-4 col-lg-3 col-10 d-flex flex-column justify-content-between col-10 mb-lg-0 mb-2 rounded-3 bg-purple-ligth p-0">
              <div className="small-box d-flex justify-content-md-around justify-content-between align-items-center px-sm-4 px-5 py-4">
                <div className="text-white">
                  <p className="mb-0 fs-4 fw-bold">{allBooks}</p>
                  <p className="mb-0 fs-5">Total Books</p>
                </div>
                <div className="d-flex align-items-center">
                  < AutoStoriesIcon style={{fontSize:'100px'}} className=" opacity-25"></AutoStoriesIcon>
                </div>
              </div>
              <div className="bg-purple p-0 m-0 w-100 rounded-bottom-3 text-white text-center">
                <Link to="/adminevents" className="btn border-0 text-white" >
                 more info
                 <InfoIcon className=" fs-6 text-white"></InfoIcon>
                </Link>
                 </div>
            </div>
          </div>
        </div>
        </div>
        <Container>

       <div className='row mt-5'> 
          <div className="col-md-6"> 
            <ChartArea pricesPerMonth={pricesPerMonth} months={months} />
          </div>
          <div className="col-md-6 "> 
            <div style={{ height: '400px' }}>
              <PieChart
                colors={['black', '#8e3a9d']}
                series={[
                  {
                    data: [
                      { id: 0, label: 'Total Purchased Numbers', value: purchasedNums, color: '#8e3a9d' },
                      { id: 1, label: 'Total Book Numbers', value: totalBooksNums, color: '#3c3c3c' }
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
        </Container>
        </>
    );
}

export default AdminHome;
