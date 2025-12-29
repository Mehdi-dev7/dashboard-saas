"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ChartData } from "@/types";
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
								<stop
									offset="5%"
									stopColor="hsl(var(--primary))"
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor="hsl(var(--primary))"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey="date"
							stroke="hsl(var(--muted-foreground))"
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							stroke="hsl(var(--muted-foreground))"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `€${value / 1000}k`}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "hsl(var(--popover))",
								border: "1px solid hsl(var(--border))",
								borderRadius: "6px",
							}}
							labelStyle={{
								color: "hsl(var(--foreground))",
							}}
							formatter={(value: number | undefined) => [
								value ? `€${value.toLocaleString()}` : "",
								"Revenue",
							]}
						/>
						<Line
							type="monotone"
							dataKey="revenue"
							stroke="hsl(var(--primary))"
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6 }}
							fill="url(#revenueGradient)"
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
