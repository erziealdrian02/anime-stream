import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import CategorySection from '../components/CategorySection';
import TrendingSection from '../components/TrendingSection';
import RecommendedSection from '../components/RecommendedSection';
import NewReleasesSection from '../components/NewReleasesSection';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <FeaturedSection />
        <TrendingSection />
        <CategorySection />
        <RecommendedSection />
        <NewReleasesSection />
      </div>
    </div>
  );
}

export default HomePage;
