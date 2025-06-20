'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';
import { settingsApi } from '@/services/api/apiClient';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
  { code: 'cn', name: 'Chinese', flag: '🇨🇳' },
];

export default function LanguagePage() {
  const { toast } = useToast();

  // saved language (used for display and persistent storage)
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // temp language for modal selection only
  const [tempSelectedLanguage, setTempSelectedLanguage] = useState('en');

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // On mount, load saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setSelectedLanguage(savedLang);
      setTempSelectedLanguage(savedLang);
    }
  }, []);

  // When modal opens, reset tempSelectedLanguage to saved one
  useEffect(() => {
    if (showLanguageModal) {
      setTempSelectedLanguage(selectedLanguage);
    }
  }, [showLanguageModal, selectedLanguage]);

  // Update tempSelectedLanguage on language button click inside modal
  const handleTempSelect = (code: string) => {
    setTempSelectedLanguage(code);
  };

  // Save selection on confirm button click
  const handleConfirmSelection = async () => {
    try {
      await settingsApi.addLanguage({ language: tempSelectedLanguage });
      localStorage.setItem('preferredLanguage', tempSelectedLanguage);
      setSelectedLanguage(tempSelectedLanguage);
      setShowLanguageModal(false);

      toast({
        title: 'Language Updated',
        description: `Language set to ${languages.find(l => l.code === tempSelectedLanguage)?.name}`,
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update language. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

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
                onClick={() => handleTempSelect(language.code)}
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {tempSelectedLanguage === language.code && (
                  <Check className="h-5 w-5 text-amber-500" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirmSelection}
            className="w-full bg-amber-400 text-white py-2 rounded-lg hover:bg-amber-500 mt-4"
          >
            Select
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
