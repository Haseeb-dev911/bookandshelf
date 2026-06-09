import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AUTH_ROUTES_PATH } from "@/app/router/routes.path";

import { showError } from "@/shared/utils/toast.global";

import { authService } from "../service/authService";

import Loader from "@/shared/components/loaders/Loader";
import { AlertDialogComponent } from "@/shared/components/Alert.dialog.message";

export function AuthGaurdUpdatePasswordSessionPage({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const { sessionId } = useParams();

    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

    useEffect(() => {
        if (!sessionId) {
            navigate(AUTH_ROUTES_PATH.passwordResetRequest);
            return;
        };

        const checkPageValidate = async () => {
            try {
                await authService.requestPasswordConfirmGuard(sessionId);
                setStatus("success");
            } catch {
                showError("This link is invalid or has expired.");
                setStatus("error");
            }
        };
        checkPageValidate();
    });

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center w-full h-screen order-2">
                <Loader />
            </div>
        );
    }

    if (status === "error") {
        return <AlertDialogComponent
            title="Session Expired or Invalid"
            description="To continue resetting your password, please request a new reset link."
            open={true}
            redirectTo={AUTH_ROUTES_PATH.passwordResetRequest}
            actionLabel={"Request new Link"}
        />;
    }

    return children;
};