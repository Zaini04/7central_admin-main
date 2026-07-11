import { useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import useClickOutside from "utils/clickOutside";
import { setCustomerDocumnet } from "redux/slices/customerSlice";
import { Formik, Form } from "formik";
import FormControl from "components/global/form/FormControl";
import img from 'assets/images/img2.jpg'
import { baseURL } from 'config/api';

const ViewDeatilPop = ({setVeiwDetail}) => {
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const { customerDocumnet } = useSelector(
    (state) => state.customer );



 const initValues = {
    others: customerDocumnet?.other || "",
  documentName: customerDocumnet?.name || "",
  type: customerDocumnet?.type || "",
  assignType: customerDocumnet?.assignType || "",
  status: customerDocumnet?.status || "",
  customerName: customerDocumnet?.customer?.name || "",
  fatherName: customerDocumnet?.customer?.fatherName || "",
  email: customerDocumnet?.customer?.email || "",
  cnic: customerDocumnet?.customer?.cnic || "",
  phoneNumber: customerDocumnet?.customer?.phoneNumber || "",
};




useClickOutside(mainRef, () => {
  setVeiwDetail(false);
  dispatch(setCustomerDocumnet(null));
});

  

  return (
    <div className="fixed top-0 left-0 w-full bg-black/25 flex pt-7 items-center justify-center px-3 h-screen z-[9999]">
      <div
        ref={mainRef}
        className="bg-white w-[90%] sm:w-[60%] rounded-lg py-3 relative overflow-y-auto max-h-[90vh] flex flex-col gap-2 popup"
      >
        {/* Header */}
        <div className="flex justify-between items-center w-full py-3 border-b border-black/10 px-5">
          <h2 className="text-md md:text-lg xl:text-xl font-semibold">
             View Documnet   
          </h2>
       <button
  onClick={() => {
    setVeiwDetail(false);
    dispatch(setCustomerDocumnet(null));
  }}
  className="text-gray-500 h-[30px] w-[30px] rounded-md hover:text-black hover:bg-primary/20 flex items-center justify-center cursor-pointer"
>
  <RxCross1 size={16} />
</button>

        </div>


<div className=" p-3">
         <Formik
            initialValues={initValues}
                    enableReinitialize={true}

          >
            {(formik) => (
             <Formik
            initialValues={initValues}
                    enableReinitialize={true}

          >
            {(formik) => (
            <Form className="flex flex-col gap-3 ">

  {/* Document Details */}
  <h3 className="text-lg font-semibold  px-2">Document Details</h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10">

    
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
      {customerDocumnet?.other  && (
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
            )}
          </Formik>
</div>

  {/* const profileImage = profileData?.image ? `${baseURL}/${profileData?.image}` : img; */}
<div className="p-3">
  <h3 className="text-lg font-semibold px-2">Document Attachment</h3>

  <div className="grid grid-cols-2 gap-2 mt-1">




    {customerDocumnet?.attachments?.length > 0 ? (
      customerDocumnet.attachments.map((item) => (
        <div className=" w-full h-[200px]">
        <img
          key={item?._id}
          src={`${baseURL}/${item?.fileUrl}`}
          alt="Attachment"
          className="w-full h-full  rounded"
        />
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-sm col-span-2">No attachments found.</p>
    )}

  </div>
</div>


    
      </div>
    </div>
  );
};

export default ViewDeatilPop;
