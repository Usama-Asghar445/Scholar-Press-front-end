import React, { useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * A reusable DataTable component for displaying lists with search and pagination.
 * 
 * @param {Array} columns - Array of column definitions: { header: 'Name', accessor: 'name' | (row) => row.name, className: '' }
 * @param {Array} data - The array of data objects to display.
 * @param {function} renderCustomSearch - Optional custom search input renderer.
 * @param {string} searchPlaceholder - Placeholder for the default search input.
 * @param {number} itemsPerPage - Number of items to display per page.
 */
const DataTable = ({
  columns,
  data,
  renderCustomSearch = null,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data across all string values if no custom search is provided
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    return Object.values(item).some(
      (val) =>
        val &&
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
        <div className="relative flex-1 max-w-md">
          {renderCustomSearch ? (
            renderCustomSearch(searchTerm, setSearchTerm)
          ) : (
            <>
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row._id || rowIndex}
                  className="hover:bg-gray-50/50 transition-colors duration-150 group"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 px-6 text-sm text-gray-700 ${col.className || ""}`}
                    >
                      {typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <FaSearch className="text-2xl text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg">No Results Found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Showing <span className="font-medium text-gray-900">{filteredData.length === 0 ? 0 : startIndex + 1}</span> to{" "}
          <span className="font-medium text-gray-900">
            {Math.min(startIndex + itemsPerPage, filteredData.length)}
          </span>{" "}
          of <span className="font-medium text-gray-900">{filteredData.length}</span> entries
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 font-medium text-gray-700 rounded-lg bg-gray-50 border border-gray-200">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
