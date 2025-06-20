export interface Notification {
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  user: { name: string; avatar: string };
  action: string;
  target: string;
  time: string;
  status?: string;
  comment?: string;
}
