import * as React from "react";
import "../index.css";
import { products } from "../products";
document.addEventListener("DOMContentLoaded", function (event) {
  var scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos) window.scrollTo(0, scrollpos, "smooth");
});

window.onbeforeunload = function (e) {
  localStorage.setItem("scrollpos", window.scrollY);
};
function enableScrolling() {
  document.body.style.overflow = "auto";
}
function disableScrolling() {
  document.body.style.overflow = "hidden";
}
function goTo(href) {
  closeSidebar();
  window.location.href = href;
}
function MenuItems(props) {
  if (props.mobile) {
    React.useEffect(() => {
      const mFeatures = document.querySelector(".mFeatures");
      const mProducts = document.querySelector(".mProducts");
      const mContact = document.querySelector(".mContact");
      mFeatures.addEventListener("click", () => {
        goTo("#features");
      });
      mProducts.addEventListener("click", () => {
        goTo("#products");
      });
      mContact.addEventListener("click", () => {
        goTo("#products");
      });
    });
  }
  return (
    <React.Fragment>
      <li
        className="tw-cursor-pointer tw-transition-colors tw-duration-300 hover:tw-text-bookmark-red"
        key="features"
      >
        <a href="#features" className={props.mobile ? "mFeatures" : ""}>
          Features
        </a>
      </li>
      <li
        className="tw-cursor-pointer tw-transition-colors tw-duration-300 hover:tw-text-bookmark-red"
        key="products"
      >
        <a href="#products" className={props.mobile ? "mProducts" : ""}>
          Products
        </a>
      </li>
      {props.header && (
        <li
          className="tw-cursor-pointer tw-transition-colors tw-duration-300 hover:tw-text-bookmark-red"
          key="contact"
        >
          <a className={props.mobile ? "mContact" : ""} href="#contact">
            Contact
          </a>
        </li>
      )}
    </React.Fragment>
  );
}
function BuyButton() {
  return (
    <button type="button" className="btn btn-red tw-flex-1">
      Buy Now
    </button>
  );
}
function Logo() {
  return <img src="static/images/logo.svg" width="70" height="70" alt="logo" />;
}
const pattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;
function handleSubmit(message, email) {
  let err = false;
  if (message.trim() === "") {
    // add the invalid attribute to .message
    document
      .querySelector(".message-input")
      .setCustomValidity("Please enter a message");
    document.querySelector(".message-input").classList.add("invalid");
    err = true;
  } else {
    document.querySelector(".message-input").setCustomValidity("");
    document.querySelector(".message-input").classList.remove("invalid");
  }
  if (email.trim() === "" || !pattern.test(email)) {
    // add the invalid attribute to .message
    document
      .querySelector(".email-input")
      .setCustomValidity("Please enter a valid email");
    document.querySelector(".email-input").classList.add("invalid");
    err = true;
  } else {
    document.querySelector(".email-input").setCustomValidity("");
    document.querySelector(".email-input").classList.remove("invalid");
  }
  if (err) return;

  document.querySelector(".contact-form").classList.add("fadeOut");
  // capture when the animation finishes to hide .contact-form
  document.querySelector(".contact-form").addEventListener(
    "animationend",
    () => {
      document.querySelector(".contact-form").style.display = "none";
    },
    { once: true }
  );
  document.querySelector(".thanks").style.display = "block";
  // capture when the animaton finishes to remove the class
  document.querySelector(".thanks").addEventListener(
    "animationend",
    () => {
      document.querySelector(".thanks").classList.remove("fadeOut");
    },
    { once: true }
  );
}
function openSidebar() {
  window.scrollTo(0, 0, "smooth");
  document.querySelector(".sidebar").style.display = "block";
  disableScrolling();
}
function closeSidebar() {
  document.querySelector(".sidebar").style.display = "none";
  enableScrolling();
}

function PageContent() {
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [hasInteractedWithMessage, setHasInteractedWithMessage] =
    React.useState(false);
  const [hasInteractedWithEmail, setHasInteractedWithEmail] =
    React.useState(false);

  React.useEffect(() => {
    if (hasInteractedWithMessage) {
      if (message.trim() === "") {
        // add the invalid attribute to .message
        document
          .querySelector(".message-input")
          .setCustomValidity("Please enter a message");
        document.querySelector(".message-input").classList.add("invalid");
      } else {
        document.querySelector(".message-input").setCustomValidity("");
        document.querySelector(".message-input").classList.remove("invalid");
      }
    }
    if (hasInteractedWithEmail) {
      if (email.trim() === "" || !pattern.test(email)) {
        // add the invalid attribute to .message
        document
          .querySelector(".email-input")
          .setCustomValidity("Please enter a valid email");
        document.querySelector(".email-input").classList.add("invalid");
      } else {
        document.querySelector(".email-input").setCustomValidity("");
        document.querySelector(".email-input").classList.remove("invalid");
      }
    }
  }, [message, email]);
  return (
    <>
      <div className="tw-overflow-hidden tw-font-Rubik">
        {/* Header */}
        <header id="header">
          {/* tw-container: responsive container, tw-flex: display: flex, tw-items-center: align items center for flex box, py-4: padding top + bottom 1 rem, tw-mt-4: margin-top: 1rem, sm:tw-mt-12 : on small screens (<640px) give margin top of 3 rem*/}
          <nav className="tw-container tw-mt-4 tw-flex tw-items-center tw-py-4 sm:tw-mt-12">
            {/* padding top +bottom 0.25 rem */}
            <div className="tw-py-1">
              <Logo />
            </div>
            <ul className="tw-hidden tw-flex-1 tw-items-center tw-justify-end tw-gap-12 tw-text-xs tw-uppercase sm:tw-flex">
              <MenuItems header={true} />
            </ul>
            <button
              className="tw-flex tw-flex-1 tw-justify-end sm:tw-hidden"
              onClick={openSidebar}
            >
              <i className="fas fa-bars tw-text-2xl tw-transition-colors tw-duration-300 hover:tw-text-bookmark-red"></i>
            </button>
          </nav>
        </header>

        {/* sidebar */}
        <div className="sidebar tw-absolute tw-top-0 tw-z-20 tw-hidden tw-h-screen tw-w-screen">
          <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-bg-slate-600/70 tw-uppercase tw-text-white sm:tw-hidden">
            <div className="tw-absolute tw-right-0 tw-top-0 tw-mr-8 tw-mt-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                onClick={closeSidebar}
                style={{ transform: "scale(1.35)" }}
                className="tw-group"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  className="tw-fill-white tw-transition-colors tw-duration-300 group-hover:tw-fill-bookmark-red"
                  d="M8 5.379L13.303.075l2.122 2.122L10.12 7.5l5.304 5.303-2.122 2.122L8 9.62l-5.303 5.304-2.122-2.122L5.88 7.5.575 2.197 2.697.075 8 5.38z"
                />
              </svg>
            </div>
            <ul className="tw-flex tw-flex-col tw-gap-12 tw-text-center !tw-text-4xl tw-font-light tw-uppercase !tw-tracking-wide">
              <MenuItems header={true} mobile={true} />
            </ul>
          </div>
        </div>

        {/* Hero */}
        <section className="tw-relative" id="hero">
          <div className="tw-container tw-mt-14 tw-flex tw-flex-col-reverse tw-items-center tw-gap-12 lg:tw-mt-28 lg:tw-flex-row">
            {/* Content */}
            <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center lg:tw-items-start">
              <h2 className="tw-mb-6 tw-text-center tw-text-3xl tw-text-bookmark-red md:tw-text-4xl lg:tw-text-left lg:tw-text-5xl">
                Games for everyone, all at one place.
              </h2>
              <p className="tw-mb-6 tw-text-center tw-text-lg tw-text-bookmark-grey lg:tw-text-left">
                A company for all your gaming needs. No matter the age, we have
                a game for you, try our games for free in-store today.
              </p>
              <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-6">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "#products";
                  }}
                  className="btn btn-red"
                >
                  View Products
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "#info";
                  }}
                  className="btn btn-black"
                >
                  Store Info
                </button>
              </div>
            </div>
            {/* Image */}
            <div className="tw-z-10 tw-mb-10 tw-flex tw-flex-1 tw-justify-center md:tw-mb-16 lg:tw-mb-0">
              <img
                className="tw-h-5/6 tw-w-5/6 sm:tw-h-3/4 sm:tw-w-3/4 md:tw-h-full md:tw-w-full"
                src="static/images/hero.svg"
                alt="hero"
                width="916.77499"
                height="612.05507"
              />
            </div>
          </div>
        </section>
        {/* Products */}
        <section
          className="tw-mt-20 tw-bg-bookmark-white tw-py-20 lg:tw-mt-60"
          id="products"
        >
          <div className="tw-mx-auto tw-px-2 sm:tw-w-3/4 lg:tw-w-5/12">
            <h1 className="title tw-text-center tw-text-3xl">Products</h1>
            <p className="tw-mt-4 tw-text-center tw-text-bookmark-grey">
              Here are the products we sell. We have a wide variety of games
              from triple A titles to our own original indie games.
            </p>
          </div>
          {/* Cards */}
          {/* Remove large queries to remove step */}
          {/* set mbs and mts to my's to make center piece stand out */}
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
                    <p className="tw-mb-2 tw-font-light tw-text-bookmark-grey">
                      ${product.price}
                    </p>
                  </div>

                  <div className="tw-flex tw-p-6">
                    <BuyButton />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Features */}
        <section className="tw-mt-20 tw-py-20" id="features">
          {/* Heading */}
          <div className="tw-mx-auto tw-px-2 sm:tw-w-3/4 lg:tw-w-5/12">
            <h1 className="title tw-text-center tw-text-3xl tw-font-medium tw-text-bookmark-red">
              Features
            </h1>
            <p className="tw-mt-4 tw-text-center tw-text-bookmark-grey">
              Not only do we sell games, we're different from other companies.
              We have a lot of features that you can use to your advantage.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="tw-relative tw-mt-20 lg:tw-mt-24">
            <div className="tw-container tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-x-24 lg:tw-flex-row">
              {/* Image */}
              <div className="tw-z-10 tw-mb-10 tw-flex tw-flex-1 tw-justify-center lg:tw-mb-0">
                <img
                  className="tw-h-5/6 tw-w-5/6 sm:tw-h-3/4 sm:tw-w-3/4 md:tw-h-full md:tw-w-full"
                  src="static/images/f1.svg"
                  alt="feature-1"
                  loading="lazy"
                  width="920.10876"
                  height="411.95215"
                />
              </div>
              {/* Content */}
              <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center lg:tw-items-start">
                <h1 className="tw-text-3xl tw-text-bookmark-red">
                  Compatibility
                </h1>
                <p className="tw-my-4 tw-text-center tw-text-bookmark-grey sm:tw-w-3/4 lg:tw-w-full lg:tw-text-left">
                  Not only do we sell games for all ages, we also have games for
                  a wide variety of consoles so you can game anywhere from your
                  phone to your tablet or your pc or even consoles.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="tw-relative tw-mt-20 lg:tw-mt-52">
            <div className="tw-container tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-x-24 lg:tw-flex-row-reverse">
              {/* Image */}
              <div className="tw-z-10 tw-mb-10 tw-flex tw-flex-1 tw-justify-center lg:tw-mb-0">
                <img
                  className="tw-h-5/6 tw-w-5/6 sm:tw-h-3/4 sm:tw-w-3/4 md:tw-h-full md:tw-w-full"
                  src="static/images/f2.svg"
                  alt="feature-2"
                  loading="lazy"
                  width="740.67538"
                  height="597.17519"
                />
              </div>
              {/* Content */}
              <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center lg:tw-items-start">
                <h1 className="tw-text-3xl tw-text-bookmark-red">Prices</h1>
                <p className="tw-my-4 tw-text-center tw-text-bookmark-grey sm:tw-w-3/4 lg:tw-w-full lg:tw-text-left">
                  Not only do we sell our games at a lower price than others, we
                  also have a lot of discounts and sales that you can take
                  advantage of. And we also have a strict policy of 20% markup
                  per game so you know you're not getting scammed.
                </p>
                <button type="button" disabled className="btn btn-red">
                  View Policies (COMING SOON)
                </button>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="tw-relative tw-mt-20 lg:tw-mt-52">
            <div className="tw-container tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-x-24 lg:tw-flex-row">
              {/* Image */}
              <div className="tw-z-10 tw-mb-10 tw-flex tw-flex-1 tw-justify-center lg:tw-mb-0">
                <img
                  className="tw-h-5/6 tw-w-5/6 sm:tw-h-3/4 sm:tw-w-3/4 md:tw-h-full md:tw-w-full"
                  src="static/images/f3.svg"
                  alt="feature-3"
                  loading="lazy"
                  width="562"
                  height="486.80525"
                />
              </div>
              {/* Content */}
              <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center lg:tw-items-start">
                <h1 className="tw-text-3xl tw-text-bookmark-red">Support</h1>
                <p className="tw-my-4 tw-text-center tw-text-bookmark-grey sm:tw-w-3/4 lg:tw-w-full lg:tw-text-left">
                  We have a 24/7 support team that is always ready to help you
                  with any problems you may have. We also have a community forum
                  where you can ask questions and get answers from other users
                  about games.
                </p>
                <button type="button" disabled className="btn btn-red">
                  Get Support (COMING SOON)
                </button>
              </div>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="tw-relative tw-mt-20 lg:tw-mt-52">
            <div className="tw-container tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-x-24 lg:tw-flex-row-reverse">
              {/* Image */}
              <div className="tw-z-10 tw-mb-10 tw-flex tw-flex-1 tw-justify-center lg:tw-mb-0">
                <img
                  className="tw-h-5/6 tw-w-5/6 sm:tw-h-3/4 sm:tw-w-3/4 md:tw-h-full md:tw-w-full"
                  src="static/images/f4.svg"
                  alt="feature-4"
                  loading="lazy"
                  width="987.58708"
                  height="714.02784"
                />
              </div>
              {/* Content */}
              <div className="tw-flex tw-flex-1 tw-flex-col tw-items-center lg:tw-items-start">
                <h1 className="tw-text-3xl tw-text-bookmark-red">Game Chat</h1>
                <p className="tw-my-4 tw-text-center tw-text-bookmark-grey sm:tw-w-3/4 lg:tw-w-full lg:tw-text-left">
                  Need help with a stage of a game, wanna talk about your genius
                  strategy? Game Chat is the perfect place for you. You can ask
                  for help, play with others, and even share strategies!
                </p>
                <button type="button" onClick={() => {window.location.href="/chats"}} className="btn btn-red">
                  Open Game Chat™
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          className="tw-bg-bookmark-white tw-py-20 tw-text-center"
          id="info"
        >
          <div className="tw-container">
            <div className="tw-mx-auto sm:tw-w-3/4 lg:tw-w-2/4">
              <h1 className="title tw-mb-8 tw-text-3xl">Store Info</h1>
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-8">
                <h2 className="subtitle tw-mb-6 tw-text-xl">Opening Hours</h2>
                <ul className="tw-marker-none tw-mb-8 tw-text-xl">
                  <li
                    className="tw-mb-5 tw-text-xl tw-text-bookmark-grey"
                    key="weekday"
                  >
                    Monday - Friday: 8am - 6pm
                  </li>
                  <li
                    className="tw-mb-5 tw-text-xl tw-text-bookmark-grey"
                    key="saturday"
                  >
                    Saturday: 8am-10pm
                  </li>
                  <li
                    className="tw-mb-5 tw-text-xl tw-text-bookmark-grey"
                    key="sunday"
                  >
                    Sunday: 8am - 8pm
                  </li>
                </ul>
              </div>
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2">
                <h2 className="subtitle tw-mb-6 tw-text-xl">Address</h2>
                <h4 className="tw-mb-6 tw-text-lg tw-text-bookmark-red">
                  1035 University Ave, San Diego, CA 92103
                </h4>
              </div>
            </div>
          </div>
        </section>
        <section
          className="tw-bg-bookmark-red tw-py-20 tw-text-white"
          id="contact"
        >
          <div className="tw-container">
            <div className="tw-mx-auto sm:tw-w-3/4 lg:tw-w-2/4">
              <p className="tw-mb-8 tw-text-center tw-font-light tw-uppercase">
                5,000+ messages replied to
              </p>
              <h1 className="tw-text-center tw-text-3xl">
                Have a question? Feel free to call or send us a message!
              </h1>
              <div className="contact-form tw-mt-8 tw-flex tw-flex-col tw-gap-4">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setHasInteractedWithEmail(true);
                  }}
                  className="email-input tw-flex-1 tw-rounded-md tw-px-2 tw-py-3 tw-text-green-700 tw-transition-colors tw-duration-200 focus:tw-outline-none"
                ></input>
                <h1 className="email-error tw-invisible -tw-mt-4 tw-opacity-0 tw-transition-all tw-duration-300">
                  Please enter a valid email.
                </h1>
                <textarea
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setHasInteractedWithMessage(true);
                  }}
                  className="message-input tw-peer tw-flex-1 tw-rounded-md tw-px-2 tw-py-3 tw-text-black focus:tw-outline-none"
                  rows="3"
                />
                <h1 className="message-error tw-invisible -tw-mt-4 tw-opacity-0 tw-transition-all tw-duration-300">
                  Please enter a message.
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    handleSubmit(message, email);
                  }}
                  className="btn btn-black"
                >
                  Send Message
                </button>
              </div>
              <div className="fadeIn thanks tw-mt-8 tw-hidden tw-flex-col tw-gap-6 tw-text-center tw-text-xl tw-font-light">
                Thank you! Your message has been sent.
              </div>
              <p className="tw-mt-4 tw-text-center tw-text-lg tw-font-light tw-uppercase">
                or
              </p>
              <h1 className="tw-mt-2 tw-text-center tw-text-xl">
                Call us at: <span className="tw-font-bold">1-800-555-5555</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="tw-bg-bookmark-black tw-py-8 tw-text-white">
          <div className="tw-container tw-flex tw-flex-col tw-items-center md:tw-flex-row">
            <div className="tw-flex tw-flex-1 tw-flex-wrap tw-items-center tw-justify-center tw-gap-12 md:tw-justify-start">
              <Logo />
              <ul className="tw-flex tw-gap-12 tw-text-xs tw-uppercase">
                <MenuItems />
              </ul>
            </div>
            <div className="flex gap-10 mt-12 md:mt-0">
              <h3 className="tw-font-light">support.nitrostorm@gmail.com</h3>
              <h2 className="tw-font-light tw-text-bookmark-white">
                1035 University Ave, San Diego, CA 92103
              </h2>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function MainPage() {
  return <PageContent />;
}
