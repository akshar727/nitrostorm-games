import * as React from "react";
import { getStatic } from "../constant";
if (window.location.href.includes("signup")) {
  var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
}
export default function SignupPage() {
  const signupUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;
    const name = e.target.name.value;
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }
    if (name.includes(" ")) {
      var firstName = name.split(" ")[0];
      var lastName = name.split(" ")[1];
    } else {
      alert("Please enter your first and last name");
      return;
    }
    fetch("/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.signup);
        if (data.signup) {
          alert("Sign Up Complete! Please login.");
          window.location.href = "/login/";
        } else {
          if (data.error === "EMAIL") {
            alert(
              "Email already exists with an account. Please use another email."
            );
          } else if (data.error === "NAME") {
            alert("Please enter your first and last name.");
          }
        }
      });
  };
  return (
    <>
      <section className="tw-bg-gray-50 dark:tw-bg-gray-900">
        <div className="tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-center tw-px-6 tw-py-8 md:tw-h-screen lg:tw-py-0">
          <a
            href="/"
            className="tw-mb-6 tw-flex tw-items-center tw-text-2xl tw-font-semibold tw-text-gray-900 dark:tw-text-white"
          >
            <img
              className="tw-mr-2 tw-h-8 tw-w-8"
              src={getStatic() + "images/logo.svg"}
              alt="logo"
            />
            Nitrostorm Games
          </a>
          <div className="tw-w-full tw-rounded-lg tw-bg-white tw-shadow dark:tw-border dark:tw-border-gray-700 dark:tw-bg-gray-800 sm:tw-max-w-md md:tw-mt-0 xl:tw-p-0">
            <div className="tw-space-y-4 tw-p-6 sm:tw-p-8 md:tw-space-y-6">
              <h1 className="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 dark:tw-text-white md:tw-text-2xl">
                Create an account
              </h1>
              <form
                className="tw-space-y-4 md:tw-space-y-6"
                method="POST"
                onSubmit={signupUser}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-red-600 focus:border-red-600 tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-gray-900 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:tw-placeholder-gray-400 dark:focus:tw-border-blue-500 dark:focus:tw-ring-blue-500 sm:tw-text-sm"
                    placeholder="name@company.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-red-600 focus:border-red-600 tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-gray-900 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:tw-placeholder-gray-400 dark:focus:tw-border-blue-500 dark:focus:tw-ring-blue-500 sm:tw-text-sm"
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="focus:ring-red-600 focus:border-red-600 tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-gray-900 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:tw-placeholder-gray-400 dark:focus:tw-border-blue-500 dark:focus:tw-ring-blue-500 sm:tw-text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    id="confirm-password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="focus:ring-red-600 focus:border-red-600 tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-gray-900 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:tw-placeholder-gray-400 dark:focus:tw-border-blue-500 dark:focus:tw-ring-blue-500 sm:tw-text-sm"
                    required
                  />
                </div>
                {/* <div className="tw-flex tw-items-start">
                  <div className="tw-flex tw-h-5 tw-items-center">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="focus:tw-ring-3 tw-h-4 tw-w-4 tw-rounded tw-border tw-border-gray-300 tw-bg-gray-50 focus:tw-ring-red-300"
                      required
                    />
                  </div>
                  <div className="tw-ml-3 tw-text-sm">
                    <label
                      htmlFor="terms"
                      className="tw-font-light tw-text-gray-500"
                    >
                      I accept the{" "}
                      <a
                        className="tw-text-bookmark-red dark:text-red-500 tw-font-medium hover:tw-underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                <button
                  type="submit"
                  className="btn btn-red dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 tw-w-full tw-rounded-lg tw-px-5 tw-py-2.5 tw-text-center tw-text-sm tw-font-medium"
                >
                  Create an account
                </button>
                <p className="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login/"
                    className="dark:text-red-500 tw-font-medium tw-text-red-600 hover:tw-underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
