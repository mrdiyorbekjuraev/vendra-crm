"use client";

import {
  ArrowDownLeft,
  MoreHorizontal,
  MoreVerticalIcon,
  Plus,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useBranchesCache } from "@/services/main/base";
import { useBranchesModal } from "@/stores/generic/branch";
import { useCurrentBranch } from "@/stores/main/current-branch";
import { useEffect, useState } from "react";
import Loading from "./loading";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GenericAvatar } from "@/components/ui/generic-avatar";
import { getInitials } from "@/utils/get-initial";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";

export function Branches() {
  const lang = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true);
  const { isMobile } = useSidebar();
  const { setModal } = useBranchesModal();
  const { setCurrentBranch, currentBranch } = useCurrentBranch();
  const {
    branches: { data: branches, isLoading },
  } = useBranchesCache();

  useEffect(() => {
    const firstStore = branches?.data?.[0];
    if (!currentBranch && firstStore) {
      setCurrentBranch(firstStore);
    }
    if (branches?.data.length === 0) {
      setCurrentBranch(null);
    }
  }, [setCurrentBranch, branches, currentBranch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover defaultOpen open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-white dark:bg-zinc-700 shadow-md cursor-pointer relative"
            >
              <GenericAvatar
                fallbackClassName="rounded-lg"
                className="h-8 w-8 rounded-lg grayscale"
                src=""
                fallbackText={getInitials(String(currentBranch?.name), 1)}
                variant="warning"
                alt="Branch avatar"
				
                status={"online"}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {currentBranch?.name ?? "Branch name here"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {currentBranch?.address ?? "Branch address here"}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            className="rounded-[16px] px-0.5 py-1 w-[247px] ml-1 gap-0.5 bg-sidebar"
            side={isMobile ? "bottom" : "top"}
            align="end"
            sideOffset={4}
          >
            <div className="flex items-center justify-between px-2">
              <span className="text-sm">
                Branches ({branches?.data?.length ?? 0})
              </span>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-5 dark:hover:bg-zinc-500/20 rounded-sm"
                  onClick={() => router?.push(`/${lang}/settings/stores`)}
                >
                  <Settings size={16} className="text-zinc-500" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-5 dark:hover:bg-zinc-500/20 rounded-sm"
                  onClick={() => setOpen(false)}
                >
                  <ArrowDownLeft
                    size={16}
                    strokeWidth={1.5}
                    className="text-zinc-500"
                  />
                </Button>
              </div>
            </div>
            <Separator className="my-1" />
            {branches?.data?.map((el) => (
              <PopoverItem
                key={el?.id}
                className={cn("cursor-pointer rounded-[9px]")}
                onClick={() => {
                  if (el?.id !== currentBranch?.id) {
                    setCurrentBranch(el);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <GenericAvatar
                    fallbackClassName="rounded-lg"
                    className="h-8 w-8 rounded-lg "
                    src=""
                    fallbackText={getInitials(el?.name, 1)}
                    variant="warning"
                    alt="Branch avatar"
                    status={currentBranch?.id === el?.id ? "online" : "offline"}
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{el?.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs text-muted-foreground">
                        {el?.address}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverItem>
            ))}
            {currentBranch?.id && <Separator className="my-1" />}
            <PopoverItem
              className="px-4 cursor-pointer rounded-[9px]"
              onClick={() => setModal({ createBranch: true })}
            >
              <div className="flex items-center gap-1">
                <Plus /> <span className="pl-2">Create new branch</span>
              </div>
            </PopoverItem>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
