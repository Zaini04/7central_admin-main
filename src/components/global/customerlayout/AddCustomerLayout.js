import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SiderbarCustomer from "./SiderbarCustomer";
import { useParams,useLocation  } from "react-router-dom";
import Axios from "config/api";
import { setDocDetails, setDocSteps } from "redux/slices/customerSlice";
import { useQuery } from "react-query";

const AddCustomerLayout = ({ children,dynamicName, dynmicbutton }) => {
      const { id } = useParams();
          const dispatch = useDispatch();
const { search } = useLocation();
const query = new URLSearchParams(search);
const inventoryId = query.get("inventory");

          const { docDetails : doc , updateLoading, } = useSelector(state => state.customer);
             console.log(' this isa  doc',doc)




useEffect(() => {
  if (!id) {
    dispatch(setDocDetails(null));
    dispatch(setDocSteps(null));
  }
}, [id, dispatch]);



const apiUrl = inventoryId
  ? `/customer/progress/${id}?inventory=${inventoryId}`
  : `/customer/progress/${id}`;

const {
  isLoading: contentLoading,
  isError: isContentError,
  error: contentError,
  isFetching: contentFetching,
} = useQuery({
  queryKey: ["fetch-content-details", id, inventoryId],
  queryFn: () => Axios.post(apiUrl),
  enabled: !!id,
  onSuccess: (data) => {
    const {
      data: {
        data: { doc },
      },
    } = data;

    dispatch(setDocDetails(doc.customer));
    dispatch(setDocSteps(doc.steps));
  },
  cacheTime: 0,
  refetchOnWindowFocus: false,
});
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between w-full">
      <div className="text-gunmetal  font-semibold  text-xl md:text-[24px] capitalize">
          {doc?.name??dynamicName}
      </div>
      
          {dynmicbutton}
   
      </div>

      <div className="w-full  flex flex-col gap-1 rounded-lg">
        <SiderbarCustomer />
        <div className="w-full bg-white rounded-xl   h-fit ">
          {children}
         
        </div>
        <div className="self-end mt-4">
          
          {dynmicbutton}
          </div> 
      </div>
    </div>
  );
};

export default AddCustomerLayout;
