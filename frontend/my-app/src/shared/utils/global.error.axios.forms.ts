// import axios from "axios";
// import { UseFormSetError } from "react-hook-form";
// import { NavigateFunction } from "react-router-dom";

// type HandleApiErrorProps = {
//     error: unknown;
//     navigate: NavigateFunction;
//     setError: UseFormSetError<any>;
// };

// export function handleApiError({
//     error,
//     setError,
//     navigate
// }: HandleApiErrorProps) {

//     if (!axios.isAxiosError(error)) {
//         setError("root", {
//             message: "Unexpected error occurred."
//         });
//         return;
//     }

//     const status = error.response?.status;
//     if (status === 401) {
//         showError("Session expired.");

//         navigate(
//             AUTH_ROUTES_PATH.passwordResetRequest
//         );
//         return;
//     }

//     if (status === 422) {
//         formatFormHookErrors(error, setError);
//         return;
//     }

//     if (!error.response) {
//         setError("root", {
//             message: "Network error."
//         });

//         return;
//     }

//     setError("root", {
//         message: "Something went wrong."
//     });
// }