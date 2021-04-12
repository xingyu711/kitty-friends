import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const NUM_BUTTONS = 5;

export default function Pagination({
  numPages,
  currentPage,
  handlePageChange,
}) {
  const renderPageButtons = () => {
    const res = [];
    // Less than 5 pages
    if (numPages <= NUM_BUTTONS) {
      for (let i = 1; i < numPages - 1; i += 1) {
        res.push(
          <li
            key={'page' + i}
            className={'page-item' + (currentPage === i ? ' active' : '')}
          >
            <button className="page-link" onClick={() => handlePageChange(i)}>
              {i + 1}
            </button>
          </li>
        );
      }
    }
    // More than 5 pages
    else {
      if (currentPage < 3) {
        res.push(
          <li
            key="page1"
            className={'page-item' + (currentPage === 1 ? ' active' : '')}
          >
            <button className="page-link" onClick={() => handlePageChange(1)}>
              2
            </button>
          </li>
        );
        res.push(
          <li
            key="page2"
            className={'page-item' + (currentPage === 2 ? ' active' : '')}
          >
            <button className="page-link" onClick={() => handlePageChange(2)}>
              3
            </button>
          </li>
        );
      }
      if (currentPage >= 3) {
        res.push(
          <li className="page-item disabled" key="dots1">
            <button className="page-link">...</button>
          </li>
        );
      }
      if (currentPage >= 3 && currentPage < numPages - 3) {
        res.push(
          <li className="page-item active" key={'page' + currentPage}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage + 1}
            </button>
          </li>
        );
      }
      if (currentPage < 3 || (currentPage >= 3 && currentPage < numPages - 3)) {
        res.push(
          <li className="page-item disabled" key="dots2">
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
            key={'page' + (numPages - 3)}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(numPages - 3)}
            >
              {numPages - 2}
            </button>
          </li>
        );
        res.push(
          <li
            className={
              'page-item' + (currentPage === numPages - 2 ? ' active' : '')
            }
            key={'page' + (numPages - 2)}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(numPages - 2)}
            >
              {numPages - 1}
            </button>
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
        <li
          className={'page-item' + (currentPage === 0 ? ' disabled' : '')}
          key="previous"
        >
          <span
            className="page-link"
            aria-hidden="true"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo;
          </span>
        </li>

        <li
          className={'page-item' + (currentPage === 0 ? ' active' : '')}
          key="page0"
        >
          <button className="page-link" onClick={() => handlePageChange(0)}>
            1
          </button>
        </li>

        {renderPageButtons()}

        <li
          className={
            'page-item' + (currentPage === numPages - 1 ? ' active' : '')
          }
          key={'page' + (numPages - 1)}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(numPages - 1)}
          >
            {numPages}
          </button>
        </li>

        <li
          className={
            'page-item' + (currentPage === numPages - 1 ? ' disabled' : '')
          }
          key="next"
        >
          <span
            className="page-link"
            aria-hidden="true"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  numPages: PropTypes.number,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};
