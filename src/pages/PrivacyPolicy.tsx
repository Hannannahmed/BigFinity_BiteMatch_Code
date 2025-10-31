import React from 'react';
import { ArrowLeft, Shield, Eye, Database, Lock } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            <p className="text-gray-600">
              Last updated: December 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              BiteMatch LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our BiteMatch application and related services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Food descriptions and cooking questions you submit</li>
                  <li>Photos of food you upload (processed temporarily, not stored)</li>
                  <li>Meal preferences and cooking style selections</li>
                  <li>Usage history and recommendation preferences (stored locally)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage analytics (features used, session duration)</li>
                  <li>Technical data (IP address, error logs)</li>
                  <li>Performance metrics (response times, success rates)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide AI-powered cooking recommendations and food analysis</li>
              <li>Improve our artificial intelligence models and recommendation accuracy</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send important updates about service changes or new features</li>
              <li>Ensure security and prevent fraud or abuse</li>
            </ul>
          </section>

          {/* Data Storage and Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Storage and Security</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Local Storage</h3>
                <p className="text-gray-700">
                  Your recommendation history and preferences are stored locally on your device. This data remains private and is not transmitted to our servers unless you explicitly share recommendations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Image Processing</h3>
                <p className="text-gray-700">
                  Food photos you upload are processed temporarily for AI analysis and are not permanently stored on our servers. Images are automatically deleted after processing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Security Measures</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Encryption of data in transit using HTTPS</li>
                  <li>Secure API connections with authentication</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited data retention policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Processing</h3>
                <p className="text-gray-700">
                  We use Google's Gemini AI service to process your food descriptions and images. This data is subject to Google's privacy policies and is not stored permanently.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-700">
                  We may use analytics services to understand how users interact with our app. This data is anonymized and used solely for improving our service.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Access:</strong> You can view all data stored locally on your device</li>
              <li><strong>Deletion:</strong> You can clear your history and data at any time</li>
              <li><strong>Portability:</strong> You can export your recommendation history</li>
              <li><strong>Opt-out:</strong> You can disable analytics and data collection</li>
              <li><strong>Correction:</strong> You can modify or update your preferences</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700">
              BiteMatch is designed for users 13 years and older. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Continued use of the service after changes constitutes acceptance of the new policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> privacy@bitematch.com</p>
              <p><strong>Address:</strong> BiteMatch LLC, P.O. Box 32306 Juneau, AK 99803</p>
              <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;