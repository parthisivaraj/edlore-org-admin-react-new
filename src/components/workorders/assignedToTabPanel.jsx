import React, { useState, Fragment, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { getAllUserGroups } from "../../redux/reduxes/userGroups/userGroupsAction";
import { getUserRoles } from "../../redux/reduxes/userRoles/userRolesAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersByRole } from "../../redux/reduxes/users/usersAction";
import LinkMedia from "../common/linkMediaNew";
import { createWorkorderTabThree, changeStepInCreation, updateWorkOrderStep3 } from "../../redux/reduxes/workorders/workorderAction";

const AssignToTabPanel = ({ wo_id, activeTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const userGroupsList = useSelector(state => state.user_groups.userGroupsList);
  const userRoles = useSelector(state => state.user_roles.user_roles);
  const id = useSelector(state => state.workorders.id);
  const details = useSelector(state => state.workorders.workOrderDetails);
  const allUsersByRoleList = useSelector(state => state.users.allUsersByRoleList);
  const addTabThreeLoading = useSelector(state => state.workorders.addTabThreeLoading);
  const updateWoStepThreeLoading = useSelector(state => state.workorders.updateWoStepThreeLoading);

  // States
  const [state, setState] = useState({
    assign_to: "group",
    user_role: "",
    user: "",
    user_group: "",
    task_priority: "low",
    status: "",
    // task_due_date: "",
    wo_description: "",
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    errors: {
      assign_to: "",
      user_role: "",
      user: "",
      user_group: "",
      task_priority: "",
      // task_due_date: "",
      wo_description: "",
    }
  })

  // Dispatch Details
  useEffect(() => {
    // if (details.title && activeTab == 2) {
    let selectedFilesIds = [];
    details && details.attached_medias && details.attached_medias.length > 0 && details.attached_medias.forEach(data => {
      selectedFilesIds.push(data.active_storage_attachment_id);
    })
    setState((prevProps) => ({
      ...prevProps,
      assign_to: (details && details.assigned_to_type) ? details.assigned_to_type == "Group" ? "group" : "individual" : "group",
      user_role: details && details.assigned_to && details.assigned_to.role && details.assigned_to.role.id ? details.assigned_to.role.id : "",
      user: details && details.assigned_to && details.assigned_to.users && details.assigned_to.users.id ? details.assigned_to.users.id : "",
      user_group: details && details.assigned_to && details.assigned_to.group && details.assigned_to.group.id ? details.assigned_to.group.id : "",
      task_priority: details && details.priority && details.priority,
      status: details && details.status && details.status,
      // task_due_date: "",
      wo_description: details && details.note ? details.note : "",
      existingFiles: details && details.attached_medias && details.attached_medias,
      selectedFilesIds: selectedFilesIds,
      selectedFilesIdsUnchanged: selectedFilesIds,
    }));

    const roleData = {
      search: "",
      page: 0,
      sort_column: "",
      sort_order: "",
      filter: {},
      paginate: false,
      limit: 20,
      active: 1
    }
    dispatch(getUserRoles(roleData));

    // Get User by role on load
    const data = {
      id: details && details.assigned_to && details.assigned_to.role && details.assigned_to.role.id ? details.assigned_to.role.id : "",
    }
    dispatch(getAllUsersByRole(data));
    // }
  }, [details]);


  // Dispatch User Roles, User Groups
  useEffect(() => {
    // if (activeTab > 0) {
    if (state.assign_to == "individual") {
      const data = {
        user_id: "",
        search: "",
        page: 0,
        sort_column: "",
        sort_order: "",
        filter: {},
        paginate: false,
        limit: 20,
        active: 1
      }
      dispatch(getUserRoles(data));
    } else {
      const data = {
        search: "",
        page: 0,
        filter: {},
        sort_column: "",
        sort_order: "",
        paginate: false,
        limit: 20,
        active: true
      }
      dispatch(getAllUserGroups(data));
    }
    // }
  }, [state.assign_to]);

  // Dispatch User Roles
  useEffect(() => {
    // if (activeTab == 2) {
    const data = {
      id: state.user_role
    }
    dispatch(getAllUsersByRole(data));
    // }
  }, [state.user_role]);


  // useEffect(() => {
  //   // get Details
  //   if (wo_id !== "new") {
  //     const data = {
  //       id: id,
  //     }
  //     dispatch(getWorkorderDetails(data));
  //   }
  // }, []);

  // Assigned to onChange Handler
  const changeAssignedTo = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    errors.user_role = "";
    errors.user = "";
    errors.user_group = "";

    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
  }

  //  User Role onChange Handler
  const onChangeRoleHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.user_role = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      user: "",
      errors
    }));
    // const data = {
    //   id: value,
    // }
    // dispatch(getAllUsersByRole(data));
  }

  // User Group onChange Handler
  const onChangeGroupHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.user_group = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }));
  }

  // User onChange Handler
  const onChangeUserHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.user = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }));
  }

  // Priority onChange Handler
  const onChangePriorityHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.task_priority = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }));
  }

  // Due Date onChange Handler
  // const handleChangeDueDate = (event) => {
  //   const { name, value } = event.target;
  //   let errors = state.errors;
  //   errors.task_due_date = "";
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     [name]: value,
  //     errors
  //   }));
  // }

  // Description onChange Handler
  const handleChangeDescriptionEvent = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  }

  // Update Selected Fields
  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m
    }));
  };

  // Validate Form
  const validateForm = (errors, status) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if ((state.assign_to == "individual" && state.user_role == "") || (state.assign_to == "individual" && state.user_role == "not_selected"))
      valid = false;
    if ((state.assign_to == "individual" && state.user == "") || (state.assign_to == "individual" && state.user == "not_selected"))
      valid = false;
    if ((state.assign_to == "group" && state.user_group == "") || (state.assign_to == "group" && state.user_group == "not_selected"))
      valid = false;
    if (state.task_priority == "" && state.task_priority == "not_selected")
      valid = false;
    // if (status = "draft")
    //   valid = true;

    return valid;
  };

  // Form Submit
  const [draftWorkorderLoading, setDraftWorkorderLoading] = useState(false);

  const submitHandler = (event, status) => {
    event.preventDefault();

    status == "active" ? setDraftWorkorderLoading(false) : setDraftWorkorderLoading(true);
    if (status == "active") {
      if (validateForm(state.errors, status)) {
        let media_attributes = [];
        state.selectedFilesIds.forEach(theId => {
          if (state.selectedFilesIdsUnchanged.includes(theId)) {
            //these are already existing there...
          } else {
            //newly added
            media_attributes.push({ "active_storage_attachment_id": theId });
          }
        })
        let difference = state.selectedFilesIdsUnchanged.filter(x => !state.selectedFilesIds.includes(x));
        difference.length > 0 && difference.forEach(id => {

          state.existingFiles.forEach(x => {
            if (id == x.active_storage_attachment_id) {
              media_attributes.push({ "id": x.id, "_destroy": true });
            }
            return true;
          })
        })
        const data = {
          assigned_to_type: state.assign_to == "group" ? "Group" : "User",
          assigned_to_id: state.assign_to == "group" ? state.user_group : state.user,
          user_role_id: state.assign_to == "individual" ? state.user_role : "",
          priority: state.task_priority,
          status: status == "active" ? 1 : 3,
          note: state.wo_description,
          media_attributes: media_attributes,
          id: wo_id == "new" ? id : wo_id,
        }
        // dispatch(createWorkorderTabThree(data));
        if (wo_id == "new") {
          dispatch(createWorkorderTabThree(data));
          // setDraftWorkorderLoading(true);
        } else {
          dispatch(updateWorkOrderStep3(data));
          // setDraftWorkorderLoading(true);
        }
      } else {
        let errors = state.errors;
        if ((state.assign_to == "individual" && state.user_role == "") || (state.assign_to == "individual" && state.user_role == "not_selected")) {
          errors.user_role = "Select The User Role"
        }
        if ((state.assign_to == "individual" && state.user == "") || (state.assign_to == "individual" && state.user == "not_selected")) {
          errors.user = "Select The User"
        }
        if ((state.assign_to == "group" && state.user_group == "") || (state.assign_to == "group" && state.user_group == "not_selected")) {
          errors.user_group = "Select The User Group"
        }
        if (state.task_priority == "" || state.task_priority == "not_selected") {
          errors.task_priority = "Select The Priority"
        }
        // if (state.task_due_date == "") {
        //   errors.task_due_date = "Select The Due Date"
        // }

        setState((prevProps) => ({
          ...prevProps,
          errors: errors
        }));
      }
    } else {
      let media_attributes = [];
      state.selectedFilesIds.forEach(theId => {
        if (state.selectedFilesIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          media_attributes.push({ "active_storage_attachment_id": theId });
        }
      })
      let difference = state.selectedFilesIdsUnchanged.filter(x => !state.selectedFilesIds.includes(x));
      difference.length > 0 && difference.forEach(id => {

        state.existingFiles.forEach(x => {
          if (id == x.active_storage_attachment_id) {
            media_attributes.push({ "id": x.id, "_destroy": true });
          }
          return true;
        })
      })
      const data = {
        // assigned_to_type: state.assign_to == "group" ? "Group" : "User",
        // assigned_to_id: state.assign_to == "group" ? state.user_group : state.user,
        // user_role_id: state.assign_to == "individual" ? state.user_role : "",
        priority: state.task_priority,
        status: 3,
        note: state.wo_description,
        media_attributes: media_attributes,
        id: wo_id == "new" ? id : wo_id,
      }
      if (state.assign_to == "group" && state.user_group && state.user_group != "") {
        data['assigned_to_id'] = state.user_group
      } else if (state.assign_to == "individual" && state.user && state.user != "") {
        data['assigned_to_id'] = state.user;
      }
      if (state.assign_to == "individual" && state.user_role && state.user_role != "") {
        data['user_role_id'] = state.user_role;
      }
      if (state.user_role != "" || state.user != "") {
        data['assigned_to_type'] = state.assign_to == "group" ? "Group" : "User";
      }
      // state.assign_to == "group"&&state.user_group&&state.user_group!=""?
      // data['assigned_to_id'] = state.user_group:
      // state.assign_to == "group"&&
      // dispatch(createWorkorderTabThree(data));
      if (wo_id == "new") {
        dispatch(createWorkorderTabThree(data));
        // setDraftWorkorderLoading(true);
      } else {
        dispatch(updateWorkOrderStep3(data));
        // setDraftWorkorderLoading(true);
      }
    }

  };


  return (
    <>
      <Tab.Panel>
        <div>
          <form >
            <div className="w-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl p-8 drop-shadow-md">
              <div className='h-[550px] pr-4 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-5">
                  <div className="col-start-1 mb-6 xl:mb-8">
                    <div className="text-sm font-medium dark:text-gray2 mb-2">Assign to <span className="text-danger">*</span></div>
                    <div className="flex items-center ml-1">
                      <label htmlFor="assign_group" className="flex items-center dark:text-gray2 cursor-pointer select-none">
                        <input
                          type="radio"
                          id="assign_group"
                          name="assign_to"
                          value="group"
                          onChange={(e) => changeAssignedTo(e)}
                          checked={state.assign_to == "group" && "checked"}
                          className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                        />
                        <span className="ml-2 text-base">User Group</span>
                      </label>

                      <label htmlFor="assign_individual" className="flex items-center dark:text-gray2 ml-6 cursor-pointer select-none">
                        <input
                          type="radio"
                          id="assign_individual"
                          name="assign_to"
                          value="individual"
                          checked={state.assign_to == "individual" && "checked"}
                          onChange={(e) => changeAssignedTo(e)}
                          className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                        />
                        <span className="ml-2 text-base">Individual</span>

                      </label>
                    </div>
                  </div>
                  {state.assign_to == "individual" ?
                    <>
                      <div className="col-start-1 xl:col-start-2 mb-4 xl:mb-8">
                        <label htmlFor="user_role" className="text-sm font-medium dark:text-gray2">Select User Role <span className="text-danger">*</span></label>
                        <select
                          value={state.user_role}
                          name="user_role"
                          id="user_role"
                          className="ed-form__select appearance-none relative w-full h-[50px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                          onChange={(e) => onChangeRoleHandler(e)}
                        >

                          <option value="not_selected" defaultValue>Select a user role</option>
                          {userRoles && userRoles.length > 0 && userRoles.map(roles => (
                            <option value={roles.id}>{roles.title}</option>
                          ))}
                        </select>
                        <div className='text-danger mt-1 ml-1'>{state.errors.user_role}</div>
                      </div>

                      <div className="col-start-1 xl:col-start-3 mb-4 xl:mb-8">
                        <label htmlFor="user" className="text-sm font-medium dark:text-gray2">Select User <span className="text-danger">*</span></label>
                        <select
                          value={state.user}
                          name="user"
                          id="user"
                          className="ed-form__select appearance-none relative w-full h-[50px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                          onChange={(e) => onChangeUserHandler(e)}
                        >
                          <option value="not_selected" defaultValue>Select a user</option>
                          {allUsersByRoleList && allUsersByRoleList.length > 0 && allUsersByRoleList.map(user => (
                            <option value={user.id}>{user.full_name} ({user.email})</option>
                          ))}
                        </select>
                        <div className='text-danger mt-1 ml-1'>{state.errors.user} </div>
                      </div>
                    </> :
                    <div className="col-start-1 xl:col-start-2 mb-4 xl:mb-8">
                      <label htmlFor="user_role" className="text-sm font-medium dark:text-gray2">Select User group <span className="text-danger">*</span></label>
                      <select
                        value={state.user_group}
                        name="user_group"
                        id="user_group"
                        className="ed-form__select appearance-none relative w-full h-[50px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                        onChange={(e) => onChangeGroupHandler(e)}
                      >
                        <option value="not_selected" defaultValue>Select a user group</option>
                        {userGroupsList && userGroupsList.length > 0 && userGroupsList.map(group => (
                          <option value={group.id}>{group.title}</option>
                        ))}
                      </select>
                      <div className='text-danger mt-1 ml-1'>{state.errors.user_group} </div>
                    </div>
                  }

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-5">
                  <div className="col-start-1 mb-4">
                    <label htmlFor="task_priority" className="text-sm font-medium dark:text-gray2">Task Priority <span className="text-danger">*</span></label>
                    <select
                      value={state.task_priority}
                      name="task_priority"
                      id="task_priority"
                      className="ed-form__select appearance-none relative w-full h-[50px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                      onChange={(e) => onChangePriorityHandler(e)}
                    >
                      <option disabled defaultValue>Select</option>
                      <option selected={state.task_priority == "low"} value="low">Low</option>
                      <option selected={state.task_priority == "mediym"} value="mediym">Medium</option>
                      <option selected={state.task_priority == "high"} value="high">High</option>
                    </select>
                    <div className='text-danger mt-1 ml-1'>{state.errors.task_priority} </div>
                  </div>

                  {/* <div className="col-start-1 xl:col-start-2 mb-4">
                    <label htmlFor="task_due_date" className="text-sm font-medium dark:text-gray2">Task Due Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      name="task_due_date"
                      id="task_due_date"
                      className="w-full h-[50px] text-base dark:bg-black3 dark:text-gray2 border border-gray2 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                      value={state.manufactured_date}
                      onChange={(e) => handleChangeDueDate(e)}
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.task_due_date} </div>
                  </div> */}

                  {/* <div className="col-start-1 xl:col-start-3 mb-4">
                  <label htmlFor="wo_export_template" className="text-sm font-medium dark:text-gray2">Workorder Template <span className="text-danger">*</span></label>
                  <select
                    name="wo_export_template"
                    id="wo_export_template"
                    className="ed-form__select appearance-none relative w-full h-[50px] text-base dark:bg-black3 dark:text-gray2 border border-gray2 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                  >
                    <option disabled>Select</option>
                    <option value="">Edlore TMP 01</option>
                  </select>
                </div> */}

                  <div className="col-start-1 col-span-3 mb-4">
                    <h4 className="text-2xl font-bold dark:text-gray2">Attach Notes/Instructions</h4>
                    <textarea
                      rows="3"
                      cols="10"
                      name="wo_description"
                      id="wo_description"
                      placeholder="Start typing your notes here..."
                      className="w-full h-full text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                      onChange={(e) => handleChangeDescriptionEvent(e)}
                      value={state.wo_description}
                    >
                    </textarea>
                    {/* <div className='text-danger mt-1 ml-1'>{state.errors.user_role} </div> */}
                  </div>

                  <div className="col-start-1 col-span-3 mb-4 mt-6">
                    {/* <div className="relative h-[108px] mt-8">
                    <input type="file"
                      id="procedure_file"
                      name="procedure_file"
                      className="absolute z-20 w-full h-[108px] opacity-0 cursor-pointer"
                    />
                    <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-black2  border border-dashed border-gray2 rounded-xl md:p-4 xl:p-8">
                      <div className="flex items-center">
                        <img src="../assets/images/devices/folder.png" alt="icon-file" />
                        <span className="ml-4 text-sm opacity-75 dark:text-gray2 leading-tight">Add your documents, photos, or videos <br /> here to start uploading</span>
                      </div>
                      <div className="relative dark:text-gray2 before:content:[''] before:absolute before:left-2.5 before:-top-6 before:h-5 before:border before:border-dashed before:border-gray2 after:content:[''] after:absolute after:left-2.5 after:-bottom-6 after:h-5 after:border after:border-dashed after:border-gray2">OR</div>
                      <button type='button' className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full py-1.5 xl:py-2 px-4 xl:px-6 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                        Browse files
                      </button>
                    </div>
                  </div> */}
                    <LinkMedia
                      // model_id={model_id}
                      existingFiles={[]}
                      selectedFilesIds={state.selectedFilesIds}
                      existingFilesIdsUnchanged={[]}
                      updateTheSelected={updateTheSelected}
                      limit={48}
                      showOnly="all"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="flex items-center justify-end mt-10">
              {wo_id != "new" &&
                <button onClick={() => dispatch(changeStepInCreation(1))} type="button" className="bg-transparent text-black2 dark:text-gray2 text-sm font-bold border border-black2 dark:border-gray2 rounded-full px-6 py-2 mx-3  shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none">
                  Back
                </button>
              }
              {(state.status && state.status == "draft" || wo_id == "new") &&
                <button
                  type="button"
                  onClick={(e) => submitHandler(e, "draft")}
                  disabled={(addTabThreeLoading && draftWorkorderLoading) || (updateWoStepThreeLoading && draftWorkorderLoading)}
                  className={`${(addTabThreeLoading && draftWorkorderLoading) || (updateWoStepThreeLoading && draftWorkorderLoading) ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-black2 dark:bg-white text-white dark:text-black2 text-sm font-medium border border-black2 dark:border-white rounded-full px-10 py-2  shadow-sm transition-all hover:bg-transparent dark:hover:bg-transparent hover:text-black2 dark:hover:text-gray2 hover:transition-all focus-visible:outline-none`}
                >
                  {(addTabThreeLoading && draftWorkorderLoading) || (updateWoStepThreeLoading && draftWorkorderLoading) ? "Saving..." : "Save to Draft"}
                </button>
              }
              <button
                type="button"
                onClick={(e) => submitHandler(e, "active")}
                disabled={(addTabThreeLoading && !draftWorkorderLoading) || (updateWoStepThreeLoading && !draftWorkorderLoading)}
                className={`${(addTabThreeLoading && !draftWorkorderLoading) || (updateWoStepThreeLoading && !draftWorkorderLoading) ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 mx-3 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
              >
                {wo_id == "new" ? (addTabThreeLoading && !draftWorkorderLoading ? "Finalizing..." : "Save and Finalize") : (updateWoStepThreeLoading && !draftWorkorderLoading ? "Updating..." : "Save and Finalize")}
              </button>
            </div>
          </form>
        </div>
      </Tab.Panel>
    </>
  )
}
export default AssignToTabPanel;