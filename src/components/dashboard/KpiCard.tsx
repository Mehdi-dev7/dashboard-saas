import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Trend } from "@/types";
import {
	Activity,
	BarChart3,
	Euro,
	TrendingDown,
	TrendingUp,
	Users,
} from "lucide-react";
import * as React from "react";

interface KpiCardProps {
	title: string;
	value: string | number;
	change: number;
	trend: Trend;
	icon: string;
}

// Mapping des icônes courantes
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	Users,
	Euro,
	Activity,
	TrendingUp,
	BarChart3,
	// Add more icons here if needed
};

// Fonction pour obtenir l'icône dynamiquement
function getIcon(
	iconName: string
): React.ComponentType<{ className?: string }> {
	return iconMap[iconName] || BarChart3; // Fallback si l'icône n'existe pas
}

export function KpiCard({ title, value, change, trend, icon }: KpiCardProps) {
	const IconComponent = React.useMemo(() => getIcon(icon), [icon]);

	return (
		<Card className="p-6">
			<CardContent className="p-0 flex flex-col gap-4">
				{/* Icon en haut à gauche */}
				<div className="flex items-start justify-between">
					<div className="rounded-lg bg-primary/10 p-2">
						{React.createElement(IconComponent, {
							className: "size-5 text-primary",
						})}
					</div>
				</div>

				{/* Title */}
				<div className="space-y-1">
					<p className="text-sm text-muted-foreground">{title}</p>

					{/* Value en gros */}
					<p className="text-2xl font-bold">{value}</p>
				</div>

				{/* Badge avec pourcentage de change */}
				<div className="flex items-center gap-1">
					<Badge
						variant={trend === "up" ? "default" : "destructive"}
						className={cn(
							"gap-1",
							trend === "up"
								? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
								: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
						)}
					>
						{trend === "up" ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						<span>{Math.abs(change).toFixed(1)}%</span>
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
}
