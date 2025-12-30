"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface DateRangeFilterProps {
	selectedRange: string;
	onRangeChange: (range: string) => void;
}

export function DateRangeFilter({
	selectedRange,
	onRangeChange,
}: DateRangeFilterProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Necessary to avoid hydration errors with Radix UI Select
		// Pattern recommandé pour les composants qui génèrent des IDs aléatoires
		const timer = setTimeout(() => {
			setMounted(true);
		}, 0);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col gap-2 max-w-xs" suppressHydrationWarning>
			<Label htmlFor="date-range">Time Range:</Label>
			{mounted ? (
				<Select value={selectedRange} onValueChange={onRangeChange}>
					<SelectTrigger id="date-range" className="w-full">
						<SelectValue placeholder="Select time range" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7d">Last 7 days</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
						<SelectItem value="3m">Last 3 months</SelectItem>
						<SelectItem value="6m">Last 6 months</SelectItem>
						<SelectItem value="1y">Last year</SelectItem>
					</SelectContent>
				</Select>
			) : (
				<div className="h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm">
					{selectedRange === "7d"
						? "Last 7 days"
						: selectedRange === "30d"
						? "Last 30 days"
						: selectedRange === "3m"
						? "Last 3 months"
						: selectedRange === "6m"
						? "Last 6 months"
						: "Last year"}
				</div>
			)}
		</div>
	);
}
