"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ChartData } from "@/types";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface UsersChartProps {
	data: ChartData[];
}

export function UsersChart({ data }: UsersChartProps) {
	const [primaryColor, setPrimaryColor] = useState("#10b981");
	const [mutedColor, setMutedColor] = useState("#6b7280");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const root = document.documentElement;
			// Use a green color that works well
			// En mode clair: vert, en mode sombre: vert clair
			const isDark = root.classList.contains("dark");
			const timer = setTimeout(() => {
				setPrimaryColor(isDark ? "#34d399" : "#10b981");
				setMutedColor(isDark ? "#9ca3af" : "#6b7280");
			}, 0);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>New Users</CardTitle>
				<CardDescription>Monthly registrations</CardDescription>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart
						data={data}
						margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
					>
						<XAxis
							dataKey="date"
							stroke={mutedColor}
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							stroke={mutedColor}
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--popover)",
								border: "1px solid var(--border)",
								borderRadius: "6px",
							}}
							labelStyle={{
								color: "var(--foreground)",
							}}
							formatter={(value: number | undefined) => [
								value ? value.toLocaleString() : "",
								"Users",
							]}
						/>
						<Bar dataKey="users" fill={primaryColor} radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
