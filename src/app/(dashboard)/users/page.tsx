"use client";

import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/UsersTable";
import { users } from "@/lib/data/mockData";
import { Plus } from "lucide-react";

export default function UsersPage() {
	return (
		<div className="space-y-6">
			{/* Header avec title et bouton */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Users Management
					</h1>
					<p className="text-muted-foreground">
						Manage your users and their permissions
					</p>
				</div>
				<Button>
					<Plus className="size-4" />
					New User
				</Button>
			</div>

			{/* UsersTable */}
			<UsersTable users={users} />
		</div>
	);
}
