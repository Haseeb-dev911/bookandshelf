import { RouterProvider } from 'react-router-dom';
import { MianRouter } from './router/Main.router';
import { ToasterPopup } from '@/shared/components/Toaster';
import { GlobalPaymentWatcher } from '@/features/payment/components/GlobalPaymentWatcher';
import { AccountStatusWatcher } from '@/features/admin/components/AccountStatusWatcher';
import { SocketManager } from '@/shared/components/SocketManager';

const App = () => {
  return <>
    <AccountStatusWatcher />
    <GlobalPaymentWatcher />
    <SocketManager />
    <RouterProvider router={MianRouter} />
    <ToasterPopup />
  </>;
};

export default App;
