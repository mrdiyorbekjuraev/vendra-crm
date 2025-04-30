import { z } from "zod";

export const roleSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters" })
		.max(120, { message: "Name must be 120 characters or fewer" }),

	description: z.string().optional(),
	status: z.string().optional(),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
