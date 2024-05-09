const EmptyCart = ({ showMessage, handleReturnToShop }) => (
  <>
    <div className="container">
      <div className="empty-cart">
        <div className="empty-cart-text">
          <h5 className={showMessage ? "animate__animated animate__flash" : ""}>
            Your cart is empty. Add books now!
          </h5>
        </div>
      </div>
    </div>
    <div className="return-to-shop my-5 ">
      <button className="return-to-shop-btn" onClick={handleReturnToShop}>
        Return To Shop
      </button>
    </div>
  </>
);

export default EmptyCart;
