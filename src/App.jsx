import { createColumnHelper,
  flexRender, 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel 
} from '@tanstack/react-table';
import { useState } from 'react';
import data from './constants/data.json';
import { Mail, 
  User, 
  Phone, 
  ArrowUpDown, 
  Search, 
  ChevronsLeft, 
  ChevronLeft, 
  ChevronRight,  
  ChevronsRight,
  Sigma
} from 'lucide-react';
import './App.css'

function App() {

  const columnHelper = createColumnHelper();
  const [userData, setUserData] = useState(data);

  // Table Sorting
  const [sorting, setSorting] = useState([]);
  // Searching functionality
  const [globalFilter, setGlobalFilter] = useState("");
  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [ 
    columnHelper.accessor("id", {
      cell: info => info.getValue(),
      header: () => (
        <span className='flex item-center'>
          <Sigma className='mr-3' size={16} /> ID
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

  // Table instance with all plugins and controlled state
  const table = useReactTable({
    data: userData,
    columns,
    // Table state (sorting, filtering, pagination)
    state: {
      sorting,
      globalFilter,
      pagination
    },
    // Callback for pagination state changes
    onPaginationChange: setPagination,
    // Initial pagination state
    initialState: {
      pagination: {
        pageSize: 10,
      }
    },
    // For table row rendering
    getCoreRowModel: getCoreRowModel(),
    // For pagination (required for pagination to work)
    getPaginationRowModel: getPaginationRowModel(),
    // To enable sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // Searching functionality
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel()
  });

  // to get the Header
  // console.log(table.getHeaderGroups());

  // to get the Table rows
  console.log(table.getRowModel().rows);

  return (
    <div className='flex flex-col min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-bold mb-6'>User Data Table</h1>
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

      <div className='flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <span className='mr-2 dark:text-white'>Items per page:</span>
          <select
            className='border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600'
            value={table.getState().pagination.pageSize}
            onChange={e => {
              // table.setPageSize(Number(e.target.value));
              setPagination(prev => ({
                ...prev,
                pageSize: Number(e.target.value),
                pageIndex: 0, // reset to first page
              }));
            }}
          >
            {[5, 10, 20, 30, 40].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center space-x-2 dark:text-white'>
          {/* First Page Button */}
          <button
            className='p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-indigo-800 dark:hover:text-white disabled:opacity-50 transition-colors'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          {/* Previous Page Button */}
          <button
            className='p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-indigo-800 dark:hover:text-white disabled:opacity-50 transition-colors'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Number Input */}
          <span className='flex items-center'>
            <input 
              min={1}
              max={table.getPageCount()}
              type='number'
              className='w-16 p-2 rounded-md border-gray-300 text-center bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600'
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            <span className='ml-1 dark:text-white'>of {table.getPageCount()}</span>
          </span>

          {/* Next Page Button */}
          <button
            className='p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-indigo-800 dark:hover:text-white disabled:opacity-50 transition-colors'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          {/* Last Page Button */}
          <button
            className='p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-indigo-800 dark:hover:text-white disabled:opacity-50 transition-colors'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
