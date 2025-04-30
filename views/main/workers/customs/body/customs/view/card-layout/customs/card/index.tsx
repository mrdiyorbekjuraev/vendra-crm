import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Popover,
	PopoverContent,
	PopoverItem,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
	CalendarIcon,
	EllipsisVertical,
	Link as LinkIcon,
	ShieldAlert,
	ShieldBan,
	Star,
	View,
} from "lucide-react";

interface NoteProps {
	title?: string;
	content: string;
	author: {
		name: string;
		avatarUrl?: string;
		initials: string;
		joinedDate: string;
		bio?: string;
	};
	createdAt: string;
	role: string;
	status: string;
	color: any;
	classNames?: {
		wrapper?: string;
		content?: string;
		footer?: string;
	};
}

const WorkerCard: React.FC<NoteProps> = ({
	title,
	content,
	author,
	createdAt,
	classNames,
	role,
	status,
	color,
}) => {
	return (
		<Card
			className={cn(
				"p-4 gap-1 shadow-xs transition-all duration-200",
				classNames?.wrapper,
			)}
		>
			<div className="flex items-center justify-between">
				<HoverCard>
					<HoverCardTrigger asChild>
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="bg-transparent rounded-[9px] border  cursor-pointer transition-all"
							>
								<div className="flex items-center gap-2">
									<Avatar className="w-4 h-4 rounded-full border">
										{author.avatarUrl ? (
											<AvatarImage
												src={author.avatarUrl}
												alt={author.name}
												className="rounded-md"
											/>
										) : null}
										<AvatarFallback className="rounded-sm text-primary text-[8px]">
											{author.initials}
										</AvatarFallback>
									</Avatar>
									<span className="text-xs font-medium text-primary">
										{author.name}
									</span>
								</div>
							</Badge>
							<Badge color={color} className="capitalize">
								{status}
							</Badge>
						</div>
					</HoverCardTrigger>
					<HoverCardContent className="w-80 dark:bg-sidebar" align="start">
						<div className="flex justify-between space-x-4">
							<Avatar>
								{author.avatarUrl ? (
									<AvatarImage src={author.avatarUrl} alt={author.name} />
								) : null}
								<AvatarFallback>{author.initials}</AvatarFallback>
							</Avatar>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold">{author.name}</h4>
								<p className="text-sm">{author.bio || "No bio available"}</p>
								<div className="flex items-center pt-2">
									<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
									<span className="text-xs text-muted-foreground">
										Joined {author.joinedDate}
									</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
				<Popover>
					<PopoverTrigger
						className="h-5 w-5 outline-0 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
						onClick={(e) => e.stopPropagation()}
						aria-label="Note options"
					>
						<EllipsisVertical className="text-zinc-400 inline" size={14} />
					</PopoverTrigger>
					<PopoverContent
						className="w-fit rounded-[10px] dark:bg-[#232529] shadow-lg border-[0.5px] px-2 py-2"
						side="bottom"
						align="end"
					>
						<PopoverItem className="cursor-pointer ">
							<div className="flex items-center gap-3">
								<Star size={16} strokeWidth={1.5} />
								<div className="text-sm font-medium">Add to favorites</div>
							</div>
						</PopoverItem>
						<PopoverItem className="cursor-pointer ">
							<div className="flex items-center gap-3">
								<View size={16} strokeWidth={1.5} />
								<div className="text-sm font-medium">View</div>
							</div>
						</PopoverItem>
						<PopoverItem className="cursor-pointer ">
							<div className="flex items-center gap-3">
								<ShieldAlert size={16} strokeWidth={1.5} />
								<div className="text-sm font-medium">Inactive</div>
							</div>
						</PopoverItem>
						<Separator orientation="horizontal" className="my-1" />
						<PopoverItem className="cursor-pointer ">
							<div className="flex items-center gap-3">
								<ShieldBan
									size={16}
									strokeWidth={1.5}
									className="text-red-500"
								/>
								<span className="text-sm font-medium text-red-500">
									Block worker
								</span>
							</div>
						</PopoverItem>
					</PopoverContent>
				</Popover>
			</div>
			<h3 className="text-sm font-medium">{title ?? "Untitled note"}</h3>
			<CardContent
				className={cn(
					"text-xs text-muted-foreground  pl-0 min-h-[60px]  line-clamp-3",
					classNames?.wrapper,
				)}
			>
				{content}
			</CardContent>
			<Separator orientation="horizontal" className="mt-auto" />
			<div
				className={cn(
					"flex justify-between items-center text-xs text-gray-400 mt-2",
					classNames?.footer,
				)}
			>
				<div className="flex items-center gap-2">
					<Badge color="blue">{role}</Badge>
				</div>
				<span title={`Created at ${createdAt}`}>{createdAt}</span>
			</div>
		</Card>
	);
};

export default WorkerCard;
