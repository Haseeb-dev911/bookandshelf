import { useState } from "react";
import { useEbooks, useDeleteEbook } from "../queries/admin.queries";
import { Edit, Trash2, FileText, Search, Percent } from "lucide-react";
import { EbookFormModal } from "./EbookFormModal";
import { BulkDiscountModal } from "./BulkDiscountModal";
import toast from "react-hot-toast";

export function EbookList() {
  const { data, isLoading } = useEbooks();
  const deleteMutation = useDeleteEbook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const ebooks = data?.payload || [];

  const filteredEbooks = ebooks.filter((book: any) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this e-book?")) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success("E-book deleted successfully");
      } catch (e) {
        toast.error("Failed to delete e-book");
      }
    }
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingBook(null), 200); // Wait for modal close animation
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-violet-500" />
          Manage E-Books
        </h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search e-books..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setIsBulkModalOpen(true)}
            className="shrink-0 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2"
          >
            <Percent className="w-4 h-4" />
            Bulk Discount
          </button>
          <button 
            onClick={() => {
              setEditingBook(null);
              setIsModalOpen(true);
            }}
            className="shrink-0 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-all shadow-sm active:scale-95"
          >
            Publish New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-3 font-medium">Cover</th>
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium">Author</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading e-books...</td></tr>
            ) : filteredEbooks.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-500">No e-books found.</td></tr>
            ) : (
              filteredEbooks.map((book: any) => (
                <tr key={book.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3">
                    <img src={book.images?.[0]?.secure_url} alt="Cover" className="w-10 h-12 object-cover rounded shadow-sm" />
                  </td>
                  <td className="py-3 font-medium text-slate-900">{book.title}</td>
                  <td className="py-3 text-slate-600">{book.author}</td>
                  <td className="py-3 text-slate-900 font-medium">${Number(book.price).toFixed(2)}</td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(book)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EbookFormModal isOpen={isModalOpen} onClose={handleCloseModal} editData={editingBook} />
      <BulkDiscountModal isOpen={isBulkModalOpen} onClose={() => setIsBulkModalOpen(false)} />
    </div>
  );
}
