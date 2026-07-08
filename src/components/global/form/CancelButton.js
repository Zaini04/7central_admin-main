import CancelSvg from "assets/svg/home/home/CancelSvg"

const CancelButton =()=>{
    return (
        <div
        className={` h-[32px] bg-white rounded-full pl-1.5 pr-4 flex items-center justify-start gap-3 text-primary cursor-pointer select-none`}
      >
       <div className="w-[22px] h-[22px]  rounded-full bg-black  flex justify-center items-center">
        <CancelSvg/>
        </div>
       <span className='font-semibold text-xs text-[#1F2020]'>
        Cancel
        </span> 
      </div>
    )
}
 export default CancelButton