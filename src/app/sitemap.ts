import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://asifahsan.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/expertise`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contacts`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/hire-me`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
    ];
}
