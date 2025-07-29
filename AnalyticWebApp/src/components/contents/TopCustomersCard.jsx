import React from 'react';

const TopCustomersCard = () => {
  return (
    <div className=" bg-white w-2/3 border border-gray-200">
      <div className="flex justify-between p-6 ">
        <h2 className="text-lg font-semibold text-gray-800">Top Customers</h2>
        <button className="text-sm text-gray-500 bg-gray-200 px-5 py-1">This Month</button>
      </div>
      <div className='border-b border-gray-200' />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-800">0</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>

        <div className="flex gap-3 ml-16 ">
          
          <div 
  className="bg-blue-600 w-0.5 rounded-full" 
  style={{ height: '0%', minHeight: '50px' }}
/>
          <div>
          <p className="text-4xl font-bold text-gray-800">0</p>
          <p className="text-sm text-gray-500">Other Products</p>
          </div>
        </div>


      

        <p className="text-sm text-gray-500 mb-6">0%</p>
      </div>
    </div>
  );
};


export default TopCustomersCard;