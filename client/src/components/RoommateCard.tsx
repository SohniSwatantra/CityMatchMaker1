import { Roommate } from "@/shared/schema";

interface RoommateCardProps {
  roommate: Roommate;
}

const RoommateCard = ({ roommate }: RoommateCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 mb-4 sm:mb-0">
          <div 
            className="rounded-full w-20 h-20 bg-cover bg-center mx-auto sm:mx-0"
            style={{ backgroundImage: `url(${roommate.avatarUrl})` }}
          ></div>
        </div>
        <div className="sm:w-3/4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-semibold">{roommate.name}, {roommate.age}</h4>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {roommate.matchPercentage}% match
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            {roommate.occupation} • {roommate.movingTimeframe}
          </p>
          <p className="text-gray-700 mb-4">{roommate.bio}</p>
          <div className="flex flex-wrap gap-2">
            {roommate.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;
