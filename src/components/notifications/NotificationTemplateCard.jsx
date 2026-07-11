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
      <h3 className="text-dark1 font-semibold">All Templates</h3>

      <div className="overflow-auto">
        <table className="w-[95%] rounded-xl  overflow-hidden border-gray-200 mx-auto bg-white">
          <thead className=" text-left  text-white rounded-t-xl  bg-[#1F2020] text-xs">
            <tr className="">
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Key</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Name</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Category</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Email</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">SMS</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">WhatsApp</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Active</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((item) => (
              <tr key={item._id} className=" border">
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.key}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.name}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.category}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.emailEnabled ? "Yes" : "No"}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.smsEnabled ? "Yes" : "No"}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.whatsappEnabled ? "Yes" : "No"}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.isActive ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationTemplateCard;