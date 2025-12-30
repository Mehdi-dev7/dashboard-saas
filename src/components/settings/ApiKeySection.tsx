"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function ApiKeySection() {
	const apiKey = "sk_test_4f3e2d1c0b9a8e7f6d5c4b3a2e1d0c9b";
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(apiKey);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
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
							{copied ? (
								<Check className="size-4 text-green-600 dark:text-green-400" />
							) : (
								<Copy className="size-4" />
							)}
						</Button>
					</div>
					{copied && (
						<p className="text-sm text-green-600 dark:text-green-400 animate-in fade-in">
							Copied!
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
