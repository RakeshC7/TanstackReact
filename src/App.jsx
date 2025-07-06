import { createColumnHelper, flexRender, useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import data from './constants/data.json';
import { Mail, User, Phone, ArrowUpDown, Search } from 'lucide-react';
import './App.css'

function App() {

  const columnHelper = createColumnHelper();
  const [userData, setUserData] = useState(data);
  //Table Sorting
  const [sorting, setSorting] = useState([]);
  // searching functionality
  const [ globalFilter, setGlobalFilter ] = useState("");

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
    //Table Sorting
    state: {
      sorting,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    
    // to enable sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    
    // searching functionality
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel()
  });

  // to get the Header
  // console.log(table.getHeaderGroups());

  // to get the Table rows
  console.log(table.getRowModel().rows);

  return (
    <div className='flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>

      <div className='mb-4 relative'>
        <input
          value={globalFilter ?? '' }
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder='Search...'
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
        />
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
      </div>

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
                        <div 
                          {
                            ...{
                              className: header.column.getCanSort() ? 'cursor-pointer select-none flex item-center' : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }
                          }
                        >
                          {
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          }
                          <ArrowUpDown className='ml-2' size={14} />
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
