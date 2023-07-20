import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Row
} from "reactstrap";
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';


const Setting = () => {

    const dispatch = useDispatch();
    const [appSettingMsg, setappSettingMsg] = useState("")
    const [appInstructionsPage, setAppInstructionsPage] = useState(true)

    const [radioValue1, setRadioValue1] = useState(null);
    const [radioValue2, setRadioValue2] = useState(null);
    const [radioValue3, setRadioValue3] = useState(null);

    const handleRadioChange1 = (event) => {
        setRadioValue1(event.target.value);
    };

    const handleRadioChange2 = (event) => {
        setRadioValue2(event.target.value);
    };

    const handleRadioChange3 = (event) => {
        setRadioValue3(event.target.value);
    };

    return (
        <RootPageCustom msgStateGet={appSettingMsg} msgStateSet={setappSettingMsg}
            componentJsx={
                <>
                    <Container style={{ display: appInstructionsPage ? 'block' : 'none' }} fluid={true}>

                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>General Settings</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                <Col md="12" lg="4" >
                                                    <Row className="mb-2">
                                                        <b>Instruction Display Settings</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_display_setting"
                                                                value="0"
                                                                checked={radioValue1 === "0"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            <span> </span>Show Your Own Instructions
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_display_setting"
                                                                value="1"
                                                                checked={radioValue1 === "1"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            <span> </span>Show All Instructions
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row className="mb-2">
                                                        <b>Notification Settings</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice_setting"
                                                                value="0"
                                                                checked={radioValue2 === "0"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            <span> </span>Send Notifications
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice_setting"
                                                                value="1"
                                                                checked={radioValue2 === "1"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            <span> </span>Don&rsquo;t Send Notifications
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row className="mb-2">
                                                        <b>Notification Settings 2</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="0"
                                                                checked={radioValue3 === "0"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>WhatsApp
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="1"
                                                                checked={radioValue3 === "1"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>Email
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="ins_notice2_setting"
                                                                value="2"
                                                                checked={radioValue3 === "2"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            <span> </span>Both
                                                        </label>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2">
                                                <Col className="d-flex justify-content-end">
                                                    <div className="col-12 col-lg-2">
                                                        <button className="btn btn-primary w-100">Apply</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
                                
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>General Settings</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                               
                                            </Row>
                                        </React.Fragment>
                                    </CardBody>
                                </Card>
                                
                                <Card>
                                    <CardHeader style={{ borderRadius: "15px 15px 0 0" }}>
                                        <strong>General Settings</strong>
                                    </CardHeader>

                                    <CardBody>
                                        <React.Fragment>
                                            <Row className="mb-2">
                                                
                                            </Row>
                                        </React.Fragment>
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
export default Setting