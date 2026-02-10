import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    author: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
