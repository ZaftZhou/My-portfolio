"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PolaroidGallery({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    if (!images.length) return null;

    const next = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            rotate: direction > 0 ? 8 : -8,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            zIndex: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            rotate: direction < 0 ? 8 : -8,
            opacity: 0,
            scale: 0.9,
            zIndex: 0,
        }),
    };

    const currentImage = images[currentIndex];
    const imageUrl = typeof currentImage === 'string' ? currentImage : currentImage?.url;
    const caption = typeof currentImage === 'string' ? null : currentImage?.caption;

    return (
        <div className="relative">
            {/* Polaroid stack */}
            <div className="relative aspect-[4/3] mb-4">
                {/* Background polaroids (static stack effect) */}
                <div
                    className="absolute inset-0 bg-white border border-prime-200 shadow-md"
                    style={{ transform: 'rotate(3deg) translate(8px, 8px)', zIndex: -2 }}
                />
                <div
                    className="absolute inset-0 bg-white border border-prime-200 shadow-sm"
                    style={{ transform: 'rotate(-2deg) translate(4px, 4px)', zIndex: -1 }}
                />

                {/* Active polaroid */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
                        className="polaroid absolute inset-0 cursor-pointer"
                        onClick={next}
                    >
                        <div className="relative w-full h-full bg-prime-100">
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt={caption || `Image ${currentIndex + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Caption */}
            <div className="text-center">
                <p className="font-sketch text-lg text-prime-600">
                    {caption || `${currentIndex + 1} / ${images.length}`}
                </p>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full border-2 border-prime-900 transition-all ${index === currentIndex
                                ? 'bg-sketch-yellow scale-110'
                                : 'bg-white hover:bg-prime-200'
                            }`}
                        aria-label={`View image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Arrow buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border-2 border-prime-900 rounded-full hover:bg-sketch-yellow transition-colors"
                        aria-label="Previous image"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white border-2 border-prime-900 rounded-full hover:bg-sketch-yellow transition-colors"
                        aria-label="Next image"
                    >
                        →
                    </button>
                </>
            )}
        </div>
    );
}
