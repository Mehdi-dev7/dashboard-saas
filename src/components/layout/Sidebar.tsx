"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import {
	BarChart3,
	LayoutDashboard,
	Menu,
	Settings,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
	{
		name: "Home",
		href: "/",
		icon: LayoutDashboard,
	},
	{
		name: "Users",
		href: "/users",
		icon: Users,
	},
	{
		name: "Analytics",
		href: "/analytics",
		icon: BarChart3,
	},
	{
		name: "Settings",
		href: "/settings",
		icon: Settings,
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const { sidebarOpen, toggleSidebar } = useStore();

	return (
		<>
			{/* Overlay pour mobile */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={toggleSidebar}
					aria-hidden="true"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed left-0 top-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-border transition-all duration-300 ease-in-out",
					sidebarOpen
						? "translate-x-0 w-64"
						: "-translate-x-full lg:translate-x-0 lg:w-20"
				)}
			>
				<div className="flex h-full flex-col">
					{/* Header avec logo et bouton toggle */}
					<div className="flex h-16 items-center justify-between border-b border-border px-4">
						<Link
							href="/"
							className={cn(
								"flex items-center gap-2 font-bold text-lg transition-opacity cursor-pointer",
								!sidebarOpen && "opacity-0 lg:opacity-100"
							)}
						>
							<div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								D
							</div>
							{sidebarOpen && (
								<span className="text-foreground">Dashboard</span>
							)}
						</Link>

						<Button
							variant="ghost"
							size="icon"
							onClick={toggleSidebar}
							className="lg:hidden"
							aria-label="Toggle sidebar"
						>
							{sidebarOpen ? (
								<X className="size-5" />
							) : (
								<Menu className="size-5" />
							)}
						</Button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 space-y-1 px-3 py-4">
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							const Icon = item.icon;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
										"hover:bg-accent hover:text-accent-foreground",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground"
									)}
									onClick={() => {
										// Fermer la sidebar sur mobile après clic
										if (window.innerWidth < 1024) {
											toggleSidebar();
										}
									}}
								>
									<Icon
										className={cn(
											"size-5 shrink-0",
											isActive && "text-primary-foreground"
										)}
									/>
									{sidebarOpen && <span className="truncate">{item.name}</span>}
								</Link>
							);
						})}
					</nav>

					{/* Footer optionnel */}
					{sidebarOpen && (
						<div className="border-t border-border p-4">
							<p className="text-xs text-muted-foreground">
								© 2024 Dashboard SaaS
							</p>
						</div>
					)}
				</div>
			</aside>
		</>
	);
}
