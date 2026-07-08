import AddPanelForm  from 'components/addPanel-User/AddPanelForm';

const AddPanelUser = () => {
  return (
       <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Create New User</h2>
                </div>
            
         
                          

          
            </div>

            <AddPanelForm/>
       
            



        </div>
  )
}

export default AddPanelUser;