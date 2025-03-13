import React, { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const ServerError = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = (event) => {
    Cookies.remove('access_token');
    Cookies.remove('isLogin');
    localStorage.clear();
    window.location.replace("/");
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>500 Server error</title>
      </Helmet>


      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="mb-10">
          <img src="../assets/error-500.svg" alt="500-server-error" />
        </div>

        <div className="flex items-center">
          <Link
            to="/dashboard"
            exact={true}
            className='bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary px-6 py-2.5 mr-6 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none'
          >
            Go to Dashboard
          </Link>
          <button type="button" onClick={() => setShowLogoutModal(true)} className='bg-secondary text-sm 2xl:text-base text-white font-medium border border-secondary rounded-full px-14 py-2.5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none'>
            Logout
          </button>
        </div>
      </div>


      {/* Logout Confirmation Modal : Start */}
      <Transition appear show={showLogoutModal} as={Fragment}>
        <Dialog as="div" open={showLogoutModal} onClose={() => setShowLogoutModal(false)} className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="md:w-[50%] xl:w-[40%] 2xl:w-[30%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl px-8 py-10 shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-3xl font-bold text-center mb-4">Logout</Dialog.Title>

              <div>
                <div className="text-black text-center xl:px-10">Are you sure you want to Logout?</div>
                <div className="flex items-center justify-center mt-10">
                  <button onClick={() => setShowLogoutModal(false)} type='button' className='bg-transparent text-sm text-black2 dark:text-gray2 font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none'>
                    Cancel
                  </button>
                  <button onClick={() => logout()} type='button' className='bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none'>
                    Logout
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default ServerError;