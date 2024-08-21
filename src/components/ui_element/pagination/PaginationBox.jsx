import "../../../../styles/ui_element/paginationbox_styles.css";

export function PaginationBox({ pagination, handlePageChange }) {
  const { page, limit, totalItems: total } = pagination;
  console.log(page, limit, total);
  const totalPages = Math.ceil(total / limit);

  const handleClickPage = (newPage) => {
    console.log(newPage);
    handlePageChange(newPage + 1);
  };

  return (
    <>
      <div className="pagination-container">
        {totalPages > 0 &&
          [...Array(totalPages)].map((val, index) => (
            <button
              className={
                page === index + 1
                  ? "pagination-button pagination-button-active"
                  : "pagination-button"
              }
              key={index}
              onClick={() => handleClickPage(index)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
}
