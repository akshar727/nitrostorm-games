import * as React from "react";
import { getStatic } from "../constant";

function RemoveFromCartButton({ product }) {
  return (
    <button
      className="btn btn-red tw-flex-1"
      onClick={() => {
        fetch("/api/my-cart/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            uuid: product.uuid,
          }),
        })
          .then((r) => r.json())
          .then((resp) => {
            if (resp.success === true) {
              alert(`Successfully removed ${product.name} from your cart.`);
              window.location.reload();
            }
          });
      }}
    >
      Remove from Cart
    </button>
  );
}

export default function PurchasesPage() {
  return (
    <>
      {/* title */}
      <div className="tw-container tw-mt-8 tw-flex">
        <h1 className="tw-text-4xl tw-font-medium tw-text-bookmark-red">
          My Purchases
        </h1>
      </div>
      {/* games */}
      {/* <section id="cart" className="tw-pb-6">
        <div className="tw-container tw-mt-16 tw-grid tw-max-w-screen-lg tw-grid-cols-1 tw-gap-16 md:tw-grid-cols-2 lg:tw-grid-cols-3">
          {cart.map(function (product, index) {
            return (
              <div
                className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md"
                key={index}
              >
                <div className="tw-flex tw-flex-col tw-items-center tw-border-b tw-p-6">
                  <div className="tw-h-64 tw-w-64">
                    <img
                      src={getStatic() + "images/" + product.src}
                      loading="lazy"
                      alt={product.name + "™"}
                      className="tw-w-full tw-rounded-2xl"
                      style={{ height: "203px" }}
                    />
                  </div>
                  <h3 className="tw-mb-2 tw-mt-5 tw-text-lg tw-text-bookmark-red">
                    {product.name}™
                  </h3>
                  <p className="tw-mb-2 tw-font-light tw-text-bookmark-grey">
                    ${product.price}
                  </p>
                </div>
                <div className="tw-flex tw-p-6">
                  <RemoveFromCartButton product={product} />
                </div>
              </div>
            );
          })}
        </div>
        {cart.length === 0 && (
          <h1 className="tw-text-center tw-text-4xl tw-font-medium">
            You have no items in your cart.
          </h1>
        )}
      </section> */}
    </>
  );
}
