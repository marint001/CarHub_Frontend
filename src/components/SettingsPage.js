import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const SettingsPage = ({ onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('privacy');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // 2FA State
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    emailVisibility: 'public',
    phoneVisibility: 'private',
    profileVisibility: 'public',
    showOnlineStatus: true,
    dataSharing: false,
    activityStatus: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    orderUpdates: true,
    promotionalEmails: false,
    carAlerts: true
  });

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setPasswordErrors({});
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) errors.newPassword = 'New password is required';
    if (passwordData.newPassword.length < 6) errors.newPassword = 'Password must be at least 6 characters';
    if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showSuccess('Password changed successfully!');
    }
  };

  const handleToggle2FA = () => {
    if (!twoFAEnabled) {
      setShow2FAModal(true);
    } else {
      setTwoFAEnabled(false);
      showSuccess('2FA has been disabled');
    }
  };

  const handleEnable2FA = () => {
    if (verificationCode === '123456') {
      setTwoFAEnabled(true);
      setShow2FAModal(false);
      setVerificationCode('');
      showSuccess('Two-factor authentication enabled!');
    } else {
      alert('Invalid verification code');
    }
  };

  const updatePrivacySetting = (key, value) => {
    setPrivacySettings({ ...privacySettings, [key]: value });
    showSuccess(`${key} updated successfully`);
  };

  const updateNotificationSetting = (key, value) => {
    setNotificationSettings({ ...notificationSettings, [key]: value });
    showSuccess(`${key} updated`);
  };

  const tabs = [
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'account', name: 'Account', icon: '👤' }
  ];

  return (
    <div className="settings-page">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            className="settings-success-toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <span>✓</span>
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <h1>Settings</h1>
          <div className="settings-header-right"></div>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* Privacy & Security Tab */}
          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-section"
            >
              {/* Password Management */}
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">🔐</div>
                  <div>
                    <h3>Password Management</h3>
                    <p>Change your password to keep your account secure</p>
                  </div>
                </div>
                <button className="settings-btn" onClick={() => setShowPasswordModal(true)}>
                  Change Password →
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">📱</div>
                  <div>
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="toggle-wrapper">
                  <span className="toggle-label">{twoFAEnabled ? 'Enabled' : 'Disabled'}</span>
                  <button 
                    className={`toggle-switch ${twoFAEnabled ? 'active' : ''}`}
                    onClick={handleToggle2FA}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>
                {twoFAEnabled && (
                  <div className="security-badge">
                    <span>✓ 2FA is active on your account</span>
                  </div>
                )}
              </div>

              {/* Profile Visibility */}
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">👁️</div>
                  <div>
                    <h3>Profile Visibility</h3>
                    <p>Control who can see your profile information</p>
                  </div>
                </div>
                <div className="radio-group">
                  <label className={`radio-option ${privacySettings.profileVisibility === 'public' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="public"
                      checked={privacySettings.profileVisibility === 'public'}
                      onChange={() => updatePrivacySetting('profileVisibility', 'public')}
                    />
                    <div>
                      <strong>Public</strong>
                      <span>Anyone can view your profile</span>
                    </div>
                  </label>
                  <label className={`radio-option ${privacySettings.profileVisibility === 'private' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="private"
                      checked={privacySettings.profileVisibility === 'private'}
                      onChange={() => updatePrivacySetting('profileVisibility', 'private')}
                    />
                    <div>
                      <strong>Private</strong>
                      <span>Only you can view your profile</span>
                    </div>
                  </label>
                  <label className={`radio-option ${privacySettings.profileVisibility === 'contacts' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="contacts"
                      checked={privacySettings.profileVisibility === 'contacts'}
                      onChange={() => updatePrivacySetting('profileVisibility', 'contacts')}
                    />
                    <div>
                      <strong>Contacts Only</strong>
                      <span>Only saved contacts can view</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Email & Phone Visibility */}
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">📧</div>
                  <div>
                    <h3>Contact Information Visibility</h3>
                    <p>Control who can see your email and phone number</p>
                  </div>
                </div>
                <div className="visibility-options">
                  <div className="visibility-item">
                    <label>Email Visibility</label>
                    <select 
                      value={privacySettings.emailVisibility}
                      onChange={(e) => updatePrivacySetting('emailVisibility', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>
                  <div className="visibility-item">
                    <label>Phone Visibility</label>
                    <select 
                      value={privacySettings.phoneVisibility}
                      onChange={(e) => updatePrivacySetting('phoneVisibility', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Activity Status */}
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">🟢</div>
                  <div>
                    <h3>Activity Status</h3>
                    <p>Control your online presence</p>
                  </div>
                </div>
                <div className="setting-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={privacySettings.activityStatus}
                      onChange={(e) => updatePrivacySetting('activityStatus', e.target.checked)}
                    />
                    Show when I'm active
                  </label>
                </div>
                <div className="setting-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={privacySettings.showOnlineStatus}
                      onChange={(e) => updatePrivacySetting('showOnlineStatus', e.target.checked)}
                    />
                    Show online status
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-section"
            >
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">🔔</div>
                  <div>
                    <h3>Notification Preferences</h3>
                    <p>Choose how you want to receive updates</p>
                  </div>
                </div>
                <div className="notification-options">
                  <div className="notification-item">
                    <div>
                      <strong>Email Notifications</strong>
                      <span>Receive updates via email</span>
                    </div>
                    <button 
                      className={`toggle-switch-small ${notificationSettings.emailNotifications ? 'active' : ''}`}
                      onClick={() => updateNotificationSetting('emailNotifications', !notificationSettings.emailNotifications)}
                    >
                      <span className="toggle-slider-small"></span>
                    </button>
                  </div>
                  <div className="notification-item">
                    <div>
                      <strong>Push Notifications</strong>
                      <span>Receive browser notifications</span>
                    </div>
                    <button 
                      className={`toggle-switch-small ${notificationSettings.pushNotifications ? 'active' : ''}`}
                      onClick={() => updateNotificationSetting('pushNotifications', !notificationSettings.pushNotifications)}
                    >
                      <span className="toggle-slider-small"></span>
                    </button>
                  </div>
                  <div className="notification-item">
                    <div>
                      <strong>SMS Alerts</strong>
                      <span>Receive text message alerts</span>
                    </div>
                    <button 
                      className={`toggle-switch-small ${notificationSettings.smsAlerts ? 'active' : ''}`}
                      onClick={() => updateNotificationSetting('smsAlerts', !notificationSettings.smsAlerts)}
                    >
                      <span className="toggle-slider-small"></span>
                    </button>
                  </div>
                  <div className="notification-item">
                    <div>
                      <strong>Order Updates</strong>
                      <span>Get notified about your orders</span>
                    </div>
                    <button 
                      className={`toggle-switch-small ${notificationSettings.orderUpdates ? 'active' : ''}`}
                      onClick={() => updateNotificationSetting('orderUpdates', !notificationSettings.orderUpdates)}
                    >
                      <span className="toggle-slider-small"></span>
                    </button>
                  </div>
                  <div className="notification-item">
                    <div>
                      <strong>Promotional Emails</strong>
                      <span>Receive offers and deals</span>
                    </div>
                    <button 
                      className={`toggle-switch-small ${notificationSettings.promotionalEmails ? 'active' : ''}`}
                      onClick={() => updateNotificationSetting('promotionalEmails', !notificationSettings.promotionalEmails)}
                    >
                      <span className="toggle-slider-small"></span>
                    </button>
                  </div>
                  <div className="notification-item">
                    <div>
                      <strong>Car Alerts</strong>
                      <span>Get notified about new cars</span>
                    </div>
                    <button 
                      className={`toggle-switch-small ${notificationSettings.carAlerts ? 'active' : ''}`}
                      onClick={() => updateNotificationSetting('carAlerts', !notificationSettings.carAlerts)}
                    >
                      <span className="toggle-slider-small"></span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="settings-section"
            >
              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">👤</div>
                  <div>
                    <h3>Account Information</h3>
                    <p>Manage your account details</p>
                  </div>
                </div>
                <div className="account-info">
                  <div className="info-row">
                    <span>Name:</span>
                    <strong>{user?.name || 'Guest User'}</strong>
                  </div>
                  <div className="info-row">
                    <span>Email:</span>
                    <strong>{user?.email || 'guest@example.com'}</strong>
                  </div>
                  <div className="info-row">
                    <span>Member Since:</span>
                    <strong>January 2024</strong>
                  </div>
                  <div className="info-row">
                    <span>Account Status:</span>
                    <strong className="status-active">Active</strong>
                  </div>
                </div>
                <button className="settings-btn-secondary">Edit Profile →</button>
              </div>

              <div className="settings-card">
                <div className="card-header">
                  <div className="header-icon">🗑️</div>
                  <div>
                    <h3>Danger Zone</h3>
                    <p>Permanently delete your account and all data</p>
                  </div>
                </div>
                <button className="settings-btn-danger">Delete Account</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="settings-modal" onClick={() => setShowPasswordModal(false)}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>×</button>
            </div>
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.currentPassword ? 'error' : ''}
                />
                {passwordErrors.currentPassword && <span className="error-message">{passwordErrors.currentPassword}</span>}
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.newPassword ? 'error' : ''}
                />
                {passwordErrors.newPassword && <span className="error-message">{passwordErrors.newPassword}</span>}
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.confirmPassword ? 'error' : ''}
                />
                {passwordErrors.confirmPassword && <span className="error-message">{passwordErrors.confirmPassword}</span>}
              </div>
              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="settings-modal" onClick={() => setShow2FAModal(false)}>
          <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Enable Two-Factor Authentication</h3>
              <button className="modal-close" onClick={() => setShow2FAModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Scan this QR code with your authenticator app:</p>
              <div className="qr-placeholder">
                <div className="qr-code">[QR CODE]</div>
                <p className="qr-secret">Secret Key: ABCD-EFGH-IJKL-MNOP</p>
              </div>
              <div className="form-group">
                <label>Enter Verification Code</label>
                <input
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength="6"
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShow2FAModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleEnable2FA}>Verify & Enable</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;