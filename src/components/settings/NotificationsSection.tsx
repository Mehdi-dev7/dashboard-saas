"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function NotificationsSection() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);
	const [marketingEmails, setMarketingEmails] = useState(true);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Notifications Settings</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Email Notifications */}
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="email-notifications">Email notifications</Label>
							<p className="text-sm text-muted-foreground">
								Receive notifications via email
							</p>
						</div>
						<Switch
							id="email-notifications"
							checked={emailNotifications}
							onCheckedChange={setEmailNotifications}
						/>
					</div>

					{/* Push Notifications */}
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="push-notifications">Push notifications</Label>
							<p className="text-sm text-muted-foreground">
								Receive push notifications
							</p>
						</div>
						<Switch
							id="push-notifications"
							checked={pushNotifications}
							onCheckedChange={setPushNotifications}
						/>
					</div>

					{/* Marketing Emails */}
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label htmlFor="marketing-emails">Marketing emails</Label>
							<p className="text-sm text-muted-foreground">
								Receive marketing and promotional emails
							</p>
						</div>
						<Switch
							id="marketing-emails"
							checked={marketingEmails}
							onCheckedChange={setMarketingEmails}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
