"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.8,             // Slower, more intentional scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like ease
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,      // Softer wheel response
            touchMultiplier: 2,
            infinite: false,
        });

        const raf = (time: number) => {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
            }
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
        };
    }, []);

    return <>{children}</>;
}
