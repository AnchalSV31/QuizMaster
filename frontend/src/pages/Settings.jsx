import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    siteName: 'QuizMaster',
    allowSignup: true,
    quizTimerEnabled: true,
    defaultQuizDuration: 60,
    passPercentage: 60,
    maxAttempts: 3,
    showCorrectAnswers: true,
    emailNotifications: true,
    maintenanceMode: false
  });

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingsChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const saveSettings = () => {
    // Mock API call
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const saveProfile = (e) => {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Mock API call
    console.log('Updating profile:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-5xl font-bold mb-4 gradient-text">
            Settings
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Configure your quiz application preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 gradient-text flex items-center">
              <span className="text-3xl mr-3">👤</span>
              Profile Settings
            </h2>

            <form onSubmit={saveProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="input-field"
                />
              </div>

              <div className="pt-4 border-t border-dark-border">
                <h3 className="font-semibold mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={profile.currentPassword}
                      onChange={handleProfileChange}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleProfileChange}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={profile.confirmPassword}
                      onChange={handleProfileChange}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Update Profile
              </button>
            </form>
          </motion.div>

          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 gradient-text flex items-center">
              <span className="text-3xl mr-3">⚙️</span>
              General Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Allow User Signup</div>
                  <div className="text-sm text-gray-400">Enable new user registration</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowSignup}
                    onChange={(e) => handleSettingsChange('allowSignup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Quiz Timer</div>
                  <div className="text-sm text-gray-400">Enable countdown timer for quizzes</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.quizTimerEnabled}
                    onChange={(e) => handleSettingsChange('quizTimerEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Default Quiz Duration (seconds)
                </label>
                <input
                  type="number"
                  value={settings.defaultQuizDuration}
                  onChange={(e) => handleSettingsChange('defaultQuizDuration', parseInt(e.target.value))}
                  className="input-field"
                  min="30"
                  max="300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Pass Percentage
                </label>
                <input
                  type="number"
                  value={settings.passPercentage}
                  onChange={(e) => handleSettingsChange('passPercentage', parseInt(e.target.value))}
                  className="input-field"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Maximum Attempts per Quiz
                </label>
                <input
                  type="number"
                  value={settings.maxAttempts}
                  onChange={(e) => handleSettingsChange('maxAttempts', parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 mt-8"
        >
          <h2 className="font-display text-2xl font-bold mb-6 gradient-text flex items-center">
            <span className="text-3xl mr-3">🔔</span>
            Notifications & Privacy
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Show Correct Answers</div>
                <div className="text-sm text-gray-400">Display correct answers after quiz completion</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showCorrectAnswers}
                  onChange={(e) => handleSettingsChange('showCorrectAnswers', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Email Notifications</div>
                <div className="text-sm text-gray-400">Receive email updates about quiz results</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingsChange('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Maintenance Mode</div>
                <div className="text-sm text-gray-400">Disable access for students (admins only)</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingsChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-coral"></div>
              </label>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-dark-border">
            <button onClick={saveSettings} className="btn-primary">
              Save All Settings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
