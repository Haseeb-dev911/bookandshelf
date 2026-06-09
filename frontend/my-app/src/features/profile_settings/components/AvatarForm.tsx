// import { useEffect, useState } from "react";

// import type { AvatarFormInputs } from "../types/profile.types";

// import { Button } from "@/shared/components/Button.component";

// interface AvatarFormProps {
//     initialAvatarUrl?: string | null;
//     onSubmit: (data: AvatarFormInputs) => Promise<void> | void;
// }

// function AvatarForm() {
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null
//     );

//     const [file, setFile] = useState<File | null>(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         return () => {
//             if (previewUrl?.startsWith("blob:")) {
//                 URL.revokeObjectURL(previewUrl);
//             }
//         };
//     }, [previewUrl]);

//     const handleAvatarSubmit = async (data: AvatarFormInputs) => {
//         try {
//             console.log("Avatar Data:", data);

//             // Example backend call
//             // await updateAvatar(data);
//         } catch (error: any) {
//             console.log(error);

//         }
//     };

//     const handleFileChange = (
//         event: React.ChangeEvent<HTMLInputElement>
//     ) => {
//         const selectedFile = event.target.files?.[0];

//         if (!selectedFile) return;

//         const objectUrl = URL.createObjectURL(selectedFile);

//         setFile(selectedFile);
//         setPreviewUrl(objectUrl);
//     };

//     const handleSubmit = async () => {
//         try {
//             setIsSubmitting(true);

//             await onSubmit({
//                 profileImage: file,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             setIsSubmitting(true);

//             setFile(null);
//             setPreviewUrl(null);

//             await onSubmit({
//                 profileImage: null,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="flex items-center gap-6">
//             <div className="h-28 w-28 overflow-hidden rounded-full border">
//                 {previewUrl ? (
//                     <img
//                         src={previewUrl}
//                         alt="Profile"
//                         className="h-full w-full object-cover"
//                     />
//                 ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl">
//                         👤
//                     </div>
//                 )}
//             </div>

//             <div className="flex flex-col gap-3">
//                 <label className="cursor-pointer">
//                     <span className="inline-block rounded-md bg-black px-4 py-2 text-white">
//                         Change Picture
//                     </span>

//                     <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleFileChange}
//                     />
//                 </label>

//                 {file && (
//                     <Button ButtonType="button" disabled={isSubmitting}>
//                         <span onClick={handleSubmit}>Save Picture</span>
//                     </Button>
//                 )}

//                 {previewUrl && (
//                     <Button ButtonType="button" disabled={isSubmitting}>
//                         <span onClick={handleSubmit}>Delete Picture</span>
//                     </Button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AvatarForm;