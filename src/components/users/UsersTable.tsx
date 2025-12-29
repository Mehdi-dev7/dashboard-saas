"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Edit, Eye, Trash } from "lucide-react";

interface UsersTableProps {
	users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
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
				return ""; // Use the default variant
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
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-10 sm:w-12 max-[360px]:w-8">Avatar</TableHead>
						<TableHead className="min-w-[140px] max-[360px]:min-w-[100px]">Name</TableHead>
						<TableHead className="hidden md:table-cell">Email</TableHead>
						<TableHead className="hidden sm:table-cell">Role</TableHead>
						<TableHead className="hidden lg:table-cell">Status</TableHead>
						<TableHead className="hidden lg:table-cell">Created</TableHead>
						<TableHead className="text-right w-20 sm:w-24 max-[360px]:w-16">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-center text-muted-foreground"
							>
								No users found
							</TableCell>
						</TableRow>
					) : (
						users.map((user) => (
							<TableRow key={user.id} className="hover:bg-muted/50">
								<TableCell className="w-10 sm:w-12 max-[360px]:w-8 p-2 sm:p-4 max-[360px]:p-1">
									<Avatar className="size-8 sm:size-10 max-[360px]:size-6">
										<AvatarImage
											src={user.avatar}
											alt={user.name}
											className="size-8 sm:size-10 max-[360px]:size-6"
										/>
										<AvatarFallback className="text-xs max-[360px]:text-[10px]">
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell className="font-medium min-w-[140px] max-[360px]:min-w-[100px] p-2 sm:p-4 max-[360px]:p-1.5">
									<div className="flex flex-col gap-0.5">
										<span className="text-sm sm:text-base truncate max-[360px]:text-xs max-[360px]:max-w-[120px]">
											{user.name}
										</span>
										<span className="text-xs text-muted-foreground md:hidden max-[360px]:text-[10px] max-[360px]:max-w-[120px] max-[360px]:truncate">
											{user.email}
										</span>
									</div>
								</TableCell>
								<TableCell className="hidden md:table-cell text-muted-foreground">
									{user.email}
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									<Badge
										variant={getRoleVariant(user.role)}
										className={cn(getRoleColor(user.role))}
									>
										{user.role}
									</Badge>
								</TableCell>
								<TableCell className="hidden lg:table-cell">
									<Badge
										variant={getStatusVariant(user.status)}
										className={cn(getStatusColor(user.status))}
									>
										{user.status}
									</Badge>
								</TableCell>
								<TableCell className="hidden lg:table-cell">
									{format(new Date(user.createdAt), "MMM dd, yyyy", {
										locale: enUS,
									})}
								</TableCell>
								<TableCell className="text-right w-20 sm:w-24 max-[360px]:w-16 p-1 sm:p-2 max-[360px]:p-0.5">
									<div className="flex items-center justify-end gap-1 sm:gap-2 max-[360px]:gap-0.5">
										<Button
											variant="ghost"
											size="icon"
											className="size-8 max-[360px]:size-6"
											aria-label="View"
											title="View details"
										>
											<Eye className="size-4 max-[360px]:size-3" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="size-8 max-[360px]:size-6"
											aria-label="Edit"
											title="Edit user"
										>
											<Edit className="size-4 max-[360px]:size-3" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="size-8 max-[360px]:size-6 text-destructive hover:text-destructive"
											aria-label="Delete"
											title="Delete user"
										>
											<Trash className="size-4 max-[360px]:size-3" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
