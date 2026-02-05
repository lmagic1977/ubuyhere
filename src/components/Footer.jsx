import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <h3>UBUYHERE</h3>
          <p>{lang === 'zh' 
            ? '您的中国购物平台，让全球用户轻松购买中国商品。' 
            : 'Your gateway to China shopping. Making Chinese products accessible worldwide.'}</p>
        </div>

        <div className="footer-section links">
          <h4>{lang === 'zh' ? '快速链接' : 'Quick Links'}</h4>
          <ul>
            <li><a href="/about">{lang === 'zh' ? '关于我们' : 'About Us'}</a></li>
            <li><a href="/how-it-works">{lang === 'zh' ? '如何使用' : 'How It Works'}</a></li>
            <li><a href="/shipping">{lang === 'zh' ? '运费说明' : 'Shipping Info'}</a></li>
            <li><a href="/faq">{lang === 'zh' ? '常见问题' : 'FAQ'}</a></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>{lang === 'zh' ? '帮助支持' : 'Support'}</h4>
          <ul>
            <li><a href="/contact">{lang === 'zh' ? '联系客服' : 'Contact Us'}</a></li>
            <li><a href="/returns">{lang === 'zh' ? '退换政策' : 'Return Policy'}</a></li>
            <li><a href="/terms">{lang === 'zh' ? '服务条款' : 'Terms of Service'}</a></li>
            <li><a href="/privacy">{lang === 'zh' ? '隐私政策' : 'Privacy Policy'}</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>{lang === 'zh' ? '联系方式' : 'Contact'}</h4>
          <div className="contact-item">
            <Mail size={16} />
            <span>support@ubuyhere.com</span>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <span>+1 (888) 123-4567</span>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>{lang === 'zh' ? '全球服务' : 'Serving Worldwide'}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 UBUYHERE. {lang === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</p>
        <div className="payment-methods">
          <span>💳 Visa</span>
          <span>💳 Mastercard</span>
          <span>🅿️ PayPal</span>
          <span>🍎 Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}
