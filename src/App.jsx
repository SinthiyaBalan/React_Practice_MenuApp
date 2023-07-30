import React from 'react'
import './App.css'
import Footer from './components/Footer'
import MainSection from './components/MainSection'
import Nav from './components/Nav'
import jdata from './data.json'
import { useTable } from 'react-table'
import html2pdf from 'html2pdf.js';

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

        // for download
      
          const handleDownloadAsPDF = () => {
            // Replace 'your_pdf_file_name.pdf' with the desired file name for the downloaded PDF
            const fileName = 'your_pdf_file_name.pdf';
        
            // Replace 'rootElement' with the ID or class name of the element you want to convert to PDF
            const element = document.getElementById('rootElement');
        
            // Create the configuration object for html2pdf
            const config = {
              margin: 10,
              filename: fileName,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
        
            // Perform the conversion and download
            html2pdf().from(element).set(config).save();
          };

  return (
    <>
      <Nav/>
      {/* <MainSection/> */}
      <button onClick={handleDownloadAsPDF}>Download as PDF</button>
      <div id="rootElement">
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
