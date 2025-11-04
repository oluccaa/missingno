import React, { useMemo } from 'react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const hexToHsl = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '217 91% 60%'; // Default to blue-500

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};


const DynamicStyles: React.FC = () => {
    const { settings } = useSiteSettings();

    const cssVariables = useMemo(() => {
        const accentHsl = hexToHsl(settings.accentColor || '#3b82f6');

        return `
            :root {
                --color-accent-hsl: ${accentHsl};
            }
        `;
    }, [settings.accentColor]);
    
    return (
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
    );
};

export default DynamicStyles;
