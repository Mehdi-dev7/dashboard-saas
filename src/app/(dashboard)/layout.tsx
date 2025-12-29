"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { sidebarOpen } = useStore();

	return (
		<div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
			{/* Sidebar fixe à gauche */}
			<Sidebar />

			{/* Main content à droite */}
			<main
				className={cn(
					"flex-1 flex flex-col transition-all duration-300 ease-in-out",
					// Padding left selon l'état de la sidebar
					sidebarOpen
						? "lg:pl-64" // w-64 = 256px = 16rem = 64 * 0.25rem
						: "lg:pl-20" // w-20 = 80px = 5rem = 20 * 0.25rem
				)}
			>
				{/* Topbar sticky en haut */}
				<Topbar />

				{/* Contenu des pages */}
				<div className="flex-1 p-4 lg:p-6">{children}</div>
			</main>
		</div>
	);
}
