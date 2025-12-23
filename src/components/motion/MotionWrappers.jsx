"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// Shared element wrapper for project cards
export function MotionCard({ children, layoutId, className = "", ...props }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className} {...props}>{children}</div>;
    }

    return (
        <motion.article
            layoutId={layoutId}
            className={className}
            layout
            transition={{
                layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
            {...props}
        >
            {children}
        </motion.article>
    );
}

// Shared thumbnail wrapper
export function MotionThumbnail({ children, layoutId, className = "" }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            layoutId={layoutId}
            className={className}
            transition={{
                layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
        >
            {children}
        </motion.div>
    );
}

// Shared title wrapper
export function MotionTitle({ children, layoutId, className = "", as: Tag = "h3" }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <Tag className={className}>{children}</Tag>;
    }

    const MotionTag = motion[Tag];

    return (
        <MotionTag
            layoutId={layoutId}
            className={className}
            transition={{
                layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
        >
            {children}
        </MotionTag>
    );
}

// Scroll reveal wrapper with whileInView
export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    y = 16,
    blur = false
}) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{
                y,
                opacity: 0,
                filter: blur ? 'blur(4px)' : 'none'
            }}
            whileInView={{
                y: 0,
                opacity: 1,
                filter: 'blur(0px)'
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.4,
                delay: delay / 1000,
                ease: [0.25, 0.1, 0.25, 1]
            }}
        >
            {children}
        </motion.div>
    );
}

// Hover lift animation for cards
export function HoverLift({ children, className = "" }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            whileHover={{
                y: -6,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.div>
    );
}
