import NotificationTemplateCard from "components/notifications/NotificationTemplateCard";
import NotificationTemplateForm from "components/notifications/NotificationTemplateForm";
import {  useNavigate } from "react-router-dom";

const NotificationTemplates = () => {
          const navigate = useNavigate();
    
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Notification Templates</h2>
         
        </div>
         <button
onClick={() => navigate('/app/notification-templates/add')}
                     className="bg-primary border rounded-[10px] text-white px-6 h-[50px]">
                         Add New Template
                    </button>
      </div>

      <div className="w-full bg-white flex flex-col gap-4 pb-4 rounded-xl shadow-sm">
        <NotificationTemplateCard />
      </div>
    </div>
  );
};

export default NotificationTemplates;