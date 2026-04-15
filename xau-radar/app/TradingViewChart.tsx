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
    // Membuat ID unik agar tidak bentrok
    const containerId = 'tradingview_xau_radar';
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && document.getElementById(containerId)) {
        new window.TradingView.widget({
          "autosize": true,
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
          "container_id": containerId,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Membersihkan script saat komponen ditutup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div 
        ref={containerRef} 
        style={{ height: '600px', width: '100%' }} 
      />
    </div>
  );
};

export default TradingViewChart;
