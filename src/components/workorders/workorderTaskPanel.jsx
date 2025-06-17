import React, { useState, Fragment, useEffect } from 'react';
import { Tab, Dialog, Transition } from "@headlessui/react";
import CreateTroubleshoot from "../../components/troubleshoot/createTroubleshoot";
import CreateProcedure from "../../components/procedures/createProcedure";
import ProcedureDetails from "../../components/procedures/procedureDetails";
import { useDispatch, useSelector } from "react-redux";
import ProcedurePreview from './procedurePreview';
import ErrorCodePreview from './errorCodePreview';
import { getAllTaskTypes } from "../../redux/reduxes/taskTypes/taskTypesAction";
import MultiSearchSelect from "../common/multiSelect";
import { getAllTroubleshoot } from "../../redux/reduxes/troubleshoot/troubleshootAction";
import { getModelProcedure } from "../../redux/reduxes/procedure/procedureAction";
import { getAllErrorCodes } from '../../redux/reduxes/errorCodes/errorCodesAction';
import { getAllmCodes } from '../../redux/reduxes/errorCodes/errorCodesAction';
import { createWorkorderTabTwo, changeStepInCreation, updateWorkOrderStep2, getWorkorderDetails } from "../../redux/reduxes/workorders/workorderAction";

import moment from "moment";
import CreateErrorCode from '../errorCodes/eCodes/createErrorCode';
import CreatemCode from '../errorCodes/mCodes/createmCode';
import CreateAlarmCode from '../errorCodes/aCodes/createAlarmCode';
import PermissionsMessage from '../common/permissionsMessage';
import MultiSearchSelectAlarmCodes from '../common/multiSelectAlarmCodes';
// import { useLocation } from "react-router";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const WorkorderTaskPanel = ({ wo_id, activeTab }) => {
  const dispatch = useDispatch();
  // let query = useQuery();
  // const publish = query.get("publish")
  // Fetch Data
  const tasktypes = useSelector(state => state.tasktypes.taskTypesList);
  const troubleshoots = useSelector(state => state.troubleshoot.troubleshootList);
  const allProcedures = useSelector(state => state.procedure.modelProcedures);
  const eCodes = useSelector(state => state.error_codes.errorCodesList);
  const mCodes = useSelector(state => state.error_codes.mCodesList);
  const details = useSelector(state => state.workorders.workOrderDetails);
  const id = useSelector(state => state.workorders.id);
  const model_id = useSelector(state => state.workorders.model_id);
  const permissions = useSelector(state => state.auth.allPermissions);
  const errorCodeModal = useSelector(state => state.error_codes.errorCodeModal);
  const errorCodeType = useSelector(state => state.error_codes.errorCodeType);
  const addTabTwoLoading = useSelector(state => state.workorders.addTabTwoLoading);
  const updateWoStepTwoLoading = useSelector(state => state.workorders.updateWoStepTwoLoading);

  // Troubleshoot and Procedure Modal
  const [addTroubleshootModal, setAddTroubleshootModal] = useState(false);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [addProcedureModal, setAddProcedureModal] = useState(false);

  // Preview Troubleshoot / Procedure and Error Codes
  const [showTroubleshootPreview, setShowTroubleshootPreview] = useState(false);
  const [troubleshootPreviewId, setTroubleshootPreviewId] = useState(false);

  const [showProcedurePreview, setShowProcedurePreview] = useState(false);
  const [showErrorCodePreview, setShowErrorCodePreview] = useState(false);


  // Backdrop that stops from Closing Popup
  const handleModalBackdrop = () => { }

  useEffect(() => {
    if (!id || wo_id !== "new") return;
  
    // Get work order details
    dispatch(getWorkorderDetails({
      id,
      details_page: "false",
    }));
  
  }, [id, wo_id, dispatch]);
  
  useEffect(() => {
    if (activeTab !== 1) return;
    const resolvedModelId = wo_id === "new"
      ? (model_id != undefined ? model_id:details?.device?.model?.id)
      : details?.device?.model?.id;
  
    if (!resolvedModelId) return;
  
    const commonPayload = {
      search: "",
      page: 0,
      paginate: false,
      model_id: resolvedModelId,
      sorting: "",
      sort: 0,
      filter: {},
      limit: 20,
    };
  
    dispatch(getAllErrorCodes({ ...commonPayload, id: resolvedModelId }));
    dispatch(getAllmCodes({ ...commonPayload, id: resolvedModelId }));
    dispatch(getModelProcedure(commonPayload));
    dispatch(getAllTroubleshoot(commonPayload));
  
  }, [activeTab, details, model_id, wo_id, dispatch]);

  // useEffect(() => {
  //   if (!id || wo_id !== "new") return;
  //   dispatch(getWorkorderDetails({
  //     id,
  //     details_page: "false",
  //   }));
  // }, [id, wo_id, dispatch]);

  
  // useEffect(() => {
  //   if (!id || wo_id !== "new") return;
  //   dispatch(getWorkorderDetails({
  //     id,
  //     details_page: "false",
  //   }));
  //   //  if (wo_id == "new" && id != null) {
  //   //       const data = {
  //   //         id: id,
  //   //         details_page: "false",
  //   //       }
  //   //       dispatch(getWorkorderDetails(data));
  //   //     } else {
  //   //       // dispatch(resetWoDetails());
  //   //       // dispatch(getWorkorderDetails());
  //   //     }

  //   if (activeTab == 1) {

  //     const troubleShootData = {
  //       search: "",
  //       page: 0,
  //       paginate: false,
  //       model_id: wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id,
  //       sorting: "",
  //       filter: {},
  //       sort: 0,
  //       limit: 20
  //     }
  //     const procedureData = {
  //       search: "",
  //       page: 0,
  //       paginate: false,
  //       model_id: wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id,
  //       filter: {},
  //       sorting: "",
  //       sort: 0,
  //       limit: 20
  //     }
  //     const errorData = {
  //       search: "",
  //       page: 0,
  //       model_id: wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id,
  //       id: wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id,
  //       paginate: false,
  //       sorting: "",
  //       sort: 0,
  //       filter: {},
  //       limit: 20
  //     }
  //     debugger
  //     // dispatch(getAllAlarmCodes(errorData));
  //     dispatch(getAllErrorCodes(errorData));
  //     dispatch(getAllmCodes(errorData));
  //     dispatch(getModelProcedure(procedureData));
  //     dispatch(getAllTroubleshoot(troubleShootData));
  //   }
  //   // get Details
  //   // if (wo_id !== "new") {
  //   //   const data = {
  //   //     id: id,
  //   //   }
  //   //   dispatch(getWorkorderDetails(data));
  //   // }

  // }, [details, model_id, dispatch]);


  useEffect(() => {
    const taskTypeData = {
      search: "",
      page: 0,
      paginate: false,
      model_id: wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id,
      id: wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id,
      sorting: "",
      sort: 0,
      filter: {},
      limit: 20
    }

    dispatch(getAllTaskTypes(taskTypeData));

    // get Details
    // if (wo_id !== "new") {
    //   const data = {
    //     id: id,
    //   }
    //   dispatch(getWorkorderDetails(data));
    // }

  }, []);

  // States
  const [state, setState] = useState({
    task_type: "",
    repeat_wo: "no",
    repeat_type: "",
    custom_occur_every: 0,
    end_date_type: "by",
    recurrence_end_date: "",
    recurrence_end_days: "",
    no_of_closure_days: "",
    task_due_date: "",

    wo_reccurence: 0,

    task_due_period: "",


    custom_recurrence_every: "",
    previewingId: null,

    ecode_type: "",
    previewTroubleshoot: false,
    previewProcedure: false,
    previewErrorcode: false,

    selectedTroubleShootIds: [],
    selectedProcedureIds: [],
    selectedErrorCodeIds: [],
    selectedMCodeIds: [],
    selectedAlarmCodeIds: [],

    selectedTroubleShoots: [],
    selectedProcedures: [],
    selectedErrorCodes: [],
    selectedMCodes: [],
    selectedAlarmCodes: [],
    possibleMaxLength: 1,

    errors: {
      task_type: "",
      repeat_wo: "",
      repeat_type: "",
      custom_occur_every: "",
      end_date_type: "",
      recurrence_end_date: "",
      recurrence_end_days: "",
      no_of_closure_days: "",
      task_due_date: "",
      todos_all: "",
    }
  });

  // Set the details
  function setWoReccurence(recc) {
    let theRecc =
      recc == "daily" ? 1 :
        recc == "weekly" ? 2 :
          recc == "monthly" ? 3 :
            recc == "quarterly" ? 4 :
              recc == "semi_yearly" ? 5 :
                recc == "annually" ? 6 :
                  recc == "custom" ? 7 : ""

    return theRecc;
  }
  useEffect(() => {
    if (activeTab == 1) {
      if (details.title) {
        const selectedTroubleShootIds = [];
        const selectedProcedureIds = [];
        const selectedErrorCodeIds = [];
        const selectedMCodeIds = [];
        const selectedAlarmCodeIds = [];

        const selectedTroubleShoots = [];
        const selectedProcedures = [];
        const selectedErrorCodes = [];
        const selectedMCodes = [];
        const selectedAlarmCodes = [];

        details && details.work_order_todos && details.work_order_todos.forEach(data => {

          if (data.taskable_type == "Troubleshoot") {
            selectedTroubleShootIds.push(data.troubleshoot.id);
            selectedTroubleShoots.push(data);
          } else if (data.taskable_type == "Procedure") {
            selectedProcedureIds.push(data.procedures.id);
            selectedProcedures.push(data);
          } else if (data.taskable_type == "ErrorCode" && data.error_type == "error_codes") {
            selectedErrorCodeIds.push(data.errors.id);
            selectedErrorCodes.push(data);
          } else if (data.taskable_type == "ErrorCode" && data.error_type == "mcodes") {
            selectedMCodeIds.push(data.errors.id);
            selectedMCodes.push(data);
          } else if (data.taskable_type == "ErrorCode" && data.error_type == "alarm_codes") {
            selectedAlarmCodeIds.push({ id: data.errors.id, title: data.errors.title });
            selectedAlarmCodes.push(data);
          }
        })

        setState((prevProps) => ({
          ...prevProps,
          task_type: (details && details.task_type && details.task_type.id && details.task_type.id) ? details.task_type.id : "",
          repeat_wo: details && details.repeat && details.repeat ? "yes" : "no",
          repeat_type: details && details.repetition && details.repetition.repeat_type ? setWoReccurence(details.repetition.repeat_type) : "",
          custom_occur_every: details && details.repetition && details.repetition.custom_repetition_days && details.repetition.custom_repetition_days,
          end_date_type: (details && details.repetition && details.repetition.end_type) ? details.repetition.end_type : "",
          recurrence_end_date: (details && details.repetition && details.repetition.end_type == "by") ? details && details.repetition && details.repetition.end_by : "",
          recurrence_end_days: (details && details.repetition && details.repetition.end_type == "after") ? details && details.repetition && details.repetition.end_by : "",
          no_of_closure_days: (details && details.repetition && details.repetition.no_of_closure_days) ? details.repetition.no_of_closure_days : "",
          task_due_date: details && details.task && details.task.due_date ? moment(details.task.due_date).format("YYYY-MM-DD") : "",


          repetition_id: details && details.repetition && details.repetition.id ? details.repetition.id : "",


          //  details && details.repetition && details.repetition.end_by && details.repetition.end_by,

          // details && details.repetition && details.repetition.no_of_closure_days && details.repetition.no_of_closure_days,
          task_due_period: (details && details.repetition && details.repetition.end_type) ? details.repetition.end_type : "",


          custom_recurrence_every: details && details.repetition && details.repetition.custom_repetition_days && details.repetition.custom_repetition_days,
          selectedTroubleShootIds: selectedTroubleShootIds,
          selectedProcedureIds: selectedProcedureIds,
          selectedErrorCodeIds: selectedErrorCodeIds,
          selectedMCodeIds: selectedMCodeIds,
          selectedAlarmCodeIds: selectedAlarmCodeIds,


          selectedTroubleShoots: selectedTroubleShoots,
          selectedProcedures: selectedProcedures,
          selectedErrorCodes: selectedErrorCodes,
          selectedMCodes: selectedMCodes,
          selectedAlarmCodes: selectedAlarmCodes,
          // wo_device: details && details.device && details.device.id && details.device.id,
        }));
      } else {
        setState((prevProps) => ({
          ...prevProps,
          task_type: "",
          repeat_wo: "no",
          end_date_type: "by",
          recurrence_end_days: "",
          wo_reccurence: 0,
          recurrence_end_date: "",
          custom_occur_every: 0,
          no_of_closure_days: "",
          task_due_period: "",
          custom_recurrence_every: "",
          task_due_date: "",

          previewingId: null,
          ecode_type: "",
          previewTroubleshoot: false,
          previewProcedure: false,
          previewErrorcode: false,

          selectedTroubleShootIds: [],
          selectedProcedureIds: [],
          selectedErrorCodeIds: [],
          selectedMCodeIds: [],
          selectedAlarmCodeIds: [],

          selectedTroubleShoots: [],
          selectedProcedures: [],
          selectedErrorCodes: [],
          selectedMCodes: [],
          selectedAlarmCodes: [],
        }))
      }
    }
    // Set The Models

  }, [details]);
  const onChangeTaskTypeHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.task_type = (value == "" || value == "not_selected") ? "Select a Task Type" : "";

    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  }
  const repeatChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    errors.repeat_type = "";
    errors.custom_occur_every = "";
    errors.recurrence_end_date = "";
    errors.recurrence_end_days = "";
    errors.no_of_closure_days = "";
    errors.task_due_date = "";


    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
  }
  const onChangeReccurenceHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    errors.repeat_type = "";
    errors.recurrence_end_date = "";
    errors.custom_occur_every = "";
    errors.no_of_closure_days = "";

    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
  }
  const onChangeEndDateByHandler = (event) => {

    const { value, name } = event.target;
    let errors = state.errors;
    errors.recurrence_end_date = "";
    errors.recurrence_end_days = "";

    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }))
  }
  const onChangeEndDateHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    errors.recurrence_end_date = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
  }
  const onChangeCustomRecurrenceHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    errors.custom_occur_every = "";
    errors.wo_reccurence = "";

    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
  }
  const onChangeClosureDateHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    errors.wo_reccurence = "";
    errors.recurrence_end_days = "";


    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }))
  }
  const setSelectedTroubleShoot = (opt) => {
    let errors = state.errors;
    errors.todos_all = ""
    setState((prevProps) => ({
      ...prevProps,
      selectedTroubleShootIds: opt,
      errors
    }))
  }
  const setSelectedProcedure = (opt) => {
    let errors = state.errors;
    errors.todos_all = ""
    setState((prevProps) => ({
      ...prevProps,
      selectedProcedureIds: opt,
      errors
    }))
  }
  const setSelectedECode = (opt) => {
    let errors = state.errors;
    errors.todos_all = ""
    setState((prevProps) => ({
      ...prevProps,
      selectedErrorCodeIds: opt,
      errors
    }))
  }
  const setSelectedMCode = (opt) => {
    let errors = state.errors;
    errors.todos_all = ""
    setState((prevProps) => ({
      ...prevProps,
      selectedMCodeIds: opt,
      errors
    }))
  }

  const validateForm = (errors) => {
    let valid = true;
    // let errors = state.errors;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.task_type == "" || state.task_type == "not_selected") {
      errors.task_type = "Select a Task Type"
      valid = false;
    }
    if ((state.repeat_wo == "yes" && state.repeat_type == "") || (state.repeat_wo == "yes" && state.repeat_type == "not_selected") || (state.repeat_wo == "yes" && state.repeat_type == "0")) {
      errors.repeat_type = "Select a Work Order Reccurence"
      valid = false;
    }
    if ((state.repeat_type == 7 && state.custom_occur_every == "") || (state.repeat_type == 7 && state.custom_occur_every <= 0)) {
      errors.custom_occur_every = "Enter Number of Days to Reccure"
      valid = false;
    }
    if ((state.repeat_wo == "yes" && state.end_date_type == "by" && state.recurrence_end_date == null) || (state.repeat_wo == "yes" && state.end_date_type == "by" && state.recurrence_end_date == "")) {
      errors.recurrence_end_date = "Pick a Date For Reccurence"
      valid = false;
    }

    if ((state.repeat_wo == "yes" && state.end_date_type == "after" && state.recurrence_end_days == null) || (state.repeat_wo == "yes" && state.end_date_type == "after" && state.recurrence_end_days == "")) {
      errors.recurrence_end_days = "Enter Number of Days For Reccurence"
      valid = false;
    }
    if ((state.repeat_wo == "yes" && state.no_of_closure_days <= 0) || (state.repeat_wo == "yes" && state.no_of_closure_days == "")) {
      errors.no_of_closure_days = "Enter Number of Closure Days"
      valid = false;
    }
    if ((state.repeat_wo == "yes" && state.no_of_closure_days > getMaxOfTaskDuration(state.repeat_type, state.custom_occur_every))) {
      errors.no_of_closure_days = "Closure days should be less than reccurence"
      valid = false;
    }
    if ((state.repeat_wo == "no" && state.task_due_date == "") || (state.repeat_wo == "yes" && wo_id != "new" && state.task_due_date == "")) {
      errors.task_due_date = "Select Task Due Date"
      valid = false;
    }
    if (state.selectedProcedureIds.length <= 0) {
      errors.todos_all = "Select atleast one procedure"
      valid = false;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }))
    return valid;
  }


  const handleSubmitEvent = (event) => {
    event.preventDefault();


    if (validateForm(state.errors)) {
      const repetition_attributes = {
        repeat_type: state.repeat_type,
        end_type: state.end_date_type == "by" ? 1 : state.end_date_type == "after" ? 2 : 3,
        end_by: state.end_date_type == "by" ? state.recurrence_end_date : state.recurrence_end_days,
        // due_date: state.repeat_wo == "no" ? state.task_due_date : state.task_due_period,
        no_of_closure_days: state.no_of_closure_days,
        custom_repetition_days: state.custom_occur_every,
      }

      let work_order_todos_attributes = [];

      let selectedTsIdsUnchanged = [];
      let selectedProcedureIdsUnchanged = [];
      let selectedErrorCodeIdsUnchanged = [];
      let selectedMcodeIdsUnchanged = [];
      let selectedAlarmCodeIdsUnchanged = [];



      state.selectedTroubleShoots.length > 0 && state.selectedTroubleShoots.forEach(ts => {
        selectedTsIdsUnchanged.push(ts.troubleshoot.id);
      })
      state.selectedProcedures.length > 0 && state.selectedProcedures.forEach(ts => {
        selectedProcedureIdsUnchanged.push(ts.procedures.id);
      })
      state.selectedErrorCodes.length > 0 && state.selectedErrorCodes.forEach(ts => {
        selectedErrorCodeIdsUnchanged.push(ts.errors.id);
      })
      state.selectedMCodes.length > 0 && state.selectedMCodes.forEach(ts => {
        selectedMcodeIdsUnchanged.push(ts.errors.id);
      })
      state.selectedAlarmCodes.length > 0 && state.selectedAlarmCodes.forEach(ts => {
        selectedAlarmCodeIdsUnchanged.push(ts.errors.id);
      })

      state.selectedTroubleShootIds.forEach(theId => {
        if (selectedTsIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          work_order_todos_attributes.push({ taskable_type: "Troubleshoot", taskable_id: theId })
        }
      })
      let tsDifference = selectedTsIdsUnchanged.filter(x => !state.selectedTroubleShootIds.includes(x));
      tsDifference.length > 0 && tsDifference.forEach(id => {
        state.selectedTroubleShoots.forEach(x => {
          if (id == x.troubleshoot.id) {
            work_order_todos_attributes.push({ taskable_type: "Troubleshoot", "id": x.id, "_destroy": true });
          }
          return true;
        })
      })

      state.selectedProcedureIds.forEach(theId => {
        if (selectedProcedureIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          work_order_todos_attributes.push({ taskable_type: "Procedure", taskable_id: theId })
        }
      })
      let procedureDifference = selectedProcedureIdsUnchanged.filter(x => !state.selectedProcedureIds.includes(x));
      procedureDifference.length > 0 && procedureDifference.forEach(id => {
        state.selectedProcedures.forEach(x => {
          if (id == x.procedures.id) {
            work_order_todos_attributes.push({ taskable_type: "Procedure", "id": x.id, "_destroy": true });
          }
          return true;
        })
      })

      state.selectedErrorCodeIds.forEach(theId => {
        if (selectedErrorCodeIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          work_order_todos_attributes.push({ taskable_type: "ErrorCode", taskable_id: theId })
        }
      })
      let errorCodedifference = selectedErrorCodeIdsUnchanged.filter(x => !state.selectedErrorCodeIds.includes(x));
      errorCodedifference.length > 0 && errorCodedifference.forEach(id => {
        state.selectedErrorCodes.forEach(x => {
          if (id == x.errors.id) {
            work_order_todos_attributes.push({ taskable_type: "ErrorCode", "id": x.id, "_destroy": true });
          }
          return true;
        })
      })

      state.selectedMCodeIds.forEach(theId => {
        if (selectedMcodeIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          work_order_todos_attributes.push({ taskable_type: "ErrorCode", taskable_id: theId })
        }
      })
      let mCodeDifference = selectedMcodeIdsUnchanged.filter(x => !state.selectedMCodeIds.includes(x));
      mCodeDifference.length > 0 && mCodeDifference.forEach(id => {
        state.selectedMCodes.forEach(x => {
          if (id == x.errors.id) {
            work_order_todos_attributes.push({ taskable_type: "ErrorCode", "id": x.id, "_destroy": true });
          }
          return true;
        })
      })
      let selectedAlarmCodeIdsMade = [];
      state.selectedAlarmCodeIds.forEach(theId => {
        selectedAlarmCodeIdsMade.push(theId.id)
        if (selectedAlarmCodeIdsUnchanged.includes(theId.id)) {
          //these are already existing there...
        } else {
          //newly added
          work_order_todos_attributes.push({ taskable_type: "ErrorCode", taskable_id: theId.id })
        }
      })
      let alarmCodedifference = selectedAlarmCodeIdsUnchanged.filter(x => !selectedAlarmCodeIdsMade.includes(x));
      alarmCodedifference.length > 0 && alarmCodedifference.forEach(id => {
        state.selectedAlarmCodes.forEach(x => {
          if (id == x.errors.id) {
            work_order_todos_attributes.push({ taskable_type: "ErrorCode", "id": x.id, "_destroy": true });
          }
          return true;
        })
      })


      // troubleshoots.length > 0 && troubleshoots.forEach(x => {
      //   work_order_todos_attributes.push({ taskable_type: "Troubleshoot", taskable_id: x })
      // })

      // the cide for updating the procedure and e codes
      // state.selectedProcedures.length > 0 && state.selectedProcedures.forEach(x => {
      //   work_order_todos_attributes.push({ taskable_type: "Procedure", taskable_id: x })
      // })
      // const errors = [...state.selectedECode, ...state.selectedMCode, ...state.selectedACode,]
      // errors.length > 0 && errors.forEach(x => {
      //   work_order_todos_attributes.push({ taskable_type: "ErrorCode", taskable_id: x })
      // })

      const data = {
        repeat_wo: state.repeat_wo == "no" ? false : true,
        task_type: state.task_type,
        due_date: state.repeat_wo == "no" ? state.task_due_date : '',
        repetition_attributes: repetition_attributes,
        work_order_todos_attributes: work_order_todos_attributes,
        id: wo_id == "new" ? id : wo_id,
      }


      if (wo_id == "new") {
        dispatch(createWorkorderTabTwo(data)); //uncomment after validation
      } else {
        repetition_attributes['id'] = state.repetition_id
        const updateData = {
          repeat_wo: state.repeat_wo == "no" ? false : true,
          task_type: state.task_type,
          due_date: state.task_due_date,
          repetition_attributes: repetition_attributes,
          work_order_todos_attributes: work_order_todos_attributes,
          id: wo_id == "new" ? id : wo_id,
        }

        dispatch(updateWorkOrderStep2(updateData)); //uncomment after validation
      }
    }
  }
  const setPreview = (type, id, status) => {
    if (type == "Troubleshoot") {
      setState((prevProps) => ({
        ...prevProps,
        previewingId: id,
        previewTroubleshoot: status,
      }))
    }
    if (type == "Procedure") {
      setState((prevProps) => ({
        ...prevProps,
        previewingId: id,
        previewProcedure: status,
      }))
    }
    if (type == "m-code" || type == "e-code" || type == "a-code") {
      setState((prevProps) => ({
        ...prevProps,
        previewingId: id,
        previewErrorcode: status,
        ecode_type: type,
      }))
    }
  }
  const getTheDateByoccurence = (closure_days, reccurence) => {
    let rtnVal = moment(new Date()).format('DD/MM/YYYY');
    const today = new Date();
    if (reccurence == 1) {
      const thefinishingDate = moment().add(Number(closure_days), 'days')
      rtnVal = moment(thefinishingDate).format('DD/MM/YYYY');
    }
    if (reccurence == 2) {
      const thefinishingDate = moment().add(Number(closure_days), 'weeks')
      rtnVal = moment(thefinishingDate).format('DD/MM/YYYY');
    }
    if (reccurence == 3) {
      const thefinishingDate = moment().add(Number(closure_days), 'months')
      rtnVal = moment(thefinishingDate).format('DD/MM/YYYY');
    }
    if (reccurence == 4) {
      const thefinishingDate = moment().add(Number(closure_days), 'quarters')
      rtnVal = moment(thefinishingDate).format('DD/MM/YYYY');
    }
    if (reccurence == 5) {
      const firstQtr = moment().add(Number(closure_days), 'quarters')
      const thefinishingDate = moment(firstQtr).add(Number(closure_days), 'quarters')
      rtnVal = moment(thefinishingDate).format('DD/MM/YYYY');
    }
    if (reccurence == 6) {
      const thefinishingDate = moment().add(Number(closure_days), 'years')
      rtnVal = moment(thefinishingDate).format('MM/DD/YYYY');
    }
    if (reccurence == 7) {
      const thefinishingDate = moment().add(Number(Number(state.custom_occur_every) * Number(closure_days)), 'days')
      rtnVal = moment(thefinishingDate).format('MM/DD/YYYY');
    }
    return `Last work order will be on ${rtnVal} | 12:00 AM PT`
  }
  const getTheDateByDate = (closure_date, reccurence,) => {
    function getTimesBetweenDates(startDate, endDate, gap) {
      const startMoment = moment(startDate);
      const endMoment = moment(endDate);
      return endMoment.diff(startMoment, gap);
    }
    // function getHalfYearsBetween(startDate, endDate) {
    //   const startMoment = moment(startDate);
    //   const endMoment = moment(endDate);
    //   return endMoment.diff(startMoment, 'months') / 6;
    // }

    const today = new Date();
    let rtn = '';
    if (reccurence == 1) {
      var frequency = getTimesBetweenDates(today, closure_date, 'days');
      rtn = getTheDateByoccurence(frequency, reccurence)
    }
    if (reccurence == 2) {
      var frequency = getTimesBetweenDates(today, closure_date, 'weeks');
      rtn = getTheDateByoccurence(frequency, reccurence)
    }
    if (reccurence == 3) {
      var frequency = getTimesBetweenDates(today, closure_date, 'months');
      rtn = getTheDateByoccurence(frequency, reccurence)
    }
    if (reccurence == 4) {
      var frequency = getTimesBetweenDates(today, closure_date, 'quarters');
      rtn = getTheDateByoccurence(frequency, reccurence)
    }
    if (reccurence == 5) {
      var frequency = getTimesBetweenDates(today, closure_date, "quarters");
      rtn = getTheDateByoccurence(Math.floor(frequency / 2), reccurence)
    }
    if (reccurence == 6) {
      var frequency = getTimesBetweenDates(today, closure_date, 'years');
      rtn = getTheDateByoccurence(frequency, reccurence)
    }
    if (reccurence == 7) {
      var frequency = getTimesBetweenDates(today, closure_date, 'days');
      rtn = getTheDateByoccurence(Math.floor(frequency / state.custom_occur_every), reccurence);
    }
    return rtn
  }

  // Due Date onChange Handler
  const handleChangeDueDate = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.task_due_date = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }));
  }
  const onChangeTaskDuePeriod = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.no_of_closure_days = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors
    }));
  }

  const setSelectedAlarmCode = (opt) => {
    let errors = state.errors;
    errors.todos_all = ""
    setState((prevProps) => ({
      ...prevProps,
      selectedAlarmCodeIds: opt,
      errors,
    }))
  }

  // Backdrop that stops from Closing the Modal
  // const handleModalBackdrop = () => { }

  function checkShowTaskDuration(repeat_wo, repeat_type, custom_occur_every) {
    let show = false;
    if (repeat_wo == "yes") {
      if (repeat_type && repeat_type != "") {
        if (repeat_type != 0 && repeat_type != 7) {
          show = true;
        } else if (repeat_type == 7 && custom_occur_every != 0) {
          show = true;
        } else {
          show = false;
        }
      } else {
        show = false;
      }
    } else {
      show = false;
    }
    return show
  }
  function getMaxOfTaskDuration(repeat_type, custom_occur_every) {
    let max = 1;
    if (repeat_type == 1) {
      max = 1;
    } else if (repeat_type == 2) {
      max = 7;
    } else if (repeat_type == 3) {
      max = 30;
    } else if (repeat_type == 4) {
      max = 90;
    } else if (repeat_type == 5) {
      max = 182;
    } else if (repeat_type == 6) {
      max = 365;
    } else if (repeat_type == 7) {
      max = Number(custom_occur_every);
    }
    return max;
  }
  return (
    <>
      <Tab.Panel>
        <>
          <form>
            <div className="w-full  bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl p-8 drop-shadow-md">
              <div className='h-[550px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8 mb-5">
                  <div className="col-start-1 col-span-2 xl:col-span-1">
                    <label htmlFor="wo_reccurence" className="text-sm font-medium dark:text-gray2">Select Task Type <span className='text-danger'>*</span></label>
                    <select
                      name="task_type"
                      id="task_type"
                      className="ed-form__select appearance-none relative w-full h-[50px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                      onChange={(e) => onChangeTaskTypeHandler(e)}
                    >
                      <option value="not_selected" defaultValue>Select a Task Type</option>
                      {tasktypes && tasktypes.length > 0 && tasktypes.map(type => (
                        <option selected={state.task_type == type.id} value={type.id}>{type.title}</option>
                      ))}
                    </select>
                    <div className='text-danger mt-1 ml-1'>{state.errors.task_type}</div>
                  </div>

                  <div className="col-start-1 xl:col-start-2 col-span-2 xl:col-span-1">
                    <div className="text-sm font-medium dark:text-gray2 mb-2">Repeat WO <span className="text-danger">*</span></div>
                    <div className="flex items-center">
                      <label htmlFor="repeat_wo_no" className="flex items-center dark:text-gray2 cursor-pointer select-none">
                        <input
                          type="radio"
                          id="repeat_wo_no"
                          name="repeat_wo"
                          value="no"
                          className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                          checked={state.repeat_wo == "no" && "checked"}
                          onChange={(e) => repeatChangeHandler(e)}
                        />
                        <span className="ml-2 text-base">No</span>
                      </label>

                      <label htmlFor="repeat_wo_yes" className="flex items-center dark:text-gray2 ml-6 cursor-pointer select-none">
                        <input
                          type="radio"
                          id="repeat_wo_yes"
                          name="repeat_wo"
                          value="yes"
                          className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                          checked={state.repeat_wo == "yes" && "checked"}
                          onChange={(e) => repeatChangeHandler(e)}
                        />
                        <span className="ml-2 text-base">Yes</span>
                      </label>
                    </div>
                  </div>
                </div>

                {state.repeat_wo == "yes" &&
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
                    <div className="col-start-1  md:col-span-2 xl:col-span-1">
                      <label htmlFor="wo_reccurence" className="text-sm font-medium dark:text-gray2">Recurrence <span className='text-danger'>*</span></label>
                      <select
                        name="repeat_type"
                        id="repeat_type"
                        className="ed-form__select appearance-none relative w-full text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        onChange={(e) => onChangeReccurenceHandler(e)}
                      >
                        <option selected={state.repeat_type == 0} value={0}>Select Recurrence</option>
                        <option selected={state.repeat_type == 1} value={1}>Daily</option>
                        <option selected={state.repeat_type == 2} value={2}>Weekly </option>
                        <option selected={state.repeat_type == 3} value={3}>Monthly</option>
                        <option selected={state.repeat_type == 4} value={4}>Quarterly</option>
                        <option selected={state.repeat_type == 5} value={5}>Semi Yearly</option>
                        <option selected={state.repeat_type == 6} value={6}>Yearly</option>
                        <option selected={state.repeat_type == 7} value={7}>Custom</option>
                      </select>
                      <div className='text-danger mt-1 ml-1'>{state.errors.repeat_type}</div>
                    </div>

                    {/* By and After Date on Daily/Weekly Basis */}
                    <div className="col-start-2 md:col-span-2 xl:col-span-1">
                      {state.repeat_type == 7 &&
                        <>
                          {/* Custom Select Duration */}
                          <div>
                            <label htmlFor="occur_every" className="text-sm font-medium dark:text-gray2">Occur Every <span className='text-danger'>*</span></label>
                            <div className="w-[280px] relative">
                              <input
                                type="number"
                                id="occur_every"
                                name="custom_occur_every"
                                value={state.custom_occur_every}
                                className="w-[280px] h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                                onChange={(e) => onChangeCustomRecurrenceHandler(e)}
                              />
                              <div className="absolute right-0 top-[16px] w-[80px] mx-5 text-right text-gray3">
                                day(s)
                              </div>
                            </div>
                            <div className='text-danger mt-1 ml-1'>{state.errors.custom_occur_every}</div>
                          </div>
                        </>
                      }
                    </div>

                    <div className="col-start-1 md:col-span-2 xl:col-span-2">
                      <div className="xl:flex items-start gap-7">
                        <div className='ml-1'>
                          <label className="text-sm font-medium dark:text-gray2">End By</label>
                          <div className='flex items-center xl:mt-5 mb-5 xl:mb-0'>
                            <label htmlFor="end_date_none" className="flex items-center dark:text-gray2  cursor-pointer select-none">
                              <input
                                type="radio"
                                id="end_date_none"
                                name="end_date_type"
                                value="none"
                                className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                                checked={(state.end_date_type == "none" || state.end_date_type == "" || state.end_date_type == null) && "checked"}
                                onChange={(e) => onChangeEndDateByHandler(e)}
                              />
                              <span className="ml-2 text-base">None</span>
                            </label>
                            <label htmlFor="end_date_by" className="flex items-center ml-6 dark:text-gray2 cursor-pointer select-none">
                              <input
                                type="radio"
                                id="end_date_by"
                                name="end_date_type"
                                value="by"
                                className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                                onChange={(e) => onChangeEndDateByHandler(e)}
                                checked={state.end_date_type == "by" && "checked"}
                              />
                              <span className="ml-2 text-base">By</span>
                            </label>

                            <label htmlFor="end_date_after" className="flex items-center dark:text-gray2 ml-6 cursor-pointer select-none">
                              <input
                                type="radio"
                                id="end_date_after"
                                name="end_date_type"
                                value="after"
                                className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                                checked={state.end_date_type == "after" && "checked"}
                                onChange={(e) => onChangeEndDateByHandler(e)}
                              />
                              <span className="ml-2 text-base">After</span>
                            </label>

                          </div>
                        </div>
                        {/* If the End Date is By  */}
                        {state.end_date_type == "by" && state.end_date_type != "none" &&
                          <div className='mb-5 xl:mb-0'>
                            <label htmlFor="end_date_by" className="text-sm font-medium dark:text-gray2">By Date <span className='text-danger'>*</span></label>
                            <input
                              type="date"
                              id="end_date_by"
                              name="recurrence_end_date"
                              value={state.recurrence_end_date}
                              min={moment(new Date()).format("YYYY-MM-DD")}
                              max="2200-12-31"
                              className="appearance-none min-w-[280px] w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                              onChange={(e) => onChangeEndDateHandler(e)}
                            />
                            <div className="text-xs dark:text-gray2">{getTheDateByDate(state.recurrence_end_date, state.repeat_type)}</div>
                            <div className='text-danger mt-1 ml-1'>{state.errors.recurrence_end_date}</div>
                          </div>
                        }

                        {/* If the End Date is After */}
                        {state.end_date_type == "after" && state.end_date_type != "none" &&
                          <div>
                            <label htmlFor="end_date_after" className="text-sm font-medium dark:text-gray2">Recurrence <span className='text-danger'>*</span></label>
                            <div className="relative">
                              <input
                                type="number"
                                id="end_date_after"
                                name="recurrence_end_days"
                                value={state.recurrence_end_days}
                                min={1}
                                className="appearance-none min-w-[280px] w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                                onChange={(e) => onChangeClosureDateHandler(e)}
                              />
                              <div className="absolute right-0 top-[16px] w-[80px] mx-5 text-gray3">
                                occurences
                              </div>
                            </div>
                            <div className="text-xs dark:text-gray2">{state.recurrence_end_days != "" && getTheDateByoccurence(state.recurrence_end_days, state.repeat_type)}</div>
                            <div className='text-danger mt-1 ml-1'>{state.errors.recurrence_end_days}</div>
                          </div>
                        }

                        {checkShowTaskDuration(state.repeat_wo, state.repeat_type, state.custom_occur_every) &&
                          <div>
                            <label htmlFor="task_due_date" className="text-sm font-medium dark:text-gray2">Task Duration <span className="text-danger">*</span></label>
                            <div className="relative">
                              <input
                                type="number"
                                id="end_date_by"
                                name="no_of_closure_days"
                                max={getMaxOfTaskDuration(state.repeat_type, state.custom_occur_every)}
                                value={state.no_of_closure_days}
                                className="appearance-none min-w-[280px] w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                                onChange={(e) => onChangeTaskDuePeriod(e)}
                              />
                              <div className="absolute right-0 top-[16px] w-[80px] mx-5 text-right text-gray3">
                                day(s)
                              </div>
                            </div>
                            {/* <div className="text-xs dark:text-gray2">{state.no_of_closure_days != "" && getTheDateByoccurence(state.no_of_closure_days, state.wo_reccurence)}</div> */}
                            <div className='text-danger mt-1 ml-1'>{state.errors.no_of_closure_days}</div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                }

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8 mt-5 mb-4">
                  {(wo_id != "new" || state.repeat_wo == "no") &&
                    <div>
                      <label htmlFor="task_due_date" className="text-sm font-medium dark:text-gray2">Task Due Date<span className="text-danger">*</span></label>
                      <input
                        type="date"
                        name="task_due_date"
                        id="task_due_date"
                        min={moment(new Date()).format("YYYY-MM-DD")}
                        max="2200-12-31"
                        className="w-full h-[50px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-2 focus:border-secondary focus:outline-none"
                        value={state.task_due_date}
                        onChange={(e) => handleChangeDueDate(e)}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.task_due_date} </div>
                    </div>
                  }
                </div>


                {/* Workorder Type */}
                <div className="mt-10 xl:mt-20">
                  <div className="text-2xl font-semibold mb-6 dark:text-gray2">Workorder Type</div>
                  <div className="xl:w-[80%] 2xl:w-[60%]">
                    <div className='text-danger mt-1 ml-1'>{state.errors.todos_all} </div>
                    <ul>
                      {/* Procedures */}
                      <li className="mb-12">
                        {!(permissions.includes("all_procedure") || permissions.includes("read_procedure") || permissions.includes("Admin")) ?
                          <PermissionsMessage
                            additionalClassName="h-full py-5"
                            title="Procedure"
                            message="read procedure"
                          />
                          :
                          <MultiSearchSelect
                            sectiontitle={"Procedure"}
                            options={allProcedures}
                            selectedOptions={state.selectedProcedureIds}
                            setSelectedOptions={setSelectedProcedure}
                            showPreview={setPreview}
                            showShowPreview={true}
                            usedIn="wo"
                            model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                            permissionsWriteCondition={(permissions.includes("all_procedure") || (permissions.includes("write_procedure") && permissions.includes("read_procedure")) || permissions.includes("Admin"))}
                          />
                        }
                      </li>

                      {/* Troubleshoot */}
                      <li className="mb-12">
                        {!(permissions.includes("all_troubleshoot") || permissions.includes("read_troubleshoot") || permissions.includes("Admin")) ?
                          <PermissionsMessage
                            additionalClassName="h-full py-5"
                            title="Troubleshoot"
                            message="read troubleshoot"
                          />
                          :
                          <MultiSearchSelect
                            sectiontitle="Troubleshoot"
                            options={troubleshoots}
                            selectedOptions={state.selectedTroubleShootIds}
                            setSelectedOptions={setSelectedTroubleShoot}
                            showPreview={setPreview}
                            showShowPreview={true}
                            usedIn="wo"
                            model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                            permissionsWriteCondition={(permissions.includes("all_troubleshoot") || (permissions.includes("write_troubleshoot") && permissions.includes("read_troubleshoot")) || permissions.includes("Admin"))}
                          />
                        }
                      </li>

                      {/* Codes */}
                      <li className="mb-8">
                        {!(permissions.includes("all_error_codes") || permissions.includes("read_error_codes") || permissions.includes("Admin")) ?
                          <PermissionsMessage
                            additionalClassName="h-full py-5"
                            title="Error Codes"
                            message="read error codes"
                          />
                          :
                          <MultiSearchSelect
                            sectiontitle="Error Code"
                            options={eCodes}
                            selectedOptions={state.selectedErrorCodeIds}
                            setSelectedOptions={setSelectedECode}
                            showPreview={setPreview}
                            showShowPreview={true}
                            usedIn="wo"
                            model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                            permissionsWriteCondition={(permissions.includes("all_error_codes") || permissions.includes("write_error_codes") || permissions.includes("Admin"))}
                          />
                        }

                        {!(permissions.includes("all_mcodes") || permissions.includes("read_mcodes") || permissions.includes("Admin")) ?
                          <PermissionsMessage
                            additionalClassName="h-full py-10"
                            title="mCodes"
                            message="read mCodes"
                          />
                          :
                          <MultiSearchSelect
                            sectiontitle="mCode"
                            options={mCodes}
                            selectedOptions={state.selectedMCodeIds}
                            setSelectedOptions={setSelectedMCode}
                            showPreview={setPreview}
                            showShowPreview={true}
                            usedIn="wo"
                            model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                            permissionsWriteCondition={(permissions.includes("all_mcodes") || permissions.includes("write_mcodes") || permissions.includes("Admin"))}
                          />
                        }

                        {!(permissions.includes("all_alarm_codes") || permissions.includes("read_alarm_codes") || permissions.includes("Admin")) ?
                          <PermissionsMessage
                            additionalClassName="h-full py-10"
                            title="Alarm Codes"
                            message="read alarm codes"
                          />
                          :
                          <>
                            {/* <MultiSearchSelect
                              sectiontitle="Alarm Code"
                              options={aCodes}
                              selectedOptions={state.selectedAlarmCodeIds}
                              setSelectedOptions={setSelectedACode}
                              showPreview={setPreview}
                              showShowPreview={true}
                              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                              permissionsWriteCondition={(permissions.includes("all_alarm_codes") || permissions.includes("write_alarm_codes") || permissions.includes("Admin"))}
                            /> */}


                            <MultiSearchSelectAlarmCodes
                              sectiontitle="Alarm Code"
                              // options={aCodes}
                              selectedOptions={state.selectedAlarmCodeIds}
                              setSelectedAlarmCode={setSelectedAlarmCode}
                              showPreview={setPreview}
                              showShowPreview={true}
                              usedIn="wo"
                              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                              permissionsWriteCondition={(permissions.includes("all_alarm_codes") || permissions.includes("write_alarm_codes") || permissions.includes("Admin"))}
                            />
                          </>
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mt-10">
              {wo_id != "new" &&
                <button onClick={() => dispatch(changeStepInCreation(0))} type="button" className="bg-transparent text-black2 dark:text-gray2 text-sm font-bold border border-black2 dark:border-gray2 rounded-full px-6 py-2 mr-6 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none">
                  Back
                </button>
              }
              <button
                type="button"
                onClick={(e) => handleSubmitEvent(e)}
                disabled={addTabTwoLoading || updateWoStepTwoLoading}
                className={`${addTabTwoLoading || updateWoStepTwoLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
              >
                {wo_id == "new" ? (addTabTwoLoading ? "Saving..." : "Save and Continue") : (updateWoStepTwoLoading ? "Updating...." : "Update and Continue")}
              </button>
            </div>
          </form>
        </>

        <>
          {/* Add/Create Troubleshoot */}
          {addTroubleshootModal &&
            <CreateTroubleshoot
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
              showTroubleshootModal={addTroubleshootModal}
              setShowTroubleshootModal={setAddTroubleshootModal}
            />
          }


          {/* Create New Procedure Popup / Procedures Tab : Start */}
          {addProcedureModal &&
            <CreateProcedure
              showProcedureModal={addProcedureModal}
              setShowProcedureModal={setAddProcedureModal}
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
            />
          }

          {/* Edit Procedure Popup / Procedures Tab : Start */}
          <Transition appear show={showProcedureModal} as={Fragment}>
            <Dialog as="div" open={showProcedureModal} onClose={() => handleModalBackdrop()} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] 2xl:w-[85%] h-auto bg-gray4 rounded-2xl shadow-lg">

                  {showProcedureModal &&
                    <ProcedureDetails
                      tabName="Step 1"
                      addNewTab="Add Step"
                      actionName="Add"
                      model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
                      setShowProcedureModal={setShowProcedureModal}
                    />
                  }
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition >

          {/* Preview Troubleshoot */}
          {/* {state.previewTroubleshoot &&
             <TroubleshootPreview
              showTroubleshootPreview={state.previewTroubleshoot}
              setShowTroubleshootPreview={setPreview}
              model_id={1}
              trouble_id={state.previewingId}
            />

           } */}
          {/* {state.previewTroubleshoot &&
            <Transition appear show={state.previewTroubleshoot} as={Fragment}>
              <Dialog as="div" open={state.previewTroubleshoot} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] h-auto bg-gray4 dark:bg-black3 rounded-2xl shadow-lg">

                    {showTroubleshootDetailsModal &&
                      <TroubleshootDetails
                        tabName="Step 1"
                        addNewTab="Add Cause"
                        actionName="Add"
                        model_id={model_id}
                        setShowTroubleshootModal={setShowTroubleshootDetailsModal}
                        trouble_id={detailsTroubleshootId}
                      // editable={false}
                      />
                    }
                  </Dialog.Panel>
                </Transition.Child>
              </Dialog>
            </Transition>
          } */}
          {/* Preview Procedures */}
          {state.previewProcedure &&
            <ProcedurePreview
              showProcedurePreview={state.previewProcedure}
              setShowProcedurePreview={setPreview}
              procedure_id={state.previewingId}
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
            />
          }


          {/* Error Code Preview */}
          {state.previewErrorcode &&
            <ErrorCodePreview
              showErrorCodePreview={state.previewErrorcode}
              setShowErrorCodePreview={setPreview}
              errorCodeId={state.previewingId}
              ecode_type={state.ecode_type}
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
            />
          }

          {/* Create Error Code */}
          {errorCodeModal && errorCodeType == "error_codes" &&
            <CreateErrorCode
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
            />
          }

          {/* Create mCode */}
          {errorCodeModal && errorCodeType == "mcodes" &&
            <CreatemCode
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
            />
          }

          {/* Create Alarm Code */}
          {errorCodeModal && errorCodeType == "alarm_codes" &&
            <CreateAlarmCode
              model_id={wo_id == "new" ? model_id : details && details.device && details.device.model && details.device.model.id && details.device.model.id}
            />
          }
        </>
      </Tab.Panel >

    </>
  )
}
export default WorkorderTaskPanel;