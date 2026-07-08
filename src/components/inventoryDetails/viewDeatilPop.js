import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { setInventoryDocument } from "redux/slices/inventorySlice";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import { baseURL } from "config/api";

const ViewDeatilPop = ({ setViewPopup }) => {
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  // CORRECT INVENTORY DOCUMENT
  const { inventoryDocument } = useSelector((state) => state.inventory);
  

    // console.log('  this is   inventoryDocument',inventoryDocument)

  const initValues = {
          others: inventoryDocument?.other || "",

    documentName: inventoryDocument?.name || "",
    type: inventoryDocument?.type || "",
    assignType: inventoryDocument?.assignType || "",
    status: inventoryDocument?.status || "",

    // INVENTORY FIELDS
    inventoryNumber: inventoryDocument?.inventory?.fullNumber || "",
    plotNumber: inventoryDocument?.inventory?.plotNumber || "",
    street: inventoryDocument?.inventory?.street || "",
    sector: inventoryDocument?.inventory?.inventorySector || "",
    approximateSize: inventoryDocument?.inventory?.approximateSize || "",
  };

  // CLOSE POPUP ON OUTSIDE CLICK
  useClickOutside(mainRef, () => {
    setViewPopup(false);
    dispatch(setInventoryDocument(null));
  });

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[90%] lg:w-[60%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh] flex flex-col gap-1 popup"
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full py-3 border-b border-black/10 px-5">
          <h2 className="text-md md:text-lg xl:text-xl font-semibold">
            View Inventory Document
          </h2>

          <button
            onClick={() => {
              setViewPopup(false);
              dispatch(setInventoryDocument(null));
            }}
            className="text-gray-500 h-[30px] w-[30px] rounded-md hover:text-black hover:bg-primary/20 flex items-center justify-center cursor-pointer"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* Document Details */}
        <div className="p-3">
          <Formik initialValues={initValues} enableReinitialize={true}>
            {(formik) => (
              <Form className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold px-2">
                  Document Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormControl
                    control="input"
                    type="text"
                    label="Document Type"
                    name="type"
                    disabled
                    formik={formik}
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Assign Type"
                    name="assignType"
                    disabled
                    formik={formik}
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Document Name"
                    name="documentName"
                    disabled
                    formik={formik}
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Status"
                    name="status"
                    disabled
                    formik={formik}
                  />

                  {/* Inventory Fields */}
                  <FormControl
                    control="input"
                    type="text"
                    label="Inventory Number"
                    name="inventoryNumber"
                    disabled
                    formik={formik}
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Plot Number"
                    name="plotNumber"
                    disabled
                    formik={formik}
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Street"
                    name="street"
                    disabled
                    formik={formik}
                  />

                  <FormControl
                    control="input"
                    type="text"
                    label="Approximate Size"
                    name="approximateSize"
                    disabled
                    formik={formik}
                  />



   {inventoryDocument?.other  && (
 <div className="sm:col-span-2">
                               
                                            <FormControl
                                              control="textarea"
                                              label="Note"
                                              name="others"
                                              formik={formik}
                                            />
                                            
                                                </div>
      )}



                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Attachments */}
        <div className="p-3">
          <h3 className="text-lg font-semibold px-2">Document Attachment</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {inventoryDocument?.attachments?.length > 0 ? (
              inventoryDocument.attachments.map((item) => (
                        <div className="  w-full  h-[200px] ">

                <img
                  key={item?._id}
                  src={`${baseURL}/${item?.fileUrl}`}
                  alt="Attachment"
                  className="w-full h-[200px] rounded"
                />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-2">
                No attachments found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeatilPop;
