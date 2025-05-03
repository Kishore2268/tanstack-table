import React, { useCallback, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { usePaginatedUsers } from '../hooks/usePaginatedUsers';
import { MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

const columnHelper = createColumnHelper();

const UserTable = () => {
  const {
    users,
    loading,
    error,
    hasMore,
    loadMore,
    total,
    sortBy,
    sortOrder,
    searchTerm,
    setSearchTerm,
    toggleSort
  } = usePaginatedUsers();

  // Define table columns with their accessors and cell renderers
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('email', {
        id: 'email',
        header: 'Email',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        header: 'Phone',
        cell: info => {
          const phone = info.getValue();
          return phone.replace(/(\d{1})-(\d{3})-(\d{3})-(\d{4}).*/, '+$1-$2-$3-$4');
        },
      }),
      columnHelper.accessor(row => `${row.company?.name || 'N/A'} (${row.address?.city || 'N/A'})`, {
        id: 'companyCity',
        header: 'Company (City)',
        cell: info => info.getValue(),
      }),
    ],
    []
  );

  // Initialize the table instance with data and columns
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Get the rows from the table instance
  const { rows } = table.getRowModel();

  // Reference to the scrollable container
  const parentRef = React.useRef(null);

  // Initialize virtualizer for efficient rendering of large lists
  const rowVirtualizer = useVirtualizer({
    count: hasMore ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  // Handle scroll events for infinite loading
  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMore();
      }
    },
    [loadMore]
  );

  // Handle search input changes
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  // Show error state if there's an error
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Render the component
  return (
    <div className="p-2 w-full mx-auto">
      {/* Header section with title and total count */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-400 mb-2">User Directory</h1>
        <p className="text-xl text-red-600">Total Users: {total}</p>
      </div>

      {/* Search input with icon */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
            className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Table container with virtualized rows */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <TableHeader
              columns={columns}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={toggleSort}
            />
            
            {/* Scrollable container for virtualized rows */}
            <div
              ref={parentRef}
              className="overflow-auto"
              style={{ height: 'calc(100vh - 300px)' }}
              onScroll={handleScroll}
            >
              {users.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                  <UserIcon className="h-8 w-8 mb-2" />
                  <p>No users found</p>
                </div>
              ) : (
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const isLoaderRow = virtualRow.index > rows.length - 1;
                    const row = rows[virtualRow.index];

                    return (
                      <TableRow
                        key={virtualRow.index}
                        row={row}
                        virtualRow={virtualRow}
                        isLoaderRow={isLoaderRow}
                        loading={loading}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable; 