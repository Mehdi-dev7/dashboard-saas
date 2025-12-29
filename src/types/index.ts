export type UserRole = "admin" | "manager" | "user";

export type UserStatus = "active" | "inactive";

export type Trend = "up" | "down";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	avatar: string;
	createdAt: Date;
}

export interface KPI {
	title: string;
	value: number | string;
	change: number;
	trend: Trend;
	icon: string;
}

export interface Activity {
	id: string;
	userId: string;
	userName: string;
	userAvatar: string;
	action: string;
	timestamp: Date;
}

export interface ChartData {
	date: string;
	revenue: number;
	users: number;
}
