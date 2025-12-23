"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const CATEGORY_COLORS = {
    'Game Dev': '#3b82f6',
    'Shaders': '#a855f7',
    'Simulator': '#f97316',
    '3D Art': '#ec4899',
    'Tools': '#22c55e',
};

export default function ProjectCard({ project, index = 0 }) {
    const { id, slug, title, category, description, tags, details, color } = project;
    const categoryColor = CATEGORY_COLORS[category] || '#2d251d';
    const shouldReduceMotion = useReducedMotion();

    // More varied rotation for stacked paper feel (-1° to +1.5°)
    const rotations = [-1, 0.8, -0.5, 1.2, -0.8, 1.5];
    const rotation = rotations[index % rotations.length];

    // Y-offset for depth (8-16px)
    const yOffsets = [0, 12, 6, 16, 8, 14];
    const yOffset = yOffsets[index % yOffsets.length];

    const CardWrapper = shouldReduceMotion ? 'article' : motion.article;
    const cardProps = shouldReduceMotion ? {} : {
        layoutId: `card-${id}`,
        whileHover: { y: -8, rotate: 0, scale: 1.02 },
        transition: { duration: 0.2 }
    };

    return (
        <Link
            href={`/portfolio/${slug}`}
            className="group block"
            style={{ marginTop: `${yOffset}px` }}
        >
            <CardWrapper
                className="paper-card corner-peel paperclip overflow-hidden relative"
                style={{ transform: `rotate(${rotation}deg)` }}
                {...cardProps}
            >
                {/* Tape decoration */}
                <div
                    className="tape tape-top"
                    style={{ transform: `translateX(-50%) rotate(${index % 2 === 0 ? -3 : 3}deg)` }}
                />

                {/* Thumbnail with shared element */}
                {shouldReduceMotion ? (
                    <div className="relative aspect-video bg-prime-100 overflow-hidden border-b-2 border-prime-900">
                        <ThumbnailContent project={project} />
                        <NumberBadge index={index} />
                    </div>
                ) : (
                    <motion.div
                        layoutId={`thumb-${id}`}
                        className="relative aspect-video bg-prime-100 overflow-hidden border-b-2 border-prime-900"
                    >
                        <ThumbnailContent project={project} />
                        <NumberBadge index={index} />
                    </motion.div>
                )}

                {/* Content */}
                <div className="p-5 bg-white">
                    {/* Category chip */}
                    <span
                        className="sticker-chip mb-3"
                        data-cat={category}
                        style={{ color: categoryColor }}
                    >
                        {category}
                    </span>

                    {/* Title with shared element */}
                    {shouldReduceMotion ? (
                        <h3 className="font-marker text-xl text-prime-900 mb-2 group-hover:text-sketch-coral transition-colors">
                            {title}
                        </h3>
                    ) : (
                        <motion.h3
                            layoutId={`title-${id}`}
                            className="font-marker text-xl text-prime-900 mb-2 group-hover:text-sketch-coral transition-colors"
                        >
                            {title}
                        </motion.h3>
                    )}

                    <p className="font-sketch text-prime-600 line-clamp-2 text-lg mb-4">
                        {description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags?.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="text-xs font-medium text-prime-600 border border-prime-300 px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </CardWrapper>
        </Link>
    );
}

function ThumbnailContent({ project }) {
    const { title, details, color } = project;

    if (details?.media?.[0]?.url) {
        return (
            <Image
                src={details.media[0].type === 'video'
                    ? details.media[0].poster || details.media[1]?.url
                    : details.media[0].url}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        );
    }

    return <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`} />;
}

function NumberBadge({ index }) {
    return (
        <div className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white border-2 border-prime-900 rounded-full">
            <span className="font-marker text-sm text-prime-900">
                {String(index + 1).padStart(2, '0')}
            </span>
        </div>
    );
}
