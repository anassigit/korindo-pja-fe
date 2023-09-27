import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";

import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import RootPageCustom from "../../common/RootPageCustom";
import "../../config";
import "../../assets/scss/custom.scss";
import { getRuleData } from "store/appRule/actions";

const Rule = (props) => {
  let langType = localStorage.getItem("I18N_LANGUAGE");
  const history = useHistory();
  const location = useLocation();
  const queryString = location.search;
  const startIndex = queryString.lastIndexOf("=") + 1;
  const endIndex = queryString.indexOf("_");
  const extractedValue = queryString.substring(startIndex);

  const dispatch = useDispatch();
  const [appRuleMsg, setAppRuleMsg] = useState("");
  const [appRulePage, setAppRulePage] = useState(true);
  const getRule = useSelector((state) => state.ruleReducer.respGetRule);

  useEffect(() => {
    let tempValue = extractedValue.replace("_", ".");
    dispatch(getRuleData({ id: parseInt(tempValue) }));
  }, []);

  const jsxContent = getRule?.data?.result?.content;

  return (
    <RootPageCustom
      msgStateGet={appRuleMsg}
      msgStateSet={setAppRuleMsg}
      componentJsx={
        <>
          <Container style={{ display: appRulePage ? "block" : "none" }} fluid={true}>
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    {jsxContent && <div dangerouslySetInnerHTML={{ __html: jsxContent }} />}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      }
    />
  );
};

Rule.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withTranslation()(Rule);
