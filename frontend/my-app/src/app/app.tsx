import { RouterProvider } from 'react-router-dom';
import { MianRouter } from './router/Main.router';
import { ToasterPopup } from '@/shared/components/Toaster';
import { GlobalPaymentWatcher } from '@/features/payment/components/GlobalPaymentWatcher';

const App = () => {
  return <>
    <GlobalPaymentWatcher />
    <RouterProvider router={MianRouter} />
    <ToasterPopup />
  </>;
};

export default App;
