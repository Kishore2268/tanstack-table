import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

/**
 * TableHeader Component
 * Renders the header of the table with sorting functionality
 */
const TableHeader = React.memo(({ columns, sortBy, sortOrder, onSort }) => {
  return (
    /**
     * TableHeader Component
     * Renders the header of the table with sorting functionality
    */
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="grid grid-cols-4 gap-4 p-4 font-semibold text-gray-700 min-w-[800px]">
        {/* Map through the columns and render the header for each column */}
        {columns.map((column) => (
          <div key={column.id} className="flex items-center">
            {column.header && (
              <button
                onClick={() => onSort(column.id)} // On click, call the onSort function with the column id
                className={`
                  flex items-center space-x-1 
                  hover:text-primary-600 
                  transition-colors duration-200
                  whitespace-nowrap
                  ${sortBy === column.id ? 'text-primary-600' : ''}
                `}
              >

                <span>{column.header}</span>

                {/* If the sortBy is the same as the column id, render the sort icon */}
                {/* If the sortOrder is ascending, render the up arrow icon, otherwise render the down arrow icon */}
                {sortBy === column.id && (
                  sortOrder === 'asc' 
                    ? <ChevronUpIcon className="w-4 h-4 flex-shrink-0" />
                    : <ChevronDownIcon className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

TableHeader.displayName = 'TableHeader';

export default TableHeader; 