"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
const languages = [
  {
    code: "id",
    name: "Indonesia",
    flag: "🇮🇩",
  },
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "th",
    name: "Thailand",
    flag: "🇹🇭",
  },
  {
    code: "cn",
    name: "Chinese",
    flag: "🇨🇳",
  },
];

export default function LanguagePage() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setShowLanguageModal(false);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/settings" className="text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Language</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-600 mb-6">
            Select your preferred language for the application interface
          </p>

          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentLanguage?.flag}</span>
              <span className="font-medium">{currentLanguage?.name}</span>
            </div>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </button>
        </div>
      </div>

      <Dialog open={showLanguageModal} onOpenChange={setShowLanguageModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="h-5 w-5 text-amber-500" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowLanguageModal(false)}
            className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 mt-4"
          >
            Select
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}