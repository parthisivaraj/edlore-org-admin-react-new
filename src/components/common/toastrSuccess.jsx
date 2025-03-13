import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { stopToaster } from "../../redux/reduxes/toaster/tosterAction"


const ToastrSuccess = ({ toastrMessage, hideToastrAction }) => {
  const content = useSelector(state => state.toaster.content);
  const type = useSelector(state => state.toaster.type);
  const showToast = useSelector(state => state.toaster.show);

  const dispatch = useDispatch();

  const hideToastr = () => {
    dispatch(hideToastrAction());
  }

  useEffect(() => {
    if (showToast) {
      setTimeout(function () {
        dispatch(stopToaster());
      }, 3500);
    }
  }, [showToast]);

  return (
    <div className="relative w-full flex justify-center animate-slide transition-all">
      <div className={`flex items-center justify-between fixed left-auto right-auto bottom-[30px] z-[1000] min-w-[500px] xl:min-w-[800px] w-[90%] xl:w-[40%] max-w-[80%] ${type == "success" ? "bg-black3 dark:bg-black1 border border-black3 dark:border-gray3 dark:border-opacity-20" : "bg-danger"} text-white px-6 py-5 rounded-md shadow-sm`}>
        <div className="text-base first-letter:capitalize">{content}</div>
        <button onClick={() => hideToastr()} type="button" className="ml-10 text-3xl focus:outline-0">&times;</button>
      </div>
    </div>
  )
}
export default ToastrSuccess;