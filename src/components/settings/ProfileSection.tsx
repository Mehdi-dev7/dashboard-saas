"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema
const profileFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	bio: z.string().max(200, "Bio must be at most 200 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileSection() {
	const { profile, updateProfile } = useStore();
	const [mounted, setMounted] = useState(false);

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: profile.name,
			email: profile.email,
			bio: profile.bio || "",
		},
	});

	// Necessary to avoid hydration errors with react-hook-form
	useEffect(() => {
		const timer = setTimeout(() => {
			setMounted(true);
		}, 0);
		return () => clearTimeout(timer);
	}, []);

	// Update form when profile changes
	useEffect(() => {
		if (mounted) {
			form.reset({
				name: profile.name,
				email: profile.email,
				bio: profile.bio || "",
			});
		}
	}, [profile, form, mounted]);

	const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
		profile.name
	)}`;

	const onSubmit = (data: ProfileFormValues) => {
		updateProfile(data);
		toast.success("Profile updated successfully!");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Settings</CardTitle>
			</CardHeader>
			<CardContent suppressHydrationWarning>
				{mounted ? (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Avatar Section */}
							<FormItem>
								<FormLabel>Avatar</FormLabel>
								<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
									<Avatar className="size-20">
										<AvatarImage src={avatarUrl} alt="Profile avatar" />
										<AvatarFallback className="text-lg">
											{profile.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<FormControl>
											<Input
												type="file"
												accept="image/*"
												disabled
												className="cursor-not-allowed"
											/>
										</FormControl>
										<p className="text-xs text-muted-foreground mt-1">
											Avatar upload will be available soon
										</p>
									</div>
								</div>
							</FormItem>

							{/* Name Field */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Email Field */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Bio Field */}
							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bio</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Tell us about yourself (optional)"
												className="min-h-24"
												{...field}
											/>
										</FormControl>
										<FormMessage />
										<p className="text-xs text-muted-foreground">
											{field.value?.length || 0}/200 characters
										</p>
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<div className="flex justify-end">
								<Button type="submit">Save Changes</Button>
							</div>
						</form>
					</Form>
				) : (
					<div className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium">Avatar</label>
							<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
								<div className="size-20 rounded-full bg-muted" />
								<div className="flex-1">
									<div className="h-9 w-full rounded-md border bg-muted" />
								</div>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Name</label>
							<div className="h-9 w-full rounded-md border bg-muted" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Email</label>
							<div className="h-9 w-full rounded-md border bg-muted" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Bio</label>
							<div className="min-h-24 w-full rounded-md border bg-muted" />
						</div>
						<div className="flex justify-end">
							<div className="h-9 w-32 rounded-md bg-muted" />
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
