import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';
import { FaFacebookF , FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for quality products at unbeatable prices. 
              Shop with confidence and enjoy seamless shopping experience.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Contact
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="/profile" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> My Account
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Order Tracking
                </a>
              </li>
              <li>
                <a href="/wishlist" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Wishlist
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Returns & Exchange
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-sm">
                  123 Shopping Street,<br />
                  Commerce City, CC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-green-500 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm hover:text-white">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-red-500 flex-shrink-0" />
                <a href="mailto:support@shophub.com" className="text-sm hover:text-white">
                  support@shophub.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="text-white font-semibold mb-3">We Accept</h4>
              <div className="flex space-x-3">
                <div className="bg-white px-3 py-2 rounded">
                  <span className="text-blue-600 font-bold text-sm">VISA</span>
                </div>
                <div className="bg-white px-3 py-2 rounded">
                  <span className="text-orange-600 font-bold text-sm">Master</span>
                </div>
                <div className="bg-white px-3 py-2 rounded">
                  <span className="text-blue-700 font-bold text-sm">PayPal</span>
                </div>
                <div className="bg-white px-3 py-2 rounded">
                  <span className="text-purple-600 font-bold text-sm">UPI</span>
                </div>
              </div>
            </div>

            {/* <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-3">Download Our App</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <div className="text-left text-xs">
                      <div className="text-gray-400">Download on</div>
                      <div className="text-white font-semibold">App Store</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left text-xs">
                      <div className="text-gray-400">GET IT ON</div>
                      <div className="text-white font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm">
            <p className="text-gray-400">
              © {currentYear} Vikramaadhithya . All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500 mx-1" />
              <span>by Your Team</span>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;