import BackSvg from "assets/svg/home/home/BackSvg"

const BackButton =()=>{
    return (
        <div
        className={` h-[32px] bg-white rounded-full pl-1.5 pr-4 flex items-center justify-start gap-3 text-primary cursor-pointer select-none`}
      >
       <div className="w-[22px] h-[22px]  rounded-full bg-black  flex justify-center items-center">
        <BackSvg/>
        </div>
       <span className='font-semibold text-xs text-[#1F2020]'>
        Back
        </span> 
      </div>
    )
}
 export default BackButton