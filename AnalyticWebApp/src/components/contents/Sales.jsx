import React from 'react';

export default function Sales() {
  const salesData = [
    { title: 'Today', sub: 'Yesterday', dot: 'bg-purple-500' },
    { title: 'This Week', sub: 'Last Week', dot: 'bg-green-500' },
    { title: 'This Month', sub: 'Last Month', dot: 'bg-blue-500' },
    { title: 'This Year', sub: 'Last Year', dot: 'bg-yellow-400' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      
        <h2 className="text-lg font-semibold text-gray-700 mb-2 px-4 py-5">Sales</h2>
        <div className="border-b border-gray-200 w-full mb-6"/>
     
      
      <div className="flex justify-between px-6 pb-4 gap-8">
  {salesData.map((item, idx) => (
    <div
      key={idx}
      className="bg-white border border-gray-200 rounded-lg px-9 py-8 shadow-sm relative w-full"
    >
      <div className="flex justify-start gap-3">
        <span className="text-6xl font-bold text-gray-700">↕</span>
        <div>
          <p className="text-sm font-medium text-gray-600">{item.title}</p>
          <p className="text-xs text-gray-500 mb-1">PKR 0.00</p>
          <p className="text-sm font-medium mt-1 text-gray-600">{item.sub}</p>
          <p className="text-xs text-gray-500">PKR 0.00</p>
        </div>
      </div>
    

            
            {/* Circle half outside */}
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 bg-white text-xs font-semibold text-gray-600 shadow-sm">
                0%
                <span className={`absolute -top-3 right-5 w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}