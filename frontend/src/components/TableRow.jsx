import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { UserIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

/**
 * TableRow Component
 * Renders a table row with virtualized scrolling
*/
const TableRow = React.memo(({ row, virtualRow, isLoaderRow, loading }) => {
  return (
    <div
      className={`
        absolute top-0 left-0 w-full
        border-b border-gray-100
        hover:bg-gray-50
        transition-colors duration-150
      `}
      style={{
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
      }}
    >
      {isLoaderRow ? (
        <div className="flex items-center justify-center h-full">
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500" />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 p-4 min-w-[800px]">
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} cell={cell} />
          ))}
        </div>
      )}
    </div>
  );
});

/**
 * TableCell Component
 * Renders a table cell with an icon and a truncated text
*/
const TableCell = React.memo(({ cell }) => {
  const getIcon = (columnId) => {
    switch (columnId) {
      case 'name':
        return <UserIcon className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />;
      case 'email':
        return <EnvelopeIcon className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" />;
      case 'phone':
        return <PhoneIcon className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />;
      case 'companyCity':
        return <BuildingOfficeIcon className="w-4 h-4 text-red-400  mr-2 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    /**
     * TableCell Component
     * Renders a table cell with an icon and a truncated text
    */
    <div className="flex items-center truncate text-gray-700">
      {getIcon(cell.column.id)}
      <span className="truncate">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </span>
    </div>
  );
});

TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';

export default TableRow; 