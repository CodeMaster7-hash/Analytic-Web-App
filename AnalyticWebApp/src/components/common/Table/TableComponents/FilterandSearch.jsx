import React from 'react'
import { Filter } from "lucide-react";

export default function FilterandSearch({ handleFilterToggle, search, setSearch, searchField }) {
  
  return (
    <div className="flex justify-between items-center px-1 mb-4">
       <button
                onClick={handleFilterToggle}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 text-white"
              >
                <Filter size={16} /> Filters
              </button>
              <div className="flex flex-col gap-2">
                <label className="text-md font-bold">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search by ${searchField}`}
                  className="border border-gray-300 rounded px-4 py-2 w-64"
                />
              </div>
    </div>
  )
}
