import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResponsiveImage, getResponsiveImageSrcSet, getResponsiveImageSizes } from "./ResponsiveImage";

describe("ResponsiveImage Component", () => {
  it("should render image with alt text", () => {
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test Image"
      />
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test Image"
        className="custom-class"
      />
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toHaveClass("custom-class");
  });

  it("should use lazy loading by default", () => {
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test Image"
      />
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("should use eager loading when specified", () => {
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test Image"
        loading="eager"
      />
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toHaveAttribute("loading", "eager");
  });

  it("should apply sizes attribute", () => {
    const customSizes = "(max-width: 640px) 100vw, 50vw";
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test Image"
        sizes={customSizes}
      />
    );
    const img = screen.getByAltText("Test Image");
    expect(img).toHaveAttribute("sizes", customSizes);
  });

  it("should call onLoad callback when image loads", async () => {
    const onLoadMock = vi.fn();
    render(
      <ResponsiveImage
        src="/test-image.jpg"
        alt="Test Image"
        onLoad={onLoadMock}
      />
    );
    const img = screen.getByAltText("Test Image");
    
    // Simulate image load
    img.dispatchEvent(new Event("load"));
    
    expect(onLoadMock).toHaveBeenCalled();
  });
});

describe("Image Utility Functions", () => {
  it("should generate responsive srcset", () => {
    const srcset = getResponsiveImageSrcSet("/image.jpg");
    expect(srcset).toContain("320w");
    expect(srcset).toContain("640w");
    expect(srcset).toContain("960w");
    expect(srcset).toContain("1280w");
    expect(srcset).toContain("1920w");
  });

  it("should generate responsive sizes", () => {
    const sizes = getResponsiveImageSizes();
    expect(sizes).toContain("max-width: 640px");
    expect(sizes).toContain("max-width: 1024px");
    expect(sizes).toContain("1200px");
  });

  it("should handle query parameters in srcset", () => {
    const srcset = getResponsiveImageSrcSet("/image.jpg?v=1");
    expect(srcset).toContain("&w=");
  });
});
