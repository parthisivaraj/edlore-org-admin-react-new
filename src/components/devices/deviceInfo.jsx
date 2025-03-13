import React, { useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteDevice, deviceStatusUpdate } from "../../redux/reduxes/devices/deviceAction";
import DeleteModal from "../common/deleteModal";
// import axios from 'axios';
// import { saveAs } from 'file-saver';



const DeviceInfo = (props) => {

  const dispatch = useDispatch();
  const componentRef = useRef();

  // Get the Device Details
  const { id, category, serial_number, width, depth, length, manufacturedDate, warranty, modelNo, wdl, status, deviceId, modelId, from, categoryType } = props;

  const deviceDetailsLoading = useSelector(state => state.devices.deviceDetailsLoading);
  const permissions = useSelector(state => state.auth.allPermissions);
  const deleteDeviceLoading = useSelector(state => state.devices.deleteDeviceLoading);

  // Device Status
  const deviceStatusChange = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      status: status == "active" ? 1 : 2
    }
    dispatch(deviceStatusUpdate(data));
  }

  // Delete Device
  const [deleteDeviceModal, setDeleteDeviceModal] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>'+props.name+' QR Code</title></head><body>');
    printWindow.document.write(`
      <img 
        src="${props.qrImage}" 
        alt="qr-code" 
        style="max-width: 100%; max-height: 600px; height: auto; display: block; margin: 0 auto;" 
      />
    `);

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // Download Device PDF
  // const download = (img, name) => {
  // fetch(img, {
  //   method: "GET",
  //   headers: {
  //     'Authorization': `Bearrer ${localStorage.getItem("access_token")}`,
  //   }
  // })
  //   .then(response => {
  //     response.arrayBuffer().then(function (buffer) {
  //       const url = window.URL.createObjectURL(new Blob([buffer]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `${name}.png`); //or any other extension
  //       document.body.appendChild(link);
  //       link.click();
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // const downloadFile = (s3Url) => {
  // console.log(img, "TFTFTFTFTFTFTF");
  // axios.get(img, { responseType: 'blob' }).then((response) => {
  // console.log(response, "response");
  //   const blob = new Blob([response.data]);
  //   saveAs(blob, 'file-name.extension');
  // }).catch((err) => {
  //   console.log("the error", err);
  // });
  // };
  // };
  return (
    <>
      <div className="xl:flex items-start w-full h-full overflow-hidden bg-white dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md">
        <div className="relative w-full xl:w-[350px] 2xl:w-[400px] bg-gray2 dark:bg-darkMainBg rounded-b-none xl:rounded-r-none overflow-hidden">
          {deviceDetailsLoading ? <Skeleton width="320px" height="380px" className="dark:bg-darkMainBg" /> :
            <div className="relative w-full md:h-[320px] 2xl:h-[380px]">
              <img src={props.image} alt={props.name} className="w-full md:h-[320px] 2xl:h-[380px] h-full rounded-b-none xl:rounded-r-none object-cover" />
            </div>
          }
          <div className="w-full h-full flex items-center  bg-black3 bg-opacity-10 absolute bottom-0 left-0">
            {/* <img src="../assets/images/devices/qr-code.png" alt="qr-code" className="w-[80px] h-[80px] object-contain" /> */}
            {deviceDetailsLoading ? <Skeleton width="110px" height="100px" containerClassName="mt-auto ml-2" className="dark:bg-darkMainBg" /> :
              <div className="bg-white min-w-[100px] w-[100px] min-h-[100px] h-[100px] rounded-md ml-2 mt-auto mb-2 relative group">
                <img
                  src={props.qrImage}
                  alt="qr-code"
                  className="min-w-[100px] w-[100px] min-h-[100px] h-[100px] p-[1px] object-contain"
                  onClick={handlePrint}
                />
                <button
                  onClick={handlePrint}
                  className="mt-2 p-2 bg-blue2 text-white text-sm rounded absolute bottom-0 w-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Print QR Code
                </button>
            </div>
            }

            <div className="ml-5 mt-auto mb-3">
              {/* <button
                className="bg-primary text-white text-xs font-medium border border-primary rounded-full px-6 py-[5px] mb-3 shadow-sm transition-all hover:bg-transparent hover:text-white hover:transition-all focus-visible:outline-none"
                download
                onClick={() => download(props.qrImage, deviceId)}
              >
                <i className="fa fa-download" />
                Download
              </button> */}
              {/* <ReactToPrint
                trigger={() => <button type="button" className="bg-primary text-white text-xs font-medium border border-primary rounded-full px-6 py-[5px] shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">Print QR</button>}
                content={() => componentRef.current}
              /> */}
              {/* <ComponentToPrint
                ref={componentRef}
                image={props.qrImage}
                name={props.name}
                id={props.deviceId}
              /> */}
            </div>
          </div>
        </div>

        <div className="w-full md:px-6 md:p-8 xl:py-3 2xl:p-8">
          <div className="flex xl:items-start md:mb-12 xl:mb-8 2xl:mb-12">
            {deviceDetailsLoading ? <Skeleton count={2} width={300} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="flex flex-col xl:flex-row xl:items-center text-sm capitalize leading-normal mb-2 xl:mb-1">
                  <div className="text-gray3  dark:text-gray3">Device Name:</div>
                  <div className="xl:ml-1 text-base capitalize font-medium max-w-[200px] lg:max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap" title={props.name}>{props.name ? props.name : "-"}</div>
                </div>
                {/* <div className="flex flex-col xl:flex-row xl:items-center text-sm capitalize leading-tight mb-2 xl:mb-1">
                  <div className="text-gray3  dark:text-gray3">Device Category:</div>
                  <div className="xl:ml-1 text-base capitalize font-medium max-w-[200px] lg:max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap" title={category}>{category ? `${category} (${categoryType})` : "-"}</div>
                </div> */}
                <div className="flex flex-col xl:flex-row xl:items-center text-sm capitalize leading-tight">
                  <div className="text-gray3  dark:text-gray3">Serial Number:</div>
                  <div className="xl:ml-1 text-base capitalize font-medium max-w-[200px] lg:max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap" title={props.serial_number}>{props.serial_number ? props.serial_number : "-"}</div>
                </div>
              </div>
            }

            {(permissions.includes("all_device") || permissions.includes("update_device") || permissions.includes("Admin")) &&
              <div className="ml-auto">
                {deviceDetailsLoading ? <Skeleton width={200} height={40} className="dark:bg-darkMainBg" /> :
                  <select
                    name="device_info_status"
                    id="device_info_status"
                    onChange={(e) => deviceStatusChange(e)}
                    className="ed-form__select appearance-none relative min-w-[150px] md:h-[35px] 2xl:h-[40px] dark:bg-darkBg dark:text-gray4 md:text-sm 2xl:text-base font-medium border border-gray2 dark:border-opacity-50 rounded-md md:px-1.5 2xl:px-3 md:py-1 2xl:py-2 focus:border-secondary focus:outline-none"
                  >
                    {/* <option value="" disabled>Select</option> */}
                    {status == "active" ?
                      <>
                        <option value="" defaultValue>Active</option>
                        <option value="">Move to Draft</option>
                      </>
                      :
                      <>
                        <option value="" defaultValue>Draft</option>
                        <option value="">Activate</option>
                      </>
                    }
                  </select>
                }
              </div>
            }
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 md:gap-4 xl:gap-2 2xl:gap-4 md:mb-6 xl:mb-4 2xl:mb-6">
            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3  dark:text-gray3">Device ID</div>
                <div className="text-base text-black2  dark:text-gray2 font-medium break-all" title={props.deviceId}>{props.deviceId ? props.deviceId : "-"}</div>
              </div>
            }

            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3  dark:text-gray3">Manufactured By</div>
                <div className="text-base text-black2  dark:text-gray2 font-medium capitalize break-all" title={props.manufacturedBy}>{props.manufacturedBy ? props.manufacturedBy : "-"}</div>
              </div>
            }

            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3 dark:text-gray3">Category</div>
                <div className="text-base text-black2 dark:text-gray2 font-medium capitalize break-all" title={category}>{category ? `${category}` : "-"} <small>({categoryType ? categoryType : "-"})</small></div>
              </div>
            }

            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3 dark:text-gray3">Manufactured Date</div>
                <div className="text-base text-black2 dark:text-gray2 font-medium" title={manufacturedDate}>{manufacturedDate ? manufacturedDate : "-"}</div>
              </div>
            }
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 md:gap-4 xl:gap-2 2xl:gap-4 md:mb-12 xl:mb-8 2xl:mb-16">
            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3 dark:text-gray3">Model No</div>
                {(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) ?
                  <Link to={`/device-model/${modelId}`} exact={true} title={modelNo} className="inline-block text-base text-primary opacity-85 underline first-letter:capitalize font-medium break-all transition-all duration-300 hover:transition-all hover:opacity-100 hover:duration-300 hover:no-underline">
                    {modelNo ? modelNo : "-"}
                  </Link>
                  :
                  <div className="inline-block text-base text-black2 dark:text-gray2 opacity-85 first-letter:capitalize font-medium break-all transition-all duration-300 hover:transition-all hover:opacity-100 hover:duration-300 hover:no-underline">
                    {modelNo ? modelNo : "-"}
                  </div>
                }
              </div>
            }

            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3 dark:text-gray3">Location</div>
                <div className="text-base text-black2 dark:text-gray2 font-medium capitalize break-all" title={props.location}>{props.location ? props.location : "-"}</div>
              </div>
            }

            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3 dark:text-gray3">WxDxL</div>
                <div className="max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden text-base text-black2 dark:text-gray2 font-medium" title={wdl}>{wdl ? wdl : "-"}</div>
              </div>
            }

            {deviceDetailsLoading ? <Skeleton count={2} width={200} height={20} className="dark:bg-darkMainBg" /> :
              <div>
                <div className="text-sm text-gray3 dark:text-gray3">Warranty</div>
                <div className="text-base text-black2 dark:text-gray2 font-medium" title={warranty}>{warranty ? warranty : "-"}</div>
              </div>
            }
          </div>

          <div className="flex items-center">
            {(permissions.includes("all_device") || permissions.includes("update_device") || permissions.includes("Admin")) &&
              <>
                {deviceDetailsLoading ? <Skeleton width={200} height={30} className="dark:bg-darkMainBg" /> :
                  <Link to={`/edit-device/${id}`} exact={true} className="flex items-center text-sm font-medium transition-all duration-300 hover:text-secondary hover:transition-all hover:duration-300 focus-visible:outline-0 focus-visible:ring-0">
                    <span >Edit Device</span>
                    <img src="../assets/icons/icon-edit.svg" alt="icon-edit" className="w-4 h-4 ml-1 dark:invert dark:opacity-60" />
                  </Link>
                }
              </>
            }

            <div className="flex items-center ml-auto">
              {/* {deviceDetailsLoading ? <Skeleton className="mr-5" width={200} height={30} /> :
                <button type="button" className="flex items-center text-sm transition-all hover:text-primary hover:transition-all focus-visible:outline-none focus-visible:ring-0">
                  Create a New Duplicate
                  <img src="../assets/icons/icon-duplicate.svg" alt="icon-duplicate" className="w-5 h-5 ml-1 dark:invert" />
                </button>
              } */}

              {(permissions.includes("all_device") || permissions.includes("delete_device") || permissions.includes("Admin")) &&
                <>
                  {deviceDetailsLoading ? <Skeleton width={200} height={30} className="dark:bg-darkMainBg" /> :
                    <button type="button" onClick={() => setDeleteDeviceModal(true)} className="flex items-center text-sm font-medium md:ml-4 xl:ml-8 transition-all duration-300 hover:text-danger hover:transition-all hover:duration-300 focus-visible:outline-0 focus-visible:ring-0" title="Delete">
                      Remove Permanently
                      <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-5 h-5 ml-1 dark:invert dark:opacity-60" />
                    </button>
                  }
                </>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Delete Device Modal */}
      {deleteDevice &&
        <DeleteModal
          head="Remove Device"
          body={["Are you sure you want to remove", <strong className="capitalize break-all"> "{props.name ? props.name : "-"}" </strong>, "Device?"]}
          deleteAction={deleteDevice}
          modalAction={setDeleteDeviceModal}
          modalValue={deleteDeviceModal}
          parentmodel={false}
          id={id}
          model_id={modelId}
          deletingFrom={from}
          deleteLoading={deleteDeviceLoading}
        />
      }
    </>
  );
}
export default DeviceInfo