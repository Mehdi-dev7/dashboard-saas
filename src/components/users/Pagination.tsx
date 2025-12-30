"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	// Generate array of page numbers
	const getPageNumbers = () => {
		const pages: number[] = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) {
		return null; // Don't show pagination if there's only one page or no pages
	}

	return (
		<div className="flex items-center justify-center gap-2">
			{/* Previous Button */}
			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label="Previous page"
			>
				<ChevronLeft className="size-4" />
				<span className="hidden sm:inline">Previous</span>
			</Button>

			{/* Page Numbers */}
			<div className="flex items-center gap-1">
				{pageNumbers.map((page) => (
					<Button
						key={page}
						variant={currentPage === page ? "default" : "outline"}
						size="sm"
						onClick={() => onPageChange(page)}
						aria-label={`Go to page ${page}`}
						aria-current={currentPage === page ? "page" : undefined}
						className="min-w-10"
					>
						{page}
					</Button>
				))}
			</div>

			{/* Next Button */}
			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label="Next page"
			>
				<span className="hidden sm:inline">Next</span>
				<ChevronRight className="size-4" />
			</Button>
		</div>
	);
}
