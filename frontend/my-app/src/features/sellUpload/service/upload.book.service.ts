import { api } from "@/services/apiClient";


const endpoints = {
    getbookUploadSignature: "/old-book/upload-signature",
    postAssetRecordSignature: "/old-book/upload-signature/queue",
    getUploadBookMetadata: "/old-book/add-book/metadata",
    addBook: "/old-book/add-book"
};

export const bookUploadService = {
    getUploadSignature: async () => {
        const response = await api.get(endpoints.getbookUploadSignature);
        return response.data;
    },

    uploadCloudinaryViaSignature: async (cloudName: string,
        formData: FormData,
        resourceType: string) => {
        const response = await api.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            formData,
            { withCredentials: false }
        );
        return response.data;
    },

    getuploadBookFormMetaData: async () => {
        const response = await api.get(endpoints.getUploadBookMetadata);
        return response.data;
    },

    createAssetRecordSignature: async (public_id: string,
        resource_type: string) => {

        await api.post(endpoints.postAssetRecordSignature, { public_id, resource_type });
    },

    addBook: async (data: any) => {
        const response = await api.post(endpoints.addBook, data);
        return response.data;
    }
};