/**
 * UBUYHERE API - 商品详情
 * Vercel Serverless Function
 */

const MOCK_PRODUCTS = {
  '655789012345': {
    id: '655789012345',
    platform: 'taobao',
    title: { zh: '2024新款春季休闲运动鞋男女同款透气网面跑步鞋轻便软底慢跑鞋', en: '2024 New Spring Casual Sports Shoes Unisex Breathable Mesh Running Shoes' },
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600'],
    price: 199,
    originalPrice: 399,
    shop: { name: '潮流运动旗舰店', rating: 4.8 },
    sales: 12580,
    colors: [{ name: '黑色', nameEn: 'Black', code: '#000' }, { name: '白色', nameEn: 'White', code: '#fff' }],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    sizeChart: { '40': { us: '7', eu: '40', cm: '25' }, '42': { us: '8.5', eu: '42', cm: '26.5' } },
    specs: { zh: { '鞋面材质': '飞织网面', '鞋底材质': 'EVA橡胶' }, en: { 'Upper': 'Fly-knit Mesh', 'Sole': 'EVA Rubber' } },
    weight: 0.6,
    riskLevel: 'low',
    riskNote: { zh: '店铺信誉良好，支持7天无理由退换', en: 'Good seller reputation, 7-day return supported' }
  },
  '100026789012': {
    id: '100026789012',
    platform: 'jd',
    title: { zh: '小米14 Ultra 5G手机 徕卡光学四摄 骁龙8Gen3', en: 'Xiaomi 14 Ultra 5G Smartphone Leica Quad Camera Snapdragon 8 Gen3' },
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'],
    price: 6499,
    originalPrice: 6999,
    shop: { name: '小米京东自营旗舰店', rating: 4.9 },
    sales: 58920,
    colors: [{ name: '黑色', nameEn: 'Black', code: '#1a1a1a' }],
    sizes: ['16GB+512GB', '16GB+1TB'],
    specs: { zh: { '屏幕': '6.73英寸', '处理器': '骁龙8 Gen3' }, en: { 'Screen': '6.73 inches', 'Processor': 'Snapdragon 8 Gen3' } },
    weight: 0.3,
    riskLevel: 'medium',
    riskNote: { zh: '电子产品国际保修可能受限', en: 'International warranty may be limited' }
  }
};

function calculateFees(priceInCNY, weight = 0.5, destination = 'US') {
  const exchangeRate = 0.14;
  const productPrice = priceInCNY * exchangeRate;
  const serviceFee = Math.min(Math.max(productPrice * 0.1, 3), 50);
  const shippingRates = { US: { base: 8, perKg: 12 }, UK: { base: 10, perKg: 15 }, CA: { base: 9, perKg: 13 }, AU: { base: 12, perKg: 18 }, EU: { base: 11, perKg: 16 } };
  const rate = shippingRates[destination] || shippingRates.US;
  const shippingFee = rate.base + weight * rate.perKg;
  const taxRate = destination === 'US' ? 0 : 0.1;
  const taxFee = (productPrice + shippingFee) * taxRate;
  
  return {
    breakdown: {
      productPrice: { cny: priceInCNY, converted: Math.round(productPrice * 100) / 100 },
      serviceFee: Math.round(serviceFee * 100) / 100,
      shippingFee: Math.round(shippingFee * 100) / 100,
      taxFee: Math.round(taxFee * 100) / 100
    },
    total: { amount: Math.round((productPrice + serviceFee + shippingFee + taxFee) * 100) / 100, currency: 'USD' }
  };
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { id } = req.query;
  const { destination = 'US' } = req.query;

  let product = MOCK_PRODUCTS[id];
  
  if (!product) {
    // 生成默认数据
    product = {
      id,
      platform: 'taobao',
      title: { zh: `商品 #${id}`, en: `Product #${id}` },
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
      price: 199,
      shop: { name: '示例店铺', rating: 4.5 },
      sales: 1000,
      colors: [{ name: '默认', nameEn: 'Default', code: '#333' }],
      sizes: ['均码'],
      weight: 0.5,
      riskLevel: 'low',
      riskNote: { zh: '演示数据', en: 'Demo data' }
    };
  }

  const fees = calculateFees(product.price, product.weight || 0.5, destination);
  const delivery = { express: { min: 5, max: 8 }, standard: { min: 10, max: 18 } };

  res.status(200).json({
    success: true,
    data: { product, pricing: fees, delivery }
  });
}
