import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../layout';


const features = [
  { id: "3d", title: '3D' },
  { id: 'manuals', title: 'Manuals' },
  { id: 'drawings', title: 'Drawings' },
  { id: 'video_animations', title: 'Video & Animations' },
  { id: 'voice_support', title: 'Voice Support' },
  { id: 'video_support', title: 'Video Support' },
  { id: 'repair_history', title: 'Repair History' },
  { id: 'procedures', title: 'Procedures' },
  { id: 'error_codes', title: 'Error Codes' },
  { id: 'mcodes', title: 'mCodes' },
  { id: 'alarm_codes', title: 'Alarm Codes' },
  { id: 'troubleshoot', title: 'Troubleshoot' },
  { id: 'manuals', title: 'Manuals' },
  { id: 'drawings', title: 'Drawings' },
  { id: 'video_animations', title: 'Video & Animations' },
  { id: 'voice_support', title: 'Voice Support' },
  { id: 'video_support', title: 'Video Support' },
  { id: 'repair_history', title: 'Repair History' },
  { id: 'procedures', title: 'Procedures' },
  { id: 'error_codes', title: 'Error Codes' },
  { id: 'mcodes', title: 'mCodes' },
  { id: 'alarm_codes', title: 'Alarm Codes' },
  { id: 'troubleshoot', title: 'Troubleshoot' },
]


const Features = () => {

  // Sort the features in Ascending Order by Title
  const sortFeatures = [...features].sort((a, b) => a.title > b.title ? 1 : -1);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Features</title>
      </Helmet>

      <Layout>
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center">
            <img src="../assets/icons/icon-home.svg" alt="icon-home" className='dark:invert' />
            <div className="ml-2 text-xs text-black dark:text-gray2 font-medium">Features</div>
          </div>
          <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">All Features</h1>
        </div>

        <div>
          <div className="w-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-3xl md:p-8 2xl:p-14">
            <h3 className="text-xl dark:text-gray2 font-medium">Features</h3>
            <p className="text-sm text-gray3 dark:text-gray2 opacity-70 mb-3">Enable features for this package</p>
            <div className="w-[400px] relative mb-6 overflow-hidden">
              <input
                type="search"
                className="w-full bg-gray4 dark:bg-black3 dark:text-gray2 bg-opacity-60 md:py-2 2xl:py-3 px-5 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                name="user_search"
                id="user_search"
                placeholder="Search..."
              />
              <div className="block absolute md:top-[14px] 2xl:top-[18px] right-[16px] m-auto">
                <img src="../assets/icons/icon-search.svg" alt="icon-search" className="w-4 h-4 block m-auto dark:invert" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-2 mt-14'>
              {sortFeatures.map((feature, index) => {
                const { id, title } = feature;

                return (
                  <div className='mb-2' key={id}>
                    <label htmlFor={`feature_${id}`} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`feature_${id}`}
                        name={`feature_${id}`}
                        className="w-4 h-4"
                      />
                      <span className='ml-2 md:text-sm 2xl:text-base dark:text-gray2 select-none'>{title}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex item-center justify-end mt-10">
            <button type='button' className='bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 px-8 py-2 rounded-full shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black2 hover:transition-all focus-visible:outline-none'>
              Cancel
            </button>
            <button type='button' className='bg-secondary text-white text-sm font-medium border border-secondary px-8 py-2 ml-5 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none'>
              Submit &amp; Update
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default Features;