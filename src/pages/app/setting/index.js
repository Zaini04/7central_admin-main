import Titlebtn  from 'components/global/Titlebtn';
import PanelUserTable  from 'components/panel-user/PanelUserTable';
import SettingForm from 'components/setting/SettingForm';


const Setting = () => {
  return (
       <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Settings</h2>
                </div>
           
         
                          

          
            </div>
            <SettingForm/>
       
       
            



        </div>
  )
}

export default Setting;