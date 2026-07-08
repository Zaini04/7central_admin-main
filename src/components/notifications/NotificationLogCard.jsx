import { useQuery } from "react-query";
import Axios from "config/api";

const NotificationLogCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notification-logs"],
    queryFn: () => Axios.get("/notification-logs"),
  });

  const logs = data?.data?.data?.docs || [];

  if (isLoading) return <div className="p-4">Loading logs...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load logs</div>;

  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Notification Logs</h3>

      <div className="overflow-auto">
        <table className="w-full min-w-[700px] border-collapse bg-white">
          <thead className="text-left text-sm md:text-[15px]">
            <tr className="text-left">
              <th className="p-3">Channel</th>
              <th className="p-3">Recipient</th>
              <th className="p-3">Template Key</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Content</th>
              <th className="p-3">Status</th>
              <th className="p-3">Sent At</th>
              <th className="p-3">Error Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3 capitalize">{item.channel}</td>
                <td className="p-3">{item.recipient}</td>
                <td className="p-3">{item.templateKey}</td>
                <td className="p-3">{item.subject || "--"}</td>
                <td className=" p-3  line-clamp-4  text-ellipsis">{item.content || "--"}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "sent"
                        ? "bg-green-100 text-green-700"
                        : item.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  {item.sentAt ? new Date(item.sentAt).toLocaleString() : "--"}
                </td>
                <td className="p-3  line-clamp-4  text-ellipsis w-[400px]">
                  {item.errorMessage || "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationLogCard;