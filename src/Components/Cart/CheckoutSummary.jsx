import Paypal from "../Paypal/PayPal";
const CheckoutSummary = ({
  couponCode,
  setCouponCode,
  couponApplied,
  applyCoupon,
  totalPrice,
  taxAmount,
  calculateTotalPrice,
  setShowPayPal,
  showPayPal,
}) => (
  <div className="container mb-5">
    <div className="checkout-wrapper">
      <div className="row d-flex">
        <div className="col-lg-6 my-5 left-side-wrapper">
          <h4 className="fw-bold my-5">Shopping Summary</h4>
          <div className="my-4 left-side-coupon">
            <h6 className="coupon-header">Apply (BOOKSHELF) NOW!</h6>
            <div className="d-flex promo-code-wrapper">
              <div className="promo-code-content">
                <input
                  placeholder="Enter promo code here"
                  className="promo-input"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
              </div>

              <i
                className="bi bi-arrow-right-square-fill right-arrow"
                onClick={applyCoupon}
                disabled={couponApplied}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-lg-6 my-5">
          <div className="total-price-wrapper d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center fs-5">
              <span className="right-side-text">Subtotal</span>
              <span className="fw-bold">${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center fs-5">
              <span className="right-side-text">Tax</span>
              <span className="fw-bold">${taxAmount}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center fs-5">
              <span className="fs-5 right-side-text">Shipping fees</span>
              <span className="fw-bold">Free</span>
            </div>
            <hr className="w-100" />
            <div className="d-flex justify-content-between align-items-center fs-5">
              <span className="fs-5 right-side-text">Total</span>
              <span className="fw-bold">${calculateTotalPrice()}</span>
            </div>
            {!showPayPal && (
              <div className="btn-wrapper ">
                <button
                  className="checkout-btn mt-5"
                  onClick={() => setShowPayPal(true)}
                >
                  Checkout
                </button>
              </div>
            )}
            <div className="mt-5">
              {showPayPal && <Paypal totalAmount={calculateTotalPrice()} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutSummary;
