import MapClient from "@/components/map/MapPageClient"

export default function Home() {
  return (
    <section className="gradient-bg py-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <MapClient />
      </div>
    </section>
  );
};