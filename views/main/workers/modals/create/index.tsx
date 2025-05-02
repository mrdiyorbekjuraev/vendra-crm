"use client";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MainInput from "@/components/ui/main-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimePicker } from "@/components/ui/time-picker";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useWorkersModal } from "@/stores/main/workers";
import { formatDate } from "@/utils/format-date";
import { FastField, Field, FieldArray, FieldProps, Form, Formik } from "formik";
import {
  Building,
  CalendarIcon,
  CornerDownLeft,
  HelpCircle,
  Lock,
  Maximize2,
  Minimize2,
  Phone,
  PlusCircle,
  ShieldCheck,
  Trash,
  Upload,
  User,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import Footer from "./customs/footer";
import { SingleSelect } from "@/components/ui/single-select";
import { useBranchesCache } from "@/services/main/base";
import { useRolesCache } from "@/services/main/roles";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { WorkerFormValues, workerSchema } from "@/models/main/workers";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { upload } from "@/lib/axios-client";
import { getInitials } from "@/utils/get-initial";
import { useWorkerCreateFeatures } from "./features";

export const CreateWorker = () => {
  const { createWorker, setModal } = useWorkersModal();
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleWorkerCreate, isPending } = useWorkerCreateFeatures();

  const {
    branches: { data: branches },
  } = useBranchesCache();

  const {
    roles: { data: roles },
  } = useRolesCache();

  // Format branch options for the dropdown
  const branchOptions = useMemo(() => {
    return (
      branches?.data?.map((branch) => ({
        label: branch?.name,
        value: branch?.id,
        icon: Building,
      })) || []
    );
  }, [branches]);

  // Format role options for the dropdown
  const roleOptions = useMemo(() => {
    return (
      roles?.data?.data?.map((role) => ({
        label: role?.name,
        value: role?.id,
        icon: ShieldCheck,
      })) || []
    );
  }, [roles]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate file size (max 10MB)
    const file = files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 10) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await upload.post("/file/upload", formData);

      if (response.data?.url) {
        toast.success("Image uploaded successfully");
        setIsUploading(false);
        return response?.data?.url;
      } else {
        toast.error("Failed to get image URL");
      }
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);

      // Reset file input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const initialValues: WorkerFormValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    birthDate: new Date(),
    gender: "MALE",
    address: "",
    description: "",
    branches: [
      {
        branchId: "",
        roleId: "",
      },
    ],
    startTime: "22:22",
    endTime: "21:12",
  };

  const handleClose = () => {
    setModal({ createWorker: false });
  };

  return (
    <Dialog open={createWorker} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          " rounded-[16px] px-0.5 py-0.5 overflow-visible",
          fullWidth
            ? "min-w-[100vw] h-full"
            : "sm:max-w-[825px] lg:max-w-[1200px]"
        )}
      >
        <div className="rounded-[16px] border">
          <DialogHeader className="px-4 py-2.5 relative bg-white-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-md-opacity-10">
            <DialogTitle>
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-zinc-500" />
                <span>Create Worker</span>
              </div>
            </DialogTitle>
            <TooltipWrapper content={fullWidth ? "Minimize" : "Maximize"}>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-10 top-2 size-6 text-xs"
                withAnimation={false}
                onClick={() => setFullWidth(!fullWidth)}
              >
                {fullWidth ? (
                  <Minimize2 size={16} strokeWidth={1.5} />
                ) : (
                  <Maximize2 size={10} strokeWidth={1.5} />
                )}
              </Button>
            </TooltipWrapper>
            {fullWidth && (
              <Button
                size="sm"
                className="bg-[#266DF0] hover:bg-[#1C62E3] text-white absolute right-20 top-1 text-xs animate-pulse"
                withAnimation={false}
              >
                <span>Add worker</span>
                <CornerDownLeft />
              </Button>
            )}
          </DialogHeader>
          <Separator />
          <div
            className={cn(
              // "h-[calc(100vh-100px)] overflow-y-auto ",
              fullWidth && "h-dvh  max-w-[80%]  m-auto"
            )}
          >
            <Formik
              initialValues={initialValues}
              onSubmit={(value) => {
                console.log(value);
                handleWorkerCreate.mutate(value);
              }}
              validationSchema={toFormikValidationSchema(workerSchema)}
              id="worker-form"
            >
              {({ isSubmitting, values, errors}) => {
                console.log(values, errors);
                return (
                  <Form>
                    <div
                      className={cn(
                        "pb-4 space-y-4 h-[calc(100vh-190px)] overflow-y-auto",
                        fullWidth && "h-[calc(100vh-100px)]"
                      )}
                    >
                      <div className="h-15 px-4 flex items-center sticky top-0 z-[1] border-b bg-white-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-md-opacity-10">
                        <Field name="profilePhotoUrl">
                          {({ field, meta, form }: FieldProps) => (
                            <div className="flex items-center gap-2">
                              <Avatar className="size-10">
                                <AvatarImage
                                  src={field?.value}
                                  alt="Profile picture"
                                />
                                <AvatarFallback className="bg-blue-500 text-white uppercase">
                                  {getInitials(
                                    `${values?.firstName} ${values?.lastName}`
                                  )}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-1">
                                  <Typography variant="p" size="md">
                                    Profile Picture
                                  </Typography>
                                  <Typography
                                    variant="p"
                                    size="xs"
                                    type="muted"
                                  >
                                    We only support PNGs, JPEGs and GIFs under
                                    10MB
                                  </Typography>
                                </div>
                                <div className="flex gap-4">
                                  <Button
                                    type="button"
                                    variant="default"
                                    className="flex items-center gap-2"
                                    size="sm"
                                    onClick={triggerFileInput}
                                    disabled={isUploading}
                                  >
                                    <Upload size={16} aria-hidden="true" />
                                    <span>
                                      {isUploading
                                        ? "Uploading..."
                                        : "Upload image"}
                                    </span>
                                  </Button>
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={async (e) => {
                                      const data = await handleImageUpload(e);
                                      form.setFieldValue(
                                        "profilePhotoUrl",
                                        data
                                      );
                                      console.log(data);
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    className="cursor-pointer"
                                    size="sm"
                                    onClick={() =>
                                      form?.setFieldValue(
                                        "profilePhotoUrl",
                                        null
                                      )
                                    }
                                    disabled={!values?.profilePhotoUrl}
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Field>
                      </div>
                      {/* Form fields using FastField as shown above */}
                      <div className="grid grid-cols-2 gap-4 px-4">
                        <FastField name="firstName">
                          {({ field, meta }: FieldProps) => (
                            <div className="grid w-full gap-2">
                              <MainInput
                                id="firstName"
                                label=" First name"
                                type="text"
                                placeholder="Enter worker first name..."
                                {...field}
                                isInvalid={meta.touched && !!meta.error}
                                errorMessage={meta.touched ? meta.error : ""}
                              />
                            </div>
                          )}
                        </FastField>
                        <FastField name="lastName">
                          {({ field, meta }: FieldProps) => (
                            <div className="grid w-full gap-2">
                              <MainInput
                                id="lastName"
                                type="text"
                                label="Last name"
                                placeholder="Enter worker last name..."
                                {...field}
                                isInvalid={meta.touched && !!meta.error}
                                errorMessage={meta.touched ? meta.error : ""}
                              />
                            </div>
                          )}
                        </FastField>
                        <FastField name="phoneNumber">
                          {({ field, meta }: FieldProps) => (
                            <div className="grid w-full gap-2 relative">
                              <MainInput
                                placeholder="+998 XX XXX XX XX"
                                label="Phone Number"
                                classNames={{
                                  input: "pl-8",
                                }}
                                {...field}
                                isInvalid={meta.touched && !!meta.error}
                                errorMessage={meta.touched ? meta.error : ""}
                              />
                              <Phone
                                size={16}
                                strokeWidth={1.5}
                                className="absolute left-2.5 top-11.5 -translate-y-1/2 text-zinc-500"
                              />
                            </div>
                          )}
                        </FastField>
                        <FastField name="password">
                          {({ field, meta }: FieldProps) => (
                            <div className="grid w-full gap-2 relative">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm">
                                  Enter password
                                </Label>
                                <TooltipWrapper
                                  content={"Password should include 8 char"}
                                >
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="size-6 absolute right-0 top-0"
                                    withAnimation={false}
                                  >
                                    <HelpCircle
                                      size={15}
                                      className="text-zinc-500"
                                    />
                                  </Button>
                                </TooltipWrapper>
                              </div>
                              <MainInput
                                id="password"
                                type="password"
                                placeholder="*************"
                                minLength={0}
                                maxLength={8}
                                classNames={{
                                  input: "pl-8",
                                }}
                                {...field}
                                isInvalid={meta.touched && !!meta.error}
                                errorMessage={meta.touched ? meta.error : ""}
                              />
                              <Lock
                                size={16}
                                strokeWidth={1.5}
                                className="absolute left-2.5 top-11.5 -translate-y-1/2 text-zinc-500"
                              />
                            </div>
                          )}
                        </FastField>
                        <FastField name="confirmPassword">
                          {({ field, meta }: FieldProps) => (
                            <div className="grid w-full gap-2 relative">
                              <div className="flex items-center justify-between">
                                <Label
                                  htmlFor="confirmPassword"
                                  className="block text-sm "
                                >
                                  Confirm password
                                </Label>
                                <TooltipWrapper
                                  content={"Enter the password again"}
                                >
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="size-6 absolute right-0 top-0"
                                    withAnimation={false}
                                  >
                                    <HelpCircle
                                      size={15}
                                      className="text-zinc-500"
                                    />
                                  </Button>
                                </TooltipWrapper>
                              </div>
                              <MainInput
                                id="confirmPassword"
                                type="password"
                                placeholder="*************"
                                minLength={0}
                                maxLength={8}
                                classNames={{
                                  input: "pl-8",
                                }}
                                {...field}
                                isInvalid={meta.touched && !!meta.error}
                                errorMessage={meta.touched ? meta.error : ""}
                              />
                              <Lock
                                size={16}
                                strokeWidth={1.5}
                                className="absolute left-2.5 top-11.5 -translate-y-1/2 text-zinc-500"
                              />
                            </div>
                          )}
                        </FastField>
                      </div>
                      <div className="h-15 px-4 flex items-center sticky top-0 z-[2] border-b border-t bg-white-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-md-opacity-10">
                        <Typography variant="h3">Branches and Roles</Typography>
                      </div>
                      <div>
                        <FieldArray name="branches">
                          {({ push, remove }) => {
                            // Get already selected branch-role combinations
                            const selectedCombinations = values.branches.map(
                              (item) => ({
                                branchId: item.branchId,
                                roleId: item.roleId,
                              })
                            );

                            return (
                              <div className="space-y-4 px-4">
                                {values.branches.map((item, index) => {
                                  // Filter out already selected branches and roles for this row
                                  const filteredBranchOptions =
                                    branchOptions.filter((branch) => {
                                      // If this is the current row's selection, show it
                                      if (branch.value === item.branchId)
                                        return true;

                                      // Otherwise, check if it's already selected in other rows
                                      return !selectedCombinations.some(
                                        (combo, i) =>
                                          i !== index &&
                                          combo.branchId === branch.value
                                      );
                                    });

                                  const filteredRoleOptions =
                                    roleOptions.filter((role) => {
                                      // If this is the current row's selection, show it
                                      if (role.value === item.roleId)
                                        return true;

                                      // Filter roles based on current branch selection
                                      if (item.branchId) {
                                        return !selectedCombinations.some(
                                          (combo, i) =>
                                            i !== index &&
                                            combo.branchId === item.branchId &&
                                            combo.roleId === role.value
                                        );
                                      }

                                      return true;
                                    });

                                  return (
                                    <div
                                      key={index}
                                      className="grid grid-cols-2 gap-4 relative"
                                    >
                                      <Field
                                        name={`branches[${index}].branchId`}
                                      >
                                        {({ field, form }: FieldProps) => (
                                          <div className="flex flex-col gap-2">
                                            <Label className="">Branch</Label>
                                            <SingleSelect
                                              options={filteredBranchOptions}
                                              onValueChange={(v) => {
                                                form.setFieldValue(
                                                  `branches[${index}].branchId`,
                                                  v
                                                );
                                                // Reset role when branch changes
                                                form.setFieldValue(
                                                  `branches[${index}].roleId`,
                                                  ""
                                                );
                                              }}
                                              value={field.value}
                                              placeholder="Select a branch"
                                            />
                                          </div>
                                        )}
                                      </Field>

                                      <Field name={`branches[${index}].roleId`}>
                                        {({ field, form }: FieldProps) => (
                                          <div className="flex flex-col gap-2">
                                            <Label>Role</Label>
                                            <SingleSelect
                                              options={filteredRoleOptions}
                                              onValueChange={(v) => {
                                                form.setFieldValue(
                                                  `branches[${index}].roleId`,
                                                  v
                                                );
                                              }}
                                              value={field.value}
                                              placeholder="Select a role"
                                              disabled={!item.branchId}
                                            />
                                          </div>
                                        )}
                                      </Field>
                                      {values.branches.length > 1 && (
                                        <TooltipWrapper content="Remove fields">
                                          <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            withAnimation={false}
                                          >
                                            <Trash size={16} />
                                          </Button>
                                        </TooltipWrapper>
                                      )}
                                    </div>
                                  );
                                })}

                                {/* Add button is only visible if there are available branch-role combinations */}
                                {branchOptions?.length >
                                  values?.branches?.length && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-2"
                                    onClick={() =>
                                      push({ branchId: "", roleId: "" })
                                    }
                                    withAnimation={false}
                                  >
                                    <PlusCircle className="mr-2" /> Add Branch &
                                    Role
                                  </Button>
                                )}
                              </div>
                            );
                          }}
                        </FieldArray>
                      </div>
                      <div className="h-15  px-4 flex items-center sticky top-0 z-[3] border-b border-t bg-white-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-md-opacity-10">
                        <Typography variant="h3">
                          Additional information
                        </Typography>
                      </div>
                      <div className="grid grid-cols-2 gap-4 px-4">
                        <FastField name="birthDate">
                          {({ field, meta, form }: FieldProps) => (
                            <div>
                              <Label
                                htmlFor="birthDate"
                                className="block text-sm mb-2"
                              >
                                Birthdate
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field?.value && "text-muted-foreground"
                                    )}
                                    withAnimation={false}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field?.value ? (
                                      formatDate(field?.value, "en")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field?.value}
                                    onSelect={(e) => {
                                      form?.setFieldValue("birthDate", e);
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          )}
                        </FastField>
                        <FastField name="gender">
                          {({ field, meta, form }: FieldProps) => (
                            <div>
                              <Label
                                htmlFor="gender"
                                className="block text-sm mb-2 w-full"
                              >
                                Gender
                              </Label>
                              <Tabs
                                defaultValue={field?.value}
                                className="w-full"
                                value={field?.value}
                                onSelect={(e) => console.log(e)}
                              >
                                <TabsList className="w-full">
                                  <TabsTrigger
                                    value="MALE"
                                    onClick={() =>
                                      form.setFieldValue("gender", "MALE")
                                    }
                                  >
                                    Male
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="FEMALE"
                                    onClick={() =>
                                      form.setFieldValue("gender", "FEMALE")
                                    }
                                  >
                                    Female
                                  </TabsTrigger>
                                </TabsList>
                              </Tabs>
                            </div>
                          )}
                        </FastField>
                        <FastField name="address">
                          {({ field, meta, form }: FieldProps) => (
                            <div className="grid w-full gap-2">
                              <Label
                                htmlFor="address"
                                className="block text-sm"
                              >
                                Location
                              </Label>
                              <MainInput
                                id="address"
                                type="text"
                                placeholder="Enter worker location..."
                                {...field}
                                isInvalid={meta.touched && !!meta.error}
                                errorMessage={meta.touched ? meta.error : ""}
                              />
                            </div>
                          )}
                        </FastField>
                        <div className="flex items-center justify-between">
                          <FastField name="startTime">
                            {({ field, meta, form }: FieldProps) => (
                              <div className="grid w-full gap-2">
                                <Label>Start Time</Label>
                                <TimePicker
                                  value={field?.value}
                                  onChange={(e) => {
                                    form?.setFieldValue("startTime", e);
                                  }}
                                />
                              </div>
                            )}
                          </FastField>
                          <FastField name="endTime">
                            {({ field, form }: FieldProps) => (
                              <div className="grid w-full gap-2">
                                <Label>End Time</Label>
                                <TimePicker
                                  value={field?.value}
                                  onChange={(e) => {
                                    console.log(e);
                                    form?.setFieldValue("endTime", e);
                                  }}
                                />
                              </div>
                            )}
                          </FastField>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 px-4">
                        <FastField name="description">
                          {({ field, meta }: FieldProps) => (
                            <div className="grid w-full gap-2">
                              <Label
                                htmlFor="description"
                                className="block text-sm"
                              >
                                Description (optional)
                              </Label>
                              <Textarea
                                id="description"
                                placeholder="Enter worker first name..."
                                {...field}
                              />
                            </div>
                          )}
                        </FastField>
                      </div>
                    </div>
                    {<Footer />}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </DialogContent>
      <DialogOverlay className="bg-transparent" />
    </Dialog>
  );
};
