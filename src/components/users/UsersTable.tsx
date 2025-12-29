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
						<TableHead>Avatar</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Created</TableHead>
						<TableHead className="text-right">Actions</TableHead>
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
								<TableCell>
									<Avatar className="size-10">
										<AvatarImage
											src={user.avatar}
											alt={user.name}
											className="size-10"
										/>
										<AvatarFallback>
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell className="font-medium">{user.name}</TableCell>
								<TableCell className="text-muted-foreground">
									{user.email}
								</TableCell>
								<TableCell>
									<Badge
										variant={getRoleVariant(user.role)}
										className={cn(getRoleColor(user.role))}
									>
										{user.role}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										variant={getStatusVariant(user.status)}
										className={cn(getStatusColor(user.status))}
									>
										{user.status}
									</Badge>
								</TableCell>
								<TableCell>
									{format(new Date(user.createdAt), "MMM dd, yyyy", {
										locale: enUS,
									})}
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="size-8"
											aria-label="View"
											title="View details"
										>
											<Eye className="size-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="size-8"
											aria-label="Edit"
											title="Edit user"
										>
											<Edit className="size-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="size-8 text-destructive hover:text-destructive"
											aria-label="Delete"
											title="Delete user"
										>
											<Trash className="size-4" />
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
