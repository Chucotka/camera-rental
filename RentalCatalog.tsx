import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 12;
const CATEGORIES = ["Все", "Камеры", "Объективы", "Освещение", "Звук", "Стабилизация", "Аксессуары"];
const BRANDS = ["RED", "ARRI", "Sony", "Canon", "DJI", "Все бренды"];

export default function RentalCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Map English categories to Russian
  const categoryMap: Record<string, string> = {
    "Все": "All",
    "Камеры": "Cameras",
    "Объективы": "Lenses",
    "Освещение": "Lighting",
    "Звук": "Audio",
    "Стабилизация": "Grip",
    "Аксессуары": "Accessories",
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Все" || product.category === categoryMap[selectedCategory];
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => product.name.includes(brand));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navigation currentPage="rental" />

      {/* Page Header */}
      <section className="pt-20 md:pt-24 pb-12 border-b border-border">
        <div className="container">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              Аренда оборудования
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-mono">
              Премиальное оборудование для профессионального видеопроизводства
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Найти камеру, объектив или свет..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar - Categories and Filters */}
            <div className="md:col-span-1">
              <div className="space-y-8 sticky top-20">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-bold mb-4 font-mono">Категории</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors font-mono text-sm ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-card text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands Filter */}
                <div>
                  <h3 className="text-lg font-bold mb-4 font-mono">Бренды</h3>
                  <div className="space-y-2">
                    {BRANDS.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 rounded border-border bg-card cursor-pointer"
                        />
                        <span className="text-sm font-mono text-muted-foreground hover:text-foreground">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-lg font-bold mb-4 font-mono">Цена</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-mono text-muted-foreground">От: {priceRange[0]} ₽</label>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const newMin = Math.min(parseInt(e.target.value), priceRange[1]);
                          setPriceRange([newMin, priceRange[1]]);
                          setCurrentPage(1);
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-mono text-muted-foreground">До: {priceRange[1]} ₽</label>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const newMax = Math.max(parseInt(e.target.value), priceRange[0]);
                          setPriceRange([priceRange[0], newMax]);
                          setCurrentPage(1);
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="md:col-span-3">
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {paginatedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border border-border bg-card/50 hover:bg-card transition-colors group"
                      >
                        {/* Product Image */}
                        <div className="relative overflow-hidden bg-black h-64 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-muted-foreground font-mono">{product.category}</p>
                          </div>

                          {/* Price */}
                          <div className="text-2xl font-bold text-primary">
                            {product.price.toLocaleString()} ₽
                            <span className="text-sm text-muted-foreground font-mono ml-2">/ смена</span>
                          </div>

                          {/* Specs */}
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {product.specs.slice(0, 2).map((spec, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA Button */}
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono font-bold">
                            В корзину
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mb-12">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-border rounded-lg hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg font-mono text-sm transition-colors ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground"
                                : "border border-border hover:bg-card"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-border rounded-lg hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">Товары не найдены</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-24 bg-card/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (999) 999-99-99</p>
                <p>info@kinorenta.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Адрес</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Рязань</p>
                <p>Россия</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ссылки</h4>
              <div className="space-y-2 text-sm">
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Главная</a>
                <br />
                <a href="/contacts" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground font-mono">
            <p>© 2026 KINORENTA. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
