import React, { useContext, useState } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import BookCard from "./../Components/bookCard";
import axios from "axios";
import { useEffect } from "react";
import { Opacity } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import EmblaCarouselReact from "embla-carousel-react";
import CategorieCard from "../Components/CategorieCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ButtonMui from "@mui/material/Button";
import { Link } from "react-router-dom";
import api from "./../Interceptors/Auth";
import BubbleLoading from "../Components/staticComponents/bubbleLoading";
import { CartContext } from "../Contexts/CartContext";

const Home = () => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  let [books, setBooks] = useState([]);
  var items = [
    {
      img: "eliabe-costa-tzsUJD0TGkk-unsplash.jpg",
      header: "Find over 100 K Books on Book Shelf.",
      paragraph:
        "Join the community of readers at Book Shelf and discover the joy of losing yourself in a good book.",
    },
    {
      img: " https://plus.unsplash.com/premium_photo-1661964153042-56211a8e2d0b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      header: "Find Inspiration on Every Page at Book Shelf .",
      paragraph:
        "Step into Book Shelf Bookstore and immerse yourself in a world of literature. ",
    },
    {
      img: " https://images.unsplash.com/photo-1573712926064-296255051fbd?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      header: "Dive into a World of Knowledge with Book Shelf.",
      paragraph:
        " Book Shelf, where every book is a doorway to adventure, knowledge, and inspiration. Explore our vast collection and embark on journeys beyond imagination",
    },
  ];
  var categories = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Ykrp-qg_qg3GhT_czXbHIGvFTVTE7nihxUkSXb-6FA&s",
      title: "Artistry ",
    },
    {
      img: "https://images.unsplash.com/photo-1588072432904-843af37f03ed?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Children",
    },
    {
      img: "https://images.unsplash.com/photo-1619819583905-2d5228bf4560?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2tib29rfGVufDB8fDB8fHww",
      title: "Recipe",
    },
    {
      img: "https://images.unsplash.com/photo-1599901723404-e38e7192b930?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0",
      title: "Novels",
    },
    {
      img: "https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mystrey",
    },
  ];

  //Getting data from API in useEffext
  useEffect(() => {
    axios.get("http://localhost:3000/book/all").then((res) => {
      setBooks(res.data);
    });
  }, []);

  // let addToCart = (bookId) => {
  //   api
  //     .post("http://localhost:3000/cart/add-book", { bookId })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log("error is +" + error);
  //     });
  // };
  const { addToCart } = useContext(CartContext);

  const items2 = [
    <div className="item" data-value="1">
      <div className="container">
        <div className="img">
          <img
            className="imgOmar"
            src={books[0]?.thumbnailUrl}
            style={{
              maxHeight: "350px",
              maxWidth: "1250px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="container">
          <Rating
            name="simple-controlled "
            style={{ marginTop: "10%" }}
            value={
              books[0]?.review.length == 0
                ? 0
                : books[0]?.review.reduce((acc, curr) => acc + curr.stars, 0) /
                  books[0]?.review.length
            }
            readOnly
          />

          <h5
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {books[0]?.title}
          </h5>
          <p style={{ color: "#8f8f8f" }}>{books[0]?.authors[0]}</p>
        </div>
        <div className="container">
          <div
            style={{
              backgroundColor: "#eedff4",
              padding: "5px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              marginTop: "15%",
            }}
          >
            <p className="mt-3">{books[0]?.price} $</p>
            <div className="icon d-flex justify-content-end  align-items-center">
              <Link to={"book/" + books[0]?._id}>
                <img
                  className="imgOmar"
                  src="./../../public/Icons/more.png"
                  style={{
                    maxWidth: "46px",
                    maxHeight: "46px",
                    borderRaduis: "50%",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div className="item" data-value="2">
      <div className="container">
        <div className="img">
          <img
            className="imgOmar"
            src={books[1]?.thumbnailUrl}
            style={{
              maxHeight: "350px",
              maxWidth: "1250px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="container">
          <Rating
            name="simple-controlled "
            style={{ marginTop: "10%" }}
            value={
              books[1]?.review.length == 0
                ? 0
                : books[1]?.review.reduce((acc, curr) => acc + curr.stars, 0) /
                  books[1]?.review.length
            }
            readOnly
          />
          <h5
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {books[1]?.title}
          </h5>
          <p style={{ color: "#8f8f8f" }}>{books[1]?.authors[0]}</p>
        </div>
        <div className="container">
          <div
            style={{
              backgroundColor: "#eedff4",
              padding: "5px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              marginTop: "15%",
            }}
          >
            <p className="mt-3">{books[1]?.price} $</p>
            <div className="icon d-flex justify-content-end  align-items-center">
              <Link to={"book/" + books[1]?._id}>
                <img
                  className="imgOmar"
                  src="./../../public/Icons/more.png"
                  style={{
                    maxWidth: "46px",
                    maxHeight: "46px",
                    borderRaduis: "50%",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div className="item" data-value="3">
      <div className="container">
        <div className="img">
          <img
            className="imgOmar"
            src={books[2]?.thumbnailUrl}
            style={{
              maxHeight: "350px",
              maxWidth: "1250px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="container">
          <Rating
            name="simple-controlled "
            style={{ marginTop: "10%" }}
            value={
              books[2]?.review.length == 0
                ? 0
                : books[2]?.review.reduce((acc, curr) => acc + curr.stars, 0) /
                  books[2]?.review.length
            }
            readOnly
          />
          <h5
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {books[2]?.title}
          </h5>
          <p style={{ color: "#8f8f8f" }}>{books[2]?.authors[0]}</p>
        </div>
        <div className="container">
          <div
            style={{
              backgroundColor: "#eedff4",
              padding: "5px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              marginTop: "15%",
            }}
          >
            <p className="mt-3">{books[2]?.price} $</p>
            <div className="icon d-flex justify-content-end  align-items-center">
              <Link to={"book/" + books[2]?._id}>
                <img
                  className="imgOmar"
                  src="./../../public/Icons/more.png"
                  style={{
                    maxWidth: "46px",
                    maxHeight: "46px",
                    borderRaduis: "50%",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div className="item" data-value="4">
      <div className="container">
        <div className="img">
          <img
            className="imgOmar"
            src={books[3]?.thumbnailUrl}
            style={{
              maxHeight: "350px",
              maxWidth: "1250px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="container">
          <Rating
            name="simple-controlled "
            style={{ marginTop: "10%" }}
            value={
              books[3]?.review.length == 0
                ? 0
                : books[3]?.review.reduce((acc, curr) => acc + curr.stars, 0) /
                  books[3]?.review.length
            }
            readOnly
          />
          <h5
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {books[3]?.title}
          </h5>
          <p style={{ color: "#8f8f8f" }}>{books[3]?.authors[0]}</p>
        </div>
        <div className="container">
          <div
            style={{
              backgroundColor: "#eedff4",
              padding: "5px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              marginTop: "15%",
            }}
          >
            <p className="mt-3">{books[3]?.price} $</p>
            <div className="icon d-flex justify-content-end  align-items-center">
              <Link to={"book/" + books[3]?._id}>
                <img
                  className="imgOmar"
                  src="./../../public/Icons/more.png"
                  style={{
                    maxWidth: "46px",
                    maxHeight: "46px",
                    borderRaduis: "50%",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div className="item" data-value="5">
      <div className="container">
        <div className="img">
          <img
            className="imgOmar"
            src={books[4]?.thumbnailUrl}
            style={{
              maxHeight: "350px",
              maxWidth: "1250px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="container">
          <Rating
            name="simple-controlled "
            style={{ marginTop: "10%" }}
            value={
              books[4]?.review.length == 0
                ? 0
                : books[4]?.review.reduce((acc, curr) => acc + curr.stars, 0) /
                  books[4]?.review.length
            }
            readOnly
          />
          <h5
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {books[4]?.title}
          </h5>
          <p style={{ color: "#8f8f8f" }}>{books[4]?.authors[0]}</p>
        </div>
        <div className="container">
          <div
            style={{
              backgroundColor: "#eedff4",
              padding: "5px",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              marginTop: "15%",
            }}
          >
            <p className="mt-3">{books[4]?.price} $</p>
            <div className="icon d-flex justify-content-end  align-items-center">
              <Link to={"book/" + books[4]?._id}>
                <img
                  className="imgOmar"
                  src="./../../public/Icons/more.png"
                  style={{
                    maxWidth: "46px",
                    maxHeight: "46px",
                    borderRaduis: "50%",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  if (books.length === 0) return <BubbleLoading />;
  return (
    <>
      {/* Carousel Part */}
      <Carousel className="w-100">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>

      {/* Book Cards Part */}
      <div className="books-container text-center" style={{ marginTop: "7%" }}>
        <div className="container d-flex flex-column  justify-content-center align-items-center w-50">
          <h1>Trending This Week </h1>
          <p className="mt-3">
            you'll discover the most interesting titles flying off our virtual
            shelves. From gripping thrillers to poignant memoirs, these are the
            books everyone is talking about. Stay ahead of the curve and explore
            the latest literary sensations at BookShelf.
          </p>
        </div>
        <div className="books mt-5 d-flex flex-wrap   flex-column justify-content-center align-items-center  flex-md-row justify-content-md-center">
          {books.slice(0, 5).map((book) => {
            return <BookCard key={book.id} props={book} />;
          })}
        </div>
      </div>

      {/* Facilites Part */}
      <div
        className="features d-flex justify-content-center"
        style={{ marginTop: "7%" }}
      >
        <div className="content my-3 w-75 d-flex   flex-column  flex-lg-row justify-content-lg-between align-items-center justify-content-center  ">
          <div className="feature col-12  col-md-3 ">
            <div className="icon my-4">
              <img className="imgOmar" src="public/Icons/on-time.png" />
            </div>
            <h5 className="my-3">Quick Delivery</h5>
            <p style={{ color: "gray", Opacity: "30%" }}>
              With our efficient shipping process, Get your books fast with
              BookShelf's speedy delivery!Order today and start reading sooner.
            </p>
          </div>
          <div className="feature col-12  col-md-3 ">
            <div className="icon my-4">
              <img className="imgOmar" src="public/Icons/credit-card.png" />
            </div>
            <h5 className="my-3">Secure Payment</h5>
            <p style={{ color: "gray", Opacity: "30%" }}>
              Safeguard your transactions with BookShelf's secure payment system
              with confidence your information is protected.
            </p>
          </div>
          <div className="feature col-12  col-md-3">
            <div className="icon my-4">
              <img className="imgOmar" src="public/Icons/exclusive.png" />
            </div>
            <h5 className="my-3">Best Quality</h5>
            <p style={{ color: "gray", Opacity: "30%" }}>
              Experience the best in literary quality with BookShelf. Our
              carefully curated selection ensures top-notch reads every time
            </p>
          </div>
          <div className="feature col-12  col-md-3">
            <div className="icon my-4">
              <img className="imgOmar" src="public/Icons/protection.png" />
            </div>
            <h5 className="my-3">Return Guarantee</h5>
            <p style={{ color: "gray", Opacity: "30%" }}>
              Shop worry-free with BookShelf's return guarantee. If you're not
              satisfied, we'll make it right. Your satisfaction is our priority
            </p>
          </div>
        </div>
      </div>

      {/* Best Saleres Part */}
      <div className="bestSales" style={{ marginTop: "7%" }}>
        <h2 className="my-5 col-10 offset-1" style={{ marginLeft: "13%" }}>
          Best Sellers
        </h2>
        <div className="container d-flex flex-wrap  col-10 offset-1 ">
          <div className="div book-display-card col-12 col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center ">
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[0]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-evenly  h-100 ">
              <div className="d-flex justify-content-evenly ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[0]?.categories[0]}
                </p>
                <div
                  style={{
                    backgroundColor: "#ffd781",
                    color: "#ff7a01 ",
                    padding: "5px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    maxHeight: "30px",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 col-lg-3"
                >
                  <img
                    className="imgOmar"
                    src="./../../public/Icons/star.png"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <p style={{ fontWeight: "bold" }}>
                    {books[0]?.review.length == 0
                      ? 0
                      : books[0]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[0]?.review.length}
                  </p>
                </div>
              </div>
              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[0]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[0]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[0]?.price} $</h2>
              </div>
              <div className="ms-4">
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/book/" + books[0]?._id}
                  className="col-6 align-self-end  "
                >
                  <p className="price mt-4 col-8  text-center  ">
                    see more details
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="div book-display-card col-12 col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center ">
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[1]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-evenly  h-100 ">
              <div className="d-flex justify-content-evenly ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[1]?.categories[0]}
                </p>
                <div
                  style={{
                    backgroundColor: "#ffd781",
                    color: "#ff7a01 ",
                    padding: "5px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    maxHeight: "30px",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 col-lg-3"
                >
                  <img
                    className="imgOmar"
                    src="./../../public/Icons/star.png"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <p style={{ fontWeight: "bold" }}>
                    {" "}
                    {books[1]?.review.length == 0
                      ? 0
                      : books[1]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[1]?.review.length}
                  </p>
                </div>
              </div>
              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[1]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[1]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[1]?.price} $</h2>
              </div>
              <div className="ms-4">
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/book/" + books[1]?._id}
                  className="col-6 align-self-end  "
                >
                  <p className="price mt-4 col-8  text-center  ">
                    see more details
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="div  book-display-card col-12 col-lg-6 mt-4 mt-lg-2 d-flex justify-content-center ">
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[2]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-evenly  h-100 ">
              <div className="d-flex justify-content-evenly ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[2]?.categories[0]}
                </p>
                <div
                  style={{
                    backgroundColor: "#ffd781",
                    color: "#ff7a01 ",
                    padding: "5px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    maxHeight: "30px",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 col-lg-3"
                >
                  <img
                    className="imgOmar"
                    src="./../../public/Icons/star.png"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <p style={{ fontWeight: "bold" }}>
                    {" "}
                    {books[2]?.review.length == 0
                      ? 0
                      : books[2]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[2]?.review.length}
                  </p>
                </div>
              </div>
              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[2]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[2]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[2]?.price} $</h2>
              </div>
              <div className="ms-4">
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/book/" + books[2]?._id}
                  className="col-6 align-self-end  "
                >
                  <p className="price mt-4 col-8  text-center  ">
                    see more details
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="div  book-display-card col-12 col-lg-6 mt-4  d-flex justify-content-center ">
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[3]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-evenly  h-100 ">
              <div className="d-flex justify-content-evenly ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[3]?.categories[0]}
                </p>
                <div
                  style={{
                    backgroundColor: "#ffd781",
                    color: "#ff7a01 ",
                    padding: "5px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    maxHeight: "30px",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 col-lg-3"
                >
                  <img
                    className="imgOmar"
                    src="./../../public/Icons/star.png"
                    style={{ width: "18px", height: "18px" }}
                  />
                  <p style={{ fontWeight: "bold" }}>
                    {" "}
                    {books[3]?.review.length == 0
                      ? 0
                      : books[3]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[3]?.review.length}
                  </p>
                </div>
              </div>
              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[3]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[3]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[3]?.price} $</h2>
              </div>
              <div className="ms-4">
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/book/" + books[3]?._id}
                  className="col-6 align-self-end  "
                >
                  <p className="price mt-4 col-8  text-center  ">
                    see more details
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-display" style={{ marginTop: "7%" }}>
        <h2 className="my-5 col-10 offset-1" style={{ marginLeft: "13%" }}>
          Categories
        </h2>

        <div className="container d-flex flex-column justify-content-center align-items-center flex-md-row justify-content-center  ">
          {categories.map((ele) => {
            return <CategorieCard {...ele}></CategorieCard>;
          })}
        </div>
      </div>

      {/* Books Slider */}
      <div className="container w-75" style={{ marginTop: "7%" }}>
        <h2 className="my-5 col-10">Top 5 Rated Books</h2>
        <AliceCarousel
          mouseTracking
          items={items2}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </div>

      {/* Featured Books */}
      <div
        className="container col-12 col-lg-10 w-75   "
        style={{ marginTop: "7%" }}
      >
        <h2 className="my-5 ms-4 col-10">Featured Books</h2>

        <div className="container d-flex flex-column flex-lg-row  ">
          <div
            className=" book-display-card col-12 me-2 col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center"
            style={{
              backgroundColor: "#fafafa",
              padding: "15px",
              borderRaduis: "15px",
            }}
          >
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[2]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-between h-100 ">
              <div className="d-flex justify-content-between align-items-baseline  ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[2]?.categories[0]}
                </p>
                <h2 style={{ fontSize: "small", color: "#8f8f8f" }}>
                  Reviews : {books[2].review.length}{" "}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                className="col-6 col-lg-6"
              >
                <Rating
                  name="simple-controlled "
                  value={
                    books[2]?.review.length == 0
                      ? 0
                      : books[2]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[2]?.review.length
                  }
                  readOnly
                />
              </div>

              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[2]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[2]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[2]?.price} $</h2>
              </div>
              <div>
                <div className="d-flex flex-column flex-lg-row justify-content-center ">
                  <ButtonMui
                    variant="contained"
                    style={{ backgroundColor: "#8e67ae" }}
                    onClick={() => addToCart(books[2]._id)}
                  >
                    <img
                      className="me-2 imgOmar"
                      src="./../../public/Icons/shopping-cart (2).png"
                      style={{ width: "25px", height: "23px" }}
                    ></img>
                    Add to cart
                  </ButtonMui>

                  <Link to={"/book/" + books[2]?._id}>
                    <ButtonMui
                      variant="outlined"
                      className="ms-2  "
                      sx={{
                        borderColor: "#8e67ae",
                        "&:hover": { borderColor: "#8e67ae" },
                      }}
                    >
                      <img
                        className="imgOmar"
                        src="./../../public/Icons/more2.png"
                        style={{ width: "25px", height: "25px" }}
                      ></img>
                    </ButtonMui>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" book-display-card col-12 me-2 col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center"
            style={{
              backgroundColor: "#fafafa",
              padding: "15px",
              borderRaduis: "15px",
            }}
          >
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[1]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-between h-100 ">
              <div className="d-flex justify-content-between align-items-baseline  ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[1]?.categories[0]}
                </p>
                <h2 style={{ fontSize: "small", color: "#8f8f8f" }}>
                  Reviews : {books[2].review.length}{" "}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                className="col-6 col-lg-6"
              >
                <Rating
                  name="simple-controlled "
                  value={
                    books[1]?.review.length == 0
                      ? 0
                      : books[1]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[1]?.review.length
                  }
                  readOnly
                />
              </div>

              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[1]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[1]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[1]?.price} $</h2>
              </div>
              <div>
                <div className="d-flex flex-column flex-lg-row justify-content-center ">
                  <ButtonMui
                    variant="contained"
                    style={{ backgroundColor: "#8e67ae" }}
                    onClick={() => addToCart(books[1]._id)}
                  >
                    <img
                      className="me-2 imgOmar"
                      src="./../../public/Icons/shopping-cart (2).png"
                      style={{ width: "25px", height: "23px" }}
                    ></img>
                    Add to cart
                  </ButtonMui>

                  <Link to={"/book/" + books[1]?._id}>
                    <ButtonMui
                      variant="outlined"
                      className="ms-2  "
                      sx={{
                        borderColor: "#8e67ae",
                        "&:hover": { borderColor: "#8e67ae" },
                      }}
                    >
                      <img
                        className="imgOmar"
                        src="./../../public/Icons/more2.png"
                        style={{ width: "25px", height: "25px" }}
                      ></img>
                    </ButtonMui>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container d-flex flex-column flex-lg-row  mt-3 ">
          <div
            className=" book-display-card col-12 me-2 col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center"
            style={{
              backgroundColor: "#fafafa",
              padding: "15px",
              borderRaduis: "15px",
            }}
          >
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[4]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-between h-100 ">
              <div className="d-flex justify-content-between align-items-baseline  ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[4]?.categories[0]}
                </p>
                <h2 style={{ fontSize: "small", color: "#8f8f8f" }}>
                  Reviews : {books[2].review.length}{" "}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                className="col-6 col-lg-6"
              >
                <Rating
                  name="simple-controlled "
                  value={
                    books[4]?.review.length == 0
                      ? 0
                      : books[4]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[4]?.review.length
                  }
                  readOnly
                />
              </div>

              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[4]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[4]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[4]?.price} $</h2>
              </div>
              <div>
                <div className="d-flex flex-column flex-lg-row justify-content-center ">
                  <ButtonMui
                    variant="contained"
                    style={{ backgroundColor: "#8e67ae" }}
                    onClick={() => addToCart(books[4]._id)}
                  >
                    <img
                      className="me-2 imgOmar"
                      src="./../../public/Icons/shopping-cart (2).png"
                      style={{ width: "25px", height: "23px" }}
                    ></img>
                    Add to cart
                  </ButtonMui>

                  <Link to={"/book/" + books[4]?._id}>
                    <ButtonMui
                      variant="outlined"
                      className="ms-2  "
                      sx={{
                        borderColor: "#8e67ae",
                        "&:hover": { borderColor: "#8e67ae" },
                      }}
                    >
                      <img
                        className="imgOmar"
                        src="./../../public/Icons/more2.png"
                        style={{ width: "25px", height: "25px" }}
                      ></img>
                    </ButtonMui>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" book-display-card col-12 me-2 col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center"
            style={{
              backgroundColor: "#fafafa",
              padding: "15px",
              borderRaduis: "15px",
            }}
          >
            <div className="book-cover-con  mx-2">
              <img
                className="imgOmar"
                src={books[0]?.thumbnailUrl}
                style={{
                  width: "200px",
                  height: "300px",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="data-con w-50 mx-2 d-flex flex-column justify-content-between h-100 ">
              <div className="d-flex justify-content-between align-items-baseline  ">
                <p
                  style={{
                    backgroundColor: "#e3e3e3",
                    color: "#8d27ad",
                    padding: "5px",
                    borderRadius: "10px",
                    textAlign: "center",
                    fontSize: "smaller",
                    fontWeight: "semi-bold",
                  }}
                  className="col-6 mx-1 mx-lg-0 col-lg-6"
                >
                  {books[0]?.categories[0]}
                </p>
                <h2 style={{ fontSize: "small", color: "#8f8f8f" }}>
                  Reviews : {books[2].review.length}{" "}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                className="col-6 col-lg-6"
              >
                <Rating
                  name="simple-controlled "
                  value={
                    books[0]?.review.length == 0
                      ? 0
                      : books[0]?.review.reduce(
                          (acc, curr) => acc + curr.stars,
                          0
                        ) / books[0]?.review.length
                  }
                  readOnly
                />
              </div>

              <div className="data-con w-100 ms-lg-4  ">
                <h5>{books[0]?.title}</h5>
                <p style={{ color: "#8f8f8f" }}>{books[0]?.authors[0]}</p>
              </div>
              <div className="data-con w-100 ms-lg-4 ">
                <h2 style={{ color: "#9436b2" }}>{books[0]?.price} $</h2>
              </div>
              <div>
                <div className="d-flex flex-column flex-lg-row justify-content-center ">
                  <ButtonMui
                    variant="contained"
                    style={{ backgroundColor: "#8e67ae" }}
                    onClick={() => addToCart(books[0]._id)}
                  >
                    <img
                      className="me-2 imgOmar"
                      src="./../../public/Icons/shopping-cart (2).png"
                      style={{ width: "25px", height: "23px" }}
                    ></img>
                    Add to cart
                  </ButtonMui>

                  <Link to={"/book/" + books[0]?._id}>
                    <ButtonMui
                      variant="outlined"
                      className="ms-2  "
                      sx={{
                        borderColor: "#8e67ae",
                        "&:hover": { borderColor: "#8e67ae" },
                      }}
                    >
                      <img
                        className="imgOmar"
                        src="./../../public/Icons/more2.png"
                        style={{ width: "25px", height: "25px" }}
                      ></img>
                    </ButtonMui>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Part */}
      <div
        className="container d-flex flex-column  justify-content-center align-items-center w-50"
        style={{ marginTop: "7%" }}
      >
        <h2>Latest News </h2>
        <p className="mt-3 text-center ">
          Stay up-to-date with all things literary through BookShelf's
          comprehensive latest news section. Delve into exclusive author
          interviews, gain insight into upcoming book releases, and discover a
          wealth of literary events to enrich your reading journey. From
          behind-the-scenes looks at your favorite authors to in-depth analyses
          of literary trends, our latest news section is your go-to destination
          for all things book-related.
        </p>
      </div>
      <div className="news d-flex flex-column flex-md-row justify-content-center align-items-center  mt-5 flex-wrap col-10 offset-1 ">
        <div className="new col-10 col-md-5 col-lg-3 d-flex flex-column justify-content-between mx-3 ">
          <img
            className="my-3 imgOmar"
            src="https://deadline.com/wp-content/uploads/2020/08/wil-wheaton-ready-player-two-ernest-cline.jpg?w=681&h=383&crop=1"
            style={{ width: "100%", height: "200px", borderRadius: "10px" }}
          />
          <h6 className="my-3" style={{ fontWeight: "bold" }}>
            Bestselling Author John Smith Announces Highly Anticipated Sequel
          </h6>
          <p
            className="my-3"
            style={{
              color: "#8f8f8f",
              maxHeight: "144px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Renowned author John Smith has just revealed exciting news for fans
            eagerly awaiting the next chapter in his bestselling series. The
            much-anticipated sequel, titled "Echoes of Destiny," promises to
            captivate readers once again with its gripping storyline and beloved
            characters. Smith, known for his masterful storytelling and
            intricate world-building, has hinted at new adventures and
            unexpected twists in store for readers. Pre-orders for "Echoes of
            Destiny" are now available exclusively on BookShelf, offering fans
            the opportunity to secure their copy ahead of its official release
            date
          </p>
        </div>
        <div className="new col-10 col-md-5 col-lg-3 d-flex flex-column justify-content-between mx-3">
          <img
            className="my-3 imgOmar"
            src="https://static.wixstatic.com/media/831070_7fea663a090e43f1ac083ad696ed65e7~mv2.png/v1/fill/w_596,h_439,al_c/831070_7fea663a090e43f1ac083ad696ed65e7~mv2.png"
            style={{ width: "100%", height: "200px", borderRadius: "10px" }}
          />
          <h6 style={{ fontWeight: "bold" }} className="my-3">
            Groundbreaking Debut Novel 'Whispers in the Wind' Wins Prestigious
            Literary Award
          </h6>
          <p
            className="my-3"
            style={{
              color: "#8f8f8f",
              maxHeight: "144px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            In a landmark moment for the literary world, debut author Emily
            Johnson's novel "Whispers in the Wind" has been honored with the
            prestigious Booker Prize for Fiction. Johnson's mesmerizing debut
            has garnered widespread acclaim for its lyrical prose, nuanced
            characters, and profound exploration of human resilience in the face
            of adversity. "Whispers in the Wind" follows the journey of
            protagonist Sarah as she navigates love, loss, and the complexities
            of family against the backdrop of a small coastal town. BookShelf
            celebrates this remarkable achievement and invites readers to
            discover the magic of "Whispers in the Wind" for themselves.
          </p>
        </div>
        <div className="new col-10 col-md-5 col-lg-3 d-flex flex-column justify-content-between  mx-3">
          <img
            className="my-3 imgOmar"
            src="https://i.cbc.ca/1.5639446.1707342319!/fileImage/httpImage/image.png_gen/derivatives/16x9_780/two-trees-make-a-forest-by-jessica-j-lee.png"
            style={{ width: "100%", height: "200px", borderRadius: "10px" }}
          />
          <h6 style={{ fontWeight: "bold" }} className="my-3">
            Virtual Author Event: Join Bestselling Author Jessica Lee for an
            Exclusive Book Discussion
          </h6>
          <p
            className="my-3"
            style={{
              color: "#8f8f8f",
              maxHeight: "144px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Calling all fans of bestselling author Jessica Lee! BookShelf is
            thrilled to announce an exclusive virtual author event featuring Lee
            herself. Join us for an engaging book discussion as Lee delves into
            the inspiration behind her latest novel, "The Art of Letting Go," a
            poignant tale of love, forgiveness, and second chances. Participants
            will have the opportunity to interact with the author, ask
            questions, and gain insight into Lee's creative process. Don't miss
            this unique opportunity to connect with one of today's most
            acclaimed authors. Reserve your spot today on BookShelf's Events
            page
          </p>
        </div>
      </div>

      {/* Reviews Part */}
      <div
        className="container d-flex flex-column  justify-content-center align-items-center w-50"
        style={{ marginTop: "7%" }}
      >
        <h2>Reviews </h2>
        <p className="mt-3 text-center ">
          Whether you're seeking validation for your book choices or looking for
          new recommendations, our curated collection of reviews offers valuable
          insights to inform your literary journey. Join our community of avid
          readers, share your own thoughts, and discover hidden literary gems
          waiting to be uncovered.
        </p>
      </div>
      <div className="reviews d-flex flex-column flex-md-row justify-content-center align-items-center col-10 offset-1   mt-5 flex-wrap">
        <div
          className="review col-10 col-lg-3 my-2 p-3 mx-1 d-flex flex-column justify-content-evenly "
          style={{
            border: "5px #ddddddy solid",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
            height: "260px",
            width: "330px",
          }}
        >
          <Rating
            name="simple-controlled "
            className="my-3"
            value={+books[1]?.review[0]?.stars}
            readOnly
          />
          <div className="comment col-10 mb-3">
            <p style={{ color: "#8f8f8f" }}>{books[1]?.review[0]?.comment}</p>
          </div>
          <div className="contact-info d-flex justify-content-between ">
            <div>
              <h6>{books[1]?.review[0]?.userName}</h6>
              <p style={{ color: "#8f8f8f", fontSize: "smaller" }}>
                Content Creator
              </p>
            </div>
            <div>
              <img
                className="imgOmar"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
        <div
          className="review  col-10 col-lg-3 my-2 p-3 mx-1 d-flex flex-column justify-content-evenly "
          style={{
            border: "5px #ddddddy solid",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
            height: "260px",
            width: "330px",
          }}
        >
          <Rating
            name="simple-controlled "
            className="my-3"
            value={+books[2]?.review[1]?.stars}
            readOnly
          />
          <div className="comment col-10 mb-3">
            <p style={{ color: "#8f8f8f" }}>{books[2]?.review[1]?.comment}</p>
          </div>
          <div className="contact-info d-flex justify-content-between ">
            <div>
              <h6>{books[2]?.review[1]?.userName}</h6>
              <p style={{ color: "#8f8f8f", fontSize: "smaller" }}>
                Web Developer
              </p>
            </div>
            <div>
              <img
                className="imgOmar"
                src="https://media.istockphoto.com/id/819419874/photo/young-woman-summer-portrait-outdoors.webp?s=170667a&w=0&k=20&c=9SofNH7CyB0SrzLJTwca-o1tl5C07ORHbThgvRk5FHY="
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
        <div
          className="review  col-10 col-lg-3 my-2 p-3 mx-1 d-flex flex-column justify-content-evenly  "
          style={{
            border: "5px #ddddddy solid",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
            height: "260px",
            width: "330px",
          }}
        >
          <Rating
            name="simple-controlled "
            className="my-3"
            value={+books[2]?.review[0]?.stars}
            readOnly
          />
          <div className="comment col-10 mb-3">
            <p style={{ color: "#8f8f8f" }}>{books[2]?.review[0]?.comment}</p>
          </div>
          <div className="contact-info d-flex justify-content-between ">
            <div>
              <h6>{books[2]?.review[0]?.userName}</h6>
              <p style={{ color: "#8f8f8f", fontSize: "smaller" }}>
                Web Developer
              </p>
            </div>
            <div>
              <img
                className="imgOmar"
                src="https://media.istockphoto.com/id/819419874/photo/young-woman-summer-portrait-outdoors.webp?s=170667a&w=0&k=20&c=9SofNH7CyB0SrzLJTwca-o1tl5C07ORHbThgvRk5FHY="
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//Function for main Carousel
function Item(props) {
  return (
    <>
      <Paper>
        <div className={"containerItems "}>
          <div className="img-container">
            <img className="imgOmar" src={props.item.img}></img>
            <div className="overlay"></div>
          </div>
          <div className="container-items col-lg-4 col-md-6 col-10 ">
            <div className="promo-container">
              <div
                className="p-one"
                style={{ fontSize: "15px", color: "white" }}
              >
                HOT PROMO
              </div>
              <div
                className="p-two"
                style={{ fontSize: "15px", color: "white" }}
              >
                discount 60% !Special Book Day
              </div>
            </div>
            <h1>{props.item.header}</h1>
            <p>{props.item.paragraph}</p>
            <Link to="/allBooks" className="col-8">
              <Button className="CheckButton">Go to Collection </Button>
            </Link>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default Home;
