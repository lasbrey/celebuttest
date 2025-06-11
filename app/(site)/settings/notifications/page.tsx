'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { settingsApi } from '@/services/api/apiClient';
import { Switch } from '@/components/ui/switch'; // your radix switch import

export default function NotificationsSettingsPage() {
    const { toast } = useToast();

    // States for notification toggles (default false)
    const [commentNotif, setCommentNotif] = useState(false);
    const [dmNotif, setDmNotif] = useState(false);
    const [likesNotif, setLikesNotif] = useState(false);
    const [liveNotif, setLiveNotif] = useState(false);
    const [newFollowerNotif, setNewFollowerNotif] = useState(false);
    const [pushNotif, setPushNotif] = useState(false);
    const [repostNotif, setRepostNotif] = useState(false);
    const [tagsMentionNotif, setTagsMentionNotif] = useState(false);

    const [loading, setLoading] = useState(false);

    // Helper function to handle toggling with API calls
    const handleToggle = async (
        currentValue: boolean,
        toggleApiCall: () => Promise<any>,
        setState: React.Dispatch<React.SetStateAction<boolean>>,
        successMessage: string,
        errorMessage: string
    ) => {
        setLoading(true);
        try {
            await toggleApiCall();
            setState(!currentValue);
            toast({ title: successMessage });
        } catch {
            toast({ title: errorMessage, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center space-x-3 mb-6">
                <Link href="/settings" className="text-gray-600">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-semibold">Notification Settings</h1>
            </div>
            <div className="space-y-4">
                {[
                    {
                        label: 'Comments',
                        checked: commentNotif,
                        toggle: () =>
                            handleToggle(
                                commentNotif,
                                settingsApi.toggleCommentNotification,
                                setCommentNotif,
                                'Comment notifications toggled',
                                'Failed to toggle comment notifications'
                            ),
                    },
                    {
                        label: 'Direct Messages',
                        checked: dmNotif,
                        toggle: () =>
                            handleToggle(
                                dmNotif,
                                settingsApi.toggleDirectMessageNotification,
                                setDmNotif,
                                'Direct message notifications toggled',
                                'Failed to toggle direct message notifications'
                            ),
                    },
                    {
                        label: 'Likes',
                        checked: likesNotif,
                        toggle: () =>
                            handleToggle(
                                likesNotif,
                                settingsApi.toggleLikesNotification,
                                setLikesNotif,
                                'Likes notifications toggled',
                                'Failed to toggle likes notifications'
                            ),
                    },
                    {
                        label: 'Live Videos',
                        checked: liveNotif,
                        toggle: () =>
                            handleToggle(
                                liveNotif,
                                settingsApi.toggleLiveNotification,
                                setLiveNotif,
                                'Live notifications toggled',
                                'Failed to toggle live notifications'
                            ),
                    },
                    {
                        label: 'New Followers',
                        checked: newFollowerNotif,
                        toggle: () =>
                            handleToggle(
                                newFollowerNotif,
                                settingsApi.toggleNewFollowerNotification,
                                setNewFollowerNotif,
                                'New follower notifications toggled',
                                'Failed to toggle new follower notifications'
                            ),
                    },
                    {
                        label: 'Push Notifications',
                        checked: pushNotif,
                        toggle: () =>
                            handleToggle(
                                pushNotif,
                                settingsApi.togglePushNotification,
                                setPushNotif,
                                'Push notifications toggled',
                                'Failed to toggle push notifications'
                            ),
                    },
                    {
                        label: 'Reposts',
                        checked: repostNotif,
                        toggle: () =>
                            handleToggle(
                                repostNotif,
                                settingsApi.toggleRepostNotification,
                                setRepostNotif,
                                'Repost notifications toggled',
                                'Failed to toggle repost notifications'
                            ),
                    },
                    {
                        label: 'Tags & Mentions',
                        checked: tagsMentionNotif,
                        toggle: () =>
                            handleToggle(
                                tagsMentionNotif,
                                settingsApi.toggleTagsAndMentionNotification,
                                setTagsMentionNotif,
                                'Tags & mention notifications toggled',
                                'Failed to toggle tags & mention notifications'
                            ),
                    },
                ].map(({ label, checked, toggle }) => (
                    <div
                        key={label}
                        className="flex items-center justify-between p-4 bg-white rounded-lg"
                    >
                        <span className="font-medium">{label}</span>
                        <Switch
                            checked={checked}
                            onCheckedChange={toggle}
                            disabled={loading}
                            aria-label={`Toggle ${label} notifications`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
