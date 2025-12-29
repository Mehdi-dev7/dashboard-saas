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
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface RevenueChartProps {
	data: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
	const [primaryColor, setPrimaryColor] = useState("#3b82f6");
	const [mutedColor, setMutedColor] = useState("#6b7280");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const root = document.documentElement;
			// Utiliser une couleur directe qui fonctionne bien
			// En mode clair: bleu, en mode sombre: bleu clair
			const isDark = root.classList.contains("dark");
			const timer = setTimeout(() => {
				setPrimaryColor(isDark ? "#60a5fa" : "#3b82f6");
				setMutedColor(isDark ? "#9ca3af" : "#6b7280");
			}, 0);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Revenue</CardTitle>
				<CardDescription>Monthly trend</CardDescription>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart
						data={data}
						margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
					>
						<defs>
							<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={primaryColor} stopOpacity={0.3} />
								<stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
							</linearGradient>
						</defs>
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
							tickFormatter={(value) => `€${value / 1000}k`}
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
								value ? `€${value.toLocaleString()}` : "",
								"Revenue",
							]}
						/>
						<Line
							type="monotone"
							dataKey="revenue"
							stroke={primaryColor}
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6, fill: primaryColor }}
							fill="url(#revenueGradient)"
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
