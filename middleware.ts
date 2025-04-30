import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Determines the best-matching locale based on the request headers.
 * Uses Negotiator to extract the preferred language from the request headers.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {string | undefined} - The best-matching locale or undefined if no match is found.
 */
function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value;
	});

	const locales = i18n.locales;
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	return matchLocale(languages, locales, i18n.defaultLocale);
}

/**
 * Middleware to handle locale-based redirection.
 * If the requested URL is missing a locale prefix, the user is redirected
 * to the same path with an appropriate locale prefixed.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse | undefined} - A redirect response if necessary, otherwise undefined.
 */
export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
				request.url,
			),
		);
	}
}

/**
 * Configuration for Next.js middleware matcher.
 * Excludes API routes, Next.js static files, images, and the favicon from locale redirection.
 */
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
