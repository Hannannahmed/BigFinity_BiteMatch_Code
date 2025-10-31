import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Book, HelpCircle, Send } from 'lucide-react';

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to your support system
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              <HelpCircle className="h-8 w-8 text-primary-medium" />
              <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
            </div>
            <p className="text-gray-600">
              We're here to help! Get answers to your questions or contact our support team.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Book className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How does BiteMatch work?</h3>
                <p className="text-gray-700 text-sm">
                  BiteMatch uses AI to analyze your food photos and descriptions, then provides personalized recommendations for portions, pairings, and cooking techniques based on your preferences and meal vibe.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is my food data private?</h3>
                <p className="text-gray-700 text-sm">
                  Yes! Your photos are processed temporarily and not stored. Your recommendation history is saved locally on your device. See our <a href="/privacy-policy" className="text-primary-medium hover:underline">Privacy Policy</a> for details.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How many free recommendations do I get?</h3>
                <p className="text-gray-700 text-sm">
                  Free users get 10 AI recommendations per day. Premium users get unlimited recommendations plus advanced features like nutritional insights and meal planning.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-700 text-sm">
                  Absolutely! You can cancel your subscription at any time. Your premium features will remain active until the end of your billing period, and we offer a 7-day money-back guarantee.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What if the AI recommendation isn't accurate?</h3>
                <p className="text-gray-700 text-sm">
                  AI recommendations are suggestions based on general culinary principles. Always use your judgment and consider your dietary restrictions. You can ask for "another idea" to get alternative recommendations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you have mobile apps?</h3>
                <p className="text-gray-700 text-sm">
                  BiteMatch works great in your mobile browser! We're also developing native iOS and Android apps. You can add BiteMatch to your home screen for an app-like experience.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Contact Support</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-medium focus:border-primary-medium"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-medium focus:border-primary-medium"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-medium focus:border-primary-medium"
                >
                  <option value="">Select a topic</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-medium focus:border-primary-medium"
                  placeholder="Please describe your question or issue in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-medium text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <div>
                  <p className="font-medium">Direct Email</p>
                  <p className="text-sm">support@bitematch.com</p>
                  <p className="text-xs text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-primary-medium" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Guide</h3>
              <p className="text-gray-600 text-sm">
                Learn how to get the most out of BiteMatch with our comprehensive user guide.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary-medium" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                Join our community of home cooks sharing tips and successful combinations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-primary-medium" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">
                Watch video tutorials to master BiteMatch's features and cooking techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;