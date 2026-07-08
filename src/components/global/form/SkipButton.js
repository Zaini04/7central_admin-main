import SkipSvg from "assets/svg/home/home/SkipSvg"

const SkipButton =()=>{
    return (
        <div
        className={` h-[40px] bg-white rounded-full pl-1.5 pr-4 flex items-center justify-start gap-3 text-primary cursor-pointer select-none`}
      >
       <div className="w-[27px] h-[27px]  rounded-full bg-black  flex justify-center items-center">
        <SkipSvg/>
        </div>
       <span className='font-semibold text-sm text-[#1F2020]'>
        Skip
        </span> 
      </div>
    )
}
 export default SkipButton