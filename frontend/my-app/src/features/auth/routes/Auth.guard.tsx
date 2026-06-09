import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "@/shared/components/loaders/Loader";
import { AlertDialogComponent } from "@/shared/components/Alert.dialog.message";
import { authService } from "../service/authService";

export function AuthGuardOTPVerifyCredientails(
    { children }: { children: React.ReactNode }) {

    const navigate = useNavigate();

    const [isloading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        const checkPageValidate = async () => {
            try {
                await authService.guardVerifyToken();
                setLoading(false);
            } catch {
                setLoading(false);
                setError(true);
            }
        };
        checkPageValidate();
    }, [navigate]);

    if (isloading) {
        return (
            <div className="flex justify-center items-center w-full h-screen order-2">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <AlertDialogComponent
                    title="Access Denied"
                    description="This verification link is invalid or has expired.
                     Please return to the login page to authenticate."
                    open={true}
                />
            </>
        );
    }


    return children;
};