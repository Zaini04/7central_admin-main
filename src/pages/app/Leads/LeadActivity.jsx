import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeadActivityCard from 'components/leads/LeadActivityCard';
import BackButton from 'components/global/form/BackButton';

const badgeColor = (status) => ({
  "Interested": "bg-[#08B839]",
  "Follow Up": "bg-[#F59E0B]",
  "Contact Later": "bg-[#F59E0B]",
  "Future Plan": "bg-[#9333EA]",
  "Schedule Visit": "bg-[#EC4899]",
  "Successful": "bg-[#08B839]",
  "Not Interested": "bg-[#EF4444]",
  "Irrelevant": "bg-[#EF4444]",
  "Not Contacted": "bg-[#2463EB]",
}[status] || "bg-gray-400");

const LeadTimelinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lead = useSelector((state) => state.leads.list.find((l) => l._id === id));

  if (!lead) return <p className="text-sm text-gray-500">Lead not found.</p>;

  return (
    <div className="w-full flex flex-col gap-5 p-2 bg-[#F8F9FA]">
      <div className='flex justify-between'>
        <h2 className="text-xl font-bold text-[#1A1C1E]">Lead Activity Timeline</h2>
        <button onClick={() => navigate('/app/leads')}><BackButton /></button>
      </div>

      <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="page-subheading">Response History</h3>
          <div className="flex flex-col gap-3">
            {lead.history.length === 0 ? (
              <p className="text-xs text-gray-400">Abhi tak koi response mark nahi hua.</p>
            ) : (
              lead.history.map((item) => (
                <LeadActivityCard
                  key={item.id}
                  item={{
                    title: item.responseType,
                    desc: item.notes || "No notes added",
                    date: item.date,
                    badge: item.responseType,
                    bg: badgeColor(item.responseType),
                  }}
                  markedBy={item.markedBy}
                  actionText={item.nextActionDate ? `Next: ${item.nextActionDate}` : "—"}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTimelinePage;