import { Outlet } from 'react-router-dom';
import signupIllustration from '../../../assets/images/sign-up side image.png';


export const AuthSidebarLayout = () => {
    return (
        <div className='flex flex-row h-[95vh]'>
            <div className={`hidden lg:flex lg:w-1/2 vh-100 md:block flex-1 relative order-1`}>
                <img
                    alt={signupIllustration}
                    className="  w-full h-full object-cover object-center rounded-4xl p-5"
                    src={signupIllustration}
                />
            </div>

            <Outlet />
        </div>
    );
};