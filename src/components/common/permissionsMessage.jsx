import { ServerPath } from "../../helpers";

const PermissionsMessage = ({
  additionalClassName,
  title,
  message,
  messageClassName,
}) => {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center mx-auto w-full ${additionalClassName}`}
      >
        <div className="text-3xl font-bold text-center dark:text-gray2">
          Access Denied for {title}
        </div>
        <div
          className={`text-base 2xl:text-lg text-gray3 text-center mb-2 ${messageClassName}`}
        >
          Access to this page restricted due to the insufficient permission to{" "}
          <strong className="lowercase">{message}</strong>. <br />
          Please contact the admin to get the access.
        </div>
        <div className="text-base 2xl:text-lg text-black3 text-opacity-75 dark:text-gray2 dark:text-opacity-50 text-center">
          For more information, please read the
          <a
            href={`${ServerPath}/permissions.pdf`}
            target="_blank"
            rel="noreferrer"
            className="pl-1 text-lg text-black3 dark:text-gray2 font-semibold underline transition-all duration-300 ease-in-out hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-in-out"
          >
            "Permissions Documentation".
          </a>
        </div>
      </div>
    </>
  );
};
export default PermissionsMessage;
