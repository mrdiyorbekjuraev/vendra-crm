"use client";
import { memo } from "react";
import InstructionCard from "./customs/card";

export const instructionData = [
  {
    title: "Add Your First Branch",
    description:
      "Set up your store's physical or virtual location. This is where you’ll assign workers and manage products.",
  },
  {
    title: "Register Employees",
    description:
      "Invite your workers to the system and assign them to specific branches with proper roles and permissions.",
  },
  {
    title: "Define User Roles",
    description:
      "Create roles like Manager, Cashier, or Inventory Staff to control access to features and data.",
  },
  {
    title: "Add Products to Inventory",
    description:
      "Input your available products, assign categories, and track stock levels in real-time.",
  },
  {
    title: "Organize Inventory Locations",
    description:
      "Map your inventory to shelves or storage units within each branch for easier management and tracking.",
  },
  {
    title: "Monitor Stock Levels",
    description:
      "Enable alerts or low-stock warnings to prevent out-of-stock scenarios.",
  },
  {
    title: "Generate Sales Reports",
    description:
      "Access daily, weekly, or monthly reports to analyze performance across branches and products.",
  },
  {
    title: "Assign Worker Schedules",
    description:
      "Set working hours, shifts, and responsibilities to keep your team organized and productive.",
  },
  {
    title: "Enable Branch Permissions",
    description:
      "Control which roles can access settings, products, or employee data at each branch level.",
  },
];

const Instructions = memo(() => {
  return (
    <div className="flex flex-col gap-2">
      <span className="px-4">Instructions</span>
      <div className="h-[calc(100vh-300px)] overflow-y-auto flex flex-col gap-2 px-4">
        {instructionData.map((item, idx) => (
          <InstructionCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
});

export default Instructions;
