// src/content/config.ts
import { defineCollection, z } from "astro:content";

const paketCollection = defineCollection({
  type: "data", // Gunakan 'data' untuk JSON ('content' yang untuk Markdown)
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    jenistrip: z.string(),
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

const faqCollection = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          details: z.string(),
        })
      ),
    })
  ),
});

const termsCollection = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          details: z.string(),
        })
      ),
    })
  ),
});

export const collections = {
  paket: paketCollection,
  faq: faqCollection,
  terms: termsCollection,
};
