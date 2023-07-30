import React from 'react'
import './App.css'
import Footer from './components/Footer'
import MainSection from './components/MainSection'
import Nav from './components/Nav'
import jdata from './data.json'
import { useTable } from 'react-table'

function App() {
  
 const data = React.useMemo( () => jdata, [] );
 const columns = React.useMemo (()=> [
   {
    Header :"DAY",
    accessor : "day"
   },
   {
    Header :"Breakfast",
    accessor : "breakfast"
   },
   {
    Header :"Lunch",
    accessor : "lunch"
   },
   {
    Header :"Dinner",
    accessor : "dinner"
   },
 ] , []);

 
 const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
  return (
    <>
      <Nav/>
      {/* <MainSection/> */}
      <div className='container'>
        <table {...getTableProps()}>
          <thead>
              {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                  </tr>

              )
              )}
          </thead>
          <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
            </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}

export default App
