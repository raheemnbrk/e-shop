"use client"

import BestDeals from "@/components/features/home/bestDeals"
import CategorySection from "@/components/features/home/categories"
import HeroCarousel from "@/components/features/home/heroCarousel"
import NewArrivals from "@/components/features/home/newArrivals"
import TopSelling from "@/components/features/home/topSellingProducts"
import WhyDealWithUs from "@/components/features/home/whyDealWithUs"
import HomeSkeleton from "@/components/loading/homeSkeleton"
import { useGetHomePageData } from "@/lib/hooks/products/useGetHomePageData"

export default function Home() {
    const { data, isLoading } = useGetHomePageData()

    if (isLoading) return <HomeSkeleton />
    
    return (
        <div className="flex flex-col space-y-6" >
            <HeroCarousel />
            <CategorySection categories={data?.categoriesWithCount ?? []} />
            <BestDeals products={data?.bestDeals ?? []} />
            <NewArrivals products={data?.newArrivals ?? []} />
            <TopSelling products={data?.topSelling ?? []} />
            <WhyDealWithUs />
        </div>
    )
}