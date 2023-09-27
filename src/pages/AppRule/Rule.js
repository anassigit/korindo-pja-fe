import React, { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch } from "react-redux";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row
} from "reactstrap";


import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';

const ITEMS_PER_PAGE = 10;

const Rule = (props) => {

    let langType = localStorage.getItem("I18N_LANGUAGE")
    const history = useHistory()

    const dispatch = useDispatch();
    const [appSettingMsg, setAppSettingMsg] = useState("")
    const [appSettingPage, setAppSettingPage] = useState(true)

    return (
        <RootPageCustom msgStateGet={appSettingMsg} msgStateSet={setAppSettingMsg}
            componentJsx={
                <>

                    <Container style={{ display: appSettingPage ? 'block' : 'none' }} fluid={true}>
                        <Row
                        //  style={{ display: getDetailInstructionData?.data?.instruction?.edit == "ALL" || getDetailInstructionData?.data?.instruction?.edit == "STATUS" ? 'flex' : 'none' }}
                         >
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        container
                                    </CardBody>
                                </Card>

                            </Col>
                        </Row>
                    </Container>


                </>
            }
        />
    );


}

Rule.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any
}
export default withTranslation()(Rule)