import { z } from 'zod';

export interface AvatarFormInputs {
  profileImage: File | null;
}


export const detailsSettingFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name must be 50 characters or less.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(500, { message: 'Description cannot exceed 500 characters.' }),
  city: z
    .string()
    .min(1, { message: 'City is required.' }),
});

export type DetailsFormInputs = z.infer<typeof detailsSettingFormSchema>;


export const passwordSettingFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required.' }),
    newPassword: z
      .string()
      .min(8, { message: 'New password must be at least 8 characters long.' })
      .regex(/[A-Z]/, { message: 'New password must contain at least one uppercase letter.' })
      .regex(/[a-z]/, { message: 'New password must contain at least one lowercase letter.' })
      .regex(/[0-9]/, { message: 'New password must contain at least one number.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your new password.' }),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Your new password cannot be the same as your current password.',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type PasswordSettingFormInputs = z.infer<typeof passwordSettingFormSchema>;