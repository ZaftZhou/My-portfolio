import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/projects/[id] - Get single project
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id },
        });
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

// PUT /api/projects/[id] - Update project
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const project = await prisma.project.update({
            where: { id },
            data: {
                slug: body.slug,
                title: body.title,
                category: body.category,
                description: body.description,
                tags: body.tags,
                featured: body.featured,
                color: body.color,
                content: body.content,
            },
        });
        return NextResponse.json(project);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        await prisma.project.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
