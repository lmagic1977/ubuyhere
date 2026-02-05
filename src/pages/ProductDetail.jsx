import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft, ChevronRight, ShoppingCart, CreditCard, 
  Star, Truck, Shield, AlertTriangle, Info, Check, Package
} from 'lucide-react';
import { mockProducts, calculateFees, getEstimatedDelivery } from '../data/mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [destination, setDestination] = useState('US');

  useEffect(() => {
    const found = mockProducts.find(p => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className="loading">{t('loading')}</div>;
  }

  const fees = calculateFees(product.originalPrice * quantity, 0.5 * quantity, destination);
  const delivery = getEstimatedDelivery(destination);
  const lang = i18n.language;

  const destinations = [
    { code: 'US', name: lang === 'zh' ? '美国' : 'United States' },
    { code: 'UK', name: lang === 'zh' ? '英国' : 'United Kingdom' },
    { code: 'CA', name: lang === 'zh' ? '加拿大' : 'Canada' },
    { code: 'AU', name: lang === 'zh' ? '澳大利亚' : 'Australia' },
    { code: 'EU', name: lang === 'zh' ? '欧盟' : 'European Union' }
  ];

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        {lang === 'zh' ? '返回' : 'Back'}
      </button>

      <div className="product-container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={product.images[currentImage]} alt={product.title[lang]} />
            {product.images.length > 1 && (
              <>
                <button 
                  className="nav-btn prev"
                  onClick={() => setCurrentImage(i => i > 0 ? i - 1 : product.images.length - 1)}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="nav-btn next"
                  onClick={() => setCurrentImage(i => i < product.images.length - 1 ? i + 1 : 0)}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <div className="thumbnails">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                className={`thumbnail ${idx === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(idx)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="platform-badge">{product.platform}</div>
          <h1>{product.title[lang]}</h1>
          
          <div className="shop-section">
            <span className="shop-name">{product.shopName}</span>
            <span className="rating"><Star size={16} fill="#ffc107" stroke="#ffc107" /> {product.shopRating}</span>
            <span className="sales">{product.sales.toLocaleString()} {lang === 'zh' ? '已售' : 'sold'}</span>
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="price-row main-price">
              <span>{t('originalPrice')}</span>
              <span>¥{product.originalPrice} × {quantity} = <strong>${fees.productPriceUSD}</strong></span>
            </div>
            <div className="price-row">
              <span>{t('serviceFee')}</span>
              <span>${fees.serviceFee}</span>
            </div>
            <div className="price-row">
              <span>{t('shippingFee')}</span>
              <span>${fees.shippingFee}</span>
            </div>
            <div className="price-row">
              <span>{t('taxFee')}</span>
              <span>${fees.taxFee}</span>
            </div>
            <div className="price-row total">
              <span>{t('totalPrice')}</span>
              <span className="total-price">${fees.totalPrice}</span>
            </div>
          </div>

          {/* Destination Selector */}
          <div className="option-section">
            <label>{lang === 'zh' ? '配送目的地' : 'Ship To'}</label>
            <div className="destination-selector">
              {destinations.map(dest => (
                <button
                  key={dest.code}
                  className={`dest-btn ${destination === dest.code ? 'active' : ''}`}
                  onClick={() => setDestination(dest.code)}
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="option-section">
              <label>{t('selectColor')}: {product.colors[selectedColor].name[lang]}</label>
              <div className="color-options">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`color-btn ${idx === selectedColor ? 'active' : ''}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => setSelectedColor(idx)}
                    title={color.name[lang]}
                  >
                    {idx === selectedColor && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="option-section">
              <label>{t('selectSize')}</label>
              <div className="size-options">
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className={`size-btn ${idx === selectedSize ? 'active' : ''}`}
                    onClick={() => setSelectedSize(idx)}
                  >
                    {size}
                    {product.sizeChart && product.sizeChart[size] && (
                      <span className="size-hint">US {product.sizeChart[size].us}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="option-section">
            <label>{t('quantity')}</label>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="delivery-info">
            <Package size={20} />
            <span>{t('estimatedDelivery')}: {delivery.min}-{delivery.max} {t('days')}</span>
          </div>

          {/* Risk Warning */}
          <div className={`risk-warning ${product.riskLevel}`}>
            {product.riskLevel === 'low' ? <Shield size={20} /> : <AlertTriangle size={20} />}
            <span>{product.riskNote[lang]}</span>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-cart-btn">
              <ShoppingCart size={20} />
              {t('addToCart')}
            </button>
            <button 
              className="buy-now-btn"
              onClick={() => navigate('/checkout', { 
                state: { 
                  product, 
                  selectedColor, 
                  selectedSize, 
                  quantity, 
                  destination,
                  fees 
                }
              })}
            >
              <CreditCard size={20} />
              {t('buyNow')}
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        <div className="tab-section">
          <h3><Info size={20} /> {t('specifications')}</h3>
          <div className="specs-table">
            {Object.entries(product.specifications[lang]).map(([key, value]) => (
              <div key={key} className="spec-row">
                <span className="spec-key">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-section">
          <h3><Star size={20} /> {t('reviews')} ({product.reviews?.length || 0})</h3>
          <div className="reviews-list">
            {product.reviews?.map((review, idx) => (
              <div key={idx} className="review-item">
                <div className="review-header">
                  <span className="reviewer">{review.user}</span>
                  <span className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < review.rating ? '#ffc107' : 'transparent'}
                        stroke="#ffc107"
                      />
                    ))}
                  </span>
                </div>
                <p>{review.content[lang]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-section">
          <h3><Truck size={20} /> {t('shippingInfo')}</h3>
          <div className="shipping-info-content">
            <p>{lang === 'zh' 
              ? '商品将由卖家发货至我们的中国仓库，经质检、打包后通过国际快递送达您的地址。'
              : 'Items will be shipped by seller to our China warehouse, inspected, packed, then delivered to your address via international courier.'}</p>
            <ul>
              <li>{lang === 'zh' ? '支持多件商品合并打包，节省运费' : 'Multiple items can be consolidated to save shipping costs'}</li>
              <li>{lang === 'zh' ? '提供包裹实拍照片' : 'Package photos provided before shipping'}</li>
              <li>{lang === 'zh' ? '全程物流可追踪' : 'Full tracking available'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
