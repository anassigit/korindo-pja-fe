import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
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

    const [radioValue1, setRadioValue1] = useState("option1");
    const [radioValue2, setRadioValue2] = useState("option1");
    const [radioValue3, setRadioValue3] = useState("option1");
  
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
                                            <Row>
                                                <Col md="12" lg="4">
                                                    <Row>
                                                        <b>Instruction Display Settings 1</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="option1"
                                                                value="option1"
                                                                checked={radioValue1 === "option1"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            Option 1
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="option1"
                                                                value="option2"
                                                                checked={radioValue1 === "option2"}
                                                                onChange={handleRadioChange1}
                                                            />
                                                            Option 2
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row>
                                                        <b>Instruction Display Settings 2</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="option2"
                                                                value="option1"
                                                                checked={radioValue2 === "option1"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            Option 1
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="option2"
                                                                value="option2"
                                                                checked={radioValue2 === "option2"}
                                                                onChange={handleRadioChange2}
                                                            />
                                                            Option 2
                                                        </label>
                                                    </Row>
                                                </Col>
                                                <Col md="12" lg="4">
                                                    <Row>
                                                        <b>Instruction Display Settings 3</b>
                                                    </Row>
                                                    <Row>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="option3"
                                                                value="option1"
                                                                checked={radioValue3 === "option1"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            Option 1
                                                        </label>
                                                        <label>
                                                            <Input
                                                                type="radio"
                                                                name="option3"
                                                                value="option2"
                                                                checked={radioValue3 === "option2"}
                                                                onChange={handleRadioChange3}
                                                            />
                                                            Option 2
                                                        </label>
                                                    </Row>
                                                </Col>
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