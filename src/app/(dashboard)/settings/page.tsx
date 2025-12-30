"use client";

import { ApiKeySection } from "@/components/settings/ApiKeySection";
import { AppearanceSection } from "@/components/settings/AppearanceSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { ProfileSection } from "@/components/settings/ProfileSection";

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			{/* Title */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground">
					Manage your account settings and preferences
				</p>
			</div>

			{/* Grid with all sections */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* ProfileSection - Full width */}
				<div className="lg:col-span-2">
					<ProfileSection />
				</div>

				{/* NotificationsSection */}
				<NotificationsSection />

				{/* AppearanceSection */}
				<AppearanceSection />

				{/* ApiKeySection - Full width */}
				<div className="lg:col-span-2">
					<ApiKeySection />
				</div>
			</div>
		</div>
	);
}
