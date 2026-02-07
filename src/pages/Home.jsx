import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Upload, Globe, Truck, CreditCard, Languages, ShoppingBag, Package, Shield, ArrowRight, Loader2, Link, CheckCircle, XCircle, ExternalLink, ShoppingCart } from 'lucide-react';
import { mockProducts, calculateDeliveredPrice } from '../data/mockData';
import api from '../services/api';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedProduct, setParsedProduct] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [activePlatform, setActivePlatform] = useState('all');
  const fileInputRef = useRef(null);

  // 检测输入是否为链接
  const isUrl = (text) => {
    return text.includes('http') || text.includes('taobao') || text.includes('tmall') || 
           text.includes('jd.com') || text.includes('pinduoduo') || text.includes('tb.cn') ||
           text.includes('yangkeduo') || text.includes('1688') || text.includes('3.cn');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setParsedProduct(null);
    setParseError(null);
    setShowResults(false);

    try {
      // 检测是否为链接
      if (isUrl(searchQuery)) {
        // 调用链接解析API
        try {
          const parseResult = await api.parseProductUrl(searchQuery);
          
          if (parseResult.success && parseResult.product) {
            // 计算到手价格
            const priceInfo = calculateDeliveredPrice(parseResult.product.price, 'US', 0.5);
            setParsedProduct({
              ...parseResult,
              product: {
                ...parseResult.product,
                priceUSD: priceInfo.priceUSD,
                totalUSD: priceInfo.totalUSD,
                shipping: priceInfo.shipping,
                serviceFee: priceInfo.serviceFee
              }
            });
            setIsLoading(false);
            return;
          } else if (!parseResult.success) {
            setParseError(parseResult.error);
          }
        } catch (e) {
          console.log('Link parse failed:', e);
          setParseError(i18n.language === 'zh' 
            ? '链接解析失败，请检查链接是否正确' 
            : 'Failed to parse link. Please check if the link is correct.');
        }
      }

      // 关键词搜索
      try {
        const result = await api.searchProducts({ 
          q: searchQuery, 
          platform: activePlatform !== 'all' ? activePlatform : undefined,
          pageSize: 20
        });
        
        if (result.success && result.data?.items?.length > 0) {
          setSearchResults(result.data.items);
          setShowResults(true);
        } else {
          // 使用模拟数据
          const filtered = activePlatform === 'all' 
            ? mockProducts 
            : mockProducts.filter(p => p.platform.toLowerCase() === activePlatform);
          
          setSearchResults(filtered.map(p => ({
            id: p.id,
            platform: p.platform,
            title: p.title[i18n.language] || p.title.en,
            titleEn: p.title.en,
            image: p.images[0],
            price: p.originalPrice,
            sales: p.sales,
            shopName: p.shopName,
            shopRating: p.shopRating
          })));
          setShowResults(true);
        }
      } catch (e) {
        // API调用失败时使用模拟数据
        console.log('API unavailable, using mock data');
        const filtered = activePlatform === 'all' 
          ? mockProducts 
          : mockProducts.filter(p => p.platform.toLowerCase() === activePlatform);
        
        setSearchResults(filtered.map(p => ({
          id: p.id,
          platform: p.platform,
          title: p.title[i18n.language] || p.title.en,
          titleEn: p.title.en,
          image: p.images[0],
          price: p.originalPrice,
          sales: p.sales,
          shopName: p.shopName,
          shopRating: p.shopRating
        })));
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePaste = async (e) => {
    const pastedText = e.clipboardData?.getData('text') || '';
    if (isUrl(pastedText)) {
      setSearchQuery(pastedText);
      // 自动触发搜索
      setTimeout(() => {
        handleSearch();
      }, 100);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: 实现图片搜索API
      setSearchResults(mockProducts.map(p => ({
        id: p.id,
        platform: p.platform,
        title: p.title[i18n.language] || p.title.en,
        titleEn: p.title.en,
        image: p.images[0],
        price: p.originalPrice,
        sales: p.sales,
        shopName: p.shopName,
        shopRating: p.shopRating
      })));
      setShowResults(true);
    }
  };

  const clearParsedProduct = () => {
    setParsedProduct(null);
    setParseError(null);
    setSearchQuery('');
  };

  const platforms = [
    { id: 'all', name: '全部', nameEn: 'All' },
    { id: 'taobao', name: '淘宝', nameEn: 'Taobao', color: '#FF4400' },
    { id: 'tmall', name: '天猫', nameEn: 'Tmall', color: '#FF0036' },
    { id: 'jd', name: '京东', nameEn: 'JD', color: '#E1251B' },
    { id: 'pinduoduo', name: '拼多多', nameEn: 'Pinduoduo', color: '#E02E24' },
    { id: '1688', name: '1688', nameEn: '1688', color: '#FF6A00' }
  ];

  const features = [
    { icon: Languages, titleKey: 'feature1Title', descKey: 'feature1Desc' },
    { icon: Search, titleKey: 'feature2Title', descKey: 'feature2Desc' },
    { icon: CreditCard, titleKey: 'feature3Title', descKey: 'feature3Desc' },
    { icon: Truck, titleKey: 'feature4Title', descKey: 'feature4Desc' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroSubtitle')}</p>
          
          {/* Platform Tabs */}
          <div className="platform-tabs">
            {platforms.map(platform => (
              <button
                key={platform.id}
                className={`platform-tab ${activePlatform === platform.id ? 'active' : ''}`}
                onClick={() => setActivePlatform(platform.id)}
                style={activePlatform === platform.id && platform.color ? { borderColor: platform.color, color: platform.color } : {}}
              >
                {i18n.language === 'zh' ? platform.name : platform.nameEn}
              </button>
            ))}
          </div>

          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder={i18n.language === 'zh' 
                  ? '粘贴商品链接或输入关键词搜索...' 
                  : 'Paste product link or enter keywords...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onPaste={handlePaste}
              />
              <button 
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
                title={t('uploadImage')}
              >
                <Upload size={20} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            <button className="search-btn" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? <Loader2 size={20} className="spin" /> : t('searchButton')}
            </button>
          </div>

          {/* 链接解析提示 */}
          <div className="search-hint">
            <Link size={14} />
            <span>
              {i18n.language === 'zh' 
                ? '支持淘宝、天猫、京东、拼多多、1688商品链接' 
                : 'Supports Taobao, Tmall, JD, Pinduoduo, 1688 product links'}
            </span>
          </div>
        </div>
      </section>

      {/* 解析错误提示 */}
      {parseError && (
        <section className="parse-error-section">
          <div className="parse-error">
            <XCircle size={24} />
            <span>{parseError}</span>
            <button onClick={clearParsedProduct}>
              {i18n.language === 'zh' ? '关闭' : 'Close'}
            </button>
          </div>
        </section>
      )}

      {/* 解析成功的商品卡片 */}
      {parsedProduct && parsedProduct.product && (
        <section className="parsed-product-section">
          <div className="parsed-product-card">
            <div className="parsed-header">
              <CheckCircle size={20} className="success-icon" />
              <span>
                {i18n.language === 'zh' 
                  ? `已识别 ${parsedProduct.platformInfo?.name || parsedProduct.platform} 商品` 
                  : `Detected ${parsedProduct.platformInfo?.nameEn || parsedProduct.platform} product`}
              </span>
              <button className="close-btn" onClick={clearParsedProduct}>×</button>
            </div>
            
            <div className="parsed-content">
              <div className="product-image-wrapper">
                {parsedProduct.product.images?.[0] ? (
                  <img src={parsedProduct.product.images[0]} alt={parsedProduct.product.title} />
                ) : (
                  <div className="placeholder-image">
                    <ShoppingBag size={48} />
                  </div>
                )}
                <span 
                  className="platform-badge"
                  style={{ backgroundColor: parsedProduct.platformInfo?.color || '#666' }}
                >
                  {parsedProduct.platformInfo?.name || parsedProduct.platform}
                </span>
              </div>
              
              <div className="product-details">
                <h3 className="product-title">
                  {i18n.language === 'zh' 
                    ? parsedProduct.product.title 
                    : parsedProduct.product.titleEn || parsedProduct.product.title}
                </h3>
                
                <div className="product-meta">
                  <span className="shop">{parsedProduct.product.shop}</span>
                  <span className="location">{parsedProduct.product.location}</span>
                  {parsedProduct.product.rating && (
                    <span className="rating">⭐ {parsedProduct.product.rating}</span>
                  )}
                  {parsedProduct.product.sales && (
                    <span className="sales">{parsedProduct.product.sales} {i18n.language === 'zh' ? '已售' : 'sold'}</span>
                  )}
                </div>

                {parsedProduct.product.specs && (
                  <div className="product-specs">
                    {parsedProduct.product.specs.map((spec, idx) => (
                      <span key={idx} className="spec-tag">{spec}</span>
                    ))}
                  </div>
                )}

                <div className="price-breakdown">
                  <div className="price-row">
                    <span className="label">{i18n.language === 'zh' ? '商品价格' : 'Product Price'}</span>
                    <span className="value">¥{parsedProduct.product.price?.toFixed(2)}</span>
                    <span className="converted">≈ ${parsedProduct.product.priceUSD?.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span className="label">{i18n.language === 'zh' ? '国际运费' : 'Shipping'}</span>
                    <span className="value">${parsedProduct.product.shipping?.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span className="label">{i18n.language === 'zh' ? '服务费' : 'Service Fee'}</span>
                    <span className="value">${parsedProduct.product.serviceFee?.toFixed(2)}</span>
                  </div>
                  <div className="price-row total">
                    <span className="label">{i18n.language === 'zh' ? '预估到手价' : 'Est. Total'}</span>
                    <span className="value total-price">${parsedProduct.product.totalUSD?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn-primary"
                    onClick={() => navigate(`/product/${parsedProduct.productId}?platform=${parsedProduct.platform}`)}
                  >
                    <ShoppingCart size={18} />
                    {i18n.language === 'zh' ? '立即购买' : 'Buy Now'}
                  </button>
                  <a 
                    href={parsedProduct.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <ExternalLink size={18} />
                    {i18n.language === 'zh' ? '查看原链接' : 'View Original'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Results */}
      {showResults && !parsedProduct && (
        <section className="search-results">
          <h2>{i18n.language === 'zh' ? '搜索结果' : 'Search Results'}</h2>
          <div className="products-grid">
            {searchResults.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="product-image">
                  <img src={product.image || product.images?.[0]} alt={product.title} />
                  <span className={`platform-tag ${product.platform.toLowerCase()}`}>
                    {product.platform}
                  </span>
                </div>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <div className="product-meta">
                    <span className="price">¥{product.price}</span>
                    {product.deliveredPrice && (
                      <span className="delivered-price">≈ ${product.deliveredPrice}</span>
                    )}
                    <span className="sales">{product.sales?.toLocaleString()} {i18n.language === 'zh' ? '已售' : 'sold'}</span>
                  </div>
                  <div className="shop-info">
                    <span className="shop-name">{product.shopName}</span>
                    <span className="rating">⭐ {product.shopRating}</span>
                  </div>
                </div>
                <button className="view-btn">
                  {i18n.language === 'zh' ? '查看详情' : 'View Details'}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features">
        <h2>{i18n.language === 'zh' ? '为什么选择 UBUYHERE?' : 'Why Choose UBUYHERE?'}</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3>{t(feature.titleKey)}</h3>
              <p>{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>{i18n.language === 'zh' ? '如何使用' : 'How It Works'}</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <Search size={40} />
            <h3>{i18n.language === 'zh' ? '搜索商品' : 'Search Products'}</h3>
            <p>{i18n.language === 'zh' 
              ? '粘贴链接、上传图片或输入关键词' 
              : 'Paste link, upload image, or enter keywords'}</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <ShoppingBag size={40} />
            <h3>{i18n.language === 'zh' ? '下单付款' : 'Place Order'}</h3>
            <p>{i18n.language === 'zh' 
              ? '选择规格，确认价格，安全支付' 
              : 'Select specs, confirm price, pay securely'}</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <Package size={40} />
            <h3>{i18n.language === 'zh' ? '集运打包' : 'Consolidate & Pack'}</h3>
            <p>{i18n.language === 'zh' 
              ? '商品送达仓库，质检打包' 
              : 'Items arrive at warehouse, inspect & pack'}</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <Truck size={40} />
            <h3>{i18n.language === 'zh' ? '全球配送' : 'Global Delivery'}</h3>
            <p>{i18n.language === 'zh' 
              ? '清关派送，实时追踪' 
              : 'Customs clearance & delivery with tracking'}</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-content">
          <Shield size={48} />
          <h2>{i18n.language === 'zh' ? '安全购物保障' : 'Secure Shopping Guarantee'}</h2>
          <p>{i18n.language === 'zh' 
            ? '100%正品保证 · 安全支付 · 物流可追踪 · 售后无忧' 
            : '100% Authentic · Secure Payment · Trackable Shipping · Worry-free After-sales'}</p>
        </div>
      </section>
    </div>
  );
}
