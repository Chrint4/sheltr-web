import TeamMember from "@/components/team/TeamMember";
import Image from "next/image";

export const metadata = {
  title: "About Us"
};

const AboutUs = () => {
  return (
    <>
    <section className="gradient-bg pt-6 pb-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="mb-16 max-w-4xl mx-auto">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center p-6">
            {"\"Our mission is to empower homeless and vulnerable individuals in the UK by providing easy access to essential resources like shelters, food banks, and public facilities.\""}
          </blockquote>

          <div className="relative flex flex-col md:flex-row items-stretch gap-6">
            {/* Text container */}
            <div className="bg-white/80 rounded-lg shadow-md p-6 md:w-1/2 relative z-0 md:min-h-[400px]">
              <p className="text-lg md:text-xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
                {/* Add more text to demonstrate wrapping */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum voluptatem doloremque officiis temporibus. Natus quibusdam dolores iure esse quisquam ratione voluptates temporibus repudiandae ullam magnam.
              </p>
            </div>

            {/* Image container */}
            <div className="md:w-1/2 md:absolute md:right-0 md:top-0 md:h-full md:-translate-y-8 md:-translate-x-8 z-10">
              <div className="relative overflow-hidden rounded-lg shadow-md h-full">
                <Image
                  src="/aboutus1.jpg"
                  alt="Food bank shelves"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Meet the Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember />
            <TeamMember />
            <TeamMember />
            <TeamMember />
            <TeamMember />
            <TeamMember />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
