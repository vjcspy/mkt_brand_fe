/**
 *
 * GlobalPagination
 *
 */

import React from "react";
import { map } from "lodash";
import PropTypes from "prop-types";
import cn from "classnames";
import Wrapper from "./Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class GlobalPagination extends React.Component {
  getLastPageNumber = () => Math.ceil(this.props.count / this.props.limit) || 1;

  handleDotsClick = (e) => e.preventDefault();

  handlePreviousPageClick = (e) => {
    e.preventDefault();

    if (!this.isFirstPage()) {
      this.props.onChange(this.props.page - 1);
    }
  };

  handleNextPageClick = (e) => {
    e.preventDefault();

    if (!this.isLastPage()) {
      this.props.onChange(this.props.page + 1);
    }
  };

  handleFirstPageClick = (e) => {
    e.preventDefault();
    this.props.onChange(1);
  };

  handleLastPageClick = (e) => {
    e.preventDefault();
    this.props.onChange(this.getLastPageNumber());
  };

  isFirstPage = () => this.props.page === 1;

  isLastPage = () => this.props.page === this.getLastPageNumber();

  needAfterLinksDots = () => this.props.page < this.getLastPageNumber() - 1;

  needPreviousLinksDots = () => this.props.page > 3;

  renderLinks = () => {
    // Init variables
    const linksOptions = [];

    // Add active page link
    linksOptions.push({
      value: this.props.page,
      isActive: true,
      handleClick: (e) => e.preventDefault(),
    });

    // Add previous page link
    if (!this.isFirstPage()) {
      linksOptions.unshift({
        value: this.props.page - 1,
        isActive: false,
        handleClick: this.handlePreviousPageClick,
      });
    }

    // Add next page link
    if (!this.isLastPage() && this.props.count > this.props.limit) {
      linksOptions.push({
        value: this.props.page + 1,
        isActive: false,
        handleClick: this.handleNextPageClick,
      });
    }

    if (this.needPreviousLinksDots()) {
      linksOptions.unshift({
        value: 1,
        isActive: false,
        handleClick: this.handleFirstPageClick,
      });
    }

    if (this.needAfterLinksDots()) {
      linksOptions.push({
        value: this.getLastPageNumber(),
        isActive: false,
        handleClick: this.handleLastPageClick,
      });
    }

    // Generate links
    return map(linksOptions, (linksOption, key) => (
      <li className={cn(linksOption.isActive && "navLiActive")} key={key}>
        <a href="" disabled={linksOption.isActive} onClick={linksOption.handleClick}>
          {linksOption.value}
        </a>
      </li>
    ));
  };

  render() {
    return (
      <Wrapper>
        <div>
          <a href="" className="paginationNavigator" onClick={this.handlePreviousPageClick} disabled={this.isFirstPage()}>
            <FontAwesomeIcon icon="chevron-left" />
          </a>
          <nav className="navWrapper">
            <ul className="navUl">{this.renderLinks()}</ul>
          </nav>
          <a href="" className="paginationNavigator" onClick={this.handleNextPageClick} disabled={this.isLastPage()}>
            <FontAwesomeIcon icon="chevron-right" />
          </a>
        </div>
      </Wrapper>
    );
  }
}

GlobalPagination.defaultProps = {
  count: 0,
  onChange: () => {},
  page: 1,
  limit: 10,
};

GlobalPagination.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  onChange: PropTypes.func,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  limit: PropTypes.number,
};

export default GlobalPagination;
