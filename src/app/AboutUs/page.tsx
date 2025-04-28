import TeamMember from "@/components/team/TeamMember";
import Image from "next/image";

export const metadata = {
  title: "About Us"
};

const teamMembers = [
  {
    image: "/person1.jpg",
    name: "Ben Smith",
    role: "Founder & CEO"
  },
  {
    image: "/person2.jpg",
    name: "David Patel",
    role: "Operations Manager"
  },
  {
    image: "/person3.jpg",
    name: "Clara Lee",
    role: "Community Outreach"
  },
  {
    image: "/person4.jpg",
    name: "Alice Johnson",
    role: "Tech Lead"
  },
  {
    image: "/person5.jpg",
    name: "Emily Davis",
    role: "Fundraising Coordinator"
  },
  {
    image: "/person6.jpg",
    name: "Frank Wright",
    role: "Volunteer Coordinator"
  }
];

const AboutUs = () => {
  return (
    <>
    <section className="gradient-bg pt-6 pb-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* statement */}
        <div className="mb-16 max-w-4xl mx-auto">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 text-center p-6">
            {"\"Our mission is to empower homeless and vulnerable individuals in the UK by providing easy access to essential resources like shelters, food banks, and public facilities.\""}
          </blockquote>

          <div className="relative flex flex-col md:flex-row items-stretch gap-6">
            {/* text block */}
            <div className="bg-white/80 rounded-lg shadow-md p-6 md:w-1/2 relative z-0 md:min-h-[400px]">
              <p className="text-lg md:text-xl leading-tight pr-5">
                At <span className="font-semibold">Sheltr</span>, we believe that everyone deserves easy access to the support they need.
                <br /><br />
                Whether it’s finding a safe place to stay or locating the nearest food bank, our platform connects vulnerable individuals to trusted resources across the UK.
                <br /><br />
                Our goal is to make the process of finding help as simple, clear, and supportive as possible — giving people the tools they need to move forward.
              </p>
            </div>

            {/* image block */}
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
        
        {/* meet the team */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.name}
                image={member.image}
                name={member.name}
                role={member.role}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
