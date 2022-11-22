import React, { forwardRef, useRef, useEffect } from "react";
import { useTable, useRowSelect, usePagination } from "react-table";
import classNames from "classnames/bind";
import styles from "./Table.module.scss";
import { Pagination } from "../Pagination";
import { useData } from "~/hooks";
import { setSelectedRow } from "~/store/action";
const cx = classNames.bind(styles);

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <label className="checkbox">
            <input
                type="checkbox"
                className="js-row-select"
                ref={resolvedRef}
                {...rest}
            />
            <span className="checkbox__checkmark"></span>
        </label>
    );
});

function Table({
    columns,
    data,
    currentPage,
    perPage,
    totalPages,
    handleDoubleClick,
}) {
    const tables = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: currentPage, pageSize: perPage },
            manualPagination: true,
            pageCount: totalPages,
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection
                {
                    id: "selection",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <IndeterminateCheckbox
                            {...getToggleAllPageRowsSelectedProps()}
                        />
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <IndeterminateCheckbox
                            {...row.getToggleRowSelectedProps()}
                            value={row.values.col2}
                        />
                    ),
                },
                ...columns,
            ]);
        }
    );

    const [, dispatch] = useData();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        selectedFlatRows,
        state: { selectedRowIds },
    } = tables;

    useEffect(() => {
        let listId = selectedFlatRows.map(
            (selectedItem) => selectedItem.original
        );
        dispatch(setSelectedRow(listId));
    }, [selectedFlatRows]);
    return (
        <>
            <div className={cx("table-wrapper")}>
                <table {...getTableProps()} className={cx("table")}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={cx({
                                        "row--active": row.isSelected,
                                    })}
                                    onDoubleClick={() => {
                                        handleDoubleClick(row?.original?.id);
                                    }}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination tables={tables}></Pagination>
        </>
    );
}

export default Table;
