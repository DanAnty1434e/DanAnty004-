import { useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [badgeCount, setBadgeCount] = useState<number>(() => {
    const saved = localStorage.getItem('dananty_badge_count');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [badgingSupported, setBadgingSupported] = useState(false);

  useEffect(() => {
    // Check if running as standalone / pinned PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    setIsInstalled(isStandalone);

    // Device detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isAndroidDevice = /android/.test(ua);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    // Check Badging API support
    const hasBadging = 'setAppBadge' in navigator && 'clearAppBadge' in navigator;
    setBadgingSupported(hasBadging);

    // Initial sync of badge if supported
    if (hasBadging && badgeCount > 0) {
      try {
        (navigator as any).setAppBadge(badgeCount).catch(() => {});
      } catch {
        // Safe fallback
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [badgeCount]);

  // Install trigger (Android / Chrome / Edge)
  const installApp = useCallback(async () => {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    }
    return false;
  }, [deferredPrompt]);

  // Set App Badge API on phone home screen icon
  const updateBadge = useCallback(async (count: number) => {
    setBadgeCount(count);
    localStorage.setItem('dananty_badge_count', count.toString());

    if ('setAppBadge' in navigator) {
      try {
        if (count > 0) {
          await (navigator as any).setAppBadge(count);
        } else {
          await (navigator as any).clearAppBadge();
        }
      } catch (e) {
        console.debug('Badge API not active or unsupported by host platform:', e);
      }
    }
  }, []);

  const clearBadge = useCallback(async () => {
    setBadgeCount(0);
    localStorage.setItem('dananty_badge_count', '0');
    if ('clearAppBadge' in navigator) {
      try {
        await (navigator as any).clearAppBadge();
      } catch (e) {
        console.debug('Clear badge error:', e);
      }
    }
  }, []);

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    isAndroid,
    installApp,
    badgeCount,
    updateBadge,
    clearBadge,
    badgingSupported,
  };
}
