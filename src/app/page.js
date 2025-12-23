import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import ContactSection from "@/components/home/ContactSection";
import BinderProgress from "@/components/shared/BinderProgress";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <BinderProgress />
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <ExperienceTimeline />
      <ContactSection />
    </main>
  );
}

