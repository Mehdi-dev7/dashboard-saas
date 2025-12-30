"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/lib/store/useStore";
import { useEffect, useState } from "react";

export function AppearanceSection() {
	const { darkMode, toggleDarkMode } = useStore();
	const [theme, setTheme] = useState<"light" | "dark" | "system">(
		darkMode ? "dark" : "light"
	);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMounted(true);
		}, 0);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		if (theme === "system") {
			// Détecter la préférence système
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const isSystemDark = mediaQuery.matches;

			if (isSystemDark !== darkMode) {
				// Appliquer le mode système
				if (isSystemDark) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			}

			// Écouter les changements de préférence système
			const handleChange = (e: MediaQueryListEvent) => {
				if (e.matches) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			};

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		} else {
			// Mode light ou dark explicite
			if (theme === "dark" && !darkMode) {
				toggleDarkMode();
			} else if (theme === "light" && darkMode) {
				toggleDarkMode();
			}
		}
	}, [theme, darkMode, toggleDarkMode, mounted]);

	const handleValueChange = (value: string) => {
		setTheme(value as "light" | "dark" | "system");
	};

	if (!mounted) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Appearance</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<div className="size-4 rounded-full border" />
							<Label>Light mode</Label>
						</div>
						<div className="flex items-center space-x-2">
							<div className="size-4 rounded-full border" />
							<Label>Dark mode</Label>
						</div>
						<div className="flex items-center space-x-2">
							<div className="size-4 rounded-full border" />
							<Label>System</Label>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Appearance</CardTitle>
			</CardHeader>
			<CardContent>
				<RadioGroup value={theme} onValueChange={handleValueChange}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="light" id="light" />
						<Label htmlFor="light" className="cursor-pointer">
							Light mode
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="dark" id="dark" />
						<Label htmlFor="dark" className="cursor-pointer">
							Dark mode
						</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="system" id="system" />
						<Label htmlFor="system" className="cursor-pointer">
							System
						</Label>
					</div>
				</RadioGroup>
			</CardContent>
		</Card>
	);
}
