const CartItem = ({
  item,
  handleRemoveFromCart,
  handleDecrementFromCart,
  handleAddToCart,
  calcSubtotal,
}) => (
  <div className="row align-items-center mb-4 item-wrapper">
    <div className="col-lg-5">
      <div className="img-info-wrapper d-flex align-items-center">
        <div className="img-wrapper hvr-curl-top-right">
          <img
            src={item.book.thumbnailUrl}
            alt="book img"
            className="item-img"
          />
        </div>
        <div className="item-info">
          <span className="isbn">ISBN {item.book.isbn}</span>
          <h5 className="book-title">{item.book.title}</h5>
          <span className="author">{item.book.authors}</span>
        </div>
      </div>
    </div>
    <div className="col-lg-7">
      <div className="row align-items-center">
        <div className="qty-wrapper col-lg-4">
          <span className="fw-bold quantity-text">QTY: </span>
          <div className="qty-box">
            <i
              className="bi bi-dash icon-plus-min"
              onClick={() => handleDecrementFromCart(item.book._id)}
            ></i>
            <span className="qty fs-5 mt-1">{item.quantity}</span>
            <i
              className="bi bi-plus icon-plus-min"
              onClick={() => handleAddToCart(item.book._id)}
            ></i>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="price-wrapper">
            <div className="fs-5 me-4">
              <span className="fw-bold">Price:</span>
              <span> ${item.book.price}</span>
            </div>
            <div className="fs-5">
              <span className="fw-bold">Subtotal:</span>
              <span> ${calcSubtotal(item)}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="remove-icon-wrapper d-flex justify-content-center">
            <i
              className="bi bi-trash-fill remove-icon"
              onClick={() => handleRemoveFromCart(item.book._id)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartItem;
