import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Upload, Globe, Truck, CreditCard, Languages, ShoppingBag, Package, Shield, ArrowRight, Loader2, Link } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import api from '../services/api';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedLink, setParsedLink] = useState(null);
  const fileInputRef = useRef(null);

  // 检测输入是否为链接
  const isUrl = (text) => {
    return text.includes('http') || text.includes('taobao') || text.includes('tmall') || 
           text.includes('jd.com') || text.includes('pinduoduo') || text.includes('tb.cn');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setParsedLink(null);

    try {
      // 检测是否为链接
      if (isUrl(searchQuery)) {
        // 调用链接解析API
        try {
          const parseResult = await api.parseProductUrl(searchQuery);
          if (parseResult.success) {
            setParsedLink(parseResult);
            // 如果解析出商品ID，直接跳转到商品详情页
            if (parseResult.productId) {
              navigate(`/product/${parseResult.productId}?platform=${parseResult.platform}`);
              return;
            }
          }
        } catch (e) {
          console.log('Link parse failed, falling back to search');
        }
      }

      // 调用搜索API
      try {
        const result = await api.searchProducts({ 
          q: searchQuery, 
          destination: 'US',
          pageSize: 20
        });
        
        if (result.success && result.data?.items?.length > 0) {
          setSearchResults(result.data.items);
          setShowResults(true);
        } else {
          // 如果API没有结果，使用模拟数据
          setSearchResults(mockProducts.map(p => ({
            id: p.id,
            platform: p.platform,
            title: p.title[i18n.language],
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
        setSearchResults(mockProducts.map(p => ({
          id: p.id,
          platform: p.platform,
          title: p.title[i18n.language],
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: 实现图片搜索API
      // 目前使用模拟数据
      setSearchResults(mockProducts.map(p => ({
        id: p.id,
        platform: p.platform,
        title: p.title[i18n.language],
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
          
          <div className="search-container">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
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
          {parsedLink && (
            <div className="parse-result">
              <Link size={16} />
              <span>
                {i18n.language === 'zh' 
                  ? `已识别 ${parsedLink.platform} 商品` 
                  : `Detected ${parsedLink.platform} product`}
              </span>
            </div>
          )}

          <div className="platform-badges">
            <span className="badge taobao">淘宝 Taobao</span>
            <span className="badge tmall">天猫 Tmall</span>
            <span className="badge jd">京东 JD</span>
            <span className="badge pdd">拼多多 Pinduoduo</span>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (
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
