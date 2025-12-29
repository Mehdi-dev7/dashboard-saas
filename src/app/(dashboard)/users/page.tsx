"use client";

import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/UsersTable";
import { users } from "@/lib/data/mockData";
import { Plus } from "lucide-react";

export default function UsersPage() {
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

			{/* UsersTable */}
			<div className="overflow-x-auto -mx-4 px-2 sm:px-4 md:mx-0 md:px-0 max-[360px]:px-1">
				<UsersTable users={users} />
			</div>
		</div>
	);
}
