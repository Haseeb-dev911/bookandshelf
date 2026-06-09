import { createBrowserRouter } from 'react-router-dom';

import { AuthRouter } from './Auth.router';

import { HomePage } from '@/features/home/pages/HomePage';
import { AuthSidebarLayout } from '@/features/auth/layout/Auth.sidebar.layout';
import { ListingsPage } from '@/features/listing';
import { PLPPage } from '@/features/PLP';
import { BookListingPage } from '@/features/sellUpload';
import { USER_ROUTES_PATH } from './routes.path';
import { ProfileSettingsPage } from '@/features/profile_settings/pages/ProfileSettingsPage';
import { WishlistPage } from '@/features/wishlist';

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
  }

]);