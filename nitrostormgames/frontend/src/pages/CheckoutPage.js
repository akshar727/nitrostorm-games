import * as React from "react";

function ProductCard({ product }) {
  return (
    <div className="tw-flex tw-h-24 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-bg-bookmark-white">
      <h1 className="subtitle tw-ml-6 tw-text-3xl">{product.name}</h1>
      <small className="tw-mr-6">${product.price}</small>
    </div>
  );
}

export default function CheckoutPage({ cart }) {
  const [totalCost, setTotalCost] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let totalCost = 0;
    cart.map((product) => {
      totalCost = totalCost + parseFloat(product.price);
    });
    if (totalCost == 0) {
      alert(
        "You have no items in your cart. Please add items to your cart before checking out."
      );
      window.location.href = "/";
      return;
    }
    setTotalCost(totalCost);
    setLoaded(true);
    setTimeout(() => {
      paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            label: "checkout",
            tagline: false,
          },
          createOrder: function (data, actions) {
            // Set up the transaction
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    value: (totalCost * 1.07).toFixed(2).toString(),
                    currency_code: "USD",
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            // TODO: create a random transaction id using uuid.uuid4 and send it to the backend to allow user to download content from this transaction
            return actions.order.capture().then(function (details) {
              console.log(details);
              const total =
                details.purchase_units[0].payments.captures[0].amount.value;
              fetch("/api/checkout/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": document.querySelector(
                    "[name=csrfmiddlewaretoken]"
                  ).value,
                },
                body: JSON.stringify({
                  total: total,
                }),
              })
                .then((r) => r.json())
                .then((s) => {
                  console.log(s);
                  if (s.success) {
                    setTimeout(() => {
                      alert("Payment successful!");
                      window.location.href = "/purchases";
                    }, 1500);
                  }
                });
            });
          },
        })
        .render("#paypal-button-container");
    }, 500);
  }, []);
  return (
    <>
      {loaded && (
        <>
          {/* title */}
          <div className="tw-container tw-mt-8 tw-flex">
            <h1 className="tw-text-4xl tw-font-medium tw-text-bookmark-red">
              Checkout
            </h1>
          </div>
          <section
            id="items"
            className="tw-container tw-mt-12 tw-flex tw-flex-col tw-gap-6 tw-pb-6"
          >
            {cart.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </section>
          <div className="tw-container tw-flex tw-justify-end">
            <div className="tw-flex tw-flex-col">
              <h3 className="subtitle">Subtotal: ${totalCost.toFixed(2)}</h3>
              <h3 className="subtitle">
                Tax (7%): ${(totalCost * 0.07).toFixed(2)}
              </h3>
              <h3 className="subtitle">
                Total: ${(totalCost * 1.07).toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-items-center">
            <h1 className="tw-text-md tw-mt-6">
              SANDBOX PAYPAL BUTTONS BELOW (DOES NOT USE REAL MONEY)
              Nevertheless, you can still test the checkout process if needed.
              Username: denniscool1@gmail.com Password: 12345678
            </h1>
            <div
              id="paypal-button-container"
              className="tw-mt-8 tw-h-1/2 tw-w-1/2"
            ></div>
          </div>
        </>
      )}
    </>
  );
}
