import { z } from "zod";

export const phoneSchema = z.object({
	phoneNumber: z
	  .string()
	  .trim()
	  .regex(
		/^\+998\d{9}$/,
		'Phone number must be a valid  in the format +998XXXXXXXXX'
	  ),
  });

export const codeSchema = z.object({
	code: z
		.string()
		.min(6, "Code must be at least 6 characters")
		.max(8, "Code is too long"),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;
export type CodeFormValues = z.infer<typeof codeSchema>;

//user profile
export const userProfileSchema = z.object({
	firstName: z
		.string()
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name cannot exceed 50 characters"),

	lastName: z
		.string()
		.min(2, "Last name must be at least 2 characters")
		.max(50, "Last name cannot exceed 50 characters"),

	profilePhotoUrl: z
		.string()
		.url("Please enter a valid URL for the profile photo")
		.or(z.literal("")), // Allow empty string as valid input
});

// You can use this type in your component
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export const storeCreateFormSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	type: z.string().min(1, { message: "Type is required" }),
	slug: z.string().min(1, { message: "Slug is required" }),
	logoUrl: z.string().url({ message: "Logo URL must be a valid URL" }),
});

export type TStoreCreateForm = z.infer<typeof storeCreateFormSchema>;
