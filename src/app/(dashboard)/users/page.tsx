"use client";

import { Button } from "@/components/ui/button";
import { UsersFilters } from "@/components/users/UsersFilters";
import { UsersTable } from "@/components/users/UsersTable";
import { users } from "@/lib/data/mockData";
import type { User } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	// Filter users based on search query, role, and status
	const filteredUsers = users.filter((user: User) => {
		// Search filter (name or email)
		const matchesSearch =
			searchQuery === "" ||
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase());

		// Role filter
		const matchesRole = roleFilter === "all" || user.role === roleFilter;

		// Status filter
		const matchesStatus =
			statusFilter === "all" || user.status === statusFilter;

		return matchesSearch && matchesRole && matchesStatus;
	});

	return (
		<div className="space-y-4 md:space-y-6">
			{/* Header avec title et bouton */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight max-[360px]:text-xl">
						Users Management
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground mt-1 max-[360px]:text-xs">
						Manage your users and their permissions
					</p>
				</div>
				<Button className="w-full sm:w-auto max-[360px]:h-8 max-[360px]:text-sm">
					<Plus className="size-4 max-[360px]:size-3" />
					New User
				</Button>
			</div>

			{/* UsersFilters */}
			<UsersFilters
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				roleFilter={roleFilter}
				onRoleFilterChange={setRoleFilter}
				statusFilter={statusFilter}
				onStatusFilterChange={setStatusFilter}
			/>

			{/* UsersTable */}
			<div className="overflow-x-auto -mx-4 px-2 sm:px-4 md:mx-0 md:px-0 max-[360px]:px-1">
				<UsersTable users={filteredUsers} />
			</div>
		</div>
	);
}
