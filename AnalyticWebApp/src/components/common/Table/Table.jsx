import React, { useState, useMemo, useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import FilterPopup from "./TableComponents/FilterPopup";
import Navbar from "./TableComponents/TableNavbar";
import Pagination from "./TableComponents/Pagination";
import FilterandSearch from "./TableComponents/FilterandSearch";
import Spinner from "../Spinner/Spinner";

const Table = ({
  title,
  data = [],
  searchField = "name",
  columns,
  filterFields = [],
  onCheckboxToggle = () => {},
  useLiveFilter = false,
  loading = false,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [showFilters, setShowFilters] = useState(false);

  const filterStorageKey = `${title}-filters`;

  const [filters, setFilters] = useState(() =>
    Object.fromEntries(filterFields.map((f) => [f.name, ""]))
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


  // Load filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(filterStorageKey);
    if (saved) {
      setFilters(JSON.parse(saved));
    }
  }, [filterStorageKey]);

 const handleFilterToggle = () => {
  setShowFilters((prev) => {
    const closing = prev === true;
    if (closing) {
      handleClearFilters(); // Clear filters when closing the popup
    }
    return !prev;
  });
};

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleApplyFilters = () => {
  localStorage.removeItem(filterStorageKey); // Clear saved filters on Apply
  setShowFilters(false);
};

  const handleClearFilters = () => {
    const cleared = Object.fromEntries(filterFields.map((f) => [f.name, ""]));
    setFilters(cleared);
  };
  const handleSaveFilters = () => {
    localStorage.setItem(filterStorageKey, JSON.stringify(filters));
    setShowFilters(false);
  };

const filteredData = useMemo(() => {
  if (!data || data.length === 0) return [];

  return data.filter((item) => {
    const matchesSearch = String(item[searchField] || "")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      // Skip server-side filters if useLiveFilter is on
      if (useLiveFilter && ["customerId", "status"].includes(key)) {
        return true; // Skip local filtering for live fields
      }

      // Date filter
      const dateKeys = ["timeStamp", "lastTransactionDate", "dte"];
      if (dateKeys.includes(key)) {
        const itemDate = new Date(item[key]).toISOString().split("T")[0];
        const filterDate = new Date(value).toISOString().split("T")[0];
        return itemDate === filterDate;
      }

      // Select field
      const selectFields = filterFields.filter(f => f.type === "select").map(f => f.name);
      if (selectFields.includes(key)) {
        if (String(value).toLowerCase() === "all") return true;
        return String(item[key]).toLowerCase() === String(value).toLowerCase();
      }

      return String(item[key] ?? "").toLowerCase().includes(String(value).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });
}, [data, debouncedSearch, filters, searchField, useLiveFilter]);

  const finalColumns = [
    ...columns,
    {
      id: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Link to={`/viewuser/${row.original.id}`} className="text-blue-600">
            <Eye size={18} />
          </Link>
          <Link to={`/edituser/${row.original.id}`} className="text-yellow-500">
            <Pencil size={18} />
          </Link>
          <button className="text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns: finalColumns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 bg-white m-6 rounded-2xl shadow-md relative">

      {/* FilterPopup */}
     <FilterPopup
  title={title}
  isOpen={showFilters}
  onClose={() => setShowFilters(false)}
  filters={filters}
  onChange={handleFilterChange}
  onApply={handleApplyFilters}
  onClear={handleClearFilters}
  onSave={handleSaveFilters}
  fields={filterFields}
  onCheckboxToggle={(e) => {
    e.stopPropagation(); // optional, but safe
    onCheckboxToggle(e);
  }}
  useLiveFilter={useLiveFilter}
/>


      {/* Navbar */}
      <Navbar title={title} />
      
      {/* FilterandSearch */}
      <FilterandSearch 
        handleFilterToggle={handleFilterToggle}
        search={search}
        setSearch={setSearch}
        searchField={searchField}
      />
      
      {/* Main Table */}
      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-300">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold border-b border-gray-300 whitespace-nowrap"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
         <tbody>
  {loading ? (
    <tr>
      <td colSpan={finalColumns.length} className="py-6 text-center">
        <Spinner />
      </td>
    </tr>
  ) : table.getRowModel().rows.length > 0 ? (
    table.getRowModel().rows.map((row) => (
      <tr key={row.id} className="even:bg-gray-200 odd:bg-gray-50 hover:bg-gray-100">
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="px-5 py-2 border-b border-gray-200">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={finalColumns.length}
        className="text-center py-8 text-orange-500 font-semibold"
      >
        No record found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <Pagination table={table} />
    </div>
  );
};

export default Table;
