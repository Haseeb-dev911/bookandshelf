import { useState } from "react";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { useFinanceDashboard } from "../queries/finance.queries";
import { BankManagement } from "../components/BankManagement";
import { WithdrawModal } from "../components/WithdrawModal";
import { 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  ShoppingCart, 
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Building,
  RefreshCw
} from "lucide-react";

function StatCard({ title, value, icon: Icon, colorClass, subtitle }: { title: string, value: string, icon: any, colorClass: string, subtitle?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-sm p-6 group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: 'currentColor' }} />
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`p-3 rounded-2xl ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
    </div>
  );
}

export function FinanceDashboard() {
  const { data, isLoading, isError, refetch } = useFinanceDashboard();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="grow flex items-center justify-center">
          <span className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !data?.payload) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-playfair font-bold text-slate-800 mb-2">Error Loading Finance Data</h1>
            <p className="text-slate-500 mb-6">We couldn't fetch the financial statistics at this time.</p>
            <button onClick={() => refetch()} className="px-4 py-2 bg-slate-900 text-white rounded-xl flex items-center gap-2 mx-auto">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { businessData, stripeData } = data.payload;
  
  const availableBalanceUsd = stripeData.balance.available.find((b: any) => b.currency === 'usd')?.amount || 0;
  const pendingBalanceUsd = stripeData.balance.pending.find((b: any) => b.currency === 'usd')?.amount || 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      <main className="grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 pt-28 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-2">
              Finance Overview
            </h1>
            <p className="text-slate-500">
              Manage platform revenue, Stripe balances, and payouts.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setIsWithdrawModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-sm active:scale-95">
              <Building className="w-4 h-4" />
              Withdraw Funds
            </button>
          </div>
        </div>

        {/* Balances Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Available Balance" 
            value={`$${(availableBalanceUsd / 100).toFixed(2)}`}
            subtitle="Ready to payout"
            icon={Wallet} 
            colorClass="bg-emerald-100 text-emerald-600" 
          />
          <StatCard 
            title="Pending Balance" 
            value={`$${(pendingBalanceUsd / 100).toFixed(2)}`}
            subtitle="Clearing soon"
            icon={CreditCard} 
            colorClass="bg-amber-100 text-amber-600" 
          />
          <StatCard 
            title="Total Revenue" 
            value={`$${parseFloat(businessData.totalRevenue).toFixed(2)}`}
            subtitle="All time gross volume"
            icon={DollarSign} 
            colorClass="bg-blue-100 text-blue-600" 
          />
          <StatCard 
            title="Sales Volume" 
            value={businessData.booksSold.toString()}
            subtitle="Books sold to date"
            icon={ShoppingCart} 
            colorClass="bg-violet-100 text-violet-600" 
          />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Recent Transactions */}
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
            <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-500 w-6 h-6" />
              Recent Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-3 font-medium">Type</th>
                    <th className="py-3 font-medium">Amount</th>
                    <th className="py-3 font-medium">Fee</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stripeData.recentTransactions.map((tx: any) => (
                    <tr key={tx.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="py-4 text-sm font-medium text-slate-800 capitalize">
                        {tx.type.replace('_', ' ')}
                      </td>
                      <td className="py-4 text-sm font-medium">
                        <span className={tx.amount > 0 ? "text-emerald-600 flex items-center" : "text-rose-600 flex items-center"}>
                          {tx.amount > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                          ${(Math.abs(tx.amount) / 100).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-500">
                        ${(tx.fee / 100).toFixed(2)}
                      </td>
                      <td className="py-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tx.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-500">
                        {new Date(tx.created * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {stripeData.recentTransactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Payouts */}
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col">
            <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Wallet className="text-emerald-500 w-6 h-6" />
              Recent Payouts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-3 font-medium">Amount</th>
                    <th className="py-3 font-medium">Destination</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {stripeData.recentPayouts.map((payout: any) => (
                    <tr key={payout.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="py-4 text-sm font-medium text-slate-800">
                        ${(payout.amount / 100).toFixed(2)}
                      </td>
                      <td className="py-4 text-sm text-slate-500">
                        Bank **** {payout.destination?.slice(-4) || 'XXXX'}
                      </td>
                      <td className="py-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          payout.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                          payout.status === 'failed' ? 'bg-rose-100 text-rose-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-500">
                        {new Date(payout.arrival_date * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {stripeData.recentPayouts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">No payouts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Bank Management */}
        <BankManagement />

      </main>
      <Footer />
      
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
        availableBalance={availableBalanceUsd}
      />
    </div>
  );
}
