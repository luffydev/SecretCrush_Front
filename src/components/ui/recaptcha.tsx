'use client'

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface ReCaptchaProps {
    siteKey: string;
    action: string;
    onToken: (token: string) => void;
}

export default function ReCaptcha({ siteKey, action, onToken }: ReCaptchaProps) {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      if (loaded && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(siteKey, { action })
            .then((token: string) => {
              onToken(token);
            });
        });
      }
    }, [loaded, siteKey, action, onToken]);
  
    return (
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="lazyOnload"
        onLoad={() => setLoaded(true)}
      />
    );
  }

