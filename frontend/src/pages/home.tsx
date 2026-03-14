import CallToAction from "../components/home/callToAction";
import Categories from "../components/home/categories";
import Features from "../components/home/features";
import Hero from "../components/home/hero";
import Trending from "../components/home/trending";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Trending />
      <CallToAction />
    </>
  );
}
