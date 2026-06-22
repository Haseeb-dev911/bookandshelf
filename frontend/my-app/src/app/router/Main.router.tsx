import { createBrowserRouter } from 'react-router-dom';

import { AuthRouter } from './Auth.router';

import { HomePage } from '@/features/home/pages/HomePage';
import { AuthSidebarLayout } from '@/features/auth/layout/Auth.sidebar.layout';
import { ListingsPage } from '@/features/listing';
import { PLPPage } from '@/features/PLP';
import { BookListingPage } from '@/features/sellUpload';
import { USER_ROUTES_PATH } from './routes.path';
import { ProfileSettingsPage } from '@/features/profile-setting/pages/ProfileSettingsPage';
import { WishlistPage } from '@/features/wishlist';
import { SellerProfilePage } from '@/features/seller-profile';
import { ProductPage } from '@/features/Product-page';
import { AdminGuard } from '@/features/admin/routes/Admin.guard';
import { AdminDashboard } from '@/features/admin/pages/AdminDashboard';
import { EBookCartPage } from "./../../features/eBookCart/pages/EBookCartPage";

export const MianRouter = createBrowserRouter([
  {
    element: <AuthSidebarLayout />,
    children: [
      ...AuthRouter
    ]
  },
  {
    path: USER_ROUTES_PATH.home,
    element: < HomePage />
  },
  {
    path: USER_ROUTES_PATH.sell,
    element: <ListingsPage />
  },
  {
    path: USER_ROUTES_PATH.uploadBookToSell,
    element: <BookListingPage />
  },

  {
    path: USER_ROUTES_PATH.setting,
    element: <ProfileSettingsPage />
  },
  {
    path: USER_ROUTES_PATH.browse,
    element: <PLPPage />
  },
  {
    path: USER_ROUTES_PATH.wishlist,
    element: <WishlistPage />
  },
  {
    path: USER_ROUTES_PATH.sellerProfile,
    element: <SellerProfilePage />
  },
  {
    path: USER_ROUTES_PATH.product,
    element: <ProductPage />
  },
  {
    path: USER_ROUTES_PATH.cart,
    element: <EBookCartPage />
  },
  {
    path: USER_ROUTES_PATH.admin,
    element: (
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    )
  }

]);