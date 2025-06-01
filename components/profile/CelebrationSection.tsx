import { Bell } from "lucide-react";

const celebrations = [
  {
    type: "Friend's Birthday",
    date: "Jun 25, 2028",
    icon: "🎂",
  },
  {
    type: "Holiday",
    date: "Jun 28, 2028",
    icon: "🌙",
  },
  {
    type: "Group Meetup",
    date: "Aug 19, 2028",
    icon: "👥",
  },
];

const CelebrationSection = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Celebrations</h3>
        <button>
          <Bell className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="space-y-4">
        {celebrations.map((celebration, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl">
                {celebration.icon}
              </div>
              <div>
                <h4 className="font-medium">{celebration.type}</h4>
                <p className="text-sm text-gray-500">{celebration.date}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebrationSection;
