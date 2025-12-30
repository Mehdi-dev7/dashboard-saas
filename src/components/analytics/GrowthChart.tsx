"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "@/types";
import { useEffect, useMemo, useState } from "react";
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface GrowthChartProps {
	data: ChartData[];
}

interface GrowthData {
	date: string;
	growth: number;
}

export function GrowthChart({ data }: GrowthChartProps) {
	const [greenColor, setGreenColor] = useState("#10b981");
	const [redColor, setRedColor] = useState("#ef4444");
	const [mutedColor, setMutedColor] = useState("#6b7280");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const root = document.documentElement;
			const isDark = root.classList.contains("dark");
			const timer = setTimeout(() => {
				setGreenColor(isDark ? "#34d399" : "#10b981");
				setRedColor(isDark ? "#f87171" : "#ef4444");
				setMutedColor(isDark ? "#9ca3af" : "#6b7280");
			}, 0);
			return () => clearTimeout(timer);
		}
	}, []);

	// Calculate monthly growth rate
	const growthData = useMemo(() => {
		if (data.length < 2) return [];

		const result: GrowthData[] = [];

		// Calculate growth for revenue (you can change to users if needed)
		for (let i = 1; i < data.length; i++) {
			const current = data[i].revenue;
			const previous = data[i - 1].revenue;

			if (previous === 0) {
				result.push({ date: data[i].date, growth: 0 });
			} else {
				const growth = ((current - previous) / previous) * 100;
				result.push({ date: data[i].date, growth: Number(growth.toFixed(2)) });
			}
		}

		return result;
	}, [data]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Monthly Growth Rate (%)</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart
						data={growthData}
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
							tickFormatter={(value) => `${value}%`}
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
								value !== undefined ? `${value.toFixed(2)}%` : "",
								"Growth",
							]}
						/>
						<Bar dataKey="growth" radius={[4, 4, 0, 0]}>
							{growthData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.growth >= 0 ? greenColor : redColor}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
