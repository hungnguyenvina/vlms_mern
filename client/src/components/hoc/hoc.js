import React, {Component} from 'react';
import {connect} from 'react-redux';

export const hoc = (WrappedComponent,mapStateToProps,mapDispatchToProps) => {
    class MyHOC extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <WrappedComponent {...this.props} />
                </div>		
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(MyHOC);
}