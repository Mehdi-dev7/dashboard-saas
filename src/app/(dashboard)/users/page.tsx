"use client";

import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/users/Pagination";
import { UserDetailsModal } from "@/components/users/UserDetailsModal";
import { UsersFilters } from "@/components/users/UsersFilters";
import { UsersModal } from "@/components/users/UsersModal";
import { UsersTable } from "@/components/users/UsersTable";
import { users as mockUsers } from "@/lib/data/mockData";
import { useStore } from "@/lib/store/useStore";
import type { User } from "@/types";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function UsersPage() {
	const { users, setUsers, addUser, updateUser, deleteUser } = useStore();
	const [searchQuery, setSearchQuery] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [detailsModalOpen, setDetailsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [viewedUser, setViewedUser] = useState<User | null>(null);

	// Initialize users from mockData on mount if store is empty
	useEffect(() => {
		if (users.length === 0) {
			setUsers(mockUsers);
		}
	}, [users.length, setUsers]);

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

	// Pagination constants
	const ITEMS_PER_PAGE = 10;
	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

	// Paginated users
	const paginatedUsers = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return filteredUsers.slice(startIndex, endIndex);
	}, [filteredUsers, currentPage]);

	// Reset currentPage to 1 when filteredUsers change
	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentPage(1);
		}, 0);
		return () => clearTimeout(timer);
	}, [filteredUsers.length, searchQuery, roleFilter, statusFilter]);

	// Handle add user (open modal in create mode)
	const handleAddUser = () => {
		setSelectedUser(null);
		setModalOpen(true);
	};

	// Handle view user (open details modal)
	const handleViewUser = (user: User) => {
		setViewedUser(user);
		setDetailsModalOpen(true);
	};

	// Handle edit user (open modal in edit mode)
	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		setModalOpen(true);
	};

	// Handle save user (create or update)
	const handleSave = (data: {
		name: string;
		email: string;
		role: User["role"];
		status: User["status"];
	}) => {
		if (selectedUser) {
			// Update existing user
			updateUser(selectedUser.id, data);
		} else {
			// Create new user
			const newUser: User = {
				id: crypto.randomUUID(),
				name: data.name,
				email: data.email,
				role: data.role,
				status: data.status,
				avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
					data.name
				)}`,
				createdAt: new Date(),
			};
			addUser(newUser);
		}
	};

	// Handle delete user with confirmation
	const handleDeleteUser = (id: string) => {
		if (confirm("Are you sure you want to delete this user?")) {
			deleteUser(id);
		}
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

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
				<Button
					onClick={handleAddUser}
					className="w-full sm:w-auto max-[360px]:h-8 max-[360px]:text-sm"
				>
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
				<UsersTable
					users={paginatedUsers}
					onView={handleViewUser}
					onEdit={handleEditUser}
					onDelete={handleDeleteUser}
				/>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}

			{/* UserDetailsModal */}
			<UserDetailsModal
				open={detailsModalOpen}
				onOpenChange={setDetailsModalOpen}
				user={viewedUser}
			/>

			{/* UsersModal */}
			<UsersModal
				open={modalOpen}
				onOpenChange={setModalOpen}
				user={selectedUser}
				onSave={handleSave}
			/>
		</div>
	);
}
