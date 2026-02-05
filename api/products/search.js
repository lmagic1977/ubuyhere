/**
 * UBUYHERE API - 商品搜索
 * Vercel Serverless Function
 */

// 模拟商品数据
const MOCK_PRODUCTS = [
  {
    id: '655789012345',
    platform: 'taobao',
    title: '2024新款春季休闲运动鞋男女同款透气网面跑步鞋',
    titleEn: '2024 New Spring Casual Sports Shoes Unisex Breathable Mesh Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    price: 199,
    originalPrice: 399,
    sales: 12580,
    shopName: '潮流运动旗舰店',
    shopRating: 4.8
  },
  {
    id: '655789012346',
    platform: 'tmall',
    title: '耐克Nike Air Max 270 气垫跑步鞋男女',
    titleEn: 'Nike Air Max 270 Cushion Running Shoes Unisex',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    price: 899,
    originalPrice: 1299,
    sales: 8920,
    shopName: 'Nike官方旗舰店',
    shopRating: 4.9
  },
  {
    id: '100026789012',
    platform: 'jd',
    title: '小米14 Ultra 5G手机 徕卡光学四摄',
    titleEn: 'Xiaomi 14 Ultra 5G Smartphone Leica Quad Camera',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    price: 6499,
    originalPrice: 6999,
    sales: 58920,
    shopName: '小米京东自营',
    shopRating: 4.9
  },
  {
    id: '655789012350',
    platform: 'taobao',
    title: '复古文艺帆布包女大容量单肩手提包',
    titleEn: 'Vintage Literary Canvas Bag Women Large Capacity Tote',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400',
    price: 59,
    originalPrice: 99,
    sales: 8920,
    shopName: '文艺小铺原创设计',
    shopRating: 4.6
  }
];

// 费用计算
function calculateFees(priceInCNY, destination = 'US') {
  const exchangeRate = 0.14;
  const productPrice = priceInCNY * exchangeRate;
  const serviceFee = Math.min(Math.max(productPrice * 0.1, 3), 50);
  const shippingRates = { US: 14, UK: 18, CA: 15, AU: 20, EU: 18 };
  const shippingFee = shippingRates[destination] || 14;
  const taxRate = destination === 'US' ? 0 : 0.1;
  const taxFee = (productPrice + shippingFee) * taxRate;
  const total = productPrice + serviceFee + shippingFee + taxFee;
  
  return {
    productPrice: Math.round(productPrice * 100) / 100,
    serviceFee: Math.round(serviceFee * 100) / 100,
    shippingFee,
    taxFee: Math.round(taxFee * 100) / 100,
    total: Math.round(total * 100) / 100
  };
}

export default function handler(req, res) {
  // 处理 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q, platform, destination = 'US', page = 1, pageSize = 20 } = req.query;

  let results = [...MOCK_PRODUCTS];

  // 关键词过滤
  if (q) {
    const keyword = q.toLowerCase();
    results = results.filter(p => 
      p.title.toLowerCase().includes(keyword) ||
      p.titleEn.toLowerCase().includes(keyword)
    );
  }

  // 平台过滤
  if (platform && platform !== 'all') {
    results = results.filter(p => p.platform === platform);
  }

  // 计算到手价
  results = results.map(item => {
    const fees = calculateFees(item.price, destination);
    return {
      ...item,
      deliveredPrice: fees.total,
      fees
    };
  });

  // 分页
  const start = (parseInt(page) - 1) * parseInt(pageSize);
  const paginatedResults = results.slice(start, start + parseInt(pageSize));

  res.status(200).json({
    success: true,
    data: {
      items: paginatedResults,
      total: results.length,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
}
