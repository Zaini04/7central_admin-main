import { useMutation, useQuery, useQueryClient } from "react-query";
import Axios from "config/api";

const BroadcastCampaignCard = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["broadcast-campaigns"],
    queryFn: () => Axios.get("/broadcast-campaigns"),
  });

  const sendMutation = useMutation({
    mutationFn: (id) => Axios.post(`/broadcast-campaigns/${id}/send`),
    onSuccess: () => {
      queryClient.invalidateQueries(["broadcast-campaigns"]);
    },
  });

  const campaigns = data?.data?.data?.docs || [];

  if (isLoading) return <div className="p-4">Loading campaigns...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load campaigns</div>;

  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">All Campaigns</h3>

      <div className="overflow-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Audience</th>
               <th className="p-3">Email Body</th>
              <th className="p-3">Email</th>
              <th className="p-3">SMS</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.audienceType}</td>

                <td className="p-3  line-clamp-4  text-ellipsis" >
                  {item.emailBody}
                </td>
                <td className="p-3">{item.emailEnabled ? "Yes" : "No"}</td>

                <td className="p-3">{item.smsEnabled ? "Yes" : "No"}</td>
                <td className="p-3">{item.whatsappEnabled ? "Yes" : "No"}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">
                  {item.status === "draft" ? (
                    <button
                      onClick={() => sendMutation.mutate(item._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Send
                    </button>
                  ) : (
                    <span className="text-gray-500">Already Sent</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BroadcastCampaignCard;