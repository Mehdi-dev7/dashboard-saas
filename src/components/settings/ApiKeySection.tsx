"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function ApiKeySection() {
	const apiKey = "sk_test_4f3e2d1c0b9a8e7f6d5c4b3a2e1d0c9b";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(apiKey);
			toast.success("API key copied to clipboard!");
		} catch {
			toast.error("Failed to copy API key");
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>API Keys</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex gap-2">
						<Input
							type="text"
							value={apiKey}
							readOnly
							className="font-mono text-sm"
						/>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={handleCopy}
							className="shrink-0"
							aria-label="Copy API key"
						>
							<Copy className="size-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
