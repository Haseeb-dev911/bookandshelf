import { Header } from "@/shared/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { useNavigate } from "react-router-dom";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";
import { useAdminStats } from "../queries/admin.queries";
import { 
  Users, 
  BookOpen, 
  BookMarked, 
  CheckCircle, 
  FileText,
  Activity,
  Wallet
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { EbookList } from "../components/EbookList";

function StatCard({ title, value, icon: Icon, colorClass }: { title: string, value: number | string, icon: any, colorClass: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-sm p-6 group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: 'currentColor' }} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        </div>
        <div className={`p-4 rounded-2xl ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useAdminStats();

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
            <h1 className="text-2xl font-playfair font-bold text-slate-800 mb-2">Error Loading Dashboard</h1>
            <p className="text-slate-500 mb-6">We couldn't fetch the admin statistics at this time.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { stats, userGrowth, listingGrowth } = data.payload;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      <main className="grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 pt-28 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-2">
              Admin Overview
            </h1>
            <p className="text-slate-500">
              Monitor key metrics, user growth, and e-book management.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(USER_ROUTES_PATH.adminUsers)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm active:scale-95">
              <Users className="w-4 h-4" />
              Manage Users
            </button>
            <button 
              onClick={() => document.getElementById('manage-ebooks')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all shadow-sm active:scale-95">
              <FileText className="w-4 h-4" />
              Manage E-Books
            </button>
            <button 
              onClick={() => navigate(USER_ROUTES_PATH.adminFinance)}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-sm active:scale-95">
              <Wallet className="w-4 h-4" />
              Finance
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={Users} 
            colorClass="bg-blue-100 text-blue-600" 
          />
          <StatCard 
            title="Total Listings" 
            value={stats.totalListings} 
            icon={BookOpen} 
            colorClass="bg-indigo-100 text-indigo-600" 
          />
          <StatCard 
            title="Active Listings" 
            value={stats.activeListings} 
            icon={Activity} 
            colorClass="bg-emerald-100 text-emerald-600" 
          />
          <StatCard 
            title="Sold Listings" 
            value={stats.soldListings} 
            icon={CheckCircle} 
            colorClass="bg-rose-100 text-rose-600" 
          />
          <StatCard 
            title="Total E-Books" 
            value={stats.totalEbooks} 
            icon={BookMarked} 
            colorClass="bg-violet-100 text-violet-600" 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* User Growth Chart */}
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              User Growth Trend
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    name="New Users" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 4, strokeWidth: 2 }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Listings Growth Chart */}
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Listings Growth Over Time
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={listingGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEbook" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPhysical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
                  <Area type="monotone" dataKey="physicalCount" name="Physical Books" stroke="#6366f1" fillOpacity={1} fill="url(#colorPhysical)" />
                  <Area type="monotone" dataKey="ebookCount" name="E-Books" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorEbook)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Ebook Management Section */}
        <div id="manage-ebooks" className="scroll-mt-28">
          <EbookList />
        </div>

      </main>
      <Footer />
    </div>
  );
}
