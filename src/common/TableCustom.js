import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch } from "react-redux";
import { Card } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";

const TableCustom = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // Parse page parameter from the URL
    const urlParams = new URLSearchParams(location.search);
    const pageParam = urlParams.get("page");
    const currentPageFromURL = parseInt(pageParam);

    const [currentPage, setCurrentPage] = useState(0);
    const [tempDispatch, setTempDispatch] = useState(0);

    // Custom handler for table change (pagination and sorting)
    const customHandleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
        if (type === "sort") {
            // Handle sorting change
            props.searchSet({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: props.searchGet.search });
        }
        if (type === "pagination") {
            // Handle pagination change
            props.searchSet({ page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: props.searchGet.sort, order: props.searchGet.order, search: props.searchGet.search });

            history.push(`?page=${page}`);
        }
        if (type === "link") {
            props.searchSet({ page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: props.searchGet.sort, order: props.searchGet.order, search: props.searchGet.search });
        }
    }

    useEffect(() => {

        if (props.searchGet.page !== currentPageFromURL) {
            customHandleTableChange("link", {
                page: currentPageFromURL,
                sortField: props.searchGet.sort,
                sortOrder: props.searchGet.order,
                sizePerPage: props.searchGet.limit,
            });
            setCurrentPage(currentPageFromURL)
        }
    }, [currentPageFromURL]);

    useEffect(() => {
        // Check if the current route is /AppInstructions
        if (location.pathname === "/AppInstructions" && !location.search) {
            history.replace("/AppInstructions?page=1");
        }

        // Conditionally dispatch based on the page
        if (location.pathname === "/AppInstructions") {
            dispatch(props.redukCall(props.searchGet));
        }
    }, [location.pathname, location.search, props.searchGet]);

    return (
        <Card className="m-0 p-0">
            <BootstrapTable
                ref={props.refTable}
                bordered={false}
                wrapperClasses="table-responsive"
                keyField={props.keyField}
                rowClasses="text-nowrap"
                remote={{ filter: true, pagination: true, sort: true, cellEdit: true }}
                data={props.appdata}
                columns={props.columns}
                pagination={paginationFactory({
                    page: props.searchGet.page,
                    sizePerPage: props.searchGet.limit,
                    sizePerPageList: [10],
                    totalSize: props.appdataTotal,
                    showTotal: true,
                })}
                classes={"table align-middle table-nowrap table-rounded"}
                onTableChange={customHandleTableChange}
                striped
                hover
                condensed
                selectRow={props.selectRow}
                rowEvents={props.rowClick}
            />
        </Card>
    );
}

TableCustom.propTypes = {
    refTable: PropTypes.object,
    keyField: PropTypes.string,
    columns: PropTypes.any,
    redukResponse: PropTypes.any,
    appdata: PropTypes.any,
    appdataTotal: PropTypes.any,
    searchSet: PropTypes.any,
    searchGet: PropTypes.any,
    redukCall: PropTypes.any,
    selectRow: PropTypes.any,
    rowClick: PropTypes.any,
}

export default TableCustom;
