import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../Contexts/CartContext";

import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CheckoutSummary from "./CheckoutSummary";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CartDisplay.css";
import "hover.css";
import "animate.css";

export default function CartDisplay() {
  const {
    cartItems,
    totalPrice,
    addToCart,
    removeFromCart,
    decrementFromCart,
  } = useContext(CartContext);

  const [showMessage, setShowMessage] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const taxAmount = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage((prevState) => !prevState);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleReturnToShop = () => navigate("/");

  const handleRemoveFromCart = (bookId) => removeFromCart(bookId);

  const handleDecrementFromCart = (bookId) => decrementFromCart(bookId);

  const handleAddToCart = (bookId) => addToCart(bookId);

  const calcSubtotal = (item) => item.quantity * item.book.price;

  const applyCoupon = () => {
    if (couponCode === "BOOKSHELF") {
      setDiscount(10);
      setCouponApplied(true);
    }
  };

  const calculateTotalPrice = () => {
    const subTotal = cartItems.reduce(
      (acc, item) => acc + calcSubtotal(item),
      0
    );
    const discountedTotal = subTotal - discount;
    const totalPriceWithTaxes = discountedTotal + taxAmount;
    return totalPriceWithTaxes;
  };

  return (
    <>
      <div className="my-5">
        {cartItems.length === 0 ? (
          <EmptyCart
            showMessage={showMessage}
            handleReturnToShop={handleReturnToShop}
          />
        ) : (
          <div className="cart-wrapper container">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                handleRemoveFromCart={handleRemoveFromCart}
                handleDecrementFromCart={handleDecrementFromCart}
                handleAddToCart={handleAddToCart}
                calcSubtotal={calcSubtotal}
              />
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <CheckoutSummary
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          couponApplied={couponApplied}
          applyCoupon={applyCoupon}
          totalPrice={totalPrice}
          taxAmount={taxAmount}
          calculateTotalPrice={calculateTotalPrice}
          setShowPayPal={setShowPayPal}
          showPayPal={showPayPal}
        />
      )}
    </>
  );
}
