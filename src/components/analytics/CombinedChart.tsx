"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "@/types";
import { useEffect, useState } from "react";
import {
	Bar,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface CombinedChartProps {
	data: ChartData[];
}

export function CombinedChart({ data }: CombinedChartProps) {
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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Revenue & Users Growth</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<ComposedChart
						data={data}
						margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
					>
						<XAxis
							dataKey="date"
							stroke={mutedColor}
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							yAxisId="left"
							stroke={mutedColor}
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `€${value / 1000}k`}
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
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
							formatter={(value: number | undefined, name?: string) => {
								if (name === "revenue") {
									return [value ? `€${value.toLocaleString()}` : "", "Revenue"];
								}
								if (name === "users") {
									return [value ? value.toLocaleString() : "", "Users"];
								}
								return [value, name || ""];
							}}
						/>
						<Legend
							wrapperStyle={{
								color: "var(--foreground)",
							}}
						/>
						<Line
							yAxisId="left"
							type="monotone"
							dataKey="revenue"
							stroke={primaryColor}
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6, fill: primaryColor }}
							name="Revenue"
						/>
						<Bar
							yAxisId="right"
							dataKey="users"
							fill={secondaryColor}
							fillOpacity={0.5}
							radius={[4, 4, 0, 0]}
							name="Users"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
