import { useParams, useNavigate } from 'react-router-dom';
import img2 from "assets/images/img2.jpg"; // Standard layout profile picture path
import LeadActivityCard from 'components/leads/LeadActivityCard';
import BackButton from 'components/global/form/BackButton';

// Complete structure structure mapping based directly on your visualization design
const DUMMY_TIMELINE_DATA = {
  callAttempts: [
    { id: "c1", title: "1st Call", desc: "Customer did not answer the phone call.", date: "15 Jul 2026", badge: "No Answer", bg: "bg-[#2463EB]" },
    { id: "c2", title: "2nd Call", desc: "Customer said call after 5 PM", date: "15 Jul 2026", badge: "Busy", bg: "bg-[#9333EA]" },
    { id: "c3", title: "3rd Call", desc: "Interested in project", date: "15 Jul 2026", badge: "Connected", bg: "bg-[#08B839]" }
  ],
  followUps: [
    { id: "f1", title: "Follow Up Scheduled", desc: "Customer requested another call tomorrow.", date: "15 Jul 2026", badge: "Pending", bg: "bg-[#F59E0B]", note: "NEXT FOLLOW UP 16 Jul 2026 • 11:00 AM" }
  ],
  visits: [
    { id: "v1", title: "Site Visit Scheduled", desc: "Customer confirmed the office visit.", date: "15 Jul 2026", badge: "Upcoming", bg: "bg-[#EC4899]", note: "DHA Multan Office 16 Jul 2026 • 03:00 PM" }
  ]
};

const LeadTimelinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  return (
    <div className="w-full flex flex-col gap-5 p-2 bg-[#F8F9FA]">
      {/* Title Bar Section Header */}
     
      <div className='flex justify-between'>
      <h2 className="text-xl font-bold text-[#1A1C1E]">Lead Activity Timeline</h2>
<button onClick={()=>navigate('/app/leads')}>

<BackButton />
</button>
      </div>

      {/* Main Base Card Container Layer */}
      <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        
        {/* Call Attempt Category Wrapper */}
        <div className="flex flex-col gap-3">
          <h3 className="page-subheading">Call Attempt</h3>
          <div className="flex flex-col gap-3">
            {DUMMY_TIMELINE_DATA.callAttempts.map((item) => (
              <LeadActivityCard key={item.id} item={item} actionText={item.id === "c1" ? "Call Tomorrow" : "Call at 5 PM"} />
            ))}
          </div>
        </div>

        {/* Follow Up Category Wrapper */}
        <div className="flex flex-col gap-3 mt-2">
          <h3 className="page-subheading">Follow Up</h3>
          {DUMMY_TIMELINE_DATA.followUps.map((item) => (
            <LeadActivityCard key={item.id} item={item} actionText={item.note} />
          ))}
        </div>

        {/* Visit Scheduled Category Wrapper */}
        <div className="flex flex-col gap-3 mt-2">
          <h3 className="page-subheading">Visit Scheduled</h3>
          {DUMMY_TIMELINE_DATA.visits.map((item) => (
            <LeadActivityCard key={item.id} item={item} actionText={item.note} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LeadTimelinePage;