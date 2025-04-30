import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className=" p-6 text-center text-sm text-gray-400">
			<p className="mb-4">
				By proceeding you acknowledge that you have read, understood and agree
				to our{" "}
				<Link href="#" className="text-gray-400 hover:text-white underline">
					Terms and Conditions
				</Link>
				.
			</p>
			<div className="flex justify-center items-center gap-4">
				<span>© 2025 Vendra Limited</span>
				<Link href="#" className="text-gray-400 hover:text-white">
					Privacy Policy
				</Link>
				<Link href="#" className="text-gray-400 hover:text-white">
					Support
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
