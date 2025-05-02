"use client";

import { upload } from "@/lib/axios-client";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MainInput from "@/components/ui/main-input";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  Armchair,
  Laptop,
  ShirtIcon,
  ShoppingBag,
  Sparkles,
  Store,
  Upload,
  Watch,
  Wrench,
} from "lucide-react";

// Types & Schema
import { storeCreateFormSchema } from "../../model";
import {
  type TStoreCreateForm,
  useStoreProfileSetUpFeatures,
} from "./features";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Store types data
const storeTypes = [
  {
    id: "clothing",
    label: "Clothing store",
    icon: <ShirtIcon size={16} strokeWidth={1.5} />,
  },
  {
    id: "shoe",
    label: "Shoe store",
    icon: <ShoppingBag size={16} strokeWidth={1.5} />,
  },
  {
    id: "kanselyarsky",
    label: "Kanselyarsky magazin",
    icon: <Store size={16} strokeWidth={1.5} />,
  },
  {
    id: "construction",
    label: "Construction magazine",
    icon: <Wrench size={16} strokeWidth={1.5} />,
  },
  {
    id: "cosmetics",
    label: "Store cosmetics",
    icon: <Sparkles size={16} strokeWidth={1.5} />,
  },
  {
    id: "accessories",
    label: "Accessories store",
    icon: <Watch size={16} strokeWidth={1.5} />,
  },
  {
    id: "electronics",
    label: "Store electronics",
    icon: <Laptop size={16} strokeWidth={1.5} />,
  },
  {
    id: "household",
    label: "Household goods",
    icon: <Armchair size={16} strokeWidth={1.5} />,
  },
];

const StoreProfileSetup = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { handleStoreCreate } = useStoreProfileSetUpFeatures();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storeForm = useFormik<TStoreCreateForm>({
    initialValues: {
      name: "",
      type: "GROCERY",
      slug: "",
      logoUrl: "",
    },
    validationSchema: toFormikValidationSchema(storeCreateFormSchema),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await handleStoreCreate?.mutateAsync(values);

        toast.success("Store created successfully!");
        push("/");
      } catch (error) {
        toast.error("Failed to create store");
        console.error("Store creation error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await upload.post("/file/upload", formData);

        if (response.data?.url) {
          storeForm.setFieldValue("logoUrl", response.data.url);
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Failed to get image URL");
        }
      } catch (error) {
        toast.error("Failed to upload image");
        console.error("Upload error:", error);
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error in image upload:", err);
      toast.error("Something went wrong");
    }
  };

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
    storeForm.setFieldValue("type", id.toUpperCase());
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.main
      className="flex items-center justify-center min-h-screen py-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="w-full max-w-6xl mx-auto rounded-3xl border overflow-hidden shadow-sm"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2">
          {/* Left Column - Form */}
          <motion.section
            className="p-6 md:p-10 lg:p-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-2xl font-semibold mb-8"
              variants={fadeIn}
            >
              Set up your store profile
            </motion.h1>

            <form onSubmit={storeForm.handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <motion.fieldset variants={fadeIn}>
                <legend className="mb-3">Store Logo</legend>
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="size-20">
                      <AvatarImage
                        src={storeForm.values.logoUrl || ""}
                        alt="Profile picture"
                      />
                      <AvatarFallback className="bg-blue-500 text-white uppercase">
                        {storeForm.values.name ? storeForm.values.name[0] : ""}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={triggerFileInput}
                        disabled={isLoading}
                      >
                        <Upload size={16} aria-hidden="true" />
                        <span>Upload image</span>
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        disabled={!storeForm.values.logoUrl || isLoading}
                        onClick={() => storeForm.setFieldValue("logoUrl", "")}
                      >
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      *.png, *.jpeg files up to 10MB at least 400px by 400px
                    </p>
                  </div>
                </div>
              </motion.fieldset>

              {/* Form Fields */}
              <motion.div className="space-y-4" variants={staggerContainer}>
                <motion.div variants={fadeIn}>
                  <Label htmlFor="name" className="block text-sm mb-2">
                    Store name
                  </Label>
                  <MainInput
                    id="name"
                    type="text"
                    placeholder="Enter store name..."
                    value={storeForm.values.name}
                    onChange={storeForm.handleChange}
                    onBlur={storeForm.handleBlur}
                    aria-label="Store name"
                    required
                    isInvalid={
                      !!storeForm.touched.name && !!storeForm.errors.name
                    }
                    errorMessage={storeForm.errors.name}
                  />
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Label htmlFor="slug" className="block text-sm mb-2">
                    Store handle
                  </Label>
                  <MainInput
                    id="slug"
                    type="text"
                    placeholder="Enter store slug..."
                    value={storeForm.values.slug}
                    onChange={storeForm.handleChange}
                    onBlur={storeForm.handleBlur}
                    aria-label="Store slug"
                    required
                    isInvalid={
                      !!storeForm.touched.slug && !!storeForm.errors.slug
                    }
                    errorMessage={storeForm.errors.slug}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Label htmlFor="storeType" className="block text-sm mb-2">
                  Store Type
                </Label>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                >
                  {storeTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        className={cn(
                          "cursor-pointer py-2 dark:hover:bg-[#eae9e90f] hover:bg-[#cccccc40] transition-all duration-300",
                          selectedType === type.id
                            ? "bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white hover:bg-blue-200 dark:border-blue-600 border-blue-200 dark:hover:bg-blue-700"
                            : ""
                        )}
                        variant="outline"
                        onClick={() => handleTypeSelect(type.id)}
                      >
                        {type.icon}
                        {type.label}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <Separator className="my-2" />

              {/* Continue Button */}
              <motion.div variants={fadeIn}>
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isLoading || !storeForm.isValid || !storeForm.dirty}
                >
                  {isLoading ? "Creating..." : "Continue"}
                </Button>
              </motion.div>
            </form>
          </motion.section>

          {/* Right Column - App Preview */}
          <motion.div
            className="hidden md:block bg-secondary"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-full w-full relative">
              <Image
                src="https://ui.shadcn.com/placeholder.svg"
                fill
                alt="Application preview"
                className="object-cover dark:invert"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default StoreProfileSetup;
