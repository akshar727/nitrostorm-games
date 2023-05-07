import * as React from "react";
import { getStatic } from "../constant";
if (window.location.href.includes("login")) {
  var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
}
export default function LoginPage() {
  const loginUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    fetch("/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login === true) {
          window.location.href = "/";
        } else {
          alert("Incorrect email or password");
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
                Sign in to your account
              </h1>
              <form
                className="tw-space-y-4 md:tw-space-y-6"
                onSubmit={loginUser}
                method="POST"
              >
                {/* what i wanna do is check when the form is submitted, send the values to verify the login, and if true then redirect to home paage */}
                <div>
                  <label
                    htmlFor="email"
                    className="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Email
                  </label>
                  <input
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-red-600 focus:border-red-600 tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-gray-900 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:tw-placeholder-gray-400 dark:focus:tw-border-blue-500 dark:focus:tw-ring-blue-500 sm:tw-text-sm"
                    placeholder="name@company.com"
                    required
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
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-red-600 focus:border-red-600 tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-gray-900 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:tw-placeholder-gray-400 dark:focus:tw-border-blue-500 dark:focus:tw-ring-blue-500 sm:tw-text-sm"
                    required
                  />
                </div>
                {/* <div className="tw-flex tw-items-center tw-justify-between">
                  <a
                    href="#"
                    className="text-red-600 dark:text-red-500 tw-text-sm tw-font-medium hover:tw-underline"
                  >
                    Forgot password?
                  </a>
                </div> */}
                <button
                  type="submit"
                  className="tw-w-full btn btn-red"
                >
                  Sign in
                </button>
                <p className="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="tw-text-red-600 tw-font-medium hover:tw-underline"
                  >
                    Sign up
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
