import Image from "next/image";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

const TeamMember = ({ image, name, role }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/*image*/}
      <div className="w-48 h-48 rounded-lg overflow-hidden shadow-md bg-white/80 mb-4">
        <Image
          src={image}
          alt={`Photo of ${name}`}
          width={192}
          height={192}
          className="object-cover w-full h-full"
        />
      </div>

      {/*description*/}
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  );
};

export default TeamMember;