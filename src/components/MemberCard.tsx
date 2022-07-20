import { IoIosClose } from "react-icons/io";

interface MemberCardProps {
  member: any;
  database: string;
  dropMember: any;
}

export const MemberCard = ({ member, dropMember }: MemberCardProps) => {
  return (
    <div
      onClick={dropMember}
      className='w-32 lg:w-48 h-8 bg-gray-700 hover:bg-red-500  duration-100 cursor-pointer rounded-sm flex items-center justify-between px-1'
    >
      <p className='text-sm text-gray-200 font-medium truncate'>
        {member?.name}
      </p>
      <IoIosClose size={24} color=' rgb(229 231 235)' />
    </div>
  );
};
