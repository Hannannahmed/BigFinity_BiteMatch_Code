import React from 'react';
import { ArrowLeft, Shield, Smartphone, Globe } from 'lucide-react';

const AppStoreCompliance: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e7f3fb' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-primary-medium hover:text-primary-dark mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to BiteMatch
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary-medium" />
              <h1 className="text-3xl font-bold text-gray-900">App Store Information</h1>
            </div>
            <p className="text-gray-600">
              Official information for BiteMatch mobile applications
            </p>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* App Details */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Application Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">App Name</h3>
                  <p className="text-gray-700">BiteMatch - Perfect Portion Calculator</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Developer</h3>
                  <p className="text-gray-700">BiteMatch LLC</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                  <p className="text-gray-700">Food & Drink</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Age Rating</h3>
                  <p className="text-gray-700">4+ (suitable for all ages)</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Version</h3>
                  <p className="text-gray-700">1.0.0</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                  <p className="text-gray-700">Approximately 5MB</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
                  <p className="text-gray-700">English</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Compatibility</h3>
                  <p className="text-gray-700">iOS 14.0+, Android 8.0+</p>
                </div>
              </div>
            </div>
          </section>

          {/* App Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">App Description</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Never run out of sauce again!</strong> BiteMatch uses AI to analyze your food and give you the perfect portion recommendations.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Smart food analysis from photos</li>
                <li>AI-powered portion recommendations</li>
                <li>Four unique meal vibes for personalized guidance</li>
                <li>Real-time streaming AI responses</li>
                <li>Educational cooking insights</li>
                <li>History tracking and favorites</li>
              </ul>
              
              <p className="text-gray-700">
                Perfect for home cooks, food enthusiasts, and anyone who wants to improve their cooking with AI-powered guidance.
              </p>
            </div>
          </section>

          {/* Privacy & Permissions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy & Permissions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Required Permissions</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Camera:</strong> To take photos of food for AI analysis</li>
                  <li><strong>Photo Library:</strong> To select existing food photos</li>
                  <li><strong>Internet:</strong> To process AI recommendations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Data Collection</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Food photos are processed temporarily and not stored</li>
                  <li>Usage analytics to improve recommendations</li>
                  <li>No personal information required</li>
                  <li>All data processing complies with privacy regulations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* App Store Links */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Download Links</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">iOS App Store</h3>
                <p className="text-sm text-gray-600 mb-4">Coming Soon</p>
                <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                  Not Available Yet
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Google Play</h3>
                <p className="text-sm text-gray-600 mb-4">Coming Soon</p>
                <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                  Not Available Yet
                </button>
              </div>
              
              <div className="bg-primary-light rounded-lg p-6 text-center">
                <Globe className="h-12 w-12 text-primary-medium mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Web App</h3>
                <p className="text-sm text-gray-600 mb-4">Available Now</p>
                <button 
                  onClick={() => window.open('/app', '_blank')}
                  className="bg-primary-medium text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Try BiteMatch
                </button>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Developer Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Company:</strong> BiteMatch LLC</p>
              <p><strong>Support Email:</strong> support@bitematch.net</p>
              <p><strong>Privacy Policy:</strong> <a href="/privacy-policy">View Privacy Policy</a></p>
              <p><strong>Terms of Service:</strong> <a href="/terms-of-service">View Terms of Service</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppStoreCompliance;