import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hayesdanceclass.co.uk",
      lastModified: new Date(),
    },
  ];
}
