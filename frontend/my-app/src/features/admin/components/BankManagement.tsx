import { useState } from "react";
import { useBanks, useAttachBank, useRemoveBank, useSetDefaultBank } from "../queries/finance.queries";
import { Building, Trash2, CheckCircle, Plus, AlertCircle } from "lucide-react";

export function BankManagement() {
  const { data: banksResponse, isLoading } = useBanks();
  const attachBankMutation = useAttachBank();
  const removeBankMutation = useRemoveBank();
  const setDefaultBankMutation = useSetDefaultBank();

  const [bankToken, setBankToken] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const banks = banksResponse?.payload?.data || [];

  const handleAttach = async () => {
    if (!bankToken) return;
    try {
      await attachBankMutation.mutateAsync(bankToken);
      setBankToken("");
      setIsAdding(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-playfair font-bold text-slate-800 flex items-center gap-2">
          <Building className="text-emerald-500 w-6 h-6" />
          Bank Accounts
        </h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Bank
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Stripe Test Bank Token
            </label>
            <input
              type="text"
              placeholder="btok_... (Use Stripe test tokens)"
              value={bankToken}
              onChange={(e) => setBankToken(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleAttach}
            disabled={!bankToken || attachBankMutation.isPending}
            className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {attachBankMutation.isPending ? "Attaching..." : "Attach"}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      ) : banks.length === 0 ? (
        <div className="text-center py-8 text-slate-500 flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
          <p>No bank accounts attached.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banks.map((bank: any) => (
            <div key={bank.id} className="border border-slate-200 bg-white rounded-2xl p-5 relative group">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                  <Building className="w-6 h-6" />
                </div>
                {bank.default_for_currency && (
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" /> Default
                  </span>
                )}
              </div>
              <p className="text-lg font-bold text-slate-800">
                {bank.bank_name}
              </p>
              <p className="text-sm text-slate-500 font-mono mt-1">
                **** **** **** {bank.last4}
              </p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                {!bank.default_for_currency && (
                  <button
                    onClick={() => setDefaultBankMutation.mutate(bank.id)}
                    disabled={setDefaultBankMutation.isPending}
                    className="text-sm text-slate-600 hover:text-emerald-600 transition-colors font-medium flex-1 text-left"
                  >
                    Make Default
                  </button>
                )}
                <button
                  onClick={() => removeBankMutation.mutate(bank.id)}
                  disabled={removeBankMutation.isPending}
                  className="text-rose-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors ml-auto"
                  title="Remove Bank"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
