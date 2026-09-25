import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Cada proyecto es un archivo .md en src/content/proyectos/.
// El nombre del archivo es la URL: logistica.md → /proyectos/logistica/
const metric = z.object({ value: z.string(), label: z.string() });

const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proyectos" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      sector: z.string(),
      summary: z.string(),
      categories: z.array(z.enum(["web", "movil", "intranet", "dashboard", "integracion", "modernizacion"])).min(1),
      tags: z.array(z.string()),
      cover: image(),
      coverAlt: z.string(),
      metrics: z.array(metric).max(2),
      challenge: z.string(),
      solution: z.string(),
      results: z.array(metric).max(3),
      stack: z.array(z.string()),
      duration: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { proyectos };
