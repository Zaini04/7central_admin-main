import NotificationLogCard from "components/notifications/NotificationLogCard";

const NotificationLogs = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Notification Logs</h2>
          <p className="text-sm text-gray-500">
            View sent, failed and pending notification records
          </p>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col gap-4 pb-4 rounded-xl shadow-sm">
        <NotificationLogCard />
      </div>
    </div>
  );
};

export default NotificationLogs;
