import { get, isBoolean, isFunction } from "lodash";
import { z } from "zod";

interface FieldValidation {
	type: string;
	params?: string | string[];
}

export interface Field {
	name: string;
	value?: unknown;
	validationType?:
		| "string"
		| "number"
		| "boolean"
		| "date"
		| "object"
		| "array";
	validations?: FieldValidation[];
	lazy?: (validator: z.ZodTypeAny, zod: typeof z) => z.ZodTypeAny;
	isLanguageSchema?: boolean;
	onSubmitValue?: (value: unknown, values: FormValues) => unknown;
	disabled?: boolean;
}

interface FormValues {
	[key: string]: unknown;
}

/**
 * Creates a Zod schema for a field based on its validation rules
 */
const createZodSchema = (field: Field, languages: string[]): z.ZodTypeAny => {
	const {
		validationType = "string",
		validations = [],
		lazy,
		isLanguageSchema,
	} = field;

	let validator: z.ZodTypeAny;

	// Initialize the validator based on the validationType
	switch (validationType) {
		case "string":
			validator = z.string();
			break;
		case "number":
			validator = z.number();
			break;
		case "boolean":
			validator = z.boolean();
			break;
		case "date":
			validator = z.date();
			break;
		case "object":
			validator = z.object({});
			break;
		case "array":
			validator = z.array(z.unknown());
			break;
		default:
			validator = z.string();
	}

	// Apply validations
	for (const { type, params } of validations) {
		switch (type) {
			case "required": {
				if (validationType === "string") {
					validator = (validator as z.ZodString).min(
						1,
						params ? String(params) : "Вы должны заполнить это поле!",
					);
				} else {
					validator = validator.refine(
						(val) => val !== undefined && val !== null,
						{
							message: params
								? String(params)
								: "Вы должны заполнить это поле!",
						},
					);
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	// Apply custom lazy function
	if (isFunction(lazy)) {
		validator = lazy(validator, z);
	}

	// Handle language schema
	if (isBoolean(isLanguageSchema) && isLanguageSchema) {
		const languageSchema: Record<string, z.ZodTypeAny> = {}; // Changed from ZodString to ZodTypeAny
		for (const lang of languages) {
			languageSchema[lang] = z.string().optional();
		}
		validator = z.object(languageSchema);
	}

	return validator;
};

/**
 * Creates a form schema with initial values and validation schema
 */
export const createFormSchema = (fields: Field[]) => {
	const initialValues: FormValues = {};
	const validationSchema: Record<string, z.ZodTypeAny> = {};

	for (const item of fields) {
		if ("value" in item && item.value !== undefined) {
			initialValues[item.name] = item.value;
		} else {
			initialValues[item.name] = "";
		}

		validationSchema[item.name] = createZodSchema(item, ["uz", "en", "ru"]);
	}

	return {
		initialValues,
		validationSchema: z.object(validationSchema),
	};
};

/**
 * Maps form values according to field configuration
 */
const mapFormValues = (values: FormValues, fields: Field[]): FormValues => {
	const formValues: FormValues = {};

	for (const field of fields) {
		if (isFunction(field.onSubmitValue)) {
			formValues[field.name] = field.onSubmitValue(values[field.name], values);
		} else {
			formValues[field.name] = values[field.name];
		}

		if (field.disabled) {
			delete formValues[field.name];
		}
	}

	return formValues;
};

/**
 * Gets processed form values ready for submission
 */
const getFormValues = (
	values: FormValues,
	fields: Field[],
	isFormData: boolean,
	normalizeData?: (createdValues: FormValues) => FormValues,
): FormValues | FormData => {
	const createdValues = mapFormValues(values, fields);
	let formValues: FormValues | FormData = isFormData
		? serialize(createdValues)
		: createdValues;

	if (isFunction(normalizeData)) {
		formValues = normalizeData(createdValues);
	}

	return formValues;
};

/**
 * Gets error message from API response
 */
const getErrorMessage = (error: unknown): string => {
	if (typeof error !== "object" || error === null) {
		return "Unknown error";
	}

	const errorObj = error as Record<string, any>;

	const defaultMessage = get(errorObj, "response.data.error.message");
	const customMessage = get(
		Object.values(get(errorObj, "response.data.message", {})),
		"0",
	);

	return customMessage || defaultMessage || "An error occurred";
};

// External function declaration (implementation assumed to be provided elsewhere)
declare const serialize: (data: FormValues) => FormData;

export const formHelpers = {
	createFormSchema,
	getErrorMessage,
	getFormValues,
};
