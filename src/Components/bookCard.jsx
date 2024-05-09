import "bootstrap/dist/css/bootstrap.min.css";
import "./bookCard.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function BookCard(props) {
  let { props: book } = props;
  
  let stars = (book.review.length==0)?0:book.review.reduce((acc, curr) => acc + curr.stars, 0) /book.review.length;
  
  return (
    <Link style={{ textDecoration: "none" }} to={"/book/" + book._id}>
      <div>
        <div
          className="bookCard d-flex flex-column  justify-content-center align-items-center    p-3"
          style={{ width: "fit-content" }}
        >
          <img
            className="my-2"
            src={book.thumbnailUrl}
            style={{ width: "200px", height: "300px", borderRadius: "15px" }}
          />
          <Rating
            name="simple-controlled "
            className="mt-2"
            value={ stars}
            readOnly
          />
          <div
            className="category mt-3"
            style={{ color: "#a757bf", fontSize: "small", fontWeight: "bold" }}
          >
            {book.categories[0]}
          </div>
          <h5
            className="title mt-2"
            style={{ fontWeight: "bold", color: "black" }}
          >
            {book.title}
          </h5>
          <div className="auther mb-1" style={{ color: "#8f8f8f" }}>
            {book.authors[0]}
          </div>
          <Link style={{ textDecoration: "none" }} to={"/book/" + book._id}>
            <h5 className="price my-4 px-3">{book.price} $</h5>
          </Link>

          <div className="rating "></div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
