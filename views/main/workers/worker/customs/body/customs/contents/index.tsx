"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	BadgeCheck,
	Calendar,
	Clock,
	DollarSign,
	Edit,
	Mail,
	MapPin,
	Phone,
	Star,
	Trash2,
	TrendingUp,
	User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

// Mock data for demonstration
const workerData = {
	id: "1",
	name: "Sarah Johnson",
	position: "Store Manager",
	department: "Operations",
	email: "sarah.johnson@example.com",
	phone: "+1 (555) 123-4567",
	address: "123 Market Street, New York, NY 10001",
	hireDate: "2018-05-15",
	status: "Active",
	avatar: "https://randomuser.me/api/portraits/men/42.jpg",
	salary: "$65,000",
	schedule: "Mon-Fri, 9:00 AM - 5:00 PM",
	performance: {
		rating: 4.8,
		salesTarget: 92,
		attendance: 98,
		customerSatisfaction: 95,
	},
	skills: [
		"Inventory Management",
		"Team Leadership",
		"Customer Service",
		"Sales",
		"Conflict Resolution",
	],
	certifications: ["Retail Management", "Food Safety", "First Aid"],
	recentActivity: [
		{ date: "2023-04-10", action: "Completed quarterly inventory audit" },
		{ date: "2023-04-05", action: "Trained 3 new cashiers" },
		{ date: "2023-04-01", action: "Exceeded monthly sales target by 15%" },
		{ date: "2023-03-25", action: "Implemented new shelf organization system" },
	],
};

export default function WorkerDetailPage() {
	const params = useParams();
	const [worker] = useState(workerData); // In a real app, you would fetch data based on workerId

	return (
		<div className="container mx-auto p-4 space-y-6 h-[calc(100vh-170px)] overflow-y-auto">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Worker Profile Card */}
				<Card className="md:col-span-1">
					<CardHeader className="flex flex-col items-center text-center">
						<Avatar className="h-24 w-24 mb-4">
							<AvatarImage
								src={worker.avatar || "/placeholder.svg"}
								alt={worker.name}
							/>
							<AvatarFallback>
								{worker.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<CardTitle className="text-xl">{worker.name}</CardTitle>
						<CardDescription className="flex flex-col gap-1">
							<span className="font-medium text-primary">
								{worker.position}
							</span>
							<span>{worker.department}</span>
							<Badge variant="outline" className="mt-2 mx-auto">
								{worker.status === "Active" ? (
									<span className="flex items-center gap-1">
										<span className="h-2 w-2 rounded-full bg-green-500" />{" "}
										Active
									</span>
								) : (
									<span className="flex items-center gap-1">
										<span className="h-2 w-2 rounded-full bg-gray-500" />{" "}
										Inactive
									</span>
								)}
							</Badge>
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>{worker.email}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{worker.phone}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span>{worker.address}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span>
									Hired: {new Date(worker.hireDate).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<DollarSign className="h-4 w-4 text-muted-foreground" />
								<span>Salary: {worker.salary}</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span>Schedule: {worker.schedule}</span>
							</div>
						</div>

						<Separator />

						<div>
							<h3 className="font-medium mb-2">Skills</h3>
							<div className="flex flex-wrap gap-2">
								{worker.skills.map((skill, index) => (
									<Badge key={index} variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</div>

						<div>
							<h3 className="font-medium mb-2">Certifications</h3>
							<div className="space-y-1">
								{worker.certifications.map((cert, index) => (
									<div key={index} className="flex items-center gap-2">
										<BadgeCheck className="h-4 w-4 text-primary" />
										<span className="text-sm">{cert}</span>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Main Content Area */}
				<div className="md:col-span-2 space-y-6">
					<Tabs defaultValue="performance">
						<TabsList className="grid grid-cols-3 w-full">
							<TabsTrigger value="performance">Performance</TabsTrigger>
							<TabsTrigger value="activity">Recent Activity</TabsTrigger>
							<TabsTrigger value="schedule">Schedule</TabsTrigger>
						</TabsList>

						<TabsContent value="performance" className="space-y-4 mt-4">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Star className="h-5 w-5 text-yellow-500" />
										Performance Overview
									</CardTitle>
									<CardDescription>
										Overall rating: {worker.performance.rating}/5.0
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">Sales Target</span>
											<span className="text-sm font-medium">
												{worker.performance.salesTarget}%
											</span>
										</div>
										<Progress
											value={worker.performance.salesTarget}
											className="h-2"
										/>
									</div>

									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">Attendance</span>
											<span className="text-sm font-medium">
												{worker.performance.attendance}%
											</span>
										</div>
										<Progress
											value={worker.performance.attendance}
											className="h-2"
										/>
									</div>

									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">
												Customer Satisfaction
											</span>
											<span className="text-sm font-medium">
												{worker.performance.customerSatisfaction}%
											</span>
										</div>
										<Progress
											value={worker.performance.customerSatisfaction}
											className="h-2"
										/>
									</div>
								</CardContent>
							</Card>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-base">
											Sales Performance
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-2xl font-bold">$24,780</p>
												<p className="text-xs text-muted-foreground">
													Monthly sales
												</p>
											</div>
											<div className="flex items-center gap-1 text-green-500 text-sm">
												<TrendingUp className="h-4 w-4" />
												<span>+15.3%</span>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader className="pb-2">
										<CardTitle className="text-base">
											Customer Interactions
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-2xl font-bold">187</p>
												<p className="text-xs text-muted-foreground">
													Monthly interactions
												</p>
											</div>
											<div className="flex items-center gap-1 text-green-500 text-sm">
												<TrendingUp className="h-4 w-4" />
												<span>+8.7%</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						<TabsContent value="activity" className="mt-4">
							<Card>
								<CardHeader>
									<CardTitle>Recent Activity</CardTitle>
									<CardDescription>
										Latest actions and achievements
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{worker.recentActivity.map((activity, index) => (
											<div
												key={index}
												className="flex items-start gap-4 pb-4 border-b last:border-0"
											>
												<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
													<User className="h-4 w-4 text-primary" />
												</div>
												<div>
													<p className="text-sm font-medium">
														{activity.action}
													</p>
													<p className="text-xs text-muted-foreground">
														{new Date(activity.date).toLocaleDateString(
															"en-US",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															},
														)}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
								<CardFooter>
									<Button variant="outline" className="w-full">
										View All Activity
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>

						<TabsContent value="schedule" className="mt-4">
							<Card>
								<CardHeader>
									<CardTitle>Work Schedule</CardTitle>
									<CardDescription>
										Current work schedule and upcoming shifts
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="grid grid-cols-7 gap-2">
											{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
												(day, index) => (
													<div key={index} className="text-center">
														<div className="text-sm font-medium">{day}</div>
														<div
															className={`mt-2 h-12 rounded-md flex items-center justify-center text-xs ${
																index < 5
																	? "bg-primary/10 text-primary"
																	: "bg-muted text-muted-foreground"
															}`}
														>
															{index < 5 ? "9-5" : "Off"}
														</div>
													</div>
												),
											)}
										</div>

										<div className="space-y-2">
											<h3 className="text-sm font-medium">Upcoming Time Off</h3>
											<div className="rounded-md border p-4">
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">
														Vacation: May 15 - May 22, 2023
													</span>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter className="flex justify-between">
									<Button variant="outline">Request Time Off</Button>
									<Button>View Full Calendar</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Assigned Tasks</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-yellow-500" />
											<span className="text-sm">
												Inventory check - Produce section
											</span>
										</div>
										<Badge variant="outline">In Progress</Badge>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-green-500" />
											<span className="text-sm">
												Staff training - New POS system
											</span>
										</div>
										<Badge variant="outline">Completed</Badge>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-blue-500" />
											<span className="text-sm">Monthly sales report</span>
										</div>
										<Badge variant="outline">Pending</Badge>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									View All Tasks
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base">Team Members</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src="/placeholder.svg?height=32&width=32"
												alt="Team member"
											/>
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">John Doe</p>
											<p className="text-xs text-muted-foreground">
												Assistant Manager
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src="/placeholder.svg?height=32&width=32"
												alt="Team member"
											/>
											<AvatarFallback>EW</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">Emma Wilson</p>
											<p className="text-xs text-muted-foreground">Cashier</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src="/placeholder.svg?height=32&width=32"
												alt="Team member"
											/>
											<AvatarFallback>MR</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium">Michael Rodriguez</p>
											<p className="text-xs text-muted-foreground">
												Stock Clerk
											</p>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									View Team
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
