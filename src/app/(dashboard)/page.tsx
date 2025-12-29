import { KpiCard } from "@/components/dashboard/KpiCard";
import { kpis } from "@/lib/data/mockData";

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			{/* Title */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Dashboard Overview
				</h1>
				<p className="text-muted-foreground">
					Bienvenue sur votre tableau de bord
				</p>
			</div>

			{/* Grid des KPI cards */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{kpis.map((kpi) => (
					<KpiCard
						key={kpi.title}
						title={kpi.title}
						value={kpi.value}
						change={kpi.change}
						trend={kpi.trend}
						icon={kpi.icon}
					/>
				))}
			</div>
		</div>
	);
}
