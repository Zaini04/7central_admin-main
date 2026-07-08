import './styles.css';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { ArrowLeft, ArrowRight } from './Arrows';
import useQueryParams from 'utils/hooks/useQueryParams';



const Pagination = ({ totalPages }) => {
    const { getQueryParams , setQueryParams } = useQueryParams();
    
    const { page = 1 } = getQueryParams();

    const handlePageClick = ({ selected }) => {
        setQueryParams({ page : selected + 1 })
    }


    return (
        <div className='shadow-circle py-3 px-4 rounded-lg mt-4 flex items-center justify-center gap-4'>
            <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={0}
            marginPagesDisplayed={0}
            pageCount={totalPages}
            previousLabel={<ArrowLeft />}
            className='flex items-center gap-3 pagination'
            forcePage={page-1}
            />
            <div className='sm:block hidden'>
                of {totalPages} pages
            </div>
        </div>
    )
}

export default memo(Pagination)