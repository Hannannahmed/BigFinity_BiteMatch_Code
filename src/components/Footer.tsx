import React from 'react';
import { Shield, FileText, Mail, ExternalLink, Settings } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">BiteMatch</h3>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered culinary assistant for perfect food portions and flavor pairings.
            </p>
            <p className="text-gray-500 text-xs">
              © 2024 BiteMatch LLC. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-primary-medium text-sm flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms-of-service" 
                  className="text-gray-600 hover:text-primary-medium text-sm flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="/support" 
                  className="text-gray-600 hover:text-primary-medium text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Support
                </a>
              </li>
              <li>
                <a 
                  href="/privacy-choices" 
                  className="text-gray-600 hover:text-primary-medium text-sm flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Privacy Choices
                </a>
              </li>
            </ul>
          </div>

          {/* App Store Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Download</h4>
            <div className="space-y-3">
              <div className="text-gray-500 text-sm">
                Coming soon to:
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  App Store (iOS)
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <ExternalLink className="h-4 w-4" />
                  Google Play (Android)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-xs">
              BiteMatch uses AI to provide cooking recommendations. Results may vary based on individual preferences and ingredients.
            </div>
            <div className="text-gray-500 text-xs">
              Made with ❤️ for home cooks everywhere
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;