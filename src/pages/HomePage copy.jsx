import Hero from '../components/Hero';
import OngoingSection from '../components/OngoingSection';
import CategorySection from '../components/CategorySection';
import CompleteSection from '../components/CompleteSection';
import RecommendedSection from '../components/RecommendedSection';
import NewReleasesSection from '../components/NewReleasesSection';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <OngoingSection />
        <CompleteSection />
        <CategorySection />
        <RecommendedSection />
        <NewReleasesSection />
      </div>
    </div>
  );
}

export default HomePage;
