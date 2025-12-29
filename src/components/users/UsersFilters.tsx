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
	return (
		<div className="flex flex-col gap-4 sm:flex-row">
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

			{/* Status Filter */}
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
		</div>
	);
}
