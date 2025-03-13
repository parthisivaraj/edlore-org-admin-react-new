import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPart,
  partDetails,
  updatePart,
} from "../../redux/reduxes/anaglyph/anaglyphAction";
import LinkMedia from "../common/linkMediaNew";
import { RTEEditor } from "../common/editor";

const AddNewPartModal = ({
  showPartsModal,
  setShowPartsModal,
  model_id,
  anaglyph_id,
  update,
  partId,
  setPartId,
  paginate,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const details = useSelector((state) => state.anaglyph.partDetails);
  const addPartLoading = useSelector((state) => state.anaglyph.addPartLoading);
  const updatePartLoading = useSelector(
    (state) => state.anaglyph.updatePartLoading,
  );

  // States
  // ----- Dynamic Fields -----
  // const [dynamicFields, setDynamicFields] = useState([{id: 1, name:"", value: ""}]);
  const [dynamicFields, setDynamicFields] = useState([]);
  // Add new Dynamic field
  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { id: dynamicFields.length + 1, name:"", value: "" }]);
  };

  // Remove a Dynamic field
  const removeDynamicField = (id) => {
    setDynamicFields(dynamicFields.filter((field) => field.id !== id));
  };

  // Handle input change Dynamic field
  const handleChangeDynamicField =  (id, key, newValue) => {
    setDynamicFields(
      dynamicFields.map((field) =>
        field.id === id ? { ...field, [key]: newValue } : field
      )
    );
  };
  // ----- Dynamic Fields -----

  const [state, setState] = useState({
    part_name: "",
    purchase_url: "",
    part_id: "",
    layer_id: "",
    part_description: "",
    manufacturer_code: "",
    nomenclature: "",
    nsn_number: "",
    quantity: null,
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    existingFiles: [],

    errors: {
      part_name: "",
      purchase_url: "",
      part_id: "",
      layer_id: "",
    },
  });

  // Dispatch to Part Details
  useEffect(() => {
    const data = {
      model_id: model_id,
      anaglyph_id: anaglyph_id,
      partId: partId && partId,
    };
    dispatch(partDetails(data));
  }, []);

  // Update Part
  useEffect(() => {
    let stepFiles = [];
    details.medias &&
      details.medias.length > 0 &&
      details.medias.forEach((attached, index) => {
        stepFiles.push(attached.active_storage_attachment_id);
      });
    if (update) {
      details &&
        details.id &&
        setState((prevProps) => ({
          ...prevProps,
          part_name: details && details.part_name,
          purchase_url: details && details.purchase_url,
          part_id: details && details.part_id,
          layer_id: details && details.layer_id,
          part_description: details && details.part_description,
          existingFiles: details && details.medias,
          manufacturer_code: details && details.manufacturer_code,
          nomenclature: details && details.nomenclature,
          nsn_number: details && details.nsn_number,
          quantity: details && details.quantity,
          selectedFilesIds: stepFiles,
          existingFilesIdsUnchanged: stepFiles,
        }));
        setDynamicFields((details && details.dynamic_fields && details.dynamic_fields.length!=0 && JSON.parse(details.dynamic_fields).length!=0)?JSON.parse(details.dynamic_fields):[]);
    }
  }, [details]);

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (val = false));
    if (
      state.part_name == "" ||
      state.part_name.length > 150 ||
      state.part_id == "" ||
      state.layer_id == ""
    )
      valid = false;
    return valid;
  };

  // OnChange Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case "part_name":
        errors.part_name =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Part Name"
            : value.length > 150
            ? "Part Name must not exceed more than 150 characters"
            : "";
        break;
      case "part_id":
        errors.part_id =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Part ID"
            : "";
        break;
      case "layer_id":
        errors.layer_id =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Layer ID"
            : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
  };

  // Editor Handle
  const changeHandler = (event, editor) => {
    let errors = state.errors;
    errors.part_description = "";
    setState((prevProps) => ({
      ...prevProps,
      part_description: event,
      errors,
    }));
  };

  // Form Submit Handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let media_attributes = [];
    state.selectedFilesIds.forEach((theId) => {
      if (state.existingFilesIdsUnchanged.includes(theId)) {
        //these are already existing there...
      } else {
        //newly added
        media_attributes.push({ active_storage_attachment_id: theId });
      }
    });
    let difference = state.existingFilesIdsUnchanged.filter(
      (x) => !state.selectedFilesIds.includes(x),
    );
    difference.length > 0 &&
      difference.forEach((id) => {
        state.existingFiles.forEach((x) => {
          if (id == x.active_storage_attachment_id) {
            media_attributes.push({ id: x.id, _destroy: true });
          }
          return true;
        });
      });
    if (validateForm(state.errors)) {
      const data = {
        model_id: model_id,
        anaglyph_id: anaglyph_id,
        partId: partId,
        part_name: state.part_name.replace(/\s+/g, " ").trim(),
        purchase_url: (state.purchase_url || "").replace(/\s+/g, " ").trim(),
        part_id: state.part_id.replace(/\s+/g, " ").trim(),
        layer_id: state.layer_id.replace(/\s+/g, " ").trim(),
        part_description: state.part_description,
        attached_medias_attributes: media_attributes,
        page: paginate.current_page,

        manufacturer_code: (state.manufacturer_code) ? state.manufacturer_code.replace(/\s+/g, " ").trim() : "",
        nomenclature: (state.nomenclature) ? state.nomenclature.replace(/\s+/g, " ").trim() : "",
        nsn_number: (state.nsn_number) ? state.nsn_number.replace(/\s+/g, " ").trim() : "",
        quantity: state.quantity,

        dynamic_fields: dynamicFields,
      };
      if (update) { 
        dispatch(updatePart(data));
      } else {
        dispatch(addPart(data));
      }
      setShowPartsModal(false);
    } else {
      let errors = state.errors;
      if (state.part_name == "") errors.part_name = "Enter Part Name";
      if (state.part_id == "") errors.part_id = "Enter Part ID";
      if (state.layer_id == "") errors.layer_id = "Enter Layer ID";

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Update the Selected Medias
  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m,
    }));
  };

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => {};

  return (
    <>
      <Transition appear show={showPartsModal} as={Fragment}>
        <Dialog
          as="div"
          open={showPartsModal}
          onClose={() => handleBackdropModal()}
          className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-8 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-8">
                {update ? "Update" : "Add New"} 3D Part
              </Dialog.Title>
              {/* <Dialog.Description className="text-base text-black2 dark:text-black3 opacity-60 text-center mb-8">Adding new name to <span className="font-medium underline">Device Name</span></Dialog.Description> */}

              <div className="h-[65vh] px-12 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-start-1 mb-3">
                      <label
                        htmlFor="part_name"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Part Name
                        <span className="text-danger">*</span>
                        <span className="text-gray3 text-sm ml-1">
                          {" "}
                          (Please enter unique Part, Limit: 150 chars)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="part_name"
                        name="part_name"
                        placeholder="Part Name"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.part_name}
                        onChange={(e) => onChangeHandler(e)}
                        maxLength={150}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.part_name}
                      </div>
                    </div>

                    <div className="col-start-2 mb-3">
                      <label
                        htmlFor="purchase_url"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Purchase Url{" "}
                      </label>
                      <input
                        type="text"
                        id="purchase_url"
                        name="purchase_url"
                        placeholder="Purchase Url"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.purchase_url}
                        onChange={(e) => onChangeHandler(e)}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.purchase_url}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-start-1 mb-3">
                      <label
                        htmlFor="part_id"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Part ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="part_id"
                        name="part_id"
                        placeholder="Part ID"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.part_id}
                        onChange={(e) => onChangeHandler(e)}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.part_id}
                      </div>
                    </div>

                    <div className="col-start-2 mb-3">
                      <label
                        htmlFor="layer_id"
                        className="text-sm font-medium dark:text-gray2"
                        style={{ display: "flex" }}
                      >
                        Layer ID <span className="text-danger">*</span>
                        <span className="block text-danger text-sm">
                         &nbsp; Caution: Changing the "Layer ID" will break the 3D mapping.
                        </span>
                      </label>
                     
                      <input
                        type="text"
                        id="layer_id"
                        name="layer_id"
                        placeholder="Layer ID"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.layer_id}
                        onChange={(e) => onChangeHandler(e)}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.layer_id}
                      </div>
                    </div>
                  </div>
                  {/* ----- Dynamic Fields ----- */}
                   
                    <button 
                      onClick={() => addDynamicField()}
                      type='button' 
                      className='mb-3 text-sm font-medium text-primary opacity-75 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                        Add Field +
                    </button>


                    {dynamicFields.map((field) => (
                      <div key={field.id} style={{ display: "flex", marginBottom: "10px" }} className="grid grid-cols-3 gap-8">
                        <div className="col-start-1 mb-3">                 
                          <label htmlFor={`field_name ${field.id}`} className="text-sm font-medium dark:text-gray2">
                            {`Field Name ${field.id}`}
                          </label>
                          <input
                            type="text"
                            id={`field_name ${field.id}`}
                            value={field.name}
                            className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                            onChange={(e) => handleChangeDynamicField(field.id, "name", e.target.value)}
                            placeholder={`Field Name ${field.id}`}
                          />
                        </div>
                        <div className="col-start-2 mb-3"> 
                          <label htmlFor={`field_value ${field.id}`} className="text-sm font-medium dark:text-gray2">
                            {`Field Value ${field.id}`}
                          </label>
                          <input
                            type="text"
                            id={`field_value ${field.id}`}
                            value={field.value}
                            className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                            onChange={(e) => handleChangeDynamicField(field.id, "value", e.target.value)}
                            placeholder={`Field Value ${field.id}`}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeDynamicField(field.id)}
                          className="col-start-3 ml-5 opacity-75 transition-all duration-300 hover:transition-all hover:duration-300 hover:opacity-100 focus:outline-0 focus-visible:outline-0"
                          title="Delete">
                          <img
                            src="/assets/icons/icon-delete.svg"
                            alt="icon-delete"
                            className="dark:invert"
                          />
                        </button>
                      </div>
                    ))}
                  {/* ----- Dynamic Fields ----- */}

                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-start-1 mb-3">
                      <label
                        htmlFor="manufacturer_code"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Manufacturer Code
                      </label>
                      <input
                        type="text"
                        id="manufacturer_code"
                        name="manufacturer_code"
                        placeholder="Manufacturer Code"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.manufacturer_code}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>

                    <div className="col-start-2 mb-3">
                      <label
                        htmlFor="layer_id"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Nomenclature
                      </label>
                      <input
                        type="text"
                        id="nomenclature"
                        name="nomenclature"
                        placeholder="Nomenclature"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.nomenclature}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-start-1 mb-3">
                      <label
                        htmlFor="nsn_number"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        NSN Number
                      </label>
                      <input
                        type="text"
                        id="nsn_number"
                        name="nsn_number"
                        placeholder="NSN Number"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.nsn_number}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>

                    <div className="col-start-2 mb-3">
                      <label
                        htmlFor="layer_id"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        placeholder="Quantity"
                        className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.quantity}
                        onChange={(e) => onChangeHandler(e)}
                      />
                    </div>
                  </div>

                  <div className="col-start-1 mb-3">
                    <RTEEditor
                      value={state.part_description}
                      error={state.errors.part_description}
                      label="Part Description"
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="col-start-1 mb-20">
                    <LinkMedia
                      model_id={model_id}
                      existingFiles={state.existingFiles}
                      selectedFilesIds={state.selectedFilesIds}
                      existingFilesIdsUnchanged={
                        state.existingFilesIdsUnchanged
                      }
                      updateTheSelected={updateTheSelected}
                      limit={48}
                      showOnly="all"
                      type="part"
                      typeId={partId}
                    />
                  </div>

                  <div className="flex items-center justify-end fixed bottom-0 right-0 w-full bg-gray4 dark:bg-darkBg py-8 px-12 mt-10 rounded-b-3xl">
                    <button
                      type="button"
                      onClick={() => setShowPartsModal(false)}
                      className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={addPartLoading || updatePartLoading}
                      className={`${
                        addPartLoading || updatePartLoading
                          ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                          : ""
                      } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-12 py-2 ml-6 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                    >
                      {update
                        ? updatePartLoading
                          ? "Updating..."
                          : "Update"
                        : addPartLoading
                        ? "Adding..."
                        : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
export default AddNewPartModal;
