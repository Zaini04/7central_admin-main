import React from 'react';
import img2 from "assets/images/img2.jpg"; // User Profile Image Path

const ActivityCard = ({ item, actionText }) => {
  return (
    <div className="w-full border border-gray-200 rounded-xl p-4 sm:p-5 bg-white flex flex-col gap-3 transition-all hover:border-gray-300">

      {/* Top Row: Title (left) + Badge (far right) */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-[#1A1C1E]">{item.title}</h4>

        {/* Dynamic Pill Badge with Dot */}
        <span className={`text-[10px] font-semibold text-white px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 ${item.bg}`}>
          <span className="w-1 h-1 bg-white rounded-full inline-block"></span>
          {item.badge}
        </span>
      </div>

      {/* Bottom Row: Left (desc + date) | Right (meta grid), vertically centered */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* 1. Left Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <p className="text-xs text-gray-400 font-medium">
            {item.desc}
          </p>

          {/* Calendar Timestamp Row */}
          <div className="flex items-center gap-2 text-gray-400 text-[11px] font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{item.date}</span>
          </div>
        </div>

        {/* 2. Right Meta Grid Layout (Matching Image Formats) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100 text-xs font-medium">

          {/* Profile Stack Component */}
          <div className="flex items-center gap-2.5 min-w-[140px]">
            <img src={img2} alt="Agent" className="w-[34px] h-[34px] rounded-full object-cover border border-gray-100" />
            <div className="flex flex-col">
              <span className="font-medium text-[#1A1C1E] text-xs">Ali Khan</span>
              <span className="text-[10px] text-gray-400 font-semibold mt-0.5">0301-1234567</span>
            </div>
          </div>

          {/* Vertical Border Line for Desktop Layouts */}
          <div className="hidden lg:block h-8 w-[1px] bg-gray-200" />

          {/* Media Call Metadata Info Segment */}
          <div className="flex items-center gap-2.5 min-w-[130px] lg:pl-2">
            <div className="w-[30px] h-[30px] rounded-full bg-[#08B839] text-[#10B981] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-[#1A1C1E] text-xs">Phone Call</span>
              <span className="text-[10px] text-gray-400 font-semibold mt-0.5">Duration: 00:18 sec</span>
            </div>
          </div>

          {/* Vertical Border Line for Desktop Layouts */}
          <div className="hidden lg:block h-8 w-[1px] bg-gray-200" />

          {/* Next Direct Target Action Module */}
          <div className="flex items-center gap-2.5 min-w-[180px] lg:pl-2">
            <div className="w-[30px] h-[30px] rounded-full bg-[#FD0000] text-red-600 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-[#1A1C1E] text-xs">Next Action</span>
              <span className="text-[10px] text-gray-400 font-bold mt-0.5 tracking-wide max-w-[200px] break-words">
                {actionText}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActivityCard;