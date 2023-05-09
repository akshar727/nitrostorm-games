import * as React from "react";
import "../index.css";
import { getStatic } from "../constant";
function ChatButton(props) {
  return (
    <a
      href={`/chat/${props.product.websocket}`}
      className="btn btn-red tw-flex-1"
    >
      Open Chat
    </a>
  );
}
function PageContent({products}) {
  return (
    <>
      {/* title */}
      <div className="tw-container tw-mt-8 tw-flex">
        <h1 className="tw-text-4xl tw-font-medium tw-text-bookmark-red">
          All Game Chats
        </h1>
      </div>
      {/* games */}
      <section id="products" className="tw-pb-6">
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
                  </div>

                  <div className="tw-flex tw-p-6">
                    <ChatButton product={product} />
                  </div>
                </div>
              );
            })}
          </div>
      </section>
    </>
  );
}

export default function ChatsPage({products}) {
  return <PageContent products={products} />;
}
