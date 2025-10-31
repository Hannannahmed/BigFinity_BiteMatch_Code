import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Eye, Database, Settings, Check, X } from 'lucide-react';

interface PrivacySettings {
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
  dataRetention: '30days' | '1year' | 'indefinite';
  shareUsage: boolean;
}

const PrivacyChoices: React.FC = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    analytics: true,
    performance: true,
    marketing: false,
    dataRetention: '1year',
    shareUsage: false
  });
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load existing privacy settings
    const savedSettings = localStorage.getItem('biteMatchPrivacySettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error loading privacy settings:', e);
      }
    }
  }, []);

  const handleSettingChange = (key: keyof PrivacySettings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('biteMatchPrivacySettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all your BiteMatch data? This cannot be undone.')) {
      localStorage.removeItem('biteMatchHistory');
      localStorage.removeItem('biteMatchUsage');
      localStorage.removeItem('biteMatchPrivacySettings');
      localStorage.removeItem('biteMatchRecentBites');
      alert('All your BiteMatch data has been cleared.');
    }
  };

  const handleExportData = () => {
    const allData = {
      history: localStorage.getItem('biteMatchHistory'),
      usage: localStorage.getItem('biteMatchUsage'),
      privacy: localStorage.getItem('biteMatchPrivacySettings'),
      recentBites: localStorage.getItem('biteMatchRecentBites'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitematch-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              <Settings className="h-8 w-8 text-primary-medium" />
              <h1 className="text-3xl font-bold text-gray-900">Privacy Choices</h1>
            </div>
            <p className="text-gray-600">
              Control how BiteMatch uses your data and manages your privacy
            </p>
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          
          {/* Data Collection Preferences */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Collection Preferences</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Analytics & Usage Data</h3>
                  <p className="text-sm text-gray-600">
                    Help us improve BiteMatch by sharing anonymous usage statistics
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-medium"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Performance Monitoring</h3>
                  <p className="text-sm text-gray-600">
                    Allow us to monitor app performance to fix bugs and improve speed
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.performance}
                    onChange={(e) => handleSettingChange('performance', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-medium"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Marketing Communications</h3>
                  <p className="text-sm text-gray-600">
                    Receive updates about new features and cooking tips (email required)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.marketing}
                    onChange={(e) => handleSettingChange('marketing', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-medium"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Share Usage for AI Improvement</h3>
                  <p className="text-sm text-gray-600">
                    Help improve AI recommendations by sharing anonymized usage patterns
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.shareUsage}
                    onChange={(e) => handleSettingChange('shareUsage', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-medium"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Retention</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Choose how long you want BiteMatch to keep your recommendation history:
              </p>
              
              <div className="space-y-3">
                {[
                  { value: '30days', label: '30 Days', description: 'Keep recent recommendations for quick access' },
                  { value: '1year', label: '1 Year', description: 'Build a comprehensive cooking history' },
                  { value: 'indefinite', label: 'Keep Forever', description: 'Never lose your favorite combinations' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="dataRetention"
                      value={option.value}
                      checked={settings.dataRetention === option.value}
                      onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                      className="w-4 h-4 text-primary-medium bg-gray-100 border-gray-300 focus:ring-primary-medium"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Data Management */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-primary-medium" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Management</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={handleExportData}
                className="flex items-center justify-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Database className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-blue-900">Export My Data</div>
                  <div className="text-sm text-blue-700">Download all your BiteMatch data</div>
                </div>
              </button>

              <button
                onClick={handleClearAllData}
                className="flex items-center justify-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <X className="h-5 w-5 text-red-600" />
                <div className="text-left">
                  <div className="font-medium text-red-900">Clear All Data</div>
                  <div className="text-sm text-red-700">Permanently delete your data</div>
                </div>
              </button>
            </div>
          </section>

          {/* Current Data Summary */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Data</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-900">Recommendation History</div>
                <div className="text-gray-600">
                  {(() => {
                    try {
                      const history = JSON.parse(localStorage.getItem('biteMatchHistory') || '[]');
                      return `${history.length} saved recommendations`;
                    } catch {
                      return '0 saved recommendations';
                    }
                  })()}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Usage Analytics</div>
                <div className="text-gray-600">
                  {(() => {
                    try {
                      const usage = JSON.parse(localStorage.getItem('biteMatchUsage') || '{}');
                      return `${usage.usedToday || 0} requests today`;
                    } catch {
                      return '0 requests today';
                    }
                  })()}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Storage Used</div>
                <div className="text-gray-600">
                  {(() => {
                    const totalSize = Object.keys(localStorage)
                      .filter(key => key.startsWith('biteMatch'))
                      .reduce((total, key) => total + (localStorage.getItem(key)?.length || 0), 0);
                    return `${(totalSize / 1024).toFixed(1)} KB`;
                  })()}
                </div>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Changes are saved automatically to your device
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                saved 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-primary-medium text-white hover:bg-primary-dark'
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4" />
                  Save Preferences
                </>
              )}
            </button>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How BiteMatch Protects Your Privacy</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">What We Store Locally</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  Your recommendation history (on your device only)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  Your meal preferences and vibes
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  Usage statistics for your personal tracking
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  These privacy preference settings
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">What We Don't Store</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  Your food photos (processed temporarily only)
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  Personal information or accounts
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  Location data or device identifiers
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  Browsing history from other sites
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Questions?</h2>
          <p className="text-gray-700 mb-6">
            If you have questions about your privacy choices or how BiteMatch handles your data, we're here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/privacy-policy"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Shield className="h-4 w-4" />
              Read Full Privacy Policy
            </a>
            <a
              href="/support"
              className="flex items-center gap-2 px-4 py-2 bg-primary-medium text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Eye className="h-4 w-4" />
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyChoices;