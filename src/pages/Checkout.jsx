import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  CreditCard, MapPin, Check, ChevronLeft, Package, 
  Shield, Clock, AlertCircle
} from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  const { product, selectedColor, selectedSize, quantity, destination, fees } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: destination || 'US'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    setOrderPlaced(true);
  };

  if (!product) {
    return (
      <div className="checkout-page">
        <div className="error-state">
          <AlertCircle size={48} />
          <h2>{lang === 'zh' ? '没有找到订单信息' : 'No order information found'}</h2>
          <button onClick={() => navigate('/')} className="back-home-btn">
            {lang === 'zh' ? '返回首页' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>{lang === 'zh' ? '订单提交成功！' : 'Order Placed Successfully!'}</h2>
          <p className="order-number">
            {lang === 'zh' ? '订单号' : 'Order #'}: UBH{Date.now().toString().slice(-8)}
          </p>
          <p className="success-message">
            {lang === 'zh' 
              ? '我们会在1-2个工作日内确认您的订单并开始采购。您可以在"我的订单"中查看进度。'
              : 'We will confirm your order and begin procurement within 1-2 business days. You can track progress in "My Orders".'}
          </p>
          <div className="success-timeline">
            <div className="timeline-item">
              <Clock size={20} />
              <span>{lang === 'zh' ? '订单确认: 1-2天' : 'Order Confirmation: 1-2 days'}</span>
            </div>
            <div className="timeline-item">
              <Package size={20} />
              <span>{lang === 'zh' ? '国内采购配送: 3-7天' : 'Domestic Procurement: 3-7 days'}</span>
            </div>
            <div className="timeline-item">
              <Shield size={20} />
              <span>{lang === 'zh' ? '质检打包: 1-2天' : 'Inspection & Packing: 1-2 days'}</span>
            </div>
          </div>
          <div className="success-actions">
            <button onClick={() => navigate('/')} className="continue-btn">
              {lang === 'zh' ? '继续购物' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        {lang === 'zh' ? '返回' : 'Back'}
      </button>

      <h1>{t('orderConfirmation')}</h1>

      <div className="checkout-container">
        {/* Left: Form */}
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="form-section">
              <h2><MapPin size={20} /> {t('shippingAddress')}</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>{lang === 'zh' ? '名' : 'First Name'} *</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{lang === 'zh' ? '姓' : 'Last Name'} *</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group full-width">
                  <label>{lang === 'zh' ? '邮箱' : 'Email'} *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group full-width">
                  <label>{lang === 'zh' ? '电话' : 'Phone'} *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group full-width">
                  <label>{lang === 'zh' ? '地址行1' : 'Address Line 1'} *</label>
                  <input 
                    type="text" 
                    name="address1" 
                    value={formData.address1}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group full-width">
                  <label>{lang === 'zh' ? '地址行2' : 'Address Line 2'}</label>
                  <input 
                    type="text" 
                    name="address2" 
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>{lang === 'zh' ? '城市' : 'City'} *</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{lang === 'zh' ? '州/省' : 'State/Province'} *</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{lang === 'zh' ? '邮编' : 'ZIP/Postal Code'} *</label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{lang === 'zh' ? '国家/地区' : 'Country'} *</label>
                  <select 
                    name="country" 
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h2><CreditCard size={20} /> {t('paymentMethod')}</h2>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">💳</span>
                  <span>{lang === 'zh' ? '信用卡/借记卡' : 'Credit/Debit Card'}</span>
                </label>
                <label className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">🅿️</span>
                  <span>PayPal</span>
                </label>
                <label className={`payment-option ${paymentMethod === 'apple' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="apple"
                    checked={paymentMethod === 'apple'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="payment-icon">🍎</span>
                  <span>Apple Pay</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-group full-width">
                    <label>{lang === 'zh' ? '卡号' : 'Card Number'}</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-group">
                    <label>{lang === 'zh' ? '有效期' : 'Expiry'}</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="place-order-btn">
              <Shield size={20} />
              {t('placeOrder')} - ${fees?.totalPrice}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary-section">
          <h2>{t('orderSummary')}</h2>
          
          <div className="summary-product">
            <img src={product.images[0]} alt="" />
            <div className="summary-product-info">
              <h3>{product.title[lang]}</h3>
              <p className="variant">
                {product.colors && product.colors[selectedColor]?.name[lang]}
                {product.sizes && product.sizes[selectedSize] && ` / ${product.sizes[selectedSize]}`}
              </p>
              <p className="qty">{lang === 'zh' ? '数量' : 'Qty'}: {quantity}</p>
            </div>
          </div>

          <div className="summary-breakdown">
            <div className="summary-row">
              <span>{t('originalPrice')}</span>
              <span>${fees?.productPriceUSD}</span>
            </div>
            <div className="summary-row">
              <span>{t('serviceFee')}</span>
              <span>${fees?.serviceFee}</span>
            </div>
            <div className="summary-row">
              <span>{t('shippingFee')}</span>
              <span>${fees?.shippingFee}</span>
            </div>
            <div className="summary-row">
              <span>{t('taxFee')}</span>
              <span>${fees?.taxFee}</span>
            </div>
            <div className="summary-row total">
              <span>{t('totalPrice')}</span>
              <span>${fees?.totalPrice}</span>
            </div>
          </div>

          <div className="summary-guarantee">
            <Shield size={16} />
            <span>
              {lang === 'zh' 
                ? '安全支付保障 · 信息加密传输' 
                : 'Secure Checkout · Encrypted Connection'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
