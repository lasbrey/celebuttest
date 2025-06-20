'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { settingsApi } from '@/services/api/apiClient';
import { useToast } from '@/hooks/use-toast';

const interests = [
  { key: 'news-and-event', label: 'News and Events' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'history', label: 'History' },
  { key: 'personal-development', label: 'Personal Development' },
  { key: 'humor-and-memes', label: 'Humor and Memes' },
  { key: 'sports', label: 'Sports' },
  { key: 'science', label: 'Science' },
  { key: 'animals', label: 'Animals' },
  { key: 'education', label: 'Education' },
  { key: 'technology', label: 'Technology' },
  { key: 'product-and-brand', label: 'Product and Brand' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'scary-things', label: 'Scary Things' },
  { key: 'movies', label: 'Movies' },
  { key: 'music', label: 'Music' },
];

export default function InterestsPage() {
  const { toast } = useToast();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Load saved interests from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('areas_of_interest');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedInterests(parsed);
        }
      } catch {
        // invalid JSON, ignore
      }
    }
  }, []);

  const toggleInterest = (key: string) => {
    setSelectedInterests((prev) => {
      let updated;
      if (prev.includes(key)) {
        updated = prev.filter((k) => k !== key);
      } else {
        updated = [...prev, key];
      }
      // Save updated interests to localStorage
      localStorage.setItem('areas_of_interest', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSave = async () => {
    if (selectedInterests.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one area of interest.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await settingsApi.setAreaOfInterests({
        areas_of_interest: selectedInterests,
      });
      toast({
        title: 'Success',
        description: 'Your areas of interest have been saved.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save interests. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/settings" className="text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Choose Your Areas of Interest</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 mb-6">
            Customize your feed by following topics that interest you the most.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {interests.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleInterest(key)}
                className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
                  selectedInterests.includes(key)
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'hover:bg-gray-100 border-gray-300 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
