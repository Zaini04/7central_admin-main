import { memo } from "react";
import useQueryParams from "utils/hooks/useQueryParams";

// Icons (unchanged)
const ChevronLeft = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);


// Component name changed to IconPagination
const TealPagination = ({ totalPages, currentPage, setCurrentPage }) => {
      const { getQueryParams , setQueryParams } = useQueryParams();
    
    const { page = 1 } = getQueryParams();

  const maxPageLinks = 5; 
  const pageNumbers = []; // Renamed 'pages' to 'pageNumbers'
  
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
        setQueryParams({ page : page })
  };

  const renderPageNumbers = () => {
    if (totalPages <= maxPageLinks) {
      // If few pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const start = 1;
      const end = totalPages;
      const pagesToShow = maxPageLinks - 2;
      
      let leftBound = Math.max(start + 1, currentPage - 1);
      let rightBound = Math.min(end - 1, currentPage + 1);

      if (currentPage < 3) {
        rightBound = pagesToShow;
      }
      if (currentPage > totalPages - 2) {
        leftBound = totalPages - pagesToShow + 1;
      }

      pageNumbers.push(start);

      if (leftBound > start + 1) {
        pageNumbers.push('...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        if (i > start && i < end) {
          pageNumbers.push(i);
        }
      }

      if (rightBound < end - 1) {
        pageNumbers.push('... ');
      }

      if (totalPages > start) {
         pageNumbers.push(end);
      }
    }
    
    return Array.from(new Set(pageNumbers));
  };

  const visiblePages = renderPageNumbers();


  
  // Neutral Color & Style Variables
  const activeBg = "bg-gray-100";
  const baseColor = "text-gray-500";
  const activeColor = "text-black";
  const borderColor = "border-gray-300";
  
  // Class for general page and icon button size/shape
  const roundButtonClasses = "w-8 h-8 flex items-center justify-center rounded-md text-sm font-semibold transition-colors duration-200";


  const PageItem = ({ pageNum }) => {
    if (typeof pageNum === 'string') {
      return (
        <span className={`${baseColor} font-bold h-[32px] flex items-center`}>
          {pageNum.trim()}
        </span>
      );
    }

    const isActive = pageNum === currentPage;
    const pageClasses = isActive
      ? `${activeBg} ${activeColor}`
      : `${baseColor} hover:bg-gray-50`;

    return (
      <button
        key={pageNum}
        onClick={() => handlePageClick(pageNum)}
        className={`${roundButtonClasses} ${pageClasses} mx-1`}
        aria-current={isActive ? "page" : undefined}
      >
        {pageNum}
      </button>
    );
  };
  
  return (
    <div className="flex justify-center p-4 font-inter">
      <nav className="flex items-center space-x-2"> 
        
        {/* Previous Button (Rounded Icon) */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${roundButtonClasses} bg-white ${baseColor} border ${borderColor} disabled:opacity-50 disabled:pointer-events-none hover:border-gray-500 mx-1`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} /> 
        </button>

        {/* Page Numbers */}
        <div className="flex items-center">
          {visiblePages.map((pageNum, index) => (
            <PageItem key={index} pageNum={pageNum} />
          ))}
        </div>

        {/* Next Button (Rounded Icon) */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${roundButtonClasses} bg-white ${baseColor} border ${borderColor} disabled:opacity-50 disabled:pointer-events-none hover:border-gray-500 mx-1`}
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>

      </nav>
    </div>
  );
};

export default memo(TealPagination);