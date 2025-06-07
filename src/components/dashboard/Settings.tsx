import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bell, Lock, User, Globe, Eye, Moon, Sun, Palette } from 'lucide-react';

const Settings = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sections = [
    {
      title: 'Profile Settings',
      icon: <User size={24} />,
      settings: [
        {
          name: 'Profile Information',
          description: 'Update your personal information and profile picture',
          action: 'Edit'
        },
        {
          name: 'Email Preferences',
          description: 'Manage your email notifications and communication preferences',
          action: 'Configure'
        }
      ]
    },
    {
      title: 'Security',
      icon: <Lock size={24} />,
      settings: [
        {
          name: 'Password',
          description: 'Change your password and configure two-factor authentication',
          action: 'Update'
        },
        {
          name: 'Login History',
          description: 'View your recent login activity and active sessions',
          action: 'View'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: <Bell size={24} />,
      settings: [
        {
          name: 'Push Notifications',
          description: 'Configure desktop and mobile push notifications',
          action: 'Configure'
        },
        {
          name: 'Email Alerts',
          description: 'Set up email alerts for important activities',
          action: 'Configure'
        }
      ]
    },
    {
      title: 'Appearance',
      icon: <Palette size={24} />,
      settings: [
        {
          name: 'Theme',
          description: 'Choose between light and dark mode',
          action: 'Select',
          custom: (
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-[#1C2541] text-[#5BC0BE]">
                <Moon size={20} />
              </button>
              <button className="p-2 rounded-lg bg-transparent border border-[#5BC0BE]/20">
                <Sun size={20} />
              </button>
            </div>
          )
        },
        {
          name: 'Language',
          description: 'Select your preferred language',
          action: 'Select',
          custom: (
            <select className="bg-[#1C2541] border border-[#5BC0BE]/20 rounded-lg px-3 py-2">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          )
        }
      ]
    },
    {
      title: 'Privacy',
      icon: <Eye size={24} />,
      settings: [
        {
          name: 'Data Sharing',
          description: 'Control how your data is shared and used',
          action: 'Configure'
        },
        {
          name: 'Profile Visibility',
          description: 'Manage who can see your profile and activity',
          action: 'Configure'
        }
      ]
    },
    {
      title: 'Regional',
      icon: <Globe size={24} />,
      settings: [
        {
          name: 'Time Zone',
          description: 'Set your preferred time zone',
          action: 'Select',
          custom: (
            <select className="bg-[#1C2541] border border-[#5BC0BE]/20 rounded-lg px-3 py-2">
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">GMT</option>
            </select>
          )
        },
        {
          name: 'Date Format',
          description: 'Choose how dates are displayed',
          action: 'Select',
          custom: (
            <select className="bg-[#1C2541] border border-[#5BC0BE]/20 rounded-lg px-3 py-2">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          )
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#5BC0BE]/20 text-[#5BC0BE]">
                {section.icon}
              </div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <div
                  key={settingIndex}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#0B132B]/30"
                >
                  <div>
                    <h3 className="font-medium mb-1">{setting.name}</h3>
                    <p className="text-sm text-gray-400">{setting.description}</p>
                  </div>
                  {setting.custom ? (
                    setting.custom
                  ) : (
                    <button className="px-4 py-2 rounded-lg bg-transparent border border-[#5BC0BE]/20 text-[#5BC0BE] hover:bg-[#5BC0BE]/10 transition-colors duration-300">
                      {setting.action}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;