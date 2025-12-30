"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface RoleDistributionChartProps {
	users: User[];
}

interface RoleData {
	name: string;
	value: number;
	fill: string;
	percentage: number;
}

export function RoleDistributionChart({ users }: RoleDistributionChartProps) {
	const [primaryColor, setPrimaryColor] = useState("#3b82f6");
	const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
	const [mutedColor, setMutedColor] = useState("#6b7280");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const root = document.documentElement;
			const isDark = root.classList.contains("dark");
			const timer = setTimeout(() => {
				setPrimaryColor(isDark ? "#60a5fa" : "#3b82f6");
				setSecondaryColor(isDark ? "#a78bfa" : "#8b5cf6");
				setMutedColor(isDark ? "#9ca3af" : "#6b7280");
			}, 0);
			return () => clearTimeout(timer);
		}
	}, []);

	// Calculate role distribution
	const roleData = useMemo(() => {
		const counts = {
			admin: 0,
			manager: 0,
			user: 0,
		};

		users.forEach((user) => {
			counts[user.role]++;
		});

		const total = users.length;
		if (total === 0) return [];

		const data: RoleData[] = [
			{
				name: "Admin",
				value: counts.admin,
				fill: primaryColor,
				percentage: Math.round((counts.admin / total) * 100),
			},
			{
				name: "Manager",
				value: counts.manager,
				fill: secondaryColor,
				percentage: Math.round((counts.manager / total) * 100),
			},
			{
				name: "User",
				value: counts.user,
				fill: mutedColor,
				percentage: Math.round((counts.user / total) * 100),
			},
		];

		return data.filter((item) => item.value > 0);
	}, [users, primaryColor, secondaryColor, mutedColor]);

	const total = users.length;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Users by Role</CardTitle>
			</CardHeader>
			<CardContent>
				{total === 0 ? (
					<div className="flex items-center justify-center h-[350px] text-muted-foreground">
						No users data available
					</div>
				) : (
					<>
						<ResponsiveContainer width="100%" height={350}>
							<PieChart>
								<Pie
									data={roleData as unknown as Record<string, unknown>[]}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={(props: {
										cx?: number;
										cy?: number;
										midAngle?: number;
										innerRadius?: number;
										outerRadius?: number;
										percent?: number;
									}) => {
										if (props.percent === undefined) return "";
										return `${(props.percent * 100).toFixed(0)}%`;
									}}
									outerRadius={80}
									innerRadius={60}
									fill="#8884d8"
									dataKey="value"
								>
									{roleData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: "var(--popover)",
										border: "1px solid var(--border)",
										borderRadius: "6px",
									}}
									labelStyle={{
										color: "var(--foreground)",
									}}
									formatter={(value: number | undefined, name?: string) => {
										if (value === undefined) return ["", ""];
										const percentage = ((value / total) * 100).toFixed(1);
										return [`${value} (${percentage}%)`, name || ""];
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
						{/* Custom Legend */}
						<div className="flex flex-wrap items-center justify-center gap-4 mt-4">
							{roleData.map((item, index) => (
								<div key={index} className="flex items-center gap-2 text-sm">
									<div
										className="size-3 rounded-full"
										style={{ backgroundColor: item.fill }}
									/>
									<span className="text-muted-foreground">
										{item.name}: {item.value} ({item.percentage}%)
									</span>
								</div>
							))}
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}
