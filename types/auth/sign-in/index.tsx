export type TData = {
	code: string;
	message: string;
	success: boolean;
	errorCode?: string;
	statusCode: number;
	data: {
		needRegistration?: boolean;
		tokens: {
			accessToken?: string;
			refreshToken?: string;
		};
	};
};
