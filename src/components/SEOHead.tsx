import { useEffect } from "react";
import type { SEOHeadProps } from "../types/AppData";

const SEOHead: React.FC<SEOHeadProps> = ({
    title = "Mi Dulce Espera - Seguimiento de Embarazo Personalizado",
    description = "Tu compañera digital durante el embarazo. Seguimiento personalizado semana a semana con información sobre el desarrollo de tu bebé y apoyo emocional.",
    keywords = "embarazo, seguimiento embarazo, desarrollo fetal, semanas embarazo, app embarazo, maternidad, bebé, gestación",
    image = "https://sweet-hope.netlify.app/icons/icon-512x512.png",
    url = "https://sweet-hope.netlify.app"
}) => {
    useEffect(() => {
        document.title = title;
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', description);
        }

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', image);
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', url);
        }

        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', title);
        }

        const twitterDescription = document.querySelector('meta[property="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', description);
        }

        const twitterImage = document.querySelector('meta[property="twitter:image"]');
        if (twitterImage) {
            twitterImage.setAttribute('content', image);
        }

        const twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (twitterUrl) {
            twitterUrl.setAttribute('content', url);
        }

        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', url);
        }
    }, [title, description, keywords, image, url]);

    return null; // This component doesn't render anything
};

export default SEOHead;