// Mock product data for demonstration
export const mockProducts = [
  {
    id: '1',
    title: {
      zh: '2024新款春季休闲运动鞋男女同款透气网面跑步鞋轻便软底慢跑鞋',
      en: '2024 New Spring Casual Sports Shoes Unisex Breathable Mesh Running Shoes Lightweight Soft Sole Jogging Sneakers'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'
    ],
    originalPrice: 199,
    currency: 'CNY',
    platform: 'Taobao',
    shopName: '潮流运动旗舰店',
    shopRating: 4.8,
    sales: 12580,
    colors: [
      { name: { zh: '黑色', en: 'Black' }, code: '#000000' },
      { name: { zh: '白色', en: 'White' }, code: '#FFFFFF' },
      { name: { zh: '灰色', en: 'Gray' }, code: '#808080' },
      { name: { zh: '蓝色', en: 'Blue' }, code: '#1E90FF' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    sizeChart: {
      '36': { us: '4', eu: '36', cm: '22.5' },
      '37': { us: '5', eu: '37', cm: '23' },
      '38': { us: '6', eu: '38', cm: '24' },
      '39': { us: '6.5', eu: '39', cm: '24.5' },
      '40': { us: '7', eu: '40', cm: '25' },
      '41': { us: '8', eu: '41', cm: '26' },
      '42': { us: '8.5', eu: '42', cm: '26.5' },
      '43': { us: '9.5', eu: '43', cm: '27.5' },
      '44': { us: '10', eu: '44', cm: '28' },
      '45': { us: '11', eu: '45', cm: '29' }
    },
    specifications: {
      zh: {
        '鞋面材质': '飞织网面',
        '鞋底材质': 'EVA橡胶',
        '适用场景': '跑步/休闲/日常',
        '重量': '约280g/只'
      },
      en: {
        'Upper Material': 'Fly-knit Mesh',
        'Sole Material': 'EVA Rubber',
        'Suitable For': 'Running/Casual/Daily',
        'Weight': 'About 280g/pc'
      }
    },
    description: {
      zh: '采用轻质飞织鞋面，透气舒适；EVA缓震中底，回弹性能出色；橡胶大底，防滑耐磨。适合日常穿着和轻度运动。',
      en: 'Features lightweight fly-knit upper for breathability and comfort; EVA cushioned midsole with excellent rebound; rubber outsole for anti-slip and durability. Perfect for daily wear and light exercise.'
    },
    reviews: [
      { user: 'J***n', rating: 5, content: { zh: '鞋子很轻，穿着舒服', en: 'Very light shoes, comfortable to wear' } },
      { user: 'M***y', rating: 4, content: { zh: '性价比高，物流快', en: 'Good value, fast shipping' } }
    ],
    riskLevel: 'low',
    riskNote: {
      zh: '店铺信誉良好，退换货支持7天无理由',
      en: 'Good seller reputation, 7-day return policy supported'
    }
  },
  {
    id: '2',
    title: {
      zh: '小米14 Ultra 5G手机 徕卡光学四摄 骁龙8Gen3 16GB+512GB 黑色',
      en: 'Xiaomi 14 Ultra 5G Smartphone Leica Quad Camera Snapdragon 8 Gen3 16GB+512GB Black'
    },
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600'
    ],
    originalPrice: 6499,
    currency: 'CNY',
    platform: 'JD',
    shopName: '小米京东自营旗舰店',
    shopRating: 4.9,
    sales: 58920,
    colors: [
      { name: { zh: '黑色', en: 'Black' }, code: '#1a1a1a' },
      { name: { zh: '白色', en: 'White' }, code: '#f5f5f5' },
      { name: { zh: '钛金属', en: 'Titanium' }, code: '#8b8b8b' }
    ],
    sizes: ['16GB+512GB', '16GB+1TB'],
    specifications: {
      zh: {
        '屏幕尺寸': '6.73英寸',
        '处理器': '骁龙8 Gen3',
        '电池容量': '5000mAh',
        '摄像头': '5000万像素徕卡四摄'
      },
      en: {
        'Screen Size': '6.73 inches',
        'Processor': 'Snapdragon 8 Gen3',
        'Battery': '5000mAh',
        'Camera': '50MP Leica Quad Camera'
      }
    },
    description: {
      zh: '小米14 Ultra搭载骁龙8 Gen3旗舰处理器，配备徕卡专业光学四摄系统，支持全球频段5G网络。',
      en: 'Xiaomi 14 Ultra features Snapdragon 8 Gen3 flagship processor, Leica professional quad camera system, global 5G band support.'
    },
    reviews: [
      { user: 'T***k', rating: 5, content: { zh: '拍照效果太棒了', en: 'Amazing camera quality' } }
    ],
    riskLevel: 'medium',
    riskNote: {
      zh: '电子产品国际保修可能受限，建议购买延保服务',
      en: 'International warranty may be limited for electronics, extended warranty recommended'
    }
  },
  {
    id: '3',
    title: {
      zh: '复古文艺帆布包女大容量单肩手提包学生上课通勤包',
      en: 'Vintage Literary Canvas Bag Women Large Capacity Shoulder Tote Bag Student Commuter Bag'
    },
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'
    ],
    originalPrice: 59,
    currency: 'CNY',
    platform: 'Taobao',
    shopName: '文艺小铺原创设计',
    shopRating: 4.6,
    sales: 8920,
    colors: [
      { name: { zh: '米白色', en: 'Off White' }, code: '#FAF0E6' },
      { name: { zh: '黑色', en: 'Black' }, code: '#000000' },
      { name: { zh: '军绿色', en: 'Army Green' }, code: '#4B5320' },
      { name: { zh: '卡其色', en: 'Khaki' }, code: '#C3B091' }
    ],
    sizes: ['均码'],
    specifications: {
      zh: {
        '材质': '加厚帆布',
        '尺寸': '38×32×12cm',
        '容量': '可放15寸笔记本',
        '重量': '约350g'
      },
      en: {
        'Material': 'Thickened Canvas',
        'Size': '38×32×12cm (15×12.6×4.7in)',
        'Capacity': 'Fits 15" Laptop',
        'Weight': 'About 350g (12.3oz)'
      }
    },
    description: {
      zh: '复古文艺风格，加厚帆布材质，结实耐用。大容量设计，可轻松容纳笔记本电脑、书籍等物品。',
      en: 'Vintage literary style with thickened canvas material, sturdy and durable. Large capacity design easily fits laptop, books and more.'
    },
    reviews: [
      { user: 'L***a', rating: 5, content: { zh: '容量很大，质量不错', en: 'Large capacity, good quality' } }
    ],
    riskLevel: 'low',
    riskNote: {
      zh: '帆布包退换货方便，风险较低',
      en: 'Canvas bags are easy to return, low risk'
    }
  }
];

// Fee calculation utilities
export const calculateFees = (originalPriceCNY, weight = 0.5, destination = 'US') => {
  const exchangeRate = 0.14; // CNY to USD
  const productPriceUSD = originalPriceCNY * exchangeRate;
  
  // Service fee: 10% of product price, min $3, max $50
  const serviceFee = Math.min(Math.max(productPriceUSD * 0.1, 3), 50);
  
  // Shipping fee based on weight and destination
  const shippingRates = {
    US: { base: 8, perKg: 12 },
    UK: { base: 10, perKg: 15 },
    AU: { base: 12, perKg: 18 },
    CA: { base: 9, perKg: 13 },
    EU: { base: 11, perKg: 16 }
  };
  const rate = shippingRates[destination] || shippingRates.US;
  const shippingFee = rate.base + (weight * rate.perKg);
  
  // Tax estimate: varies by country and product category
  const taxRate = destination === 'US' ? 0 : 0.1; // US de minimis, others ~10%
  const taxFee = (productPriceUSD + shippingFee) * taxRate;
  
  const totalPrice = productPriceUSD + serviceFee + shippingFee + taxFee;
  
  return {
    productPriceUSD: productPriceUSD.toFixed(2),
    serviceFee: serviceFee.toFixed(2),
    shippingFee: shippingFee.toFixed(2),
    taxFee: taxFee.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  };
};

// Estimated delivery days
export const getEstimatedDelivery = (destination = 'US') => {
  const deliveryDays = {
    US: { min: 10, max: 18 },
    UK: { min: 12, max: 20 },
    AU: { min: 14, max: 22 },
    CA: { min: 10, max: 16 },
    EU: { min: 12, max: 20 }
  };
  return deliveryDays[destination] || deliveryDays.US;
};

// Calculate delivered price (simplified version for product cards)
export const calculateDeliveredPrice = (priceCNY, destination = 'US', weight = 0.5) => {
  const exchangeRate = 0.14; // CNY to USD
  const priceUSD = priceCNY * exchangeRate;
  
  // Shipping rates by destination
  const shippingRates = {
    US: { base: 8, perKg: 12 },
    UK: { base: 10, perKg: 15 },
    AU: { base: 12, perKg: 18 },
    CA: { base: 9, perKg: 13 },
    EU: { base: 11, perKg: 16 }
  };
  const rate = shippingRates[destination] || shippingRates.US;
  const shipping = rate.base + (weight * rate.perKg);
  
  // Service fee: 10% of product price, min $3, max $50
  const serviceFee = Math.min(Math.max(priceUSD * 0.1, 3), 50);
  
  // Tax (US has de minimis, others ~10%)
  const taxRate = destination === 'US' ? 0 : 0.1;
  const tax = (priceUSD + shipping) * taxRate;
  
  const totalUSD = priceUSD + shipping + serviceFee + tax;
  
  return {
    priceUSD: parseFloat(priceUSD.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    serviceFee: parseFloat(serviceFee.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    totalUSD: parseFloat(totalUSD.toFixed(2))
  };
};
