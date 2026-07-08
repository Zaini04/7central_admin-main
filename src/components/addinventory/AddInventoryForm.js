import { useMemo, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch,useSelector   } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import addInventoriesValidations from "validations/addInventoriesValidations";
import Axios from "config/api";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import {add_Inventory} from 'redux/actions/inventoryActions';
import NextButton from "components/global/form/NextButton";
import ClearButton from "components/global/form/ClearButton";

const initValues = {
  project: "",
  sector: "",
  type: "",
  plotNumber: "",
  number: "",
  fullNumber: "",
  street: "",
  approximateSize: "",
  significance: "",
};

const AddInventoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


    const {createLoading } = useSelector((state) => state.inventory);


  const typeOptions = ["Residential", "Commercial","Appartment"];
    const [projects , setProjects] = useState(null);
    const [sectors , setSectors] = useState(null);

    const queryKey = ['get-projects']
    const { isLoading : isCatLoading , isFetching : isCatFetching } = useQuery({
        queryKey ,
        queryFn: () => Axios.get('/project'),
        refetchOnWindowFocus: false ,
        onSuccess : (data) => {
            const { data : { data : { docs } } } = data;
            setProjects(docs);
        }
    });
    const queryKey1 = ['get-sectors']
    const {  } = useQuery({
        queryKey1 ,
        queryFn: () => Axios.get('/sector'),
        refetchOnWindowFocus: false ,
        onSuccess : (data) => {
            const { data : { data : { docs } } } = data;
            setSectors(docs);
        }
    });
const handleSubmit = async (values, { resetForm }) => {
  try {
    const payload = {
      ...values,
      type: values.type.toLowerCase(), 
    };

    console.log("Submitted Values:", payload);

    await dispatch(add_Inventory(payload, navigate));
    resetForm();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div className="w-full bg-white flex flex-col gap-6 px-3 pb-4 rounded-xl shadow-sm">
      {/* Header */}
      <p className="form-title pt-6 py-2">Inventory Details</p>

      <Formik
        initialValues={initValues}
        validationSchema={addInventoriesValidations}
        onSubmit={handleSubmit}
   
      >
        {(formik) => (
   <>
   
          <Form className="flex flex-col gap-6 mt-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-4">
              <FormControl
                control="multiple-option"
                label="Project"
                placeholder="Select Project"
                name="project"
                formik={formik}
                 options={
                   projects?.length > 0 ?
                   projects?.map(item => ({
                  key : item?.title , value : item?._id 
                  }))
                  :[
                  { key : 'No project found.' , value : ''}
                  ]
                }
                                                           
              />
              <FormControl
                control="multiple-option"
                placeholder="Select Block"
                label="Block"
                name="sector"
                formik={formik}
                 options={
                   sectors?.length > 0 ?
                   sectors?.map(item => ({
                  key : item?.title , value : item?._id 
                  }))
                  :[
                  { key : 'No sector found.' , value : ''}
                  ]
                }
                                                           
              />


              <FormControl
                control="multiple-option"
                placeholder="Select Type"
                label="Select Type"
                name="type"
                formik={formik}
                options={typeOptions}
              />

              {/* <FormControl
                control="input"
                type="email"
                label="Email"
                name="email"
                formik={formik}
                autoComplete=""
                autoCapitalize=""
                spellCheck={false}
              /> */}

              <FormControl
                control="input"
                type="text"
                placeholder="Enter Plot Number"
                label="Plot Number"
                name="plotNumber"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />

              <FormControl
                control="input"
                type="text"
                placeholder="Enter Number"
                label="Number"
                name="number"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />

              <FormControl
                control="input"
                type="text"
                placeholder="Enter Full Number"
                label="Full Number"
                name="fullNumber"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />

              <FormControl
                control="input"
                type="text"
                placeholder="Enter Street Address"
                label="Street"
                name="street"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />

              <FormControl
                control="input"
                type="text"
                placeholder="Enter Approximate Size"
                label="Approximate Size"
                name="approximateSize"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />

              <FormControl
                control="input"
                type="text"
                placeholder="Enter Significance"
                label="Significance"
                name="significance"
                formik={formik}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
<div className="flex flex-col-reverse gap-y-6">
            <div className="  w-full flex justify-end gap-2 ">
                {/* Clear Button */}
                <button
                  type="button"
                  className=" w-fit "
                  onClick={() => formik.resetForm()}
                >
                  <ClearButton/>
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className=" w-fit"
                  disabled={createLoading}
                >
                  <NextButton label="Add Inventory" createLoading={createLoading} isIcon={false}/>
                </button>
            </div>
                                  <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]"/>

            </div>

          </Form>
          </>
        )}
        
      </Formik>
    </div>
  );
};

export default AddInventoryForm;
