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
                                        <>
                                            <p>&nbsp;</p>
                                            <div className="WordSection1">
                                                <h1
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "29.85pt",
                                                        marginRight: "0in",
                                                        marginTop: "4.4pt",
                                                        msoList: "l0 level2 lfo1",
                                                        tabStops: "29.9pt",
                                                        textIndent: "-24.9pt"
                                                    }}
                                                >
                                                    {/*[if !supportLists]*/}
                                                    <span style={{ msoList: "Ignore" }}>
                                                        1.1<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span>
                                                    </span>
                                                    {/*[endif]*/}
                                                    <span lang="KO">
                                                        조직<span style={{ letterSpacing: "-.05pt" }}> </span>및 직무
                                                        <span style={{ letterSpacing: "-.1pt" }}></span>관리
                                                        <span style={{ letterSpacing: ".05pt" }}> </span>규정
                                                    </span>
                                                </h1>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "0in",
                                                        marginRight: "0in",
                                                        marginTop: ".35pt"
                                                    }}
                                                >
                                                    <b style={{ msoBidiFontWeight: "normal" }}>
                                                        <span style={{ fontSize: "17.5pt", msoBidiFontSize: "11.0pt" }}>
                                                        </span>
                                                    </b>
                                                </p>
                                                <p
                                                    className="MsoListParagraph"
                                                    style={{
                                                        marginLeft: "41.7pt",
                                                        msoList: "l0 level3 lfo1",
                                                        tabStops: "41.75pt"
                                                    }}
                                                >
                                                    {/*[if !supportLists]*/}
                                                    <b>
                                                        <span style={{ fontSize: "14.0pt", letterSpacing: "-.1pt" }}>
                                                            <span style={{ msoList: "Ignore" }}>
                                                                1.1.1<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;</span>
                                                            </span>
                                                        </span>
                                                    </b>
                                                    {/*[endif]*/}
                                                    <b style={{ msoBidiFontWeight: "normal" }}>
                                                        <span
                                                            lang="KO"
                                                            style={{ fontSize: "14.0pt", msoBidiFontSize: "11.0pt" }}
                                                        >
                                                            조직<span style={{ letterSpacing: "-.05pt" }}></span>규정
                                                        </span>
                                                    </b>
                                                    <b style={{ msoBidiFontWeight: "normal" }}>
                                                        <span style={{ fontSize: "14.0pt", msoBidiFontSize: "11.0pt" }}>

                                                        </span>
                                                    </b>
                                                </p>
                                                <p className="MsoBodyText" style={{ marginLeft: "0in" }}>
                                                    <b style={{ msoBidiFontWeight: "normal" }}>
                                                        <span style={{ fontSize: "10.0pt", msoBidiFontSize: "11.0pt" }}>

                                                        </span>
                                                    </b>
                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "0in",
                                                        marginRight: "0in",
                                                        marginTop: ".5pt"
                                                    }}
                                                >
                                                    <b style={{ msoBidiFontWeight: "normal" }}>
                                                        <span style={{ fontSize: "6.5pt", msoBidiFontSize: "11.0pt" }}>

                                                        </span>
                                                    </b>
                                                </p>
                                                <h1
                                                    align="center"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "213.3pt",
                                                        marginRight: "213.25pt",
                                                        marginTop: "1.65pt",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    <span lang="KO">
                                                        총<span style={{ letterSpacing: "-.05pt" }}> </span>칙
                                                    </span>

                                                </h1>
                                                <p className="MsoBodyText" style={{ marginTop: "7.05pt" }}>
                                                    <span lang="KO" style={{ letterSpacing: "-.05pt" }}>
                                                        제
                                                    </span>
                                                    <span lang="KO" style={{ letterSpacing: "-1.15pt" }}>
                                                        {" "}
                                                    </span>
                                                    <span style={{ letterSpacing: "-.05pt" }}>1</span>
                                                    <span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}>【</span>목
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>적】
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "95%",
                                                        marginBottom: "0in",
                                                        marginLeft: "40.4pt",
                                                        marginRight: "24.1pt",
                                                        marginTop: "7.8pt"
                                                    }}
                                                >
                                                    <span lang="KO">이 규정은 코린도그룹</span> (<span lang="KO">이하</span> “
                                                    <span lang="KO">회사</span>”<span lang="KO">라고 한다</span>)
                                                    <span lang="KO">
                                                        의 조직기구 및 직무에 관한 권한과
                                                        <span style={{ letterSpacing: "-3.75pt" }}></span>책임을
                                                        <span style={{ letterSpacing: "-.1pt" }}> </span>규정하여
                                                        <span style={{ letterSpacing: "-.05pt" }}></span>업무수행의 효율화와
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>회사운영의
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>합리화
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>도모를
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>목적으로 한다
                                                    </span>

                                                </p>
                                                <p className="MsoBodyText" style={{ marginTop: "7.45pt" }}>
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}></span>
                                                    </span>
                                                    2<span style={{ letterSpacing: "-1.05pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}> 【</span>적용 범위】
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "95%",
                                                        marginBottom: "0in",
                                                        marginLeft: "40.4pt",
                                                        marginRight: "27.85pt",
                                                        marginTop: "7.8pt"
                                                    }}
                                                >
                                                    <span lang="KO">회사의 전 계열사 및 전 사업부를 적용 범위로 하며</span>,{" "}
                                                    <span lang="KO">조직기구</span>,{" "}
                                                    <span lang="KO">
                                                        구성원 및 직무에<span style={{ letterSpacing: "-3.75pt" }}> </span>
                                                        관하여 별도의 정함이<span style={{ letterSpacing: "-.1pt" }}></span>있는
                                                        경우를 제외하고는<span style={{ letterSpacing: "-.1pt" }}> </span>이
                                                        <span style={{ letterSpacing: "-.1pt" }}></span>규정이 정하는
                                                        <span style={{ letterSpacing: "-.1pt" }}> </span>바에 따른다
                                                    </span>

                                                </p>
                                                <p className="MsoBodyText" style={{ marginTop: "7.45pt" }}>
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}></span>
                                                    </span>
                                                    3<span style={{ letterSpacing: "-1.05pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}> 【</span>조직 관리】
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "95%",
                                                        marginBottom: "0in",
                                                        marginLeft: "40.4pt",
                                                        marginRight: "5.0pt",
                                                        marginTop: "7.75pt"
                                                    }}
                                                >
                                                    <span lang="KO">
                                                        각 기구의 장은 소관부서의 관장업무와 조직권한의 행사
                                                    </span>
                                                    ,{" "}
                                                    <span lang="KO">
                                                        임직원의 활용 등에 있어서
                                                        <span style={{ letterSpacing: "-3.75pt" }}></span>항상 상황을 적절히
                                                        파악하고 조직의 기능이 유효적절하고 능률적으로 발휘되도록
                                                        <span style={{ letterSpacing: ".05pt" }}> </span>관리해야
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>한다
                                                    </span>

                                                </p>
                                                <p className="MsoBodyText" style={{ marginLeft: "0in" }}>
                                                    <span style={{ fontSize: "10.0pt", msoBidiFontSize: "11.0pt" }}>

                                                    </span>
                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "0in",
                                                        marginRight: "0in",
                                                        marginTop: ".15pt"
                                                    }}
                                                >
                                                    <span style={{ fontSize: "6.0pt", msoBidiFontSize: "11.0pt" }}>

                                                    </span>
                                                </p>
                                            </div>
                                            <span
                                                style={{
                                                    fontFamily: '"Malgun Gothic","sans-serif"',
                                                    fontSize: "6.0pt",
                                                    msoAnsiLanguage: "EN-US",
                                                    msoBidiFontFamily: '"Malgun Gothic"',
                                                    msoBidiFontSize: "11.0pt",
                                                    msoBidiLanguage: "AR-SA",
                                                    msoFareastLanguage: "KO"
                                                }}
                                            >
                                                <br
                                                    clear="all"
                                                    style={{ msoBreakType: "section-break", pageBreakBefore: "auto" }}
                                                />
                                            </span>
                                            <div className="WordSection2">
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "0in",
                                                        marginRight: "0in",
                                                        marginTop: ".55pt"
                                                    }}
                                                >
                                                    <span style={{ fontSize: "18.5pt", msoBidiFontSize: "11.0pt" }}>

                                                    </span>
                                                </p>
                                                <p className="MsoBodyText">
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}> </span>
                                                    </span>
                                                    4<span style={{ letterSpacing: "-1.05pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}>【</span>조직기구】
                                                    </span>

                                                </p>
                                                <span
                                                    style={{
                                                        fontFamily: '"Malgun Gothic","sans-serif"',
                                                        fontSize: "14.0pt",
                                                        msoAnsiLanguage: "EN-US",
                                                        msoBidiFontFamily: '"Malgun Gothic"',
                                                        msoBidiFontWeight: "bold",
                                                        msoBidiLanguage: "AR-SA",
                                                        msoFareastLanguage: "KO"
                                                    }}
                                                >
                                                    <br clear="all" style={{ msoColumnBreakBefore: "always" }} />
                                                </span>
                                                <h1 style={{ marginTop: "1.7pt" }}>
                                                    <span lang="KO">조직과 구성원</span>

                                                </h1>
                                            </div>
                                            <span
                                                style={{
                                                    fontFamily: '"Malgun Gothic","sans-serif"',
                                                    fontSize: "11.0pt",
                                                    msoAnsiLanguage: "EN-US",
                                                    msoBidiFontFamily: '"Malgun Gothic"',
                                                    msoBidiLanguage: "AR-SA",
                                                    msoFareastLanguage: "KO"
                                                }}
                                            >
                                                <br
                                                    clear="all"
                                                    style={{ msoBreakType: "section-break", pageBreakBefore: "auto" }}
                                                />
                                            </span>
                                            <div className="WordSection3">
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "19.5pt",
                                                        marginBottom: "0in",
                                                        marginLeft: "41.7pt",
                                                        marginRight: "0in",
                                                        marginTop: "7.1pt",
                                                        msoLineHeightRule: "exactly"
                                                    }}
                                                >
                                                    ①<span style={{ letterSpacing: "5.0pt" }}> </span>
                                                    <span lang="KO">
                                                        회사의 조직기구는 사규의 업무분장
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>규정에 따라
                                                        <span style={{ letterSpacing: "-.1pt" }}></span>조직된다
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "95%",
                                                        marginBottom: "0in",
                                                        marginLeft: "61.65pt",
                                                        marginRight: "5.0pt",
                                                        marginTop: ".25pt",
                                                        textIndent: "-19.95pt"
                                                    }}
                                                >
                                                    ②<span style={{ letterSpacing: "1.2pt" }}> </span>
                                                    <span lang="KO">
                                                        전<span style={{ letterSpacing: "-.05pt" }}></span>
                                                    </span>
                                                    ①
                                                    <span lang="KO">
                                                        항에 정한<span style={{ letterSpacing: "-.15pt" }}> </span>것 이외에
                                                        <span style={{ letterSpacing: "-.05pt" }}></span>필요한 경우에는
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>위원회
                                                    </span>
                                                    , <span lang="KO">회의</span>,
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>
                                                    <span lang="KO">사무국</span>,<span lang="KO">해외지사</span>,
                                                    <span style={{ letterSpacing: "-3.75pt" }}> </span>
                                                    <span lang="KO">출장소</span>,
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>
                                                    <span lang="KO">
                                                        임시조직 등을<span style={{ letterSpacing: "-.15pt" }}> </span>둘
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>수
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>있다
                                                    </span>

                                                </p>
                                                <p className="MsoBodyText" style={{ marginTop: "7.4pt" }}>
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}></span>
                                                    </span>
                                                    5<span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}> 【</span>구성원】
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "95%",
                                                        marginBottom: "0in",
                                                        marginLeft: "40.4pt",
                                                        marginRight: "7.95pt",
                                                        marginTop: "7.9pt"
                                                    }}
                                                >
                                                    <span lang="KO">회사의 구성원은 회장</span>,{" "}
                                                    <span lang="KO">수석부회장</span>, <span lang="KO">부회장</span>,{" "}
                                                    <span lang="KO">사장</span>,<span lang="KO">부사장</span>,{" "}
                                                    <span lang="KO">전무이사</span>, <span lang="KO">상무이사</span>,
                                                    <span style={{ letterSpacing: ".05pt" }}> </span>
                                                    <span lang="KO">상무</span>(<span lang="KO">보</span>)
                                                    <span lang="KO">
                                                        의<span style={{ letterSpacing: "-.1pt" }}> </span>임원과 직원으로
                                                        <span style={{ letterSpacing: ".05pt" }}></span>하고
                                                    </span>
                                                    ,{" "}
                                                    <span lang="KO">
                                                        필요에 따라<span style={{ letterSpacing: "-.1pt" }}> </span>고문
                                                    </span>
                                                    ,{" "}
                                                    <span lang="KO">
                                                        별정 등의<span style={{ letterSpacing: "-.1pt" }}> </span>특수직을 둘
                                                        <span style={{ letterSpacing: ".05pt" }}></span>수 있다
                                                    </span>

                                                </p>
                                                <p className="MsoBodyText" style={{ marginTop: "7.3pt" }}>
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}></span>
                                                    </span>
                                                    6<span style={{ letterSpacing: "-1.05pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}> 【</span>업무분장】
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "95%",
                                                        marginBottom: "0in",
                                                        marginLeft: "38.0pt",
                                                        marginRight: "18.65pt",
                                                        marginTop: "7.65pt",
                                                        textIndent: "1.65pt"
                                                    }}
                                                >
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}> </span>
                                                    </span>
                                                    4<span style={{ letterSpacing: "-1.05pt" }}> </span>
                                                    <span lang="KO">조</span> ①
                                                    <span lang="KO">
                                                        항에서<span style={{ letterSpacing: "-.05pt" }}> </span>정하는
                                                        <span style={{ letterSpacing: ".05pt" }}> </span>각 조직기구가
                                                        <span style={{ letterSpacing: "-.1pt" }}> </span>분장하는
                                                        <span style={{ letterSpacing: ".05pt" }}> </span>업무는 경영원리
                                                        <span style={{ letterSpacing: "-.1pt" }}> </span>및 각종
                                                        <span style={{ letterSpacing: ".05pt" }}></span>기능의
                                                        <span style={{ letterSpacing: "-3.7pt" }}> </span>적절한
                                                        <span style={{ letterSpacing: "-.05pt" }}></span>분배원칙에
                                                        <span style={{ letterSpacing: ".05pt" }}> </span>따라
                                                        <span style={{ letterSpacing: "-.1pt" }}></span>유기적이고 계통적으로
                                                        <span style={{ letterSpacing: "-.15pt" }}> </span>구분하여 서로 중복
                                                        또는<span style={{ letterSpacing: "-.15pt" }}> </span>간격이
                                                    </span>

                                                </p>
                                            </div>
                                            <span
                                                style={{
                                                    fontFamily: '"Malgun Gothic","sans-serif"',
                                                    fontSize: "11.0pt",
                                                    lineHeight: "95%",
                                                    msoAnsiLanguage: "EN-US",
                                                    msoBidiFontFamily: '"Malgun Gothic"',
                                                    msoBidiLanguage: "AR-SA",
                                                    msoFareastLanguage: "KO"
                                                }}
                                            >
                                                <br
                                                    clear="all"
                                                    style={{ msoBreakType: "section-break", pageBreakBefore: "always" }}
                                                />
                                            </span>
                                            <div className="WordSection4">
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        lineHeight: "135%",
                                                        marginBottom: "0in",
                                                        marginLeft: "5.0pt",
                                                        marginRight: "33.8pt",
                                                        marginTop: "4.55pt",
                                                        textIndent: "32.95pt"
                                                    }}
                                                >
                                                    <span lang="KO">
                                                        생기지 않고 전 기구가 일체로서 업무목적에 유효하게 공헌하도록 정해야
                                                        한다
                                                    </span>
                                                    .<span style={{ letterSpacing: "-3.75pt" }}></span>
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}> </span>
                                                    </span>
                                                    7<span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}>【</span>위원회】
                                                    </span>

                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "40.4pt",
                                                        marginRight: "0in",
                                                        marginTop: ".15pt"
                                                    }}
                                                >
                                                    <span lang="KO">
                                                        회사의 특수업무 수행상<span style={{ letterSpacing: "-.1pt" }}> </span>
                                                        필요한 때는 위원회를<span style={{ letterSpacing: "-.1pt" }}> </span>둘
                                                        <span style={{ letterSpacing: "-.1pt" }}> </span>수 있다
                                                    </span>
                                                    .

                                                </p>
                                                <p className="MsoBodyText" style={{ marginLeft: "0in" }}>
                                                    <span style={{ fontSize: "10.0pt", msoBidiFontSize: "11.0pt" }}>

                                                    </span>
                                                </p>
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "0in",
                                                        marginRight: "0in",
                                                        marginTop: ".65pt"
                                                    }}
                                                >
                                                    <span style={{ fontSize: "7.5pt", msoBidiFontSize: "11.0pt" }}>

                                                    </span>
                                                </p>
                                            </div>
                                            <span
                                                style={{
                                                    fontFamily: '"Malgun Gothic","sans-serif"',
                                                    fontSize: "7.5pt",
                                                    msoAnsiLanguage: "EN-US",
                                                    msoBidiFontFamily: '"Malgun Gothic"',
                                                    msoBidiFontSize: "11.0pt",
                                                    msoBidiLanguage: "AR-SA",
                                                    msoFareastLanguage: "KO"
                                                }}
                                            >
                                                <br
                                                    clear="all"
                                                    style={{ msoBreakType: "section-break", pageBreakBefore: "auto" }}
                                                />
                                            </span>
                                            <div className="WordSection5">
                                                <p
                                                    className="MsoBodyText"
                                                    style={{
                                                        marginBottom: "0in",
                                                        marginLeft: "0in",
                                                        marginRight: "0in",
                                                        marginTop: ".4pt"
                                                    }}
                                                >
                                                    <span style={{ fontSize: "18.5pt", msoBidiFontSize: "11.0pt" }}>

                                                    </span>
                                                </p>
                                                <p className="MsoBodyText">
                                                    <span lang="KO">
                                                        제<span style={{ letterSpacing: "-1.15pt" }}> </span>
                                                    </span>
                                                    8<span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                    <span lang="KO">
                                                        조<span style={{ letterSpacing: "-.1pt" }}>【</span>회장 및
                                                        <span style={{ letterSpacing: "-.05pt" }}> </span>부회장】
                                                    </span>

                                                </p>
                                                <span
                                                    style={{
                                                        fontFamily: '"Malgun Gothic","sans-serif"',
                                                        fontSize: "14.0pt",
                                                        msoAnsiLanguage: "EN-US",
                                                        msoBidiFontFamily: '"Malgun Gothic"',
                                                        msoBidiFontWeight: "bold",
                                                        msoBidiLanguage: "AR-SA",
                                                        msoFareastLanguage: "KO"
                                                    }}
                                                >
                                                    <br clear="all" style={{ msoColumnBreakBefore: "always" }} />
                                                </span>
                                                <h1>
                                                    <span lang="KO">
                                                        임원과<span style={{ letterSpacing: "-.15pt" }}> </span>직원
                                                    </span>

                                                </h1>
                                            </div>
                                            <span
                                                style={{
                                                    fontFamily: '"Malgun Gothic","sans-serif"',
                                                    fontSize: "11.0pt",
                                                    msoAnsiLanguage: "EN-US",
                                                    msoBidiFontFamily: '"Malgun Gothic"',
                                                    msoBidiLanguage: "AR-SA",
                                                    msoFareastLanguage: "KO"
                                                }}
                                            >
                                                <br
                                                    clear="all"
                                                    style={{ msoBreakType: "section-break", pageBreakBefore: "auto" }}
                                                />
                                            </span>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "61.65pt",
                                                    marginRight: "7.95pt",
                                                    marginTop: "7.7pt",
                                                    textIndent: "-19.95pt"
                                                }}
                                            >
                                                ①<span style={{ letterSpacing: "1.15pt" }}> </span>
                                                <span lang="KO">
                                                    회장은<span style={{ letterSpacing: "-.05pt" }}></span>업무집행의
                                                    최고책임자로서 회사를<span style={{ letterSpacing: "-.05pt" }}> </span>
                                                    대표하며<span style={{ letterSpacing: "-.05pt" }}> </span>회사에서 정하는
                                                    <span style={{ letterSpacing: "-3.75pt" }}></span>기본방침에
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>따라 업무를
                                                    <span style={{ letterSpacing: "-.15pt" }}> </span>통괄한다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "61.65pt",
                                                    marginRight: "7.95pt",
                                                    marginTop: "0in",
                                                    textIndent: "-19.95pt"
                                                }}
                                            >
                                                ②<span style={{ letterSpacing: "1.2pt" }}> </span>
                                                <span lang="KO">
                                                    회사는<span style={{ letterSpacing: "-.05pt" }}></span>업무 필요상
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>부회장을 둘
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>수 있고
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>부회장이 다수인 경우
                                                    <span style={{ letterSpacing: "-.15pt" }}> </span>이를 대표하는
                                                    <span style={{ letterSpacing: "-3.75pt" }}> </span>수석부회장을 둘 수
                                                    있으며
                                                </span>
                                                ,
                                                <span lang="KO">
                                                    부회장은 회장을 보좌하며 회장 유고 시에 그
                                                    <span style={{ letterSpacing: ".05pt" }}> </span>직무를
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>대리한다
                                                </span>

                                            </p>
                                            <p className="MsoBodyText" style={{ marginTop: "7.45pt" }}>
                                                <span lang="KO">
                                                    제<span style={{ letterSpacing: "-1.15pt" }}></span>
                                                </span>
                                                9<span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                <span lang="KO">
                                                    조<span style={{ letterSpacing: "-.1pt" }}> 【</span>임원】
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "60.55pt",
                                                    marginRight: "5.0pt",
                                                    marginTop: "7.75pt",
                                                    textIndent: "-20.05pt"
                                                }}
                                            >
                                                ①<span style={{ letterSpacing: "1.3pt" }}> </span>
                                                <span lang="KO">
                                                    임원은<span style={{ letterSpacing: "-.05pt" }}></span>
                                                </span>
                                                “<span lang="KO">인사관리 규정</span>”
                                                <span lang="KO">
                                                    에서<span style={{ letterSpacing: "-.05pt" }}></span>정하는
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>임원
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>채용기준
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>및
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>절차에
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>따라 채용되어
                                                    <span style={{ letterSpacing: "-3.75pt" }}></span>회사의
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>사업
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>및
                                                    <span style={{ letterSpacing: "-.15pt" }}> </span>조직을
                                                    <span style={{ letterSpacing: "-.1pt" }}></span>관리하는
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>자를
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>말한다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "60.55pt",
                                                    marginRight: "0in",
                                                    marginTop: ".2pt",
                                                    textIndent: "-20.05pt"
                                                }}
                                            >
                                                ②<span style={{ letterSpacing: "1.4pt" }}> </span>
                                                <span lang="KO">
                                                    임원은<span style={{ letterSpacing: "-.05pt" }}></span>사장
                                                </span>
                                                , <span lang="KO">부사장</span>,
                                                <span style={{ letterSpacing: "-.05pt" }}> </span>
                                                <span lang="KO">전무이사</span>, <span lang="KO">상무이사</span>,
                                                <span style={{ letterSpacing: "-.05pt" }}> </span>
                                                <span lang="KO">상무</span>(<span lang="KO">보</span>)
                                                <span lang="KO">
                                                    로 구분하며<span style={{ letterSpacing: "-.05pt" }}></span>업무
                                                </span>
                                                ,{" "}
                                                <span lang="KO">
                                                    권한 및<span style={{ letterSpacing: "-3.75pt" }}> </span>기타사항은
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>
                                                </span>
                                                “
                                                <span lang="KO">
                                                    인사관리<span style={{ letterSpacing: "-.05pt" }}> </span>규정
                                                </span>
                                                ”
                                                <span lang="KO">
                                                    에<span style={{ letterSpacing: "-.05pt" }}> </span>따른다
                                                </span>

                                            </p>
                                            <p className="MsoBodyText" style={{ marginTop: "7.45pt" }}>
                                                <span lang="KO" style={{ letterSpacing: "-.05pt" }}>
                                                    제
                                                </span>
                                                <span lang="KO" style={{ letterSpacing: "-1.15pt" }}>
                                                    {" "}
                                                </span>
                                                10<span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                <span lang="KO">
                                                    조<span style={{ letterSpacing: "-.05pt" }}> 【</span>직원】
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "65.1pt",
                                                    marginRight: "22.8pt",
                                                    marginTop: "7.75pt",
                                                    tabStops: "65.1pt",
                                                    textIndent: "-24.75pt"
                                                }}
                                            >
                                                ①<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp;&nbsp; </span>
                                                <span lang="KO">직원은</span>“<span lang="KO">인사관리 규정</span>”
                                                <span lang="KO">
                                                    에서 정하는 직원 채용기준 및 절차에 따라 채용되어
                                                    <span style={{ letterSpacing: "-3.75pt" }}> </span>회사에
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>근무하는 자를
                                                    <span style={{ letterSpacing: "-.15pt" }}> </span>말한다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "65.1pt",
                                                    marginRight: "11.4pt",
                                                    marginTop: ".15pt",
                                                    tabStops: "65.1pt",
                                                    textIndent: "-24.75pt"
                                                }}
                                            >
                                                ②<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp;&nbsp; </span>
                                                <span lang="KO">직원은 부장</span>, <span lang="KO">차장</span>,{" "}
                                                <span lang="KO">과장</span>,{" "}
                                                <span lang="KO">대리 및 사원으로 구분하며</span>,{" "}
                                                <span lang="KO">업무</span>,{" "}
                                                <span lang="KO">
                                                    권한 및 기타사항은<span style={{ letterSpacing: "-3.75pt" }}> </span>
                                                </span>
                                                “
                                                <span lang="KO">
                                                    인사관리<span style={{ letterSpacing: "-.05pt" }}> </span>규정
                                                </span>
                                                ”
                                                <span lang="KO">
                                                    에<span style={{ letterSpacing: "-.05pt" }}> </span>따른다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "65.1pt",
                                                    marginRight: "24.7pt",
                                                    marginTop: ".15pt",
                                                    tabStops: "65.1pt",
                                                    textIndent: "-24.75pt"
                                                }}
                                            >
                                                ③<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp;&nbsp; </span>
                                                <span lang="KO">직급</span>,
                                                <span lang="KO">호봉 및 년차의 부여는 근속년수</span>,{" "}
                                                <span lang="KO">경력</span>,{" "}
                                                <span lang="KO">업무 평가 결과를 기초로 하며</span>,
                                                <span style={{ letterSpacing: "-3.75pt" }}> </span>
                                                <span lang="KO">
                                                    인사위원회의 결정에<span style={{ letterSpacing: "-.05pt" }}> </span>
                                                    따른다
                                                </span>

                                            </p>
                                            <p className="MsoBodyText" style={{ marginTop: "7.45pt" }}>
                                                <span lang="KO" style={{ letterSpacing: "-.05pt" }}>
                                                    제
                                                </span>
                                                <span lang="KO" style={{ letterSpacing: "-1.15pt" }}>
                                                    {" "}
                                                </span>
                                                11<span style={{ letterSpacing: "-1.1pt" }}> </span>
                                                <span lang="KO">
                                                    조<span style={{ letterSpacing: "-.05pt" }}> 【</span>고문
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>및
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>별정】
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "19.45pt",
                                                    marginBottom: "0in",
                                                    marginLeft: "40.4pt",
                                                    marginRight: "0in",
                                                    marginTop: "7.05pt",
                                                    msoLineHeightRule: "exactly",
                                                    tabStops: "63.65pt"
                                                }}
                                            >
                                                ①<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp; </span>
                                                <span lang="KO">
                                                    고문<span style={{ letterSpacing: "-.05pt" }}></span>및 별정은
                                                    <span style={{ letterSpacing: ".05pt" }}> </span>회사의
                                                    <span style={{ letterSpacing: "-.15pt" }}></span>필요에 따라서 회장이
                                                    <span style={{ letterSpacing: "-.15pt" }}> </span>임명하는 임시특수직을
                                                    <span style={{ letterSpacing: ".05pt" }}></span>말한다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "95%",
                                                    marginBottom: "0in",
                                                    marginLeft: "63.65pt",
                                                    marginRight: "32.75pt",
                                                    marginTop: ".1pt",
                                                    tabStops: "63.65pt",
                                                    textIndent: "-23.3pt"
                                                }}
                                            >
                                                ②<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp; </span>
                                                <span lang="KO">
                                                    고문은 어떤 분야의 전문적인 지식과 풍부한 경험을 가지고 자문에 응하여
                                                    <span style={{ letterSpacing: "-3.75pt" }}> </span>의견을
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>제시하고 조언하는
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>자를
                                                    <span style={{ letterSpacing: "-.05pt" }}> </span>말한다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "18.65pt",
                                                    marginLeft: "40.4pt",
                                                    msoLineHeightRule: "exactly",
                                                    tabStops: "63.65pt"
                                                }}
                                            >
                                                ③<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp; </span>
                                                <span lang="KO">
                                                    별정은<span style={{ letterSpacing: "-.05pt" }}></span>특정한
                                                    <span style={{ letterSpacing: ".05pt" }}> </span>업무 수행을 위하여
                                                    <span style={{ letterSpacing: "-.05pt" }}></span>규정에서
                                                    <span style={{ letterSpacing: "-.1pt" }}> </span>별도로 지정하는 임시직을
                                                    <span style={{ letterSpacing: "-.1pt" }}></span>말한다
                                                </span>

                                            </p>
                                            <p
                                                className="MsoBodyText"
                                                style={{
                                                    lineHeight: "19.5pt",
                                                    marginLeft: "40.4pt",
                                                    msoLineHeightRule: "exactly",
                                                    tabStops: "63.65pt"
                                                }}
                                            >
                                                ④<span style={{ msoTabCount: 1 }}>&nbsp;&nbsp; </span>
                                                <span lang="KO">별정에 대한 직위</span>(<span lang="KO">호칭</span>)
                                                <span lang="KO">는 직원의 직위</span>(<span lang="KO">호칭</span>)
                                                <span lang="KO">
                                                    에 준하여 채용 시<span style={{ letterSpacing: "-.1pt" }}> </span>정한다
                                                </span>

                                            </p>
                                        </>

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