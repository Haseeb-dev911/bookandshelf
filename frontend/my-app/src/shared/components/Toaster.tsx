import { Toaster } from "react-hot-toast";

export function ToasterPopup() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#f7f7f7",
                    color: "#2A241F",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    letterSpacing: "0.2px",
                    maxWidth: "360px",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    boxShadow: "0 18px 50px rgba(60, 40, 20, 0.10)",
                    border: "1px solid rgba(0,0,0,0.06)",
                },
                success: {
                    style: {
                        background: "#f7f7f7",
                        color: "#1A1A1A",
                        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
                    },
                    iconTheme: {
                        primary: "#22C55E",
                        secondary: "#FFFFFF",
                    },
                },
                error: {
                    style: {
                        background: "#f7f7f7",
                        color: "#1A1A1A",
                        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
                    },
                    iconTheme: {
                        primary: "#EF4444",
                        secondary: "#FFFFFF",
                    },
                },
                loading: {
                    style: {
                        background: "#f7f7f7",
                        color: "#black",
                        borderRadius: "16px",
                        padding: "14px 16px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                    },
                    iconTheme: {
                        primary: "black",
                        secondary: "white",
                    },
                },
            }}
        />
    );
}