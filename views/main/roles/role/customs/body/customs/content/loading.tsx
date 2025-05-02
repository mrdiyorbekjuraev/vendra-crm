import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="w-[200px] h-8" />
      </div>
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
      <Skeleton className="w-full h-15" />
    </div>
  );
};

export default Loading;
