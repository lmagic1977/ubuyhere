import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">UBUYHERE</span>
          <span className="logo-slogan">{t('slogan')}</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>{t('home')}</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>{t('orders')}</Link>
          <Link to="/help" onClick={() => setMenuOpen(false)}>{t('help')}</Link>
        </nav>

        <div className="header-actions">
          <button className="lang-btn" onClick={toggleLanguage} title={t('switchLang')}>
            <Globe size={20} />
            <span>{i18n.language.toUpperCase()}</span>
          </button>
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            <span className="cart-count">0</span>
          </Link>
          <button className="user-btn">
            <User size={20} />
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
