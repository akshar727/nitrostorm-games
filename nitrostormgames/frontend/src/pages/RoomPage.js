import * as React from "react";
import "../index.css";


function Message(props) {
  return (
    <div className="message tw-w-full tw-min-w-full tw-rounded-md tw-bg-bookmark-white tw-p-4">
      <p className="content tw-ml-8 tw-text-lg">{props.content}</p>
      <small className="tw-ml-8 tw-text-gray-700">Anonymous</small>
    </div>
  );
}

var socket;
export default function RoomPage({ product }) {
  const [inputText, setInputText] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    var wss = "wss://";
    if (document.location.protocol === "http:") {
      wss = "ws://";
    }

    socket = new WebSocket(wss + window.location.host + "/ws/chat/" + product.websocket + "/");

    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("NEW MESSAGE!");
      console.log(data);
      if (data.type == "MESSAGE") {
        const compiled = {};
        for (const [key, value] of Object.entries(data)) {
          if (key !== "type") {
            compiled[key] = value;
          }
        }
        setMessages((messages) => [...messages, compiled]);
      } else if (data.type == "MESSAGE_HISTORY") {
        setMessages(data.payload);
      }
    };
  }, []);
  return (
    <>
      <div className="tw-container tw-mt-8 tw-flex tw-justify-center">
        <h1 className="tw-text-4xl tw-font-medium tw-text-bookmark-red">
          Game Chat: {product.name}
        </h1>
      </div>
      <section className="messages tw-container tw-mt-8 tw-flex tw-h-[475px] tw-flex-col tw-justify-start tw-gap-6 tw-overflow-auto tw-pb-6">
        {messages.map(function (m, index) {
          return (
            <div className={index === 0 ? "first:tw-mt-6" : ""} key={index}>
              <Message content={m.message} />
            </div>
          );
        })}
      </section>
      <section className="form tw-bottom-[25px] tw-w-full">
        <div
          id="inForm"
          className="tw-mx-14 tw-flex tw-flex-col tw-gap-6 tw-px-4"
        >
          <textarea
            className="tw-h-12 tw-resize-none tw-rounded-md tw-border-2 tw-border-bookmark-red tw-px-4 tw-py-2 tw-text-lg"
            placeholder="Type a message..."
            value={inputText}
            rows={1}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="btn btn-red tw-h-12"
            onClick={() => {
              if (inputText.trim() === "") {
                return;
              }
              setTimeout(() => {
               var objDiv = document.getElementsByClassName("messages")[0];
               objDiv.scrollTop = objDiv.scrollHeight;
              }, 100);
              socket.send(
                JSON.stringify({
                  message: inputText,
                })
              );
              setInputText("");
            }}
          >
            Send
          </button>
        </div>
      </section>
    </>
  );
}
