import { RouterProvider } from 'react-router-dom';
import { MianRouter } from './router/Main.router';
import { ToasterPopup } from '@/shared/components/Toaster';

const App = () => {
  return <>
    <RouterProvider router={MianRouter} />
    <ToasterPopup />
  </>;
};

export default App;
