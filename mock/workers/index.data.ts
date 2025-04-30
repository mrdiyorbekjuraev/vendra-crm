export const mockWorkers = [
	{
		title: "Project Roadmap",
		content:
			"We need to finalize the Q3 deliverables by next Friday. Main focus areas should be the authentication system revamp and implementing the new dashboard analytics.",
		author: {
			name: "Diyorbek Juraev",
			avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
			initials: "DJ",
			joinedDate: "March 2023",
			bio: "Full-stack developer with a passion for clean code and user-centered design.",
		},
		createdAt: "Today at 10:45 AM",
		role: "Software Engineer",
		status: "active",
		color: "green",
	},
	{
		content:
			"Don't forget to prepare the slides for tomorrow's client presentation. We should highlight the new features we implemented last sprint.",
		author: {
			name: "Sarah Chen",
			initials: "SC",
			joinedDate: "January 2024",
		},
		createdAt: "Yesterday",
		role: "Marketing Lead",
		status: "pending",
		color: "yellow",
	},
	{
		title: "API Documentation Updates",
		content:
			"I've updated the API docs with the new endpoints. Please review when you get a chance and let me know if anything needs clarification.",
		author: {
			name: "Miguel Rodriguez",
			avatarUrl: "https://randomuser.me/api/portraits/men/57.jpg",
			initials: "MR",
			joinedDate: "November 2022",
			bio: "Backend specialist focusing on scalable architecture and performance optimization.",
		},
		createdAt: "April 1, 2025",
		role: "Backend Developer",
		status: "inactive",
		color: "gray",
	},
	{
		title: "Design System Components",
		content:
			"Here are the latest component prototypes for the design system. I've included both light and dark mode variants. Feedback welcome!",
		author: {
			name: "Aisha Johnson",
			avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
			initials: "AJ",
			joinedDate: "August 2023",
			bio: "UI/UX designer specialized in accessible and intuitive interfaces.",
		},
		createdAt: "Last week",
		role: "UI/UX Designer",
		status: "active",
		color: "green",
	},
	{
		title: "Weekly Team Sync",
		content:
			"Topics for discussion: 1. Current sprint progress 2. Blockers and dependencies 3. Planning for next iteration 4. Open floor for team concerns",
		author: {
			name: "Diyorbek Juraev",
			initials: "DJ",
			joinedDate: "March 2023",
		},
		createdAt: "March 25, 2025",
		role: "Team Lead",
		status: "blocked",
		color: "red",
	},
];

// Define the type for employee data
type Employee = {
	id: string;
	fullName: string;
	employeeId: string;
	role: string;
	stores: any;
	manager: any;
	email: string;
	avatar: string;
	phone: string;
	status: string;
	location?: string;
	// joinDate: string;
};

// Mock data
const peopleData = [
	{
		id: "1",
		fullName: "Diyorbek Juraev",
		employeeId: "EID-000001",
		role: "Owner",
		phone: "+998 90 123 45 67",
		status: "active",
		stores: {
			id: 1,
			name: "Vendra",
			types: [
				{ name: "Analytics", type: "default" },
				{ name: "Machine Learning", type: "yellow" },
				{ name: "Business Intelligence", type: "purple" },
			],
			description: "Premium consumer electronics retail network",
			people: 12500,
		},
		location: "Tashkent",
		birthDate: "12.03.2001",
		manager: {
			id: "1",
			fullName: "Vlad A",
			employeeId: "EID-000001",
			role: "Owner",
			email: "admin@vladdanciu.com",
			avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		},
		email: "admin@vladdanciu.com",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		id: "2",
		fullName: "Alisher Usmanov",
		employeeId: "EID-000002",
		role: "Regional Manager",
		phone: "+998 91 234 56 78",
		status: "active",
		stores: {
			id: 2,
			name: "Korzinka",
			types: [
				{ name: "Grocery", type: "green" },
				{ name: "Retail", type: "blue" },
				{ name: "Supermarket", type: "red" },
			],
			description: "Largest supermarket chain in Uzbekistan",
			people: 8700,
		},
		manager: {
			id: "1",
			fullName: "Vlad A",
			employeeId: "EID-000001",
			role: "Owner",
			email: "admin@vladdanciu.com",
			avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		},
		email: "alisher.usmanov@korzinka.uz",
		avatar: "https://randomuser.me/api/portraits/men/10.jpg",
	},
	{
		id: "3",
		fullName: "Dilnoza Karimova",
		employeeId: "EID-000003",
		role: "Store Director",
		phone: "+998 93 345 67 89",
		status: "active",
		stores: {
			id: 3,
			name: "Havas",
			types: [
				{ name: "Grocery", type: "default" },
				{ name: "Premium", type: "gold" },
				{ name: "Import", type: "silver" },
			],
			description: "Premium grocery chain with imported goods",
			people: 5200,
		},
		manager: {
			id: "2",
			fullName: "Alisher Usmanov",
			employeeId: "EID-000002",
			role: "Regional Manager",
			email: "alisher.usmanov@korzinka.uz",
			avatar: "https://randomuser.me/api/portraits/men/10.jpg",
		},
		email: "dilnoza.karimova@havas.uz",
		avatar: "https://randomuser.me/api/portraits/women/11.jpg",
	},
	{
		id: "4",
		fullName: "Botir Rahimov",
		employeeId: "EID-000004",
		role: "Operations Manager",
		phone: "+998 94 456 78 90",
		status: "active",
		stores: {
			id: 4,
			name: "Artel",
			types: [
				{ name: "Electronics", type: "blue" },
				{ name: "Home Appliances", type: "cyan" },
				{ name: "Manufacturing", type: "teal" },
			],
			description: "Leading electronics manufacturer in Central Asia",
			people: 9800,
		},
		manager: {
			id: "1",
			fullName: "Vlad A",
			employeeId: "EID-000001",
			role: "Owner",
			email: "admin@vladdanciu.com",
			avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		},
		email: "botir.rahimov@artel.uz",
		avatar: "https://randomuser.me/api/portraits/men/12.jpg",
	},
	{
		id: "5",
		fullName: "Nodira Azimova",
		employeeId: "EID-000005",
		role: "Marketing Director",
		phone: "+998 95 567 89 01",
		status: "active",
		stores: {
			id: 2,
			name: "Korzinka",
			types: [
				{ name: "Grocery", type: "green" },
				{ name: "Retail", type: "blue" },
				{ name: "Supermarket", type: "red" },
			],
			description: "Largest supermarket chain in Uzbekistan",
			people: 8700,
		},
		manager: {
			id: "2",
			fullName: "Alisher Usmanov",
			employeeId: "EID-000002",
			role: "Regional Manager",
			email: "alisher.usmanov@korzinka.uz",
			avatar: "https://randomuser.me/api/portraits/men/10.jpg",
		},
		email: "nodira.azimova@korzinka.uz",
		avatar: "https://randomuser.me/api/portraits/women/13.jpg",
	},
];

export default peopleData;
