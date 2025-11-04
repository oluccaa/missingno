import React from 'react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const WhatsAppButton: React.FC = () => {
    const { settings } = useSiteSettings();

    if (!settings.whatsappNumber) {
        return null;
    }

    const whatsappLink = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ring-offset-primary"
            aria-label="Fale conosco no WhatsApp"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.003.004l-1.22 4.42zM12.072 8.431c-.27-.012-.534.054-.763.192-.23.137-.433.32-.596.539-.162.219-.287.469-.368.736-.081.267-.12.549-.117.832.003.282.045.561.125.83l.001.002c.08.268.203.526.363.765.16.24.356.464.582.666.226.202.48.384.756.54l.004.002c.275.156.572.288.882.393.31.105.632.181.96.223.327.043.659.054.985.031.326-.023.644-.08.947-.169.303-.09.589-.215.852-.375.263-.16.5-.355.704-.582.204-.227.373-.483.502-.761.13-.278.215-.578.252-.888.037-.309.042-.624.015-.934-.027-.31-.088-.615-.182-.907-.094-.292-.224-.572-.383-.831-.16-.259-.353-.5-.574-.709-.22-.209-.47-.386-.74-.523-.27-.138-.564-.234-.87-.279-.306-.045-.618-.051-.926-.016z"/>
            </svg>
        </a>
    );
};

export default WhatsAppButton;
