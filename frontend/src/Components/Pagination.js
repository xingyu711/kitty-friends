import React from 'react';

const NUM_BUTTONS = 5;

export default function Pagination({
  numPages,
  currentPage,
  handlePageChange,
}) {
  const renderPageButtons = () => {
    const res = [];
    if (numPages <= NUM_BUTTONS) {
      for (let i = 1; i < numPages - 1; i += 1) {
        res.push(
          <li className={'page-item' + (currentPage === i ? ' active' : '')}>
            <button className="page-link">{i + 1}</button>
          </li>
        );
      }
    } else {
      if (currentPage < 3) {
        res.push(
          <li className={'page-item' + (currentPage === 1 ? ' active' : '')}>
            <button className="page-link">2</button>
          </li>
        );
        res.push(
          <li className={'page-item' + (currentPage === 2 ? ' active' : '')}>
            <button className="page-link">3</button>
          </li>
        );
      }
      if (currentPage >= 3) {
        res.push(
          <li className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        );
      }
      if (currentPage >= 3 && currentPage < numPages - 3) {
        res.push(
          <li className="page-item active">
            <button className="page-link">{currentPage + 1}</button>
          </li>
        );
      }
      if (currentPage < 3 || (currentPage >= 3 && currentPage < numPages - 3)) {
        res.push(
          <li className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        );
      }
      if (currentPage >= numPages - 3) {
        res.push(
          <li
            className={
              'page-item' + (currentPage === numPages - 3 ? ' active' : '')
            }
          >
            <button className="page-link">{numPages - 2}</button>
          </li>
        );
        res.push(
          <li
            className={
              'page-item' + (currentPage === numPages - 2 ? ' active' : '')
            }
          >
            <button className="page-link">{numPages - 1}</button>
          </li>
        );
      }
    }

    return res;
  };

  return (
    <nav
      className="pagination-container m-3"
      aria-label="Page navigation example"
    >
      <ul className="pagination">
        <li className={'page-item' + (currentPage === 0 ? ' disabled' : '')}>
          <span className="page-link" aria-hidden="true">
            &laquo;
          </span>
        </li>

        <li className={'page-item' + (currentPage === 0 ? ' active' : '')}>
          <button className="page-link">1</button>
        </li>

        {renderPageButtons()}

        <li
          className={
            'page-item' + (currentPage === numPages - 1 ? ' active' : '')
          }
        >
          <button className="page-link">{numPages}</button>
        </li>

        <li
          className={
            'page-item' + (currentPage === numPages - 1 ? ' disabled' : '')
          }
        >
          <span className="page-link" aria-hidden="true">
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
}
