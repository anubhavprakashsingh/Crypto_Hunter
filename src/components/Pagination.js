import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "../pagination.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 1) {
    // return null;
    return (
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        <li
          className={classnames("pagination-item", {
            disabled: true,
          })}
        >
          <div className="arrow left" />
        </li>
        <li
          className={classnames("pagination-item", {
            disabled: true,
          })}
        >
          <div className="arrow right" />
        </li>
      </ul>
    );
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1]; //can div be a self closing tag see className arrow left
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className="pagination-item dots"
              key={pageNumber.toString() + Math.random()}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected:
                pageNumber === currentPage || paginationRange.length === 1,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber.toString()}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
