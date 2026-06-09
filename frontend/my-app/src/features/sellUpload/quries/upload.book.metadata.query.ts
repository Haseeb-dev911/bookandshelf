import { useQuery } from "@tanstack/react-query";
import { bookUploadService } from "../service/upload.book.service";

export const BookOldUploadMetaData = () => {
    return useQuery<any>({
        queryKey: ["upload-book-form-metadata"],
        queryFn: bookUploadService.getuploadBookFormMetaData
    });
};