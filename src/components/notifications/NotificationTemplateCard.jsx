import { useQuery } from "react-query";
import Axios from "config/api";

const NotificationTemplateCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notification-templates"],
    queryFn: () => Axios.get("/notification-templates"),
  });

  const templates = data?.data?.data?.docs || [];

  if (isLoading) {
    return <div className="p-4">Loading templates...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Failed to load templates</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">All Templates</h3>

      <div className="overflow-auto">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Key</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Email</th>
              <th className="p-3">SMS</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.key}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.emailEnabled ? "Yes" : "No"}</td>
                <td className="p-3">{item.smsEnabled ? "Yes" : "No"}</td>
                <td className="p-3">{item.whatsappEnabled ? "Yes" : "No"}</td>
                <td className="p-3">{item.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTemplateCard;