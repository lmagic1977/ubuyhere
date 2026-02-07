/**
 * UBUYHERE API - 商品链接解析
 * 支持淘宝、天猫、京东、拼多多
 */

const PLATFORM_PATTERNS = {
  taobao: [
    /item\.taobao\.com\/item\.htm\?.*id=(\d+)/,
    /taobao\.com.*?id=(\d+)/,
    /m\.tb\.cn\/[\w.-]+/,
    /a\.m\.taobao\.com\/i(\d+)/
  ],
  tmall: [
    /detail\.tmall\.com\/item\.htm\?.*id=(\d+)/,
    /tmall\.com.*?id=(\d+)/,
    /detail\.tmall\.hk\/.*?id=(\d+)/
  ],
  jd: [
    /item\.jd\.com\/(\d+)\.html/,
    /m\.jd\.com\/product\/(\d+)/,
    /jd\.com.*?\/(\d+)\.html/
  ],
  pinduoduo: [
    /yangkeduo\.com.*?goods_id=(\d+)/,
    /pinduoduo\.com.*?goods_id=(\d+)/,
    /mobile\.yangkeduo\.com\/goods.*?(\d{10,})/
  ],
  '1688': [
    /detail\.1688\.com\/offer\/(\d+)\.html/,
    /1688\.com.*?offer\/(\d+)/
  ]
};

const PLATFORM_INFO = {
  taobao: { name: '淘宝', nameEn: 'Taobao', color: '#FF4400' },
  tmall: { name: '天猫', nameEn: 'Tmall', color: '#FF0036' },
  jd: { name: '京东', nameEn: 'JD.com', color: '#E1251B' },
  pinduoduo: { name: '拼多多', nameEn: 'Pinduoduo', color: '#E02E24' },
  '1688': { name: '1688', nameEn: '1688', color: '#FF6A00' }
};

// 模拟商品数据生成（实际项目中这里会调用真实API或爬虫服务）
function generateMockProduct(platform, productId) {
  const mockProducts = {
    taobao: {
      title: '2024新款时尚休闲双肩包大容量旅行背包',
      titleEn: '2024 New Fashion Casual Backpack Large Capacity Travel Bag',
      price: 89.00,
      originalPrice: 169.00,
      currency: 'CNY',
      sales: '5000+',
      rating: 4.8,
      shop: '潮流箱包旗舰店',
      location: '广东 广州',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400'
      ],
      specs: ['颜色: 黑色/灰色/蓝色', '尺寸: 大号/中号']
    },
    tmall: {
      title: 'Apple/苹果 iPhone 15 Pro Max 256GB 官方正品',
      titleEn: 'Apple iPhone 15 Pro Max 256GB Official Authentic',
      price: 9999.00,
      originalPrice: 10999.00,
      currency: 'CNY',
      sales: '10000+',
      rating: 4.9,
      shop: 'Apple官方旗舰店',
      location: '上海',
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'
      ],
      specs: ['颜色: 原色钛金属/蓝色钛金属', '存储: 256GB/512GB/1TB']
    },
    jd: {
      title: '小米14 Ultra 徕卡光学镜头 骁龙8Gen3',
      titleEn: 'Xiaomi 14 Ultra Leica Optical Lens Snapdragon 8 Gen3',
      price: 6499.00,
      originalPrice: 6999.00,
      currency: 'CNY',
      sales: '8000+',
      rating: 4.9,
      shop: '小米京东自营旗舰店',
      location: '北京',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
      ],
      specs: ['颜色: 黑色/白色', '版本: 12GB+256GB/16GB+512GB']
    },
    pinduoduo: {
      title: '农家自产新鲜水果苹果红富士10斤装',
      titleEn: 'Farm Fresh Fruit Apple Red Fuji 10kg Pack',
      price: 29.90,
      originalPrice: 59.90,
      currency: 'CNY',
      sales: '100000+',
      rating: 4.7,
      shop: '果园直供店',
      location: '山东 烟台',
      images: [
        'https://images.unsplash.com/photo-1568702846914-96b305d2uj67?w=400'
      ],
      specs: ['规格: 5斤装/10斤装', '大小: 大果/中果']
    },
    '1688': {
      title: '工厂直销定制款休闲T恤批发',
      titleEn: 'Factory Direct Custom Casual T-Shirt Wholesale',
      price: 15.00,
      originalPrice: 25.00,
      currency: 'CNY',
      sales: '50000+',
      rating: 4.6,
      shop: '广州服装批发商',
      location: '广东 广州',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
      ],
      specs: ['颜色: 多色可选', '尺码: S-3XL'],
      minOrder: 50
    }
  };

  const baseProduct = mockProducts[platform] || mockProducts.taobao;
  
  return {
    ...baseProduct,
    id: productId || `${platform}_${Date.now()}`,
    platform,
    platformInfo: PLATFORM_INFO[platform],
    // 添加随机变化使数据更真实
    price: baseProduct.price * (0.9 + Math.random() * 0.2),
    updatedAt: new Date().toISOString()
  };
}

function parseUrl(url) {
  if (!url) return { error: 'URL is required', success: false };

  // 标准化URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      const match = normalizedUrl.match(pattern);
      if (match) {
        const productId = match[1] || `${platform}_${Date.now()}`;
        return { 
          platform, 
          productId, 
          originalUrl: url,
          platformInfo: PLATFORM_INFO[platform],
          success: true 
        };
      }
    }
  }

  // 域名检测（短链接等情况）
  const domainChecks = [
    { domain: 'taobao', platform: 'taobao' },
    { domain: 'tb.cn', platform: 'taobao' },
    { domain: 'tmall', platform: 'tmall' },
    { domain: 'jd.com', platform: 'jd' },
    { domain: '3.cn', platform: 'jd' },
    { domain: 'yangkeduo', platform: 'pinduoduo' },
    { domain: 'pinduoduo', platform: 'pinduoduo' },
    { domain: '1688', platform: '1688' }
  ];

  for (const check of domainChecks) {
    if (normalizedUrl.includes(check.domain)) {
      return { 
        platform: check.platform, 
        originalUrl: url, 
        platformInfo: PLATFORM_INFO[check.platform],
        needsRedirect: true, 
        success: true 
      };
    }
  }

  return { error: 'Unsupported platform. Please paste a link from Taobao, Tmall, JD, Pinduoduo, or 1688.', success: false };
}

function extractUrlFromText(text) {
  // 匹配各种URL格式
  const urlPatterns = [
    /(https?:\/\/[^\s\u4e00-\u9fa5\u3000]+)/,
    /(item\.taobao\.com[^\s\u4e00-\u9fa5]+)/,
    /(detail\.tmall\.com[^\s\u4e00-\u9fa5]+)/,
    /(item\.jd\.com[^\s\u4e00-\u9fa5]+)/,
    /([a-zA-Z0-9]+\.m\.tb\.cn\/[^\s]+)/
  ];

  for (const pattern of urlPatterns) {
    const match = text.match(pattern);
    if (match) {
      let url = match[1];
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      return url;
    }
  }
  return null;
}

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, text, fetchProduct = true } = req.body || {};
  
  let targetUrl = url;
  
  // 从文本中提取URL（支持淘口令等）
  if (text && !url) {
    targetUrl = extractUrlFromText(text);
    if (!targetUrl) {
      return res.status(200).json({ 
        error: 'No valid product URL found in text. Please paste a link from Taobao, Tmall, JD, Pinduoduo, or 1688.', 
        success: false 
      });
    }
  }

  // 解析URL
  const parseResult = parseUrl(targetUrl);
  
  if (!parseResult.success) {
    return res.status(200).json(parseResult);
  }

  // 如果需要获取商品信息
  if (fetchProduct) {
    const product = generateMockProduct(parseResult.platform, parseResult.productId);
    return res.status(200).json({
      ...parseResult,
      product
    });
  }

  return res.status(200).json(parseResult);
}
