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
								value ? value.toLocaleString() : "",
								"Users",
							]}
						/>
						<Bar
							dataKey="users"
							fill="hsl(var(--primary))"
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
