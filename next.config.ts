import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import ReactComponentName from "react-scan/react-component-name/webpack";

import { env } from "./env.mjs";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	webpack: (config) => {
		config.plugins.push(ReactComponentName({}));
		// Configure webpack to handle worker files
		// config.module.rules.push({
		// 	test: /\.worker\.(js|ts)$/,
		// 	use: {
		// 		loader: "worker-loader",
		// 		options: {
		// 			filename: "static/chunks/[id].worker.[contenthash].js",
		// 			publicPath: "/_next/",
		// 		},
		// 	},
		// });

		// // Also configure for regular worker files
		// config.module.rules.push({
		// 	test: /\.(js|ts)$/,
		// 	include: /workers/,
		// 	use: {
		// 		loader: "worker-loader",
		// 		options: {
		// 			filename: "static/chunks/[id].worker.[contenthash].js",
		// 			publicPath: "/_next/",
		// 		},
		// 	},
		// });
		return config;
	},
};

export default env.ANALYZE
	? withBundleAnalyzer({ enabled: env.ANALYZE })(nextConfig)
	: nextConfig;
