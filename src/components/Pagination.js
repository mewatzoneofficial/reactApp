const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Show all pages if <= 10, otherwise first, last, and some middle pages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>
      </li>

      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => onPageChange(number)}>
            {number}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      </li>
    </>
  );
};

export default Pagination;
