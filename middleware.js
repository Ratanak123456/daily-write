// List of common social media bot user agents
const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'Pinterest',
  'Slackbot',
  'WhatsApp',
  'TelegramBot',
  'Discordbot',
  'googlebot',
  'bingbot',
];

export default async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // 1. Check if it's a blog detail page
  const blogMatch = url.pathname.match(/^\/blogs\/([a-zA-Z0-9-]+)$/);
  
  // 2. Check if the visitor is a crawler/bot
  const isBot = BOT_USER_AGENTS.some(bot => userAgent.toLowerCase().includes(bot.toLowerCase()));

  // We only intercept if it's a blog page AND it's a bot
  if (blogMatch && isBot) {
    const uuid = blogMatch[1];
    const apiUrl = `https://blog-api.bykh.org/api/v100/blogs/${uuid}`;

    try {
      // Fetch blog data from your API
      const apiResponse = await fetch(apiUrl);
      if (!apiResponse.ok) throw new Error('Failed to fetch blog');
      
      const json = await apiResponse.json();
      const blog = json.data;
      if (!blog) throw new Error('Blog not found');

      // Fetch the original index.html from your deployment
      // We use the origin to make sure we get the right file
      const indexUrl = new URL('/index.html', request.url);
      const response = await fetch(indexUrl);
      let html = await response.text();

      // Prepare metadata
      const title = `${blog.title} | DailyWrite`;
      const description = (blog.content || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 160);
      
      // Handle thumbnail URL
      let thumbnailUrl = blog.thumbnailUrl || '';
      if (thumbnailUrl && !thumbnailUrl.startsWith('http')) {
        const apiBaseUrl = 'https://blog-api.bykh.org/api/v100';
        thumbnailUrl = `${apiBaseUrl}/medias/view/${thumbnailUrl.replace(/^\/+/, '')}`;
      }

      const currentUrl = request.url;

      // Replace meta tags using regex
      html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      
      // Update Open Graph tags
      html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${description}" />`);
      html = html.replace(/<meta property="og:image" content=".*?" \/>/g, `<meta property="og:image" content="${thumbnailUrl}" />`);
      html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${currentUrl}" />`);
      
      // Update Twitter tags
      html = html.replace(/<meta property="twitter:title" content=".*?" \/>/g, `<meta property="twitter:title" content="${title}" />`);
      html = html.replace(/<meta property="twitter:description" content=".*?" \/>/g, `<meta property="twitter:description" content="${description}" />`);
      html = html.replace(/<meta property="twitter:image" content=".*?" \/>/g, `<meta property="twitter:image" content="${thumbnailUrl}" />`);

      // Return the modified HTML
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    } catch (error) {
      console.error('Middleware Error:', error);
      // Fallback: if API fails or something goes wrong, just let it pass through
      return fetch(request);
    }
  }

  // For regular users or non-blog pages, just continue as normal
  return fetch(request);
}

// Vercel config for middleware
export const config = {
  matcher: '/blogs/:path*',
};
