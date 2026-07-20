import React from 'react'

function DashboardCard({card}) {
  return (
 <div key={card.id} className="h-[110px] bg-white px-4 py-3 flex  justify-between shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out rounded-lg">
          <div className="flex flex-col justify-start items-start  gap-2">
           
            <p className="text-[#626C70] text-xs font-medium">{card.title}</p>
             <h2 className="text-lg font-semibold">{card.value}</h2>
            <div className={`flex items-center text-[11px]  font-medium  ${card.trend === "increase" ? "text-emerald-500" : "text-red-500"  }`}>
              <span className=''>{card.trend === 'increase' ? '↑' : '↓' }  {card.percentage} </span>
              <span className={`text-[10px]   ml-1 ${card.trend === "increase" ? "text-emerald-500" : "text-red-500"  }`}>{card.trend }</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
           
             <div className={`w-[42px] h-[42px] rounded-full p-1 ${card.bgIcon} flex justify-center items-center text-white`}>
              {card.icon}
            </div>
          </div>
        </div>  )
}

export default DashboardCard