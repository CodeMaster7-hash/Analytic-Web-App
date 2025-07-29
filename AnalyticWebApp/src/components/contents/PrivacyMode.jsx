import React from 'react'

export default function PrivacyMode() {
  return (
    // Privacy Mode Card 
      <div className="flex justify-end mb-3 p-2 bg-white">  
          <span className="text-lg font-medium mr-3 text-gray-700">Privacy Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-all duration-300"></div>
          </label>
        </div>
  )
}
