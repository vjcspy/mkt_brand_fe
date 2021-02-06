import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const PagingWrapper = styled.div`
  ul {
    &.pagination {
      list-style: none;
      display: flex;
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 0px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

      .page-link {
        position: relative;
        margin-left: -1px;
        background-color: #fff;
        border: 1px solid #ced4da;
        display: block;
        width: 32px;
        height: 32px;
        line-height: 30px;
        text-align: center;
        box-shadow: none !important;
        color: #6b88a4;
        font-weight: 600;
        font-size: 16px;
        user-select: none;

        &:hover {
          background-color: #f4f4f4;
        }
      }

      li {
        &.page-item {
          &:first-child {
            .page-link {
              margin-left: 0;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
          }
          &:last-child {
            .page-link {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
          &.active {
            a.page-link {
              color: #445565 !important;
              background-color: #e3e7eb !important;
              border-color: #ced4da !important;=
              cursor: default;
              pointer-events: none;
            }
          }
        }
      }
    }
  }
`;

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({ total, limit, onChange }) => {
  const pageNeighbours = 1;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = page - pageNeighbours;
      const rightBound = page + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      setPages([1, ...pages, totalPages]);
    }

    setPages(range(1, totalPages));
  }, [page, totalPages]);

  const gotoPage = useCallback(
    (page) => {
      const currentPage = Math.max(0, Math.min(page, totalPages));
      setPage(currentPage);
      onChange?.(currentPage);
    },
    [onChange, totalPages]
  );

  const handleClick = useCallback(
    (page, evt) => {
      evt.preventDefault();
      gotoPage(page);
    },
    [gotoPage]
  );

  const handleMoveLeft = useCallback(
    (evt) => {
      evt.preventDefault();
      gotoPage(page - pageNeighbours * 2 - 1);
    },
    [gotoPage, page]
  );

  const handleMoveRight = useCallback(
    (evt) => {
      evt.preventDefault();
      gotoPage(page + pageNeighbours * 2 + 1);
    },
    [gotoPage, page]
  );

  return totalPages ? (
    <PagingWrapper>
      <nav aria-label="Pagination">
        <ul className="pagination">
          {pages.map((p, index) => {
            if (p === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              );

            if (p === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              );

            return (
              <li key={index} className={`page-item${page === p ? " active" : ""}`}>
                <a className="page-link" href="#" onClick={(e) => handleClick(p, e)}>
                  {p}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </PagingWrapper>
  ) : null;
};

export default Pagination;
