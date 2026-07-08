import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FormControl from "components/global/form/FormControl";
import uplaodInventoryValidation from "validations/uplaodInventoryValidation";
import { Add_Upload_Inventory } from "redux/actions/inventoryActions";
import ProjectInput from "components/allinventory/inventoryinput/ProjectInput";
import SectorInput from "components/allinventory/inventoryinput/SectorInput";
import NextButton from "components/global/form/NextButton";

const initValues = {
  // project: "",
  // sector: "",
  file: "",
};

const UploadInventoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [project, setProjects] = useState(null);
  const [sector, setSectors] = useState(null);

  const projectOptions = ["Project A", "Project B", "Project C"];
  const sectorOptions = ["Sector A", "Sector B", "Sector C", "Sector D"];

  const handleSubmit = async (values, { resetForm }) => {
  
    try {
      setLoading(true);
      console.log("Submitted Values:", values);
       const csvFile = values.file;
       const csvDataURI = values.file.base64;
    // const csvDataURI = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onload = e => resolve(e.target.result);
    //   reader.onerror = reject;
    //   reader.readAsDataURL(csvFile);
    // });
 const payload = {
       csvDataURI, 
       project,
       sector
    };
          dispatch(Add_Upload_Inventory(payload, navigate));

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full bg-white flex flex-col gap-6 px-3 pb-4 rounded-xl shadow-sm">
      <p className="form-title pt-6">Inventory Details</p>

      <Formik
        initialValues={initValues}
        validationSchema={uplaodInventoryValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-6">
            
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-10 border-b pb-4">
              <ProjectInput
          name="project"
          placeholder="Select Project"
          onSelect={setProjects}
      
        />

        <SectorInput
          name="sector"
          placeholder="Select Sector"
              onSelect={setSectors}
        />

              {/* <FormControl
                control="multiple-option"
                label="Project"
                name="project"
                formik={formik}
                options={projectOptions}
              />

              <FormControl
                control="multiple-option"
                label="Sector"
                name="sector"
                formik={formik}
                options={sectorOptions}
              /> */}

              <FormControl
                control="upload-file"
                label="Add Inventory by File"
                name="file"
                formik={formik}
              />
            </div>

            {/* Buttons */}
            <div className="px-3 w-full flex justify-end">
              <div className="flex items-center gap-2">
            

                <button
                  type="submit"
                  className=" w-fit"
                  disabled={loading}
                >
                  <NextButton label="Add Inventory" createLoading={loading} isIcon={false}/>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadInventoryForm;
