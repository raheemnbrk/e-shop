"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Slide {
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    cta: string;
    href: string;
    gradient: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: "1",
        title: "Fresh Groceries Delivered",
        subtitle: "Get 20% off on your first order. Farm-fresh produce at your doorstep.",
        badge: "New User Offer",
        cta: "Shop Groceries",
        href: "/products?category=groceries",
        gradient: "from-emerald-600/90 via-teal-600/80 to-cyan-700/90",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80",
    },
    {
        id: "2",
        title: "Summer Sale is Live",
        subtitle: "Up to 50% off on selected items. Limited time only.",
        badge: "Hot Deal",
        cta: "Grab the Deal",
        href: "/products?sort=discount",
        gradient: "from-orange-600/90 via-red-600/80 to-pink-700/90",
        image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1600&q=80",
    },
    {
        id: "3",
        title: "New Arrivals Just Dropped",
        subtitle: "Be the first to shop our latest collection.",
        badge: "Just In",
        cta: "Explore Now",
        href: "/products?sort=newest",
        gradient: "from-violet-600/90 via-purple-600/80 to-fuchsia-700/90",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    },
    {
        id: "4",
        title: "Free Shipping on $50+",
        subtitle: "No minimum on selected items. Fast delivery guaranteed.",
        badge: "Limited Time",
        cta: "Start Shopping",
        href: "/products",
        gradient: "from-blue-600/90 via-indigo-600/80 to-violet-700/90",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    },
];

export default function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);

    React.useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi || isPaused) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [emblaApi, isPaused]);

    const scrollTo = (index: number) => {
        emblaApi?.scrollTo(index);
    };

    return (
        <section
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="relative min-w-0 shrink-0 grow-0 basis-full"
                        >
                            <div className="relative h-80 md:h-105 lg:h-125 w-full">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />

                                <div
                                    className={cn(
                                        "absolute inset-0 bg-linear-to-r",
                                        slide.gradient
                                    )}
                                />

                                <div className="relative z-10 flex h-full items-center px-8 md:px-16">
                                    <div className="max-w-2xl">
                                        <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mb-4">
                                            {slide.badge}
                                        </span>

                                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                                            {slide.title}
                                        </h1>

                                        <p className="text-white/90 text-sm md:text-lg mb-8 max-w-lg">
                                            {slide.subtitle}
                                        </p>

                                        <Link
                                            href={slide.href}
                                            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm md:text-base font-semibold text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
                                        >
                                            {slide.cta}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300 cursor-pointer",
                            index === selectedIndex
                                ? "w-8 bg-white"
                                : "w-2 bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}