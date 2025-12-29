"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store/useStore";
import {
	Bell,
	LogOut,
	Menu,
	Moon,
	Search,
	Settings,
	Sun,
	User,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";

export function Topbar() {
	const { toggleSidebar, darkMode, toggleDarkMode, sidebarOpen } = useStore();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Necessary to avoid hydration errors with Radix UI DropdownMenu
		// Pattern recommandé pour les composants qui génèrent des IDs aléatoires
		const timer = setTimeout(() => {
			setMounted(true);
		}, 0);
		return () => clearTimeout(timer);
	}, []);

	return (
		<header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm">
			<div className="flex h-16 items-center gap-4 px-4 lg:px-6">
				{/* Bouton hamburger pour toggle sidebar (visible sur mobile et desktop) */}
				<Button
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
					className="flex lg:flex"
					aria-label="Toggle sidebar"
				>
					{sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
				</Button>

				{/* Search bar au centre (masquée sur mobile) */}
				<div className="relative hidden md:flex flex-1 max-w-md mx-auto">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input
						type="search"
						placeholder="Search..."
						className="pl-9 w-full"
					/>
				</div>

				{/* Actions à droite */}
				<div className="ml-auto flex items-center gap-2">
					{/* Toggle dark mode */}
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleDarkMode}
						aria-label="Toggle dark mode"
					>
						{darkMode ? (
							<Sun className="size-5" />
						) : (
							<Moon className="size-5" />
						)}
					</Button>

					{/* Notifications avec badge */}
					<Button
						variant="ghost"
						size="icon"
						className="relative"
						aria-label="Notifications"
					>
						<Bell className="size-5" />
						<Badge
							variant="destructive"
							className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs"
						>
							3
						</Badge>
					</Button>

					{/* Avatar avec dropdown menu */}
					<div suppressHydrationWarning>
						{mounted ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative size-9 rounded-full"
										aria-label="User menu"
									>
										<Avatar className="size-9">
											<AvatarImage
												src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
												alt="Avatar"
											/>
											<AvatarFallback>AD</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<DropdownMenuLabel>
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												Admin User
											</p>
											<p className="text-xs leading-none text-muted-foreground">
												admin@example.com
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<User className="mr-2 size-4" />
										<span>Profile</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Settings className="mr-2 size-4" />
										<span>Settings</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="text-destructive focus:text-destructive">
										<LogOut className="mr-2 size-4" />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button
								variant="ghost"
								className="relative size-9 rounded-full"
								aria-label="User menu"
							>
								<Avatar className="size-9">
									<AvatarImage
										src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
										alt="Avatar"
									/>
									<AvatarFallback>AD</AvatarFallback>
								</Avatar>
							</Button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
