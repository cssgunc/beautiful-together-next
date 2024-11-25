export const handler = async (req: Request): Promise<Response> => {
    const response = await fetch('https://your-hosted-script-url.com/scrape', {
        method: 'GET', // or POST depending on your API
    });

    if (!response.ok) {
        return new Response('Failed to invoke scraper', { status: response.status });
    }

    const data = await response.text();
    return new Response(`Scraper executed: ${data}`, { status: 200 });
};