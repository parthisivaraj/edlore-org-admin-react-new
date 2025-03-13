import React from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 Not Found</title>
      </Helmet>


      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="mb-10">
          <img src="../assets/404-not-found.svg" alt="404-not-found" />
        </div>
        <Link
          to="/dashboard"
          exact={true}
          className='bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary px-10 py-2 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none'
        >
          Go to Dashboard
        </Link>
      </div>

    </>
  )
}
export default PageNotFound;