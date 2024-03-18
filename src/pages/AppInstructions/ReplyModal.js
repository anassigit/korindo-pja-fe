import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getCheckDownloadData, getReply } from 'store/actions';
import { downloadFiles } from 'helpers/backend_helper';
import MsgModal from 'components/Common/MsgModal';

const ReplyModal = ({ modal, toggle, data, t, setLoadingSpinner }) => {
    let langType = localStorage.getItem("I18N_LANGUAGE");
    const repliesPerPage = 5;

    const [numTemp, setNumTemp] = useState()
    const [fileNmTemp, setFileNmTemp] = useState()
    const [downloadMsg, setDownloadMsg] = useState()
    const [downloadMsgModal, setDownloadMsgModal] = useState(false)
    const [downloadContentModal, setDownloadContentModal] = useState("")

    const downloadMessage = useSelector(state => {
        return state.instructionsReducer.respGetCheckDownload
    })

    const replyData = useSelector(state => {
        return state.instructionsReducer.respGetReply;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const totalReplies = replyData?.data?.count || 0;
    const totalPages = Math.ceil(totalReplies / 5);

    const dispatch = useDispatch();

    useEffect(() => {
        const offset = (currentPage - 1) * repliesPerPage;
        dispatch(getReply({
            offset: offset,
            limit: repliesPerPage,
            search: {
                num: data,
                langType: localStorage.getItem("I18N_LANGUAGE"),
            }
        }));
    }, [currentPage, data]);

    useEffect(() => {
        setCurrentPage(1)
    }, [modal])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPages = 3;

        if (totalPages <= maxPages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage, endPage;
            if (currentPage <= maxPages) {
                if (currentPage === maxPages) {
                    startPage = 1;
                    endPage = maxPages + 1;
                } else {
                    startPage = 1;
                    endPage = maxPages;
                }
            } else if (currentPage >= totalPages - maxPages + 1) {
                if (currentPage === totalPages - maxPages + 1) {
                    startPage = totalPages - maxPages;
                    endPage = totalPages;
                } else {
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                }
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                if (startPage > 2) {
                    pages.unshift('...');
                }
                pages.unshift(1);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };


    const getDisplayedReplies = () => {
        return replyData?.data?.replyList || [];
    };

    const downloadCheckFileInst = (num, fileNm) => {
        debugger
        setLoadingSpinner(true)
        setNumTemp(num)
        setFileNmTemp(fileNm)
    }

    const downloadAttach = async () => {
        try {
            var indexed_array = {
                file_num: numTemp,
                file_nm: fileNmTemp,
            }
            await dispatch(downloadFiles(indexed_array))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (downloadMsg?.status === "0") {
            setDownloadMsg(downloadMessage)
            toggleMsgModal()
        } else if (downloadMsg?.status === "1") {
            downloadAttach()
        }

        setLoadingSpinner(false)
        setDownloadContentModal(downloadMessage.message)
        setDownloadMsg("")
    }, [downloadMsg])

    useEffect(() => {
        setDownloadMsg(downloadMessage)
    }, [downloadMessage])

    const toggleMsgModal = () => {
        setDownloadMsgModal(!downloadMsgModal)
    }

    useEffect(() => {
        if (numTemp) {
            dispatch(getCheckDownloadData({ file_num: numTemp }))
        }
    }, [numTemp])

    return (
        <Modal size='lg' isOpen={modal} toggle={toggle} backdrop="static">

            <MsgModal
                modal={downloadMsgModal}
                toggle={toggleMsgModal}
                message={downloadContentModal}
            />
            <ModalHeader toggle={toggle}>{t('Replies')}</ModalHeader>
            <ModalBody>
                {replyData.status === '0' ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner
                            animation="grow"
                            style={{
                                width: '25px',
                                height: '25px',
                                display: 'block',
                                left: '50%',
                                top: '50%',
                            }}
                            color="danger"
                        />
                    </div>
                ) : (
                    <>
                        {'Page ' + currentPage + ' of ' + totalPages}
                        {
                            getDisplayedReplies().map((row, index) => {
                                const reply_num =
                                    replyData?.data?.replyList.length - index;
                                return (
                                    <div
                                        key={index}
                                        className="reply-row my-1 p-3"
                                        style={{
                                            backgroundColor: "#EEE",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div className="reply-num">
                                            {row.displayNum}
                                        </div>
                                        <div
                                            className="reply-fill"
                                            style={{ width: "95%" }}
                                        >
                                            <div className="reply-content d-flex align-items-start mb-1">
                                                <div
                                                    className="vertical-line"
                                                    style={{
                                                        borderLeft: "2px solid #919191",
                                                        height: "16px",
                                                        margin: "0 10px",
                                                    }}
                                                />
                                                <b
                                                    style={{
                                                        whiteSpace: "pre-wrap",
                                                        overflowWrap: "break-word",
                                                        wordWrap: "break-word",
                                                        wordBreak: "break-word",
                                                    }}
                                                >
                                                    {row.content}
                                                </b>
                                            </div>
                                            {row.attachFileList.map(
                                                (file, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className="reply-attachment d-flex align-items-start mb-1">
                                                            <div
                                                                className="vertical-line"
                                                                style={{
                                                                    borderLeft:
                                                                        "2px solid #919191",
                                                                    height: "16px",
                                                                    margin: "0 10px",
                                                                }}
                                                            />
                                                            <i
                                                                className="mdi mdi-paperclip"
                                                                style={{
                                                                    cursor: "pointer",
                                                                    verticalAlign: "middle",
                                                                }}
                                                                onClick={() =>
                                                                    downloadCheckFileInst(
                                                                        file.num,
                                                                        file.name
                                                                    )
                                                                }
                                                            />
                                                            <u
                                                                style={{
                                                                    cursor: "pointer",
                                                                    display: "inline-block",
                                                                    maxWidth: "80%",
                                                                    overflow: "hidden",
                                                                    textOverflow:
                                                                        "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                }}
                                                                onClick={() => {
                                                                    downloadCheckFileInst(
                                                                        file.num,
                                                                        file.name
                                                                    )
                                                                }}
                                                            >
                                                                {file.name}
                                                            </u>
                                                            &nbsp;
                                                            <i
                                                                style={{
                                                                    cursor: "pointer",
                                                                    fontSize: "20px",
                                                                    marginTop: "-4px",
                                                                }}
                                                                className="mdi mdi-download"
                                                                onClick={() => {
                                                                    downloadCheckFileInst(
                                                                        file.num,
                                                                        file.name
                                                                    )
                                                                }}
                                                            />
                                                            <br />
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            )}
                                            <div className="reply-history d-flex align-items-start">
                                                <div
                                                    className="vertical-line"
                                                    style={{
                                                        borderLeft: "2px solid #919191",
                                                        height: "16px",
                                                        margin: "0 10px",
                                                    }}
                                                />
                                                <i>{row.write_time}</i>&nbsp;{" "}
                                                {t("by")} {row.name}
                                            </div>
                                        </div>
                                        <div
                                            className="reply-actions"
                                            style={{
                                                width: "5%",
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            &nbsp;&nbsp;&nbsp;
                                        </div>
                                    </div>
                                )
                            })}
                    </>
                )
                }
            </ModalBody>
            <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                    {getPageNumbers().map((pageNumber, index) => (
                        <PaginationItem key={index} active={pageNumber === currentPage} disabled={pageNumber === "..."}>
                            <PaginationLink onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                </Pagination>
                <Button color="danger" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ReplyModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    data: PropTypes.any,
    t: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
};

export default withTranslation()(ReplyModal);
