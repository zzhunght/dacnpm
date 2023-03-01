import React from "react";
import { useTable } from "react-table";
import {BsTrash} from "react-icons/bs"
import './Table.css'
function ReceiptDetailTable({ 
    columns, 
    data, 
    handleDeleteClick
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    }
    );
    return (
        <table {...getTableProps()} className="receipt-detail-table">
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                        <th {...column.getHeaderProps()}>
                            <div className="row-head">
                                {column.render("Header")}
                            </div>
                        </th>
                    ))}
                    <th style={{width: '15%'}}>
                        <div className="row-head">
                            Hành động
                        </div>
                    </th>
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map((cell,index) => {
                    return (
                        <td {...cell.getCellProps()}>
                            <div className="row-content">
                                <p>{cell.render("Cell")}</p>
                            </div>
                        </td>
                    );
                    })}
                    <td className="delete-icon" onClick={e => handleDeleteClick(row.values)}>
                        <BsTrash />
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default ReceiptDetailTable
