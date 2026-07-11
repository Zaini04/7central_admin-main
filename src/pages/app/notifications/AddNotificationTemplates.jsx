import BackButton from "components/global/form/BackButton";
import NotificationTemplateCard from "components/notifications/NotificationTemplateCard";
import NotificationTemplateForm from "components/notifications/NotificationTemplateForm";
import { useNavigate } from "react-router-dom";

const AddNotificationTemplates = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Add Notification Template</h2>
         
        </div>
         <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/app/notification-templates")}
          >
            <BackButton/>
          </button>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col gap-4 pb-4 rounded-xl shadow-sm">
        <NotificationTemplateForm />
      </div>
    </div>
  );
};

export default AddNotificationTemplates;