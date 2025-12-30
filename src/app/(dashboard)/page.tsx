import PageTransition from "@/components/common/PageTransition";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UsersChart } from "@/components/dashboard/UsersChart";
import { activities, chartData, kpis } from "@/lib/data/mockData";

export default function DashboardPage() {
	return (
		<PageTransition>
			<div className="space-y-6">
				{/* Title */}
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Dashboard Overview
					</h1>
					<p className="text-muted-foreground">Welcome to your dashboard</p>
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

				{/* 2 colonnes : RevenueChart + UsersChart */}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<RevenueChart data={chartData} />
					<UsersChart data={chartData} />
				</div>

				{/* ActivityFeed en dessous */}
				<ActivityFeed activities={activities} />
			</div>
		</PageTransition>
	);
}
