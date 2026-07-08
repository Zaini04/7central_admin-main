import BroadcastCampaignCard from "components/notifications/BroadcastCampaignCard";
import BroadcastCampaignForm from "components/notifications/BroadcastCampaignForm";

const BroadcastCampaigns = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Broadcast Campaigns</h2>
          <p className="text-sm text-gray-500">
            Send alerts, marketing campaigns, and news to all or selected customers
          </p>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col gap-4 pb-4 rounded-xl shadow-sm">
        <BroadcastCampaignForm />
        <BroadcastCampaignCard />
      </div>
    </div>
  );
};

export default BroadcastCampaigns;