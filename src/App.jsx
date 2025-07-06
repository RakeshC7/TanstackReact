import { createColumnHelper, flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import data from './constants/data.json';
import { Mail, User, Phone } from 'lucide-react';
import './App.css'

function App() {

  const columnHelper = createColumnHelper();
  const [userData, setUserData] = useState(data);

  const columns = [ 
    columnHelper.accessor("id", {
      cell: info => info.getValue(),
      header: () => (
        <span className='flex item-center'>
          <User className='mr-3' size={16} /> ID
        </span>
      ),
    }),

    columnHelper.accessor("name", {
      cell: info => info.getValue(),
      header: () => (
        <span className='flex item-center'>
          <User className='mr-3' size={16} /> Name
        </span>
      ),
    }),

    columnHelper.accessor("email", {
      id: "email",
      cell: info => (
        <span className='italic text-blue-600'>{info.getValue()}</span>
      ),
      header: () => (
        <span className='flex item-center'>
          <Mail className='mr-3' size={16} /> Email
        </span>
      ),
    }),

    columnHelper.accessor("phone", {
      cell: info => info.getValue(),
      header: () => (
        <span className='flex item-center'>
          <Phone className='mr-3' size={16} /> Phone
        </span>
      ),
    })
  ]

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  // to get the Header
  // console.log(table.getHeaderGroups());

  // to get the Table rows
  console.log(table.getRowModel().rows);

  return (
    <div className='flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map((header) => (
                      <th key={header.id}
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        <div>
                          {
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          }
                        </div>
                      </th>
                    ))}
                </tr>
              ))
            }
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {
              table.getRowModel().rows.map( row => (
                <tr key={row.id} className='hover:bg-gray-50'>
                  {
                    row.getVisibleCells().map( cell => (
                      <td key={cell.id} className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
              ) )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
