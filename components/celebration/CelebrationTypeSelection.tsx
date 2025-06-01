"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface CelebrationTypeSelectionProps {
  onContinue: () => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const celebrationTypes = [
  { id: "custom", label: "Customize Your Event" },
  { id: "birthday", label: "Birthday" },
  { id: "babyShower", label: "Baby Shower" },
  { id: "newBaby", label: "Arrival of New Baby" },
  { id: "engaged", label: "Engaged" },
  { id: "wedding", label: "Wedding Ceremony" },
  { id: "anniversary", label: "Wedding Anniversary" },
  { id: "graduation", label: "Graduation" },
  { id: "fathersDay", label: "Father's Day" },
  { id: "mothersDay", label: "Mother's Day" },
  { id: "getWell", label: "Get Well Soon" },
  { id: "tributes", label: "Tributes" },
  { id: "condolences", label: "Condolences" },
];

const CelebrationTypeSelection: React.FC<CelebrationTypeSelectionProps> = ({ onContinue, selectedType, setSelectedType }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm max-w-4xl mx-auto ">
      <h1 className="text-2xl font-semibold mb-2">Create Celebration</h1>
      <p className="text-gray-600 mb-6">Select Category of celebration to create from the options displayed below</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-3">
        {celebrationTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-3 rounded-lg bg-gray-50/50 p-4 hover:bg-gray-50">
            <RadioGroupItem value={type.id} id={type.id} />
            <Label htmlFor={type.id} className="flex-1 cursor-pointer">{type.label}</Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onContinue}
          disabled={!selectedType}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CelebrationTypeSelection;