"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface UsersFiltersProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	roleFilter: string;
	onRoleFilterChange: (value: string) => void;
	statusFilter: string;
	onStatusFilterChange: (value: string) => void;
}

export function UsersFilters({
	searchQuery,
	onSearchChange,
	roleFilter,
	onRoleFilterChange,
	statusFilter,
	onStatusFilterChange,
}: UsersFiltersProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Necessary to avoid hydration errors with Radix UI Select
		// Pattern recommandé pour les composants qui génèrent des IDs aléatoires
		const timer = setTimeout(() => {
			setMounted(true);
		}, 0);
		return () => clearTimeout(timer);
	}, []);

	const getRoleLabel = (value: string) => {
		switch (value) {
			case "all":
				return "All roles";
			case "admin":
				return "Admin";
			case "manager":
				return "Manager";
			case "user":
				return "User";
			default:
				return "All roles";
		}
	};

	const getStatusLabel = (value: string) => {
		switch (value) {
			case "all":
				return "All status";
			case "active":
				return "Active";
			case "inactive":
				return "Inactive";
			default:
				return "All status";
		}
	};

	return (
		<div
			className="flex flex-col gap-4 sm:flex-row"
			suppressHydrationWarning
		>
			{/* Search Input */}
			<div className="relative w-full sm:w-[350px]">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
				<Input
					type="search"
					placeholder="Search by name or email..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="pl-9 w-full"
				/>
			</div>

			{/* Role Filter */}
			{mounted ? (
				<Select value={roleFilter} onValueChange={onRoleFilterChange}>
					<SelectTrigger className="w-full sm:w-[140px]">
						<SelectValue placeholder="All roles" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All roles</SelectItem>
						<SelectItem value="admin">Admin</SelectItem>
						<SelectItem value="manager">Manager</SelectItem>
						<SelectItem value="user">User</SelectItem>
					</SelectContent>
				</Select>
			) : (
				<div className="h-9 w-full sm:w-[140px] rounded-md border bg-transparent px-3 py-2 text-sm flex items-center">
					{getRoleLabel(roleFilter)}
				</div>
			)}

			{/* Status Filter */}
			{mounted ? (
				<Select value={statusFilter} onValueChange={onStatusFilterChange}>
					<SelectTrigger className="w-full sm:w-[140px]">
						<SelectValue placeholder="All status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All status</SelectItem>
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="inactive">Inactive</SelectItem>
					</SelectContent>
				</Select>
			) : (
				<div className="h-9 w-full sm:w-[140px] rounded-md border bg-transparent px-3 py-2 text-sm flex items-center">
					{getStatusLabel(statusFilter)}
				</div>
			)}
		</div>
	);
}
