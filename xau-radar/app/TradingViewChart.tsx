'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          "width": "100%",
          "height": 600,
          "symbol": "OANDA:XAUUSD",
          "interval": "H1",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "container_id": containerRef.current.id, // Menggunakan ID otomatis dari ref
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      id="tradingview_xau_radar_v2" 
      ref={containerRef} 
      style={{ height: '600px', width: '100%' }} 
    />
  );
};

export default TradingViewChart;
