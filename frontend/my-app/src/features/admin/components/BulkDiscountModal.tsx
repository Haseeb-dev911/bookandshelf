import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePLPCategories } from "@/features/PLP/queries/plp.queries";
import { useBulkDiscount } from "../queries/admin.queries";
import toast from "react-hot-toast";

interface BulkDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkDiscountModal({ isOpen, onClose }: BulkDiscountModalProps) {
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { data: categoriesData } = usePLPCategories();
  const bulkDiscountMutation = useBulkDiscount();

  const categories = categoriesData?.payload || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Number(discountPercentage);
    
    if (isNaN(discount) || discount < 0 || discount > 100) {
      toast.error("Discount must be a valid number between 0 and 100.");
      return;
    }

    try {
      const payload: any = { discountPercentage: discount };
      if (categoryId) payload.categoryId = categoryId;

      await bulkDiscountMutation.mutateAsync(payload);
      toast.success(`Bulk discount of ${discount}% applied successfully!`);
      handleClose();
    } catch (error) {
      toast.error("Failed to apply bulk discount.");
      console.error(error);
    }
  };

  const handleClose = () => {
    setDiscountPercentage("");
    setCategoryId("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair font-bold">Apply Bulk Discount</DialogTitle>
          <DialogDescription>
            Apply a discount percentage to all E-books, or filter by a specific category. Set to 0 to remove discounts.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Discount Percentage (%)</label>
              <Input 
                type="number" 
                value={discountPercentage} 
                onChange={(e) => setDiscountPercentage(e.target.value)} 
                placeholder="e.g. 20" 
                min="0" 
                max="100" 
                required 
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category (Optional)</label>
              <select 
                className="w-full bg-transparent border border-slate-200 rounded-md py-3 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={handleClose} disabled={bulkDiscountMutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={bulkDiscountMutation.isPending} className="bg-violet-600 hover:bg-violet-700 text-white font-medium">
              {bulkDiscountMutation.isPending ? "Applying..." : "Apply Discount"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
