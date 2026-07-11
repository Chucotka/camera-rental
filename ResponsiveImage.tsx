import { useState, useEffect } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
}

/**
 * ResponsiveImage component that handles image loading with lazy loading support
 */
export function ResponsiveImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  loading = "lazy",
  onLoad,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      sizes={sizes}
      onLoad={handleLoad}
      onError={handleLoad}
    />
  );
}

/**
 * Get responsive image srcset for different screen sizes
 */
export function getResponsiveImageSrcSet(baseUrl: string): string {
  const sizes = [320, 640, 960, 1280, 1920];
  return sizes
    .map((size) => {
      const url = baseUrl.includes("?")
        ? `${baseUrl}&w=${size}`
        : `${baseUrl}?w=${size}`;
      return `${url} ${size}w`;
    })
    .join(", ");
}

/**
 * Get responsive image sizes attribute for different breakpoints
 */
export function getResponsiveImageSizes(): string {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px";
}
