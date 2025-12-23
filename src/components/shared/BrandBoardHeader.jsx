"use client";

import Link from "next/link";
import { Github, ExternalLink, Play } from "lucide-react";
import StickerChip from "./StickerChip";

export default function BrandBoardHeader({ project }) {
    const { title, category, description, tags, details } = project;
    const { role, duration } = details || {};

    return (
        <header className="paper-card p-6 md:p-8 mb-8">
            {/* Tape decoration */}
            <div className="tape tape-left" />
            <div className="tape tape-right" />

            <div className="pt-4">
                {/* Top row: Title + Links */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                        <span
                            className="sticker-chip mb-3"
                            data-cat={category}
                        >
                            {category}
                        </span>
                        <h1 className="font-marker text-3xl md:text-4xl text-prime-900">
                            {title}
                        </h1>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                        {details?.github && (
                            <a
                                href={details.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sketch-btn p-3"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {details?.demo && (
                            <a
                                href={details.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sketch-btn p-3"
                                aria-label="Demo"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                        {details?.video && (
                            <a
                                href={details.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sketch-btn p-3"
                                aria-label="Video"
                            >
                                <Play className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="font-sketch text-lg text-prime-600 mb-6">
                    {description}
                </p>

                {/* Info chips row */}
                <div className="flex flex-wrap gap-2">
                    {duration && (
                        <span className="sticker-chip" style={{ color: '#f97316' }}>
                            {duration}
                        </span>
                    )}
                    {role && (
                        <span className="sticker-chip" style={{ color: '#22c55e' }}>
                            {role}
                        </span>
                    )}
                    {tags?.map(tag => (
                        <span key={tag} className="sticker-chip" style={{ color: '#3b82f6' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </header>
    );
}
