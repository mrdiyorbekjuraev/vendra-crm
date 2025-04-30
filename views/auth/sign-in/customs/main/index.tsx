import { motion } from "framer-motion";

import { useUserStore } from "@/stores/auth";
import OwnerForm from "./customs/owner";
import WorkerForm from "./customs/worker";

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
};

const SignInPage = () => {
	const { userData } = useUserStore();
	return (
		<motion.main
			className="w-full flex flex-col items-center justify-center flex-1"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<motion.div
				className="flex flex-col items-center w-[300px] gap-4"
				variants={containerVariants}
			>
				<motion.h2
					className="text-center text-2xl font-semibold"
					variants={itemVariants}
				>
					Sign in
				</motion.h2>

				{userData?.isWorker ? <WorkerForm /> : <OwnerForm />}
			</motion.div>
		</motion.main>
	);
};

export default SignInPage;
