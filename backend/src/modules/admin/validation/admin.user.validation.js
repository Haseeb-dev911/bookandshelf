import { z } from "zod";

export const adminUserPaginationSchema = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    role: z.enum(["user", "admin", "support"]).optional(),
    status: z.enum(["active", "banned", "restricted"]).optional(),
    sortBy: z.enum(["newest", "oldest"]).optional(),
});

export const blockUserSchema = z.object({
    reason: z.string().optional(),
});

export const changeRoleSchema = z.object({
    role: z.enum(["user", "admin", "support"]),
});
