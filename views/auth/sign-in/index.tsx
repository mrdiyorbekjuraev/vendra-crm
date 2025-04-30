"use client";

import Footer from "./customs/footer";
import Header from "./customs/header";
import Main from "./customs/main";

const SignIn = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			{/* Header */}
			<Header />
			{/* Main */}
			<Main />
			{/* Footer */}
			<Footer />
		</div>
	);
};

export default SignIn;
