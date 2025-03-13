import ReactQuill from "react-quill";
import { QuillModules } from "../../helpers";

export const RTEEditor = ({ label, value, onChange, error }) => {
  return (
    <>
      <div className="mb-4" style={{ height: "250px" }}>
        <label
          htmlFor="procedure_description"
          className="font-medium dark:text-gray2"
        >
          {label} <span className="text-danger">*</span>
        </label>{" "}
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={QuillModules}
          style={{ height: "170px" }}
          // style={{
          //   height: 250,
          // }}
        />
        <div className="text-danger mt-1 ml-1">{error}</div>
      </div>
    </>
  );
};
