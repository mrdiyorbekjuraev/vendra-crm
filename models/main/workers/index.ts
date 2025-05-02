import { z } from "zod";

export const workerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(7, "Phone number is too short"),
  password: z.string().min(6, "Password must be at least 8 characters"),
  // confirmPassword: z.string().min(6, "Password must be at least 8 characters"),
  branches: z.array(
    z.object({
      branchId: z.string().min(1, "Branch ID is required"),
      roleId: z.string().min(1, "Role ID is required"),
    })
  ),
  gender: z.enum(["MALE", "FEMALE"]),
  address: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  profilePhotoUrl: z.string().url("Invalid profile photo URL").optional(),
  birthDate: z.date().optional(),
  description: z.string().optional(),
});

export type WorkerFormValues = z.infer<typeof workerSchema>;
