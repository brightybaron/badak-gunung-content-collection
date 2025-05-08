// src/content/config.ts
import { defineCollection, z } from "astro:content";

const paketCollection = defineCollection({
  type: "data", // Gunakan 'data' untuk JSON (bukan 'content' yang untuk Markdown)
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    jenistrip: z.string(),
    // category: z.string(),
    // ispromo: z.boolean(),
    meetingpoint: z.array(z.string()),
    location: z.string(),
    descriptions: z.array(
      z.object({
        text: z.string(),
      })
    ),
    images: z.array(
      z.object({
        url: z.string(),
      })
    ),
    destinasi: z.array(z.string()),
    itineraries: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({
            time: z.string(),
            details: z.string(),
          })
        ),
      })
    ),
    price: z.array(z.string()),
    fasilitas: z.object({
      include: z.array(z.string()),
      exclude: z.array(z.string()),
    }),
  }),
});

export const collections = {
  paket: paketCollection,
};
