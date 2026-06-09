import axios from "axios";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

type typeformError<T> = {
    field: Path<T>,
    message: string
}

export const formatFormHookErrors = <T extends FieldValues>(error: any,
    setError: UseFormSetError<T>) => {
        
    if (axios.isAxiosError(error)) {
        error.response?.data?.errors.forEach((e: typeformError<T>) => {
            setError(e.field, { message: e.message });
        });
    }
};
