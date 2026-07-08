import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useReadEbook } from '../hooks/useReadEbook';

// Use the locally installed pdfjs-dist worker (Vite resolves this at build time)
// Do NOT use CDN — pdfjs-dist v5 uses .mjs format which cdnjs does not host
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export const ReaderPage: React.FC = () => {
    const { ebookId } = useParams<{ ebookId: string }>();
    const navigate = useNavigate();
    const { data: pdfUrl, isLoading, isError, error } = useReadEbook(ebookId);
    
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                <p className="text-lg text-gray-400 font-medium">Preparing your e-book securely...</p>
            </div>
        );
    }

    if (isError || !pdfUrl) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-8 rounded-2xl max-w-md text-center backdrop-blur-sm shadow-xl">
                    <svg className="w-12 h-12 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                    <p className="text-gray-300 mb-6">
                        {(error as any)?.response?.data?.message || "Could not load the e-book. Please ensure you have purchased it or try refreshing."}
                    </p>
                    <button 
                        onClick={() => navigate('/library')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                        Return to Library
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200" onContextMenu={(e) => e.preventDefault()}>
            {/* Top Toolbar */}
            <div className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10 shadow-md">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => navigate('/library')}
                        className="p-2 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                        title="Back to Library"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <span className="font-semibold text-lg text-white">Reader</span>
                </div>
                
                <div className="flex items-center space-x-6">
                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-3 bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-600/50">
                        <button 
                            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                            className="p-1 rounded hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                            title="Zoom Out"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>
                        <span className="text-sm font-medium w-12 text-center text-gray-300">{Math.round(scale * 100)}%</span>
                        <button 
                            onClick={() => setScale(s => Math.min(2.5, s + 0.1))}
                            className="p-1 rounded hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
                            title="Zoom In"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </button>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center space-x-3 text-sm font-medium">
                        <button 
                            disabled={pageNumber <= 1} 
                            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors border border-gray-600"
                        >
                            Prev
                        </button>
                        <span className="text-gray-300 w-20 text-center">
                            Page {pageNumber} of {numPages || '--'}
                        </span>
                        <button 
                            disabled={pageNumber >= (numPages || 1)} 
                            onClick={() => setPageNumber(p => Math.min(numPages || 1, p + 1))}
                            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors border border-gray-600"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 overflow-auto bg-gray-900 flex justify-center p-8 custom-scrollbar relative">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col items-center shadow-2xl"
                    loading={
                        <div className="flex flex-col items-center text-gray-400 space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                            <p>Loading document...</p>
                        </div>
                    }
                    error={
                        <div className="bg-red-500/10 text-red-400 p-6 rounded-lg text-center border border-red-500/30 max-w-md">
                            Failed to load PDF. The secure link may have expired. Please refresh the page.
                        </div>
                    }
                >
                    <Page 
                        pageNumber={pageNumber} 
                        scale={scale} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false} 
                        className="bg-white rounded-sm overflow-hidden"
                    />
                </Document>
            </div>
            
            {/* Custom Scrollbar CSS */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4b5563; 
                    border-radius: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6b7280; 
                }
            `}</style>
        </div>
    );
};
