import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch } from "react-redux"
import "../assets/scss/custom/table/TableCustom.css"
import { Card } from "reactstrap";

const TableCustom = props => {
    const dispatch = useDispatch();
    //const [customfirstRenderDone, setCustomfirstRenderDone] = useState(false);

    const customhendleTableChange = (type, { page, sortField, sortOrder, sizePerPage }) => {
        if (type === "sort") {
            props.searchSet({ page: 1, limit: sizePerPage, offset: 0, sort: sortField, order: sortOrder, search: props.searchGet.search });
        }
        if (type === "pagination") {
            props.searchSet({ page: page, limit: sizePerPage, offset: ((page - 1) * sizePerPage), sort: props.searchGet.sort, order: props.searchGet.order, search: props.searchGet.search });
        }
    };

    // useEffect(() => {
    //     setCustomfirstRenderDone(true);
    //   }, []);

    useEffect(() => {
        //if (customfirstRenderDone) {
        dispatch(props.redukCall(props.searchGet))
        //}
    }, [props.searchGet])

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
                    sizePerPageList: [5, 10, 20],
                    totalSize: props.appdataTotal,
                    showTotal: true,
                })}
                classes={
                    "table align-middle table-nowrap table-rounded"
                }
                onTableChange={customhendleTableChange}
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