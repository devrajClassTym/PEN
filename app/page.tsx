import Hero from "@/components/home/hero";
import Campus from "@/components/home/campus";
import WhyPen from "@/components/home/whyPen";
import Gallery from "@/components/home/gallery";
import UpcomingEvents from "@/components/home/upcomingEvents";
import FounderDesk from "@/components/home/founderDesk";
import ParentReview from "@/components/home/parentReview";
import EnquiryForm from "@/components/home/enquiryForm";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <Hero />
      <Campus />
      <WhyPen />
      <FounderDesk />
      <Gallery />
      <ParentReview />
      <UpcomingEvents />
      <EnquiryForm />
    </main>
  );
}
