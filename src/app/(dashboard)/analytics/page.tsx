"use client";

import { CombinedChart } from "@/components/analytics/CombinedChart";
import { DateRangeFilter } from "@/components/analytics/DateRangeFilter";
import { GrowthChart } from "@/components/analytics/GrowthChart";
import { RoleDistributionChart } from "@/components/analytics/RoleDistributionChart";
import { chartData, users as mockUsers } from "@/lib/data/mockData";
import { useStore } from "@/lib/store/useStore";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
	const { users, setUsers } = useStore();
	const [selectedRange, setSelectedRange] = useState("1y");

	// Initialize users from mockData on mount if store is empty
	useEffect(() => {
		if (users.length === 0) {
			setUsers(mockUsers);
		}
	}, [users.length, setUsers]);

	return (
		<div className="space-y-6">
			{/* Title */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Analytics Dashboard
				</h1>
				<p className="text-muted-foreground">
					Track your business metrics and insights
				</p>
			</div>

			{/* DateRangeFilter */}
			<div className="flex justify-end">
				<DateRangeFilter
					selectedRange={selectedRange}
					onRangeChange={setSelectedRange}
				/>
			</div>

			{/* CombinedChart - Full width */}
			<CombinedChart data={chartData} />

			{/* Grid 2 colonnes : RoleDistributionChart + GrowthChart */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<RoleDistributionChart users={users} />
				<GrowthChart data={chartData} />
			</div>
		</div>
	);
}
