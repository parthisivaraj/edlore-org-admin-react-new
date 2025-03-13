import React from 'react';
import { Link } from 'react-router-dom';

const PasswordSuccess = () => {
  return (
    <>
      <div className='flex flex-col mx-auto w-[600px] bg-white dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-8'>
        <h1 className='text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-10 dark:text-gray2'>Password Changed!</h1>
        <div className='text-base text-gray3 dark:text-gray2 dark:text-opacity-80'>
          You password has been reset. Please continue to login with your new password.
        </div>

        <Link
          to="/login"
          exact={true}
          className='w-full text-base mt-8 mb-4 bg-primary text-white font-medium text-center uppercase border border-primary rounded-full px-4 py-3 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none'>
          Login
        </Link>
      </div>
    </>
  )
}
export default PasswordSuccess;