"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";

import { Separator } from "@/components/ui/separator";
import { useRoleModal } from "@/stores/main/roles";
import { Trash, UserCog } from "lucide-react";
import { useRemoveRoleFeatures } from "./features";

export const Remove = () => {
	const { remove, setModal } = useRoleModal();
	const { handleRemoveRole, isPending } = useRemoveRoleFeatures();

	return (
		<Dialog
			open={remove?.open}
			onOpenChange={() => setModal({ remove: { open: false, props: null } })}
		>
			<DialogContent className="sm:max-w-[525px] rounded-[16px] px-0.5 py-0.5 overflow-visible top-[30%]">
				<div className="rounded-[16px] border">
					<DialogHeader className="px-4 py-2.5">
						<DialogTitle>
							<div className="flex items-center gap-3 text-sm">
								<UserCog size={16} className="text-zinc-500" />
								<span>Remove Role</span>
							</div>
						</DialogTitle>
					</DialogHeader>
					<Separator />

					<div className="p-5">
						<p className="text-sm text-muted-foreground">
							Are you sure you want to{" "}
							<span className="text-destructive font-medium">remove</span> this
							role?
							<br />
							This action <span className="font-medium">cannot be undone</span>,
							and users assigned to this role may lose access to certain
							features.
						</p>
					</div>
					<DialogFooter className="overflow-visible py-2 px-4 h-10 border-t flex items-center justify-center">
						<div className="w-full flex items-center justify-between">
							<div className="mr-auto" />
							<div className="flex items-center gap-4">
								<Button
									size="sm"
									variant="outline"
									onClick={() =>
										setModal({ remove: { open: false, props: null } })
									}
								>
									<span>Cancel</span>
									<Kbd>ESC</Kbd>
								</Button>
								<Button
									type="submit"
									size="sm"
									variant={"destructive"}
									disabled={isPending}
									onClick={async () => {
										await handleRemoveRole?.mutateAsync({
											deletedRoleIds: remove?.props?.roleIds as string[],
											skippedRoleIds: [],
										});
									}}
								>
									<span>{isPending ? "Removing..." : "Remove"}</span>
									<Trash />
								</Button>
							</div>
						</div>
					</DialogFooter>
				</div>
			</DialogContent>
			<DialogOverlay className="bg-transparent" />
		</Dialog>
	);
};
