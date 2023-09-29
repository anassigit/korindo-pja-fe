import React from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import AlertCust from './AlertCustom';

const RootPageCustom = props => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>
                        ::: DMLS :::
                    </title>
                </MetaTags>
                <AlertCust msg={props.msgStateGet} stateData={props.msgStateSet} />
                {props.componentJsx}
            </div>

        </React.Fragment>

    )
}

RootPageCustom.propTypes = {
    componentJsx: PropTypes.any,
    msgStateGet: PropTypes.any,
    msgStateSet: PropTypes.any,
}

export default RootPageCustom;
