import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/projects - List all projects
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects. Is the database connected?" },
            { status: 500 }
        );
    }
}

// POST /api/projects - Create a new project
export async function POST(request) {
    try {
        const body = await request.json();
        const project = await prisma.project.create({
            data: {
                slug: body.slug,
                title: body.title,
                category: body.category,
                description: body.description,
                tags: body.tags || [],
                featured: body.featured || false,
                color: body.color || "from-cyan-500 to-blue-600",
                content: body.content || {},
            },
        });
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}
