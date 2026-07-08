import React from 'react'
import GismapFilter   from 'components/gismap/GismapFilter';
import GisMap   from 'components/gismap/GisMap';

const Gismap = () => {
  return (
      <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">GIS Map</h2>
                </div>
            </div>
            <GismapFilter/>
            <GisMap/>
            



        </div>
  )
}

export default Gismap