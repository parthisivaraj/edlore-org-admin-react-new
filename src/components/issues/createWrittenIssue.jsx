import React, { useState, useEffect, Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addWrittenIssue, updateWrittenIssue, setWrittenIssuesModal, resetWrittenIssuesErrors } from '../../redux/reduxes/writtenIssues/writtenIssueAction';
import { getAllSectionsNoPaginate } from "../../redux/reduxes/sections/sectionAction";


const CreateWrittenIssue = ({ showWrittenIssueModal, model_id, section_id, wi_id, updateWI, WiName }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addWrittenIssueLoading = useSelector(state => state.written_issues.addWrittenIssueLoading);
  const addWrittenIssueError = useSelector(state => state.written_issues.addWrittenIssueError);
  const updateWrittenIssueLoading = useSelector(state => state.written_issues.updateWrittenIssueLoading);

  // default dispatch
  useEffect(() => {
    const sectionData = {
      id: model_id,
      search: "",
      anaglyph: false,
    }
    dispatch(getAllSectionsNoPaginate(sectionData));
    dispatch(resetWrittenIssuesErrors());
  }, [])

  // Fetch data
  const sectionsList = useSelector(state => state.sections.sectionsListNoPage);
  const issueDetails = useSelector(state => state.written_issues.writtenIssueDetails);

  // States
  const [state, setState] = useState({
    issue_title: '',
    map_section: issueDetails.section_id ? issueDetails.section_id : null,

    errors: {
      issue_title: "",
      map_section: "",
    }
  });
  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addWrittenIssueError.length > 0) {
      addWrittenIssueError.forEach(error => {
        switch (error.name) {
          case 'name':
            errors.issue_title = error.message;
            break;
          default:
            break;
        }
      })
    } else {
      errors.issue_title = "";
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
    // if (!updateWI) {
    //   setState((prevProps) => ({
    //     ...prevProps,
    //     map_section: null,
    //   }));
    // }
  }, [addWrittenIssueError]);

  // Update WI
  useEffect(() => {
    if (updateWI) {
      setState((prevProps) => ({
        ...prevProps,
        issue_title: WiName,
      }))
    }
  }, [WiName])

  // Dispatch WI Details
  useEffect(() => {
    if (issueDetails && issueDetails.section_id) {
      issueDetails && issueDetails.title && setState((prevProps) => ({
        ...prevProps,
        issue_title: issueDetails.name,
        map_section: issueDetails.section_id
      }))
    }
    if (!updateWI) {
      setState((prevProps) => ({
        ...prevProps,
        map_section: null,
      }));
    }
  }, [issueDetails]);

  // Form Validation
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.issue_title == "" || state.issue_title.length > 150 || state.map_section == null || state.map_section == "selected")
      valid = false;
    return valid;
  }

  // Handle Change Event
  const handleChangeEvent = (event) => {

    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'issue_title':
        errors.issue_title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Written Issue Group Name" : value.length > 150 ? "Written Issue Group Name shouldn't exceed more than 150 characters" : "";
        break;
      case 'map_section':
        errors.map_section = (value == "" || value == "selected") ? "Select one Section" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value,
    }));
  }

  // Form Submit
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        issue_title: state.issue_title.replace(/\s+/g, ' ').trim(),
        section_id: state.map_section,
        model_id: model_id,
      }
      const updateData = {
        issue_title: state.issue_title.replace(/\s+/g, ' ').trim(),
        section_id: state.map_section != null ? state.map_section : issueDetails.section_id,
        model_id: model_id,
        wi_id: wi_id,
        oldSectionIx: section_id,
      }
      if (updateWI) {
        dispatch(updateWrittenIssue(updateData));
      } else {
        dispatch(addWrittenIssue(data));
      }
    } else {
      let errors = state.errors;
      if (state.issue_title == "") {
        errors.issue_title = "Enter Written Issue Group Name"
      }
      if (state.map_section == null || state.map_section == "selected") {
        errors.map_section = "Select one Section"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Backdrop stops from Closing Modal
  const handleModalBackdrop = () => { }

  return (
    <Transition appear show={showWrittenIssueModal} as={Fragment}>
      <Dialog as="div" open={showWrittenIssueModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[80%] lg:w-[65%] xl:w-[40%] 2xl:w-[35%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-2xl p-8 xl:p-10 shadow-lg">
            <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">{updateWI ? "Update" : "Create New"} Written Issue</Dialog.Title>

            <form onSubmit={(e) => handleSubmitEvent(e)} >
              <div className="mb-6">
                <label htmlFor="issue_title" className="text-sm font-medium">
                  Written Issue Group
                  <span className="text-danger">*</span>
                  <span className='text-gray3 text-sm ml-1'> (Please enter unique Group, Limit: 150 chars)</span>
                </label><br />
                <input
                  type="text"
                  name="issue_title"
                  id="issue_title"
                  placeholder="Enter Group Name"
                  className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-oapcity-100  border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  value={state.issue_title}
                  onChange={(e) => handleChangeEvent(e)}
                  maxLength={150}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.issue_title}</div>
              </div>


              <div className="mb-6">
                <label htmlFor="map_section" className="text-sm font-medium">Map to Section<span className="text-danger">*</span></label><br />
                <select
                  name="map_section"
                  id="map_section"
                  className="ed-form__select appearance-none relative w-full h-[50px] text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  onChange={(e) => handleChangeEvent(e)}
                >
                  <option value="selected" defaultValue>Select</option>
                  {sectionsList && sectionsList.length > 0 && sectionsList.map((section, index) => {
                    return (
                      <option value={section.id && section.id} selected={(updateWI && (section.id == issueDetails.section_id)) == true ? true : false} key={section.id}>
                        {section.title && section.title}
                      </option>
                    )
                  })}
                </select>
                <div className='text-danger mt-1 ml-1'>{state.errors.map_section}</div>
              </div>


              <div className="flex items-center justify-end mt-14">
                <button type="button" onClick={() => dispatch(setWrittenIssuesModal(false))} className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 mx-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addWrittenIssueLoading || updateWrittenIssueLoading}
                  className={`${addWrittenIssueLoading || updateWrittenIssueLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base  font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-none`}
                >
                  {updateWI ? (updateWrittenIssueLoading ? "Updating..." : "Update") : (addWrittenIssueLoading ? "Loading..." : "Next")}
                </button>
              </div>
            </form>
          </Dialog.Panel>

        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default CreateWrittenIssue;