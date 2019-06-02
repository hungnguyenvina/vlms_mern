import React, {Component} from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.items.length / this.props.noOfItemsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if(this.props.currentPage == number) {
                return (
                    <li key={number} className="active">
                        <a href="#"  
                            key={number}
                            id={number}
                            onClick={this.props.handleClick}
                            >
                                {number}
                        </a>
                    </li>		
                );
            } else {
                return (
                    <li key={number}>
                        <a href="#"  
                            key={number}
                            id={number}
                            onClick={this.props.handleClick}
                            >
                                {number}
                        </a>
                    </li>		
                );
            }
        });

        return (
            <div className="pagination">
                <ul className="ulPagination">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

export default Pagination;