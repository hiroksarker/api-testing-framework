import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
});

export type Post = z.infer<typeof PostSchema>;

export const PostsSchema = z.array(PostSchema);