/**
 * UBUYHERE API - 链接解析
 * Vercel Serverless Function
 */

const PLATFORM_PATTERNS = {
  taobao: [/item\.taobao\.com\/item\.htm\?.*id=(\d+)/, /taobao\.com.*?id=(\d+)/],
  tmall: [/detail\.tmall\.com\/item\.htm\?.*id=(\d+)/, /tmall\.com.*?id=(\d+)/],
  jd: [/item\.jd\.com\/(\d+)\.html/, /jd\.com.*?\/(\d+)\.html/],
  pinduoduo: [/yangkeduo\.com.*?goods_id=(\d+)/, /pinduoduo\.com.*?goods_id=(\d+)/]
};

function parseUrl(url) {
  if (!url) return { error: 'URL is required', success: false };

  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return { platform, productId: match[1], originalUrl: url, success: true };
      }
    }
  }

  // 域名检测
  if (url.includes('taobao') || url.includes('tb.cn')) {
    return { platform: 'taobao', originalUrl: url, needsRedirect: true, success: true };
  }
  if (url.includes('tmall')) {
    return { platform: 'tmall', originalUrl: url, needsRedirect: true, success: true };
  }
  if (url.includes('jd.com')) {
    return { platform: 'jd', originalUrl: url, needsRedirect: true, success: true };
  }

  return { error: 'Unsupported platform', success: false };
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, text } = req.body || {};
  
  // 从文本提取URL
  if (text && !url) {
    const urlMatch = text.match(/(https?:\/\/[^\s\u4e00-\u9fa5]+)/);
    if (urlMatch) {
      const result = parseUrl(urlMatch[0]);
      return res.status(200).json(result);
    }
    return res.status(200).json({ error: 'No URL found in text', success: false });
  }

  const result = parseUrl(url);
  res.status(200).json(result);
}
