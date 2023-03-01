import React from "react";
import { useTable } from "react-table";
import {FiEdit3} from "react-icons/fi"
import './Table.css'
function Table({ 
    columns, 
    data, 
    handleSelected, 
    handleSelectedAll, 
    selected,
    handleEditClick,
    handleRowClick
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    }
    );
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()}>
                        <div className="row-head">
                            {index === 0 && (
                                <input type="checkbox" 
                                    onChange={e => handleSelectedAll(e)}
                                />
                            )}
                            {column.render("Header")}
                        </div>
                    </th>
                ))}
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
                        <td {...cell.getCellProps()} onClick={()=>{
                            return handleRowClick ? handleRowClick(cell.row.values) : ''
                        }}>
                            <div className="row-content">
                                {index === 0 && (
                                    <input 
                                        type="checkbox" 
                                        onChange={e => handleSelected(e, cell.value)}
                                        checked={selected.includes(cell.value)}
                                    />
                                )}
                                <p>{cell.render("Cell")}</p>
                                {row.cells.length -1  === index && (
                                    <span><FiEdit3
                                     className="edit-icon"
                                     onClick={()=>handleEditClick(cell.row.values)}
                                    /></span>
                                )}
                            </div>
                        </td>
                    );
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default Table;
