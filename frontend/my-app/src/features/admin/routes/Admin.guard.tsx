import { useEffect, useState } from "react";


import Loader from "@/shared/components/loaders/Loader";
import { AlertDialogComponent } from "@/shared/components/Alert.dialog.message";
import { settingService } from "@/features/profile-setting/services/setting.page.service";
import { USER_ROUTES_PATH } from "@/app/router/routes.path";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await settingService.getUserprofileData();
                if (response.payload?.role === "admin") {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (err) {
                console.error("Failed to fetch user profile", err);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <Loader />
            </div>
        );
    }

    if (!isAuthorized) {
        // We can either redirect to home or show an alert dialog.
        return (
            <AlertDialogComponent
                title="Access Denied"
                description="You do not have permission to access the admin panel."
                open={true}
                redirectTo={USER_ROUTES_PATH.home}
                actionLabel="Go back Home"
            />
        );
    }

    return <>{children}</>;
}
