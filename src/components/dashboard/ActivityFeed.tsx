"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ActivityFeedProps {
	activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
	// Prendre les 5 dernières activités
	const recentActivities = activities.slice(0, 5);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="max-h-[400px] overflow-y-auto space-y-4">
					{recentActivities.length === 0 ? (
						<p className="text-sm text-muted-foreground text-center py-4">
							Aucune activité récente
						</p>
					) : (
						recentActivities.map((activity) => (
							<div
								key={activity.id}
								className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-b-0"
							>
								<Avatar className="size-9 shrink-0">
									<AvatarImage
										src={activity.userAvatar}
										alt={activity.userName}
									/>
									<AvatarFallback>
										{activity.userName
											.split(" ")
											.map((n) => n[0])
											.join("")
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 min-w-0">
									<p className="text-sm">
										<span className="font-medium">{activity.userName}</span>{" "}
										<span className="text-muted-foreground">
											{activity.action}
										</span>
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{formatDistanceToNow(new Date(activity.timestamp), {
											addSuffix: true,
											locale: fr,
										})}
									</p>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
}
