"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { User } from "@/types";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface UserDetailsModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	user: User | null;
}

export function UserDetailsModal({
	open,
	onOpenChange,
	user,
}: UserDetailsModalProps) {
	if (!user) return null;

	const getRoleVariant = (role: User["role"]) => {
		switch (role) {
			case "admin":
				return "default";
			case "manager":
				return "secondary";
			case "user":
				return "outline";
			default:
				return "outline";
		}
	};

	const getRoleColor = (role: User["role"]) => {
		switch (role) {
			case "admin":
				return "";
			case "manager":
				return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
			case "user":
				return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
			default:
				return "";
		}
	};

	const getStatusVariant = (status: User["status"]) => {
		return status === "active" ? "default" : "destructive";
	};

	const getStatusColor = (status: User["status"]) => {
		return status === "active"
			? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
			: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>User Details</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 py-4">
					{/* Avatar and Name */}
					<div className="flex flex-col items-center gap-4">
						<Avatar className="size-24">
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback className="text-2xl">
								{user.name
									.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="text-center">
							<h3 className="text-2xl font-semibold">{user.name}</h3>
							<p className="text-muted-foreground mt-1">{user.email}</p>
						</div>
					</div>

					{/* User Information */}
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Role
								</p>
								<Badge
									variant={getRoleVariant(user.role)}
									className={cn("mt-1", getRoleColor(user.role))}
								>
									{user.role}
								</Badge>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Status
								</p>
								<Badge
									variant={getStatusVariant(user.status)}
									className={cn("mt-1", getStatusColor(user.status))}
								>
									{user.status}
								</Badge>
							</div>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								User ID
							</p>
							<p className="mt-1 text-sm font-mono break-all">{user.id}</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Created At
							</p>
							<p className="mt-1 text-sm">
								{format(new Date(user.createdAt), "PPP", {
									locale: enUS,
								})}
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

