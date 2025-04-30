import { Loader } from "lucide-react";

const LoadingComponent = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center gap-2">
			<Loader size={16} strokeWidth={1.5} className="animate-spin" />
			<span>Loading...</span>
		</div>
	);
};

export default LoadingComponent;
