import { useNavigate } from "react-router-dom";
import BackButton from 'components/global/form/BackButton';
import AddNewCampaignForm from "components/compaigns/AddCampaignForm";

const AddNewCampaign = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between px-1 w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Add New Campaign</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/app/campaigns")}
            className="w-fit"
          >
            <BackButton />
          </button>
        </div>
      </div>

      {/* Form Canvas Container */}
      <div className="w-full bg-white flex flex-col gap-2 pt-3 pb-4 rounded-xl shadow-sm">
        <AddNewCampaignForm />
      </div>
    </div>
  );
};

export default AddNewCampaign;