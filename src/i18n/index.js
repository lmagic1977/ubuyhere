import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      brand: 'UBUYHERE',
      slogan: 'Your Gateway to China Shopping',
      switchLang: '中文',
      
      // Navigation
      home: 'Home',
      orders: 'My Orders',
      cart: 'Cart',
      help: 'Help',
      
      // Home Page
      heroTitle: 'Shop from China, Delivered Worldwide',
      heroSubtitle: 'Paste a link, upload an image, or search by keywords — we handle the rest',
      searchPlaceholder: 'Paste Taobao/Tmall/JD link or enter keywords...',
      uploadImage: 'Upload Image',
      searchButton: 'Search',
      
      // Features
      feature1Title: 'Smart Translation',
      feature1Desc: 'AI-powered translation for product details, reviews, and sizing',
      feature2Title: 'Price Comparison',
      feature2Desc: 'Compare prices across Taobao, Tmall, JD, and Pinduoduo',
      feature3Title: 'Secure Payment',
      feature3Desc: 'Pay with credit card, Apple Pay, or Google Pay',
      feature4Title: 'Global Shipping',
      feature4Desc: 'Consolidated shipping with real-time tracking',
      
      // Product Page
      productDetails: 'Product Details',
      originalPrice: 'Original Price',
      serviceFee: 'Service Fee',
      shippingFee: 'Est. Shipping',
      taxFee: 'Est. Tax & Duties',
      totalPrice: 'Total (Delivered)',
      selectSize: 'Select Size',
      selectColor: 'Select Color',
      quantity: 'Quantity',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      sellerRating: 'Seller Rating',
      reviews: 'Reviews',
      specifications: 'Specifications',
      shippingInfo: 'Shipping Info',
      returnPolicy: 'Return Policy',
      riskWarning: 'Risk Warning',
      
      // Order Page
      orderConfirmation: 'Order Confirmation',
      shippingAddress: 'Shipping Address',
      paymentMethod: 'Payment Method',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      
      // Misc
      loading: 'Loading...',
      noResults: 'No results found',
      tryAgain: 'Please try again',
      currency: 'USD',
      estimatedDelivery: 'Estimated Delivery',
      days: 'days',
    }
  },
  zh: {
    translation: {
      // Header
      brand: 'UBUYHERE',
      slogan: '您的中国购物平台',
      switchLang: 'English',
      
      // Navigation
      home: '首页',
      orders: '我的订单',
      cart: '购物车',
      help: '帮助',
      
      // Home Page
      heroTitle: '中国商品，全球配送',
      heroSubtitle: '粘贴链接、上传图片或输入关键词 — 其余交给我们',
      searchPlaceholder: '粘贴淘宝/天猫/京东链接或输入关键词...',
      uploadImage: '上传图片',
      searchButton: '搜索',
      
      // Features
      feature1Title: '智能翻译',
      feature1Desc: 'AI驱动的商品详情、评价和尺码翻译',
      feature2Title: '比价服务',
      feature2Desc: '淘宝、天猫、京东、拼多多多平台比价',
      feature3Title: '安全支付',
      feature3Desc: '支持信用卡、Apple Pay、Google Pay',
      feature4Title: '全球配送',
      feature4Desc: '集运服务，实时物流追踪',
      
      // Product Page
      productDetails: '商品详情',
      originalPrice: '商品原价',
      serviceFee: '服务费',
      shippingFee: '预估运费',
      taxFee: '预估税费',
      totalPrice: '到手价',
      selectSize: '选择尺码',
      selectColor: '选择颜色',
      quantity: '数量',
      addToCart: '加入购物车',
      buyNow: '立即购买',
      sellerRating: '店铺评分',
      reviews: '评价',
      specifications: '规格参数',
      shippingInfo: '物流信息',
      returnPolicy: '退换政策',
      riskWarning: '风险提示',
      
      // Order Page
      orderConfirmation: '订单确认',
      shippingAddress: '收货地址',
      paymentMethod: '支付方式',
      orderSummary: '订单摘要',
      placeOrder: '提交订单',
      
      // Misc
      loading: '加载中...',
      noResults: '未找到结果',
      tryAgain: '请重试',
      currency: 'USD',
      estimatedDelivery: '预计送达',
      days: '天',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
