import type { Activity, ChartData, KPI, User } from "@/types";

// Function to generate a simple UUID-like ID
const generateId = (): string => {
	return `${Math.random().toString(36).substring(2, 15)}${Math.random()
		.toString(36)
		.substring(2, 15)}`;
};

// Function to generate a random date within the last 6 months
const randomDate = (monthsAgo: number = 6): Date => {
	const now = new Date();
	const past = new Date();
	past.setMonth(now.getMonth() - monthsAgo);
	const randomTime =
		past.getTime() + Math.random() * (now.getTime() - past.getTime());
	return new Date(randomTime);
};

// 15 users with various names
export const users: User[] = [
	{
		id: generateId(),
		name: "Sophie Martin",
		email: "sophie.martin@example.com",
		role: "admin",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Lucas Dubois",
		email: "lucas.dubois@example.com",
		role: "manager",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Emma Bernard",
		email: "emma.bernard@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Thomas Leroy",
		email: "thomas.leroy@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Léa Moreau",
		email: "lea.moreau@example.com",
		role: "manager",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lea",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Hugo Petit",
		email: "hugo.petit@example.com",
		role: "user",
		status: "inactive",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hugo",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Chloé Rousseau",
		email: "chloe.rousseau@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Nathan Laurent",
		email: "nathan.laurent@example.com",
		role: "admin",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Camille Simon",
		email: "camille.simon@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camille",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Maxime Michel",
		email: "maxime.michel@example.com",
		role: "manager",
		status: "inactive",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maxime",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Julie Garcia",
		email: "julie.garcia@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julie",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Antoine David",
		email: "antoine.david@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antoine",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Manon Blanc",
		email: "manon.blanc@example.com",
		role: "manager",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manon",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Alexandre Roux",
		email: "alexandre.roux@example.com",
		role: "user",
		status: "inactive",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre",
		createdAt: randomDate(),
	},
	{
		id: generateId(),
		name: "Inès Vincent",
		email: "ines.vincent@example.com",
		role: "user",
		status: "active",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ines",
		createdAt: randomDate(),
	},
];

// 4 KPIs with realistic values
export const kpis: KPI[] = [
	{
		title: "Total Users",
		value: "2,547",
		change: 12.5,
		trend: "up",
		icon: "Users",
	},
	{
		title: "Revenue",
		value: "€45,231",
		change: 8.2,
		trend: "up",
		icon: "Euro",
	},
	{
		title: "Active Sessions",
		value: "1,234",
		change: -3.1,
		trend: "down",
		icon: "Activity",
	},
	{
		title: "Growth",
		value: "24.8%",
		change: 5.4,
		trend: "up",
		icon: "TrendingUp",
	},
];

// 10 recent activities
export const activities: Activity[] = [
	{
		id: generateId(),
		userId: users[0].id,
		userName: users[0].name,
		userAvatar: users[0].avatar,
		action: "created a new account",
		timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
	},
	{
		id: generateId(),
		userId: users[1].id,
		userName: users[1].name,
		userAvatar: users[1].avatar,
		action: "updated their profile",
		timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
	},
	{
		id: generateId(),
		userId: users[2].id,
		userName: users[2].name,
		userAvatar: users[2].avatar,
		action: "deleted an item",
		timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
	},
	{
		id: generateId(),
		userId: users[3].id,
		userName: users[3].name,
		userAvatar: users[3].avatar,
		action: "downloaded a file",
		timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
	},
	{
		id: generateId(),
		userId: users[4].id,
		userName: users[4].name,
		userAvatar: users[4].avatar,
		action: "created a new project",
		timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
	},
	{
		id: generateId(),
		userId: users[5].id,
		userName: users[5].name,
		userAvatar: users[5].avatar,
		action: "modified settings",
		timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
	},
	{
		id: generateId(),
		userId: users[6].id,
		userName: users[6].name,
		userAvatar: users[6].avatar,
		action: "shared a document",
		timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
	},
	{
		id: generateId(),
		userId: users[7].id,
		userName: users[7].name,
		userAvatar: users[7].avatar,
		action: "added a comment",
		timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
	},
	{
		id: generateId(),
		userId: users[8].id,
		userName: users[8].name,
		userAvatar: users[8].avatar,
		action: "created a new task",
		timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
	},
	{
		id: generateId(),
		userId: users[9].id,
		userName: users[9].name,
		userAvatar: users[9].avatar,
		action: "completed a task",
		timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
	},
];

// 12 monthly data points for charts (growing revenue and users with fluctuations)
export const chartData: ChartData[] = [
	{
		date: "Jan",
		revenue: 12500,
		users: 1200,
	},
	{
		date: "Feb",
		revenue: 18900,
		users: 1350,
	},
	{
		date: "Mar",
		revenue: 15200,
		users: 1500,
	},
	{
		date: "Apr",
		revenue: 23800,
		users: 1680,
	},
	{
		date: "May",
		revenue: 20100,
		users: 1850,
	},
	{
		date: "Jun",
		revenue: 28900,
		users: 2050,
	},
	{
		date: "Jul",
		revenue: 31200,
		users: 2250,
	},
	{
		date: "Aug",
		revenue: 27800,
		users: 2450,
	},
	{
		date: "Sep",
		revenue: 35200,
		users: 2650,
	},
	{
		date: "Oct",
		revenue: 41800,
		users: 2850,
	},
	{
		date: "Nov",
		revenue: 38900,
		users: 3050,
	},
	{
		date: "Dec",
		revenue: 45231,
		users: 3247,
	},
];
