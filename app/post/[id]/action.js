"use server";
import { posts } from './data';
import { revalidatePath } from "next/cache";



export async function addComment(postId, formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = formData.get("text").toString();
      if (!text || text.trim() === "") {
        resolve();
      }
      const post = posts.find((p) => p.id === postId);
      if (!post) {
        resolve();
      }

      if (post) {
        post.comments.push({
          id: `c${post.comments.length + 1}`,
          text: text.trim(),
        });
        revalidatePath(`/posts/${postId}`);
        resolve();
      }
    }, 500);
  });
}
