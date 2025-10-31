import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
              <FileText className="h-8 w-8 text-primary-medium" />
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            </div>
            <p className="text-gray-600">
              Last updated: December 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using BiteMatch ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Service Description</h2>
            </div>
            <p className="text-gray-700 mb-4">
              BiteMatch is an AI-powered culinary assistant that provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Food portion and pairing recommendations</li>
              <li>AI analysis of food photos and descriptions</li>
              <li>Personalized cooking guidance and tips</li>
              <li>Meal planning and optimization suggestions</li>
              <li>Educational content about food and cooking</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Acceptable Use</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Use the service for legitimate cooking and food-related purposes</li>
                  <li>Provide accurate information about your food and dietary needs</li>
                  <li>Respect intellectual property rights</li>
                  <li>Do not attempt to reverse engineer or exploit the AI system</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Prohibited Activities</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Uploading inappropriate, offensive, or non-food related images</li>
                  <li>Attempting to overwhelm or abuse the AI service</li>
                  <li>Sharing false or misleading information</li>
                  <li>Using the service for commercial purposes without permission</li>
                </ul>
              </div>
            </div>
          </section>

          {/* AI Recommendations Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-semibold text-gray-900">AI Recommendations Disclaimer</h2>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                <strong>Important:</strong> BiteMatch provides AI-generated recommendations for informational and educational purposes only.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Recommendations are not professional nutritional or medical advice</li>
                <li>Always consider your dietary restrictions, allergies, and health conditions</li>
                <li>Use your judgment when following any cooking or food recommendations</li>
                <li>Consult healthcare professionals for specific dietary needs</li>
                <li>AI recommendations may not always be accurate or suitable for your situation</li>
              </ul>
            </div>
          </section>

          {/* Subscription and Billing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscription and Billing</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Free Tier</h3>
                <p className="text-gray-700">
                  BiteMatch offers a free tier with limited daily recommendations. Free users receive 10 AI recommendations per day.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Subscriptions</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Subscriptions are billed monthly or annually as selected</li>
                  <li>Billing occurs automatically unless cancelled</li>
                  <li>Refunds are available within 7 days of purchase</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Premium features remain active until the end of the billing period</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Rights</h3>
                <p className="text-gray-700">
                  BiteMatch, its logo, and all related content are owned by BiteMatch LLC. The AI algorithms, user interface, and service design are protected by intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Content</h3>
                <p className="text-gray-700">
                  You retain ownership of any food photos or descriptions you submit. By using our service, you grant us a limited license to process this content for providing recommendations.
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                BiteMatch LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Food allergic reactions or dietary complications</li>
                <li>Cooking accidents or food safety issues</li>
                <li>Loss of data or service interruptions</li>
                <li>Any damages resulting from use of AI recommendations</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our total liability is limited to the amount you paid for the service in the past 12 months.
              </p>
            </div>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-700">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. We may temporarily suspend the service for maintenance, updates, or technical issues. We are not liable for any inconvenience caused by service interruptions.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Either party may terminate this agreement at any time:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>By You:</strong> Stop using the service and cancel any subscriptions</li>
                <li><strong>By Us:</strong> We may terminate access for violations of these terms</li>
                <li><strong>Effect:</strong> Upon termination, your right to use the service ceases immediately</li>
                <li><strong>Data:</strong> You may export your data before termination</li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by the laws of [Your State/Country]. Any disputes will be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@bitematch.com</p>
              <p><strong>Address:</strong> BiteMatch LLC, [Your Business Address]</p>
              <p><strong>Phone:</strong> [Your Business Phone]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;