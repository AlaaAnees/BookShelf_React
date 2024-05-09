import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../Contexts/CartContext";

const Paypal = ({ totalAmount }) => {
  const paypalBtn = useRef(null);
  const { checkout } = useContext(CartContext);
  useEffect(() => {
    paypalBtn.current.textContent = "";
    window.paypal
      .Buttons({
        createOrder: (order, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount,
                  currency: "USD",
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(async (details) => {
            await checkout();
            alert(
              "Payment Made Successfully " +
                details.payer.name.given_name +
                " !"
            );
          });
        },
      })
      .render("#paypal-btn");
  }, [totalAmount, checkout]);

  return (
    <div
      id="paypal-btn"
      ref={paypalBtn}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    ></div>
  );
};

export default Paypal;
