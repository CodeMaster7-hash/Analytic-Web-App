import PrivacyMode from '../contents/PrivacyMode';
import Sales from '../contents/Sales';
import RevenueExpenseCard from '../contents/RevenueExpenseCard';
import InvoicesCard from '../contents/InvoicesCard';
import TopCustomersCard from '../contents/TopCustomersCard';
import LowInventoryCard from '../contents/LowInventoryCard';
import TopProductsCard from '../contents/TopProductsCard';
import CashAndBanks from '../contents/CashAndBanks';
import AccountReceivableAging from '../contents/AccountReceiveableAging';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="p-5 bg-gray-200 min-h-screen z-50">
      <PrivacyMode />
      <Sales />

         <div className="flex gap-4 w-full pt-4">
      <RevenueExpenseCard />
      <InvoicesCard />
    </div>
    <div className=" pt-4">
      <AccountReceivableAging />
    </div>

    
    <div className="flex gap-4 w-full pt-4">
      <TopCustomersCard />
      <LowInventoryCard />
    </div>
    
        <div className="flex gap-4 w-full pt-4">
      <TopProductsCard />
      <CashAndBanks />
    </div>
      <Outlet />
    </div>
  );
}