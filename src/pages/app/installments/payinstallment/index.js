
import { useEffect } from 'react';
import ExportButton from 'components/global/exportbutton/ExportButton';
import PayinstallmentForm from    'components/payinstallment/PayinstallmentForm'
import Axios from "config/api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setDoc } from 'redux/slices/installmentSlice';

const PayInstallment = () => {

  const { id } = useParams();

   const dispatch=useDispatch();

  const { doc } = useSelector((state) => state.installment);
    // console.log(' this is a  doc',doc)
  
    const { data, isLoading, isError, error } = useQuery(
      ["single-installments", id],
      () => Axios(`/sale/get-all-installments/${id}`)
    );
  
    
  
    useEffect(() => {
      const d = data?.data?.data?.doc;
      if (!d) return;
      dispatch(setDoc(d));
    }, [data, dispatch]);
  return (
      <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row  gap-2  sm:items-center sm:justify-between  px-1 w-full">
                <div className="flex flex-col gap-1.5">
                    <h2 className="page-heading">Pay Installment</h2>
                </div>

                  {/* <div className='flex items-center gap-2'>
                  <ExportButton   bgcolor='bg-primary' textColor={'text-white'}/>
                             </div> */}



                        

          
            </div>


                   <div className="w-full bg-white flex flex-col gap-2 pb-4 rounded-xl shadow-sm">
                                            <PayinstallmentForm  />
                                          
                                            </div>
                          
    



        </div>
  )
}

export default PayInstallment;