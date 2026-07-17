import React, { memo } from 'react';

const Status = ({ status }) => {
  // Determine classes based on status
  let statusClass = '';

  if (
    status === 'pending' ||
     status === 'Pending' ||
    status === 'running' ||
    status === 'inActive' ||
    status === 'blocked'  ||
     status === 'scheduled' ||
     status === 'Over Due' ||

     status === 'pertially_paid' ||
     status === 'paused'||
     status === 'Paused'||
     status === 'un-paid' ||
       status === 'Draft' ||
  status === 'draft'
  ) {
    statusClass = ' bg-[#FBF4E4] text-[#DBAA00] px-4';
  } else if (
    status === 'completed' ||
    status === 'approved' ||
    status === 'claimed' ||
    status === 'active' ||
    status === 'accepted' ||
    status === 'success'  ||
     status === 'Active' ||
     status === 'Success' ||
     status === 'cleared' ||
     status === 'Cleared' ||
     status === 'paid' ||
     status === 'Paid' ||
     status === 'Fully Paid' ||
     status === 'fully paid' ||
     status=== "Transfer" ||
     status==='Transferred'||
     status==='Approved' ||
     	status==='Full Paid'

     

  ) {
    statusClass = 'bg-green-500 bg-opacity-30 text-green-800 px-4 ';
  } else if (
    status === 'declined' ||
    status === 'cancelled' ||
    status === 'rejected' ||
    status === 'expired' ||
        status === 'inactive' ||
                status === 'InActive' ||
                 status === 'Failed' ||
                   status === 'Unpaid'||
                   status === 'overdue'||
                   status === 'defaulted'||
                   status === 'bounced'||
                   status === 'Bounced'||

                    status === 'Not Assigned'||
                
                    status === 'Default'||
                    status === 'default'||
                    status === 'Deleted'||
                   status === 'deleted'
  ) {
    statusClass = 'bg-red-100  text-[#DB0000] px-4 ';
  } else if (status === 'in progress' || status === 'In Progress' || status === 'In Installments' ) {
    statusClass = 'bg-blue-200 text-blue-800'; // light blue for in progress
  }else if (
  status === 'assigned' ||
  status === 'Assigned'  
) {
  statusClass = 'bg-[#ECF8F0CC] bg-opacity-30 text-[#1C8C6E] px-4 ';
}

  return (
    <div
      className={`${statusClass} text-xs px-2 py-1 text-center rounded-full flex items-center justify-center gap-1  font-medium w-fit capitalize`}
    >
     
      •<span > {status==="bounced"?'Dishonored':status}</span>
      
    </div>
  );
};

export default memo(Status);
