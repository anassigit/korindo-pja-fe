import React from "react"
import { Container, Row, Col } from "reactstrap"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

const Footer = (props) => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid="true">
                    <Row>
                        <Col md={7}>
                            <span className="mdi mdi-phone"></span> {props.t("DMLS Help Contact")} &nbsp;
                            <b>
                                {props.t("Wonjoon Choi (IT Division, ext. 579)")}
                            </b>
                        </Col>
                        <Col md={5}>
                            <div className="text-sm-end d-none d-sm-block">
                                {props.t("AddressKorindo")} {new Date().getFullYear()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    )
}

Footer.propTypes = {
    t: PropTypes.any
}

export default withTranslation()(Footer)