import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch } from "react-redux";
import { Card } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { ReactSession } from 'react-client-session';

const TableCustom = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [lastPage, setLastPage] = useState(0);

    const customHandleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
        if (type === "sort") {
            props.searchSet({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: props.searchGet.search });
        }
        if (type === "pagination") {
            props.searchSet({ page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: props.searchGet.sort, order: props.searchGet.order, search: props.searchGet.search });
            history.push(`?page=${page}`);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const pageParam = urlParams.get("page");
        const currentPage = parseInt(pageParam);

        if (!isNaN(currentPage) && currentPage !== props.searchGet.page) {
            // Calculate the previous page
            customHandleTableChange("pagination", {
                page: currentPage,
                sortField: props.searchGet.sort,
                sortOrder: props.searchGet.order,
                sizePerPage: props.searchGet.limit,
            });
            // Replace the current URL with the new one, preventing additional clicks of the back button
            history.replace(`?page=${currentPage}`);
        } else if (isNaN(currentPage)) {
            customHandleTableChange("pagination", {
                page: 1,
                sortField: props.searchGet.sort,
                sortOrder: props.searchGet.order,
                sizePerPage: props.searchGet.limit,
            });
            // Replace the current URL with the new one, preventing additional clicks of the back button
            history.replace("?page=1");
        }
    }, [location.search, props.searchGet, customHandleTableChange, history]);

    useEffect(() => {
        // Check if the page has changed
        if (props.searchGet.page !== lastPage) {
            dispatch(props.redukCall(props.searchGet));
            setLastPage(props.searchGet.page);
        }
    }, [props.searchGet, lastPage, dispatch]);

    return (
        <Card className="m-0 p-0">
            <BootstrapTable
                ref={props.refTable}
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
