'use client';

import React, { createContext, useContext, useState } from 'react';

interface NewsletterContextType {
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  isSubscribed: (email: string) => boolean;
  subscribers: string[];
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};

export const NewsletterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscribers, setSubscribers] = useState<string[]>([]);

  const subscribe = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    // Check if already subscribed
    if (subscribers.includes(email.toLowerCase())) {
      return { success: false, message: 'This email is already subscribed to our newsletter.' };
    }

    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would be an API call
    try {
      setSubscribers(prev => [...prev, email.toLowerCase()]);
      
      // Save to localStorage for persistence in demo
      const savedSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      savedSubscribers.push(email.toLowerCase());
      localStorage.setItem('newsletter_subscribers', JSON.stringify(savedSubscribers));
      
      return { 
        success: true, 
        message: 'Successfully subscribed! Thank you for joining our newsletter.' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Failed to subscribe. Please try again later.' 
      };
    }
  };

  const isSubscribed = (email: string): boolean => {
    return subscribers.includes(email.toLowerCase());
  };

  const value: NewsletterContextType = {
    subscribe,
    isSubscribed,
    subscribers
  };

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  );
};