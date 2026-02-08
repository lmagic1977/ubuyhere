/**
 * UBUYHERE API - 商品链接解析
 * 支持淘宝、天猫、京东、拼多多、1688
 * 智能模拟数据 - 根据商品ID生成不同类型商品
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

// 商品类型库 - 根据ID选择不同类型
const PRODUCT_TYPES = [
  {
    category: '电子产品',
    categoryEn: 'Electronics',
    items: [
      { title: '无线蓝牙耳机降噪运动耳机', titleEn: 'Wireless Bluetooth Noise Canceling Sports Earbuds', price: 199, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', specs: ['颜色: 黑色/白色', '类型: 入耳式/半入耳式'] },
      { title: '智能手表运动健康监测手环', titleEn: 'Smart Watch Sports Health Monitor Band', price: 299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', specs: ['颜色: 黑色/银色', '尺寸: 42mm/46mm'] },
      { title: '便携式充电宝20000mAh大容量', titleEn: 'Portable Power Bank 20000mAh High Capacity', price: 129, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', specs: ['容量: 10000mAh/20000mAh', '接口: Type-C/USB'] },
      { title: '机械键盘RGB背光游戏键盘', titleEn: 'Mechanical Keyboard RGB Backlit Gaming Keyboard', price: 359, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', specs: ['轴体: 红轴/青轴/茶轴', '布局: 87键/104键'] }
    ]
  },
  {
    category: '工具设备',
    categoryEn: 'Tools & Equipment',
    items: [
      { title: '充电式电锯家用小型伐木锯', titleEn: 'Rechargeable Electric Chainsaw Mini Logging Saw', price: 459, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', specs: ['电压: 21V/48V', '链条: 4寸/6寸/8寸'] },
      { title: '电动螺丝刀充电式家用工具套装', titleEn: 'Electric Screwdriver Rechargeable Home Tool Set', price: 189, image: 'https://images.unsplash.com/photo-1581147036324-c17ac41f3e2e?w=400', specs: ['电压: 12V/21V', '配件: 20件/45件'] },
      { title: '角磨机多功能打磨切割机', titleEn: 'Angle Grinder Multi-function Polishing Cutting Machine', price: 259, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400', specs: ['功率: 850W/1200W', '盘径: 100mm/125mm'] },
      { title: '电钻充电手枪钻家用电动工具', titleEn: 'Electric Drill Rechargeable Pistol Drill Home Power Tool', price: 329, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', specs: ['电压: 12V/21V', '功能: 单速/双速'] }
    ]
  },
  {
    category: '服装鞋包',
    categoryEn: 'Fashion',
    items: [
      { title: '休闲运动鞋透气网面跑步鞋', titleEn: 'Casual Sports Shoes Breathable Mesh Running Shoes', price: 199, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', specs: ['颜色: 黑色/白色/灰色', '尺码: 39-44'] },
      { title: '双肩包大容量旅行背包', titleEn: 'Backpack Large Capacity Travel Bag', price: 159, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', specs: ['颜色: 黑色/蓝色', '容量: 30L/40L'] },
      { title: '纯棉T恤男士短袖圆领上衣', titleEn: 'Cotton T-Shirt Mens Short Sleeve Round Neck Top', price: 79, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', specs: ['颜色: 多色可选', '尺码: M-3XL'] },
      { title: '休闲裤男士直筒宽松长裤', titleEn: 'Casual Pants Mens Straight Loose Trousers', price: 139, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400', specs: ['颜色: 黑色/卡其', '尺码: 28-36'] }
    ]
  },
  {
    category: '家居用品',
    categoryEn: 'Home & Living',
    items: [
      { title: '智能扫地机器人自动清扫吸尘器', titleEn: 'Smart Robot Vacuum Cleaner Auto Sweeping', price: 899, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', specs: ['功能: 扫吸拖一体', '续航: 120分钟'] },
      { title: '空气净化器家用卧室除甲醛', titleEn: 'Air Purifier Home Bedroom Formaldehyde Removal', price: 599, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', specs: ['适用面积: 30-50㎡', '滤网: HEPA'] },
      { title: '电热水壶不锈钢保温烧水壶', titleEn: 'Electric Kettle Stainless Steel Insulated', price: 129, image: 'https://images.unsplash.com/photo-1594213114663-400a67ed8ddb?w=400', specs: ['容量: 1.5L/1.8L', '材质: 304不锈钢'] },
      { title: '床上四件套纯棉被套床单', titleEn: 'Bedding Set Cotton Duvet Cover Bed Sheet', price: 299, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', specs: ['尺寸: 1.5m/1.8m床', '材质: 纯棉'] }
    ]
  },
  {
    category: '美妆护肤',
    categoryEn: 'Beauty & Skincare',
    items: [
      { title: '面部精华液补水保湿修护', titleEn: 'Facial Serum Hydrating Moisturizing Repair', price: 168, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', specs: ['功效: 补水/美白', '容量: 30ml'] },
      { title: '口红持久不脱色哑光唇膏', titleEn: 'Lipstick Long Lasting Matte Lip Color', price: 89, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', specs: ['色号: 多色可选', '质地: 哑光/滋润'] },
      { title: '防晒霜SPF50+隔离防紫外线', titleEn: 'Sunscreen SPF50+ UV Protection', price: 128, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', specs: ['SPF: 30/50+', '容量: 50ml'] },
      { title: '洗面奶温和清洁氨基酸洁面', titleEn: 'Facial Cleanser Gentle Amino Acid Face Wash', price: 69, image: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=400', specs: ['肤质: 全肤质适用', '容量: 120ml'] }
    ]
  }
];

// 根据商品ID智能生成模拟数据
function generateMockProduct(platform, productId) {
  // 使用商品ID的数字特征来选择商品类型
  const idNum = parseInt(productId) || Date.now();
  
  // 选择商品类别 (根据ID的某些数字)
  const categoryIndex = idNum % PRODUCT_TYPES.length;
  const category = PRODUCT_TYPES[categoryIndex];
  
  // 选择具体商品 (根据ID的其他数字)
  const itemIndex = Math.floor(idNum / 10) % category.items.length;
  const item = category.items[itemIndex];
  
  // 生成价格浮动 (基于ID)
  const priceVariation = 0.8 + (idNum % 40) / 100; // 0.8 - 1.2 倍价格
  const price = Math.round(item.price * priceVariation);
  const originalPrice = Math.round(price * (1.2 + (idNum % 30) / 100));
  
  // 生成销量 (基于ID)
  const salesBase = (idNum % 100) * 100 + 500;
  const sales = salesBase > 10000 ? `${Math.floor(salesBase / 10000)}万+` : `${salesBase}+`;
  
  // 店铺名称
  const shopNames = {
    taobao: ['品质生活馆', '优选好物店', '实惠百货铺', '精品专营店'],
    tmall: ['官方旗舰店', '品牌专卖店', '自营旗舰店', '授权专营店'],
    jd: ['京东自营', '品牌旗舰店', '官方直营店', '优选好店'],
    pinduoduo: ['工厂直销店', '产地直供', '实惠好物', '品质优选'],
    '1688': ['源头工厂', '批发直供', '厂家直销', '产业带货源']
  };
  const shopList = shopNames[platform] || shopNames.taobao;
  const shop = shopList[idNum % shopList.length];
  
  // 地区
  const locations = ['广东 深圳', '浙江 杭州', '上海', '江苏 苏州', '北京', '福建 厦门', '山东 青岛'];
  const location = locations[idNum % locations.length];
  
  return {
    title: item.title,
    titleEn: item.titleEn,
    price: price,
    originalPrice: originalPrice,
    currency: 'CNY',
    sales: sales,
    rating: (4.5 + (idNum % 5) / 10).toFixed(1),
    shop: shop,
    location: location,
    images: [item.image],
    specs: item.specs,
    category: category.category,
    categoryEn: category.categoryEn,
    id: productId,
    platform: platform,
    platformInfo: PLATFORM_INFO[platform],
    updatedAt: new Date().toISOString(),
    dataSource: 'smart-mock'
  };
}

function parseUrl(url) {
  if (!url) return { error: 'URL is required', success: false };

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

  // 域名检测
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

export default async function handler(req, res) {
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
  
  // 从文本中提取URL
  if (text && !url) {
    targetUrl = extractUrlFromText(text);
    if (!targetUrl) {
      return res.status(200).json({ 
        error: 'No valid product URL found in text.', 
        success: false 
      });
    }
  }

  // 解析URL
  const parseResult = parseUrl(targetUrl);
  
  if (!parseResult.success) {
    return res.status(200).json(parseResult);
  }

  // 获取商品信息 - 使用智能模拟数据
  if (fetchProduct && parseResult.productId) {
    const product = generateMockProduct(parseResult.platform, parseResult.productId);

    return res.status(200).json({
      ...parseResult,
      product
    });
  }

  return res.status(200).json(parseResult);
}
