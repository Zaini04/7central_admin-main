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
      <h3 className="text-dark1 font-semibold">All Campaigns</h3>

      <div className="overflow-auto">
              <table className="w-[95%] rounded-xl  overflow-hidden border-gray-200 mx-auto bg-white">
          <thead className=" text-left  text-white rounded-t-xl  bg-[#1F2020] text-xs">
            <tr className="">

              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Title</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Category</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Audience</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Email Body</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Email</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">SMS</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">WhatsApp</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Status</th>
              <th className="font-normal text-xs    text-gray3 px-3 py-3 whitespace-nowrap text-white border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.title}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.category}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.audienceType}</td>

                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b  line-clamp-4  text-ellipsis" >
                  {item.emailBody}
                </td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.emailEnabled ? "Yes" : "No"}</td>

                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.smsEnabled ? "Yes" : "No"}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.whatsappEnabled ? "Yes" : "No"}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">{item.status}</td>
                <td className="text-xs     px-3 py-3 whitespace-nowrap font-medium text-dark1 border-b">
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