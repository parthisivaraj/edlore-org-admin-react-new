import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import VerifyEmail from '../../components/login/verifyEmail';
import VerifyOTP from '../../components/login/verifyOTP';
import ChangePassword from '../../components/login/changePassword';
import PasswordSuccess from '../../components/login/passwordSuccess';


const ResetPassword = () => {

  // Fetch Data
  const logoDetails = useSelector(state => state.auth.logoDetails);
  const currentStep = useSelector(state => state.resetPassword.currentStep);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>

      {/* Header */}
      <header className="fixed flex items-center z-50 bg-white dark:bg-darkBg dark:border-b dark:border-black3 w-full h-[60px] px-8 py-2 shadow-md overflow-hidden">
        <div className="w-full  flex items-center">
          <div className='flex items-center min-w-[200px] max-w-[300px] h-[50px]'>
            <Link to="/" exact={true} className="w-[200px] max-w-[300px] h-[50px] overflow-hidden">
              <img src={logoDetails && logoDetails.org_logo} alt="organization-logo" className='min-w-[200px] max-w-[300px] min-h-[50px] h-full object-contain' />
            </Link>
          </div>

          <div className="flex items-center justify-end  ml-auto">
            <Link to="/login" exact={true} className="text-primary text-opacity-80 font-medium transition-all hover:text-opacity-100 hover:transition-all">Back to Login</Link>
          </div>
        </div>
      </header>

      {/* Recover Password */}
      <main className={`ed`}>
        <div className='w-full pt-36'>
          <section className='ed-section'>
            {
              currentStep == 0 ?

                <VerifyEmail />
            :
              currentStep == 1 ?

                  <VerifyOTP />
            :
              currentStep == 2 ?

                <ChangePassword />
            :
              currentStep == 3 ?

                <PasswordSuccess />

            : null
            }
          </section>
        </div>
      </main>
    </>
  );
}
export default ResetPassword;
