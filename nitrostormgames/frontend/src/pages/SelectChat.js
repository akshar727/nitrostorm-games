import * as React from "react";
import "../index.css";
import { products } from "../products";
function ChatButton(props) {
    return (
            <button type="button" onClick={() => {window.location.href=`/chat/${props.product.replace(" ","-")}`}} className="btn btn-red tw-flex-1">
              Open Chat
            </button>
    )
}
function PageContent() {
    return (
        <>
            {/* title */}
            <div className="tw-container tw-flex tw-mt-8">
                <h1 className="tw-text-4xl">Choose a game to chat about</h1>
            </div>
            {/* games */}
            <section
          id="products"
        >
          <div className="tw-container tw-mt-16 tw-grid tw-max-w-screen-lg tw-grid-cols-1 tw-gap-16 md:tw-grid-cols-2 lg:tw-grid-cols-3">
            {products.map(function (product, index) {
              return (
                <div
                  className="tw-flex tw-flex-col tw-rounded-md tw-shadow-md"
                  key={index}
                >
                  <div className="tw-flex tw-flex-col tw-items-center tw-border-b tw-p-6">
                    <div className="tw-h-64 tw-w-64">
                      <img
                        src={"static/images/" + product.src}
                        loading="lazy"
                        alt={product.name + "™"}
                        className="tw-w-full tw-rounded-2xl"
                        style={{ height: "203px" }}
                      />
                    </div>
                    <h3 className="tw-mb-2 tw-mt-5 tw-text-lg tw-text-bookmark-red">
                      {product.name}™
                    </h3>
                  </div>

                  <div className="tw-flex tw-p-6">
                    <ChatButton product={product.name} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </>
    )
}

export default function ChatsPage() {
    return <PageContent/>
}