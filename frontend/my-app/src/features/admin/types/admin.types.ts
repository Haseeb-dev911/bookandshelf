export interface AdminStats {
  totalUsers: number;
  totalListings: number;
  activeListings: number;
  soldListings: number;
  totalEbooks: number;
  activeEbooks: number;
}

export interface GrowthDataPoint {
  date: string;
  count?: number;
  total?: number;
  ebookCount?: number;
  physicalCount?: number;
}

export interface AdminDashboardPayload {
  stats: AdminStats;
  userGrowth: GrowthDataPoint[];
  listingGrowth: GrowthDataPoint[];
}

export interface AdminDashboardResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: AdminDashboardPayload;
}

export interface EbookFormInputs {
  title: string;
  author: string;
  description: string;
  price: number;
  categoryId: string;
  coverImage: File | null;
  pdfFile: File | null;
}

export interface CloudinaryFile {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
}

export interface EbookPayload {
  title: string;
  author: string;
  description: string;
  price: number;
  categoryId: string;
  coverImage: CloudinaryFile;
  pdfFile: CloudinaryFile;
}

export interface AdminEbooksResponse {
  success: boolean;
  message: string;
  errors: null | unknown[];
  payload: any[]; // We can use the BookListing interface here if imported
}
