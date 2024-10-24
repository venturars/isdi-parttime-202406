import { Component } from "react";
import { Link } from "react-router-dom";
import ES from "../locales/es.json";
const {
  pages: {
    landing: { title, signupButton, loginButton },
  },
} = ES;

class Landing extends Component {
  render() {
    return (
      <section className="w-full h-full min-w-[100vw] min-h-[100vh] grid">
        <div className="place-self-center w-fit max-sm:px-6 relative max-sm:-top-14">
          <div className="w-fit mx-auto mb-9">
            <h1 className="sm:text-3xl max-sm:text-2xl text-center max-xs:text-xl">
              {title}
            </h1>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-8 max-sm:flex max-sm:flex-col">
            <Link
              to="/sign-up"
              target="_self"
              rel="next"
              className="btn btn-primary btn-md max-sm:mb-8"
            >
              {signupButton}
            </Link>
            <Link
              to="/login"
              target="_self"
              rel="next"
              className="btn btn-secondary btn-md"
            >
              {loginButton}
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;