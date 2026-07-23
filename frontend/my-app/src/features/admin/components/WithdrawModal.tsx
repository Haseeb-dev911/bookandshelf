import { useState } from "react";
import { useCreatePayout } from "../queries/finance.queries";
import { X, DollarSign, Loader2 } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

export function WithdrawModal({ isOpen, onClose, availableBalance }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const createPayoutMutation = useCreatePayout();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;
    
    try {
      await createPayoutMutation.mutateAsync(parsedAmount);
      onClose();
      setAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Withdraw Funds</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-800">Available Balance</span>
            <span className="text-lg font-bold text-emerald-600">${(availableBalance / 100).toFixed(2)}</span>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amount to Withdraw (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max={(availableBalance / 100).toString()}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-lg font-medium"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {createPayoutMutation.isError && (
            <div className="mb-4 text-sm text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
              {createPayoutMutation.error instanceof Error ? createPayoutMutation.error.message : "Failed to create payout"}
            </div>
          )}

          <div className="flex gap-3 justify-end mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPayoutMutation.isPending || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > (availableBalance / 100)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
            >
              {createPayoutMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Withdraw"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
