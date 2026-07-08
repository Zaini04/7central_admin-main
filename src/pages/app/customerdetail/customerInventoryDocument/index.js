
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DocumnetInventoryForm   from 'components/customerInventoryDocument/documnetInvetory'


const CustomerInventoryDocument = () => {
  const navigate = useNavigate();
  const { id } = useParams();

    const { doc:singleCustomer} = useSelector(state => state.customer);

  
   const inventoryId = singleCustomer?.sales?.[0]?.inventory?._id;   


  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="page-heading">Add Inventory Document</h2>
        </div>

        <div className="flex items-center gap-2">
                                <button
                        onClick={() => navigate(-1)}
                        className="w-fit px-4 h-[50px] flex items-center justify-center gap-2 bg-primary text-white rounded-[10px] hover:bg-primary/90 transition-all duration-200"
                        >
                        <i className="uil uil-arrow-left text-lg"></i>
                        <span className="font-medium">Back</span>
                        </button>

        </div>
      </div>
              <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">

      <DocumnetInventoryForm/>
      </div>





 
    </div>
  );
};

export default CustomerInventoryDocument;
