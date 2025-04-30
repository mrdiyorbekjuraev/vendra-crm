import httpClient from "@/lib/axios-client";
import { type Field, formHelpers } from "@/utils/form-helper";
import { queryBuilder } from "@/utils/query-builder";
import {
	Form,
	Formik,
	type FormikConfig,
	type FormikHelpers,
	type FormikProps,
	type FormikValues,
} from "formik";
import { isFunction } from "lodash";
import type { JSX, ReactNode } from "react";
import { toast } from "sonner";
import type { Schema } from "zod";

// Define the response type for API calls
export interface ApiResponse<T = unknown | any> {
	data: T;
	status: number;
	message?: string;
}

// Define props for the CustomForm component
export interface CustomFormProps<TFormValues> {
	// Form Configuration
	url: string;
	method: "post" | "put" | "delete" | "patch";
	params?: Record<string, string | number | boolean>;
	customData?: Record<string, unknown>;
	axiosConfig?: Record<string, unknown>;

	// Form Structure
	fields?: Field[];
	initialValues?: Partial<TFormValues>;
	validationSchema?: Schema<TFormValues>;
	isFormData?: boolean;
	validateOnMount?: boolean;

	// Data Processing
	normalizeData?: (values: TFormValues) => TFormValues;
	// Callbacks
	onSubmit?: (
		values: TFormValues,
		formHelper: FormikHelpers<TFormValues>,
	) => void;
	onSuccess?: (data: ApiResponse) => void;
	onError?: (error: Error) => void;
	onFinal?: () => void;
	validate?: (values: TFormValues) => object | Promise<Record<string, string>>;

	// Render Props
	children: (formik: FormikProps<TFormValues>) => ReactNode;
}

export function CustomForm<TFormValues extends Record<string, unknown>>(
	props: CustomFormProps<TFormValues> &
		Omit<
			React.FormHTMLAttributes<HTMLFormElement>,
			keyof CustomFormProps<TFormValues>
		>,
): JSX.Element {
	const {
		// Form Configuration
		url,
		method,
		params,
		customData,
		axiosConfig = {},

		// Form Structure
		fields = [],
		initialValues: propsInitialValues,
		validationSchema: propsValidationSchema,
		isFormData = false,
		validateOnMount = false,

		// Data Processing
		normalizeData,

		// Callbacks
		onSubmit,
		onSuccess = () => {},
		onError = (error: Error) => {
			console.error(error);
		},
		onFinal = () => {},
		validate,

		// Render Props
		children,

		// Other props passed to Form component
		...formProps
	} = props;

	// Generate form schema from fields if not provided directly
	const schemaResult = fields.length
		? formHelpers.createFormSchema(fields)
		: {
				initialValues: propsInitialValues as TFormValues,
				validationSchema: propsValidationSchema,
			};

	// Handle form submission
	const handleSubmit = async (
		values: TFormValues,
		formHelper: FormikHelpers<TFormValues>,
	): Promise<void> => {
		try {
			// Process form values
			const formValues = formHelpers.getFormValues(
				values,
				fields,
				isFormData,
				normalizeData as unknown as
					| ((createdValues: FormikValues) => TFormValues)
					| undefined,
			);

			// Build request URL with params if needed
			const requestUrl = params ? queryBuilder(url, params) : url;

			// Make API request
			const response = await httpClient[method]<ApiResponse>(
				requestUrl,
				{ ...formValues, ...customData },
				axiosConfig,
			);

			// Handle success
			formHelper.resetForm();
			onSuccess(response.data);
		} catch (err: unknown) {
			// Handle error
			const error = err instanceof Error ? err : new Error(String(err));
			toast.error(error.message || "An error occurred");
			onError(error);
		} finally {
			// Always run final callback
			formHelper.setSubmitting(false);
			onFinal();
		}
	};

	// Configure Formik with proper type casting
	const formikConfig: FormikConfig<TFormValues> = {
		initialValues: (schemaResult.initialValues || {}) as TFormValues,
		validationSchema: schemaResult.validationSchema,
		validateOnMount,
		enableReinitialize: true,
		validate,
		onSubmit: (values, formHelper) => {
			isFunction(onSubmit)
				? onSubmit(values, formHelper)
				: handleSubmit(values, formHelper);
		},
	};

	return (
		<Formik<TFormValues> {...formikConfig}>
			{(formik) => <Form {...formProps}>{children(formik)}</Form>}
		</Formik>
	);
}
