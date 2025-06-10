import { PostsList } from "@/components/posts/PostsList";
import Stories from "@/components/celebration/Stories";
import PostInput from "@/components/Timeline/PostInput";

export default function DashboardPage() {
  return (
    <>
      <Stories />
      <PostInput />
      <PostsList />
    </>
  );
}