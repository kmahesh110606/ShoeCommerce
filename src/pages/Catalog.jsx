import { useEffect, useMemo, useRef, useState } from 'react';
import { PiSquaresFour, PiMagnifyingGlass, PiX, PiCaretDown } from 'react-icons/pi';
import Nav from '../assets/Nav.jsx';
import Card from '../assets/Card.jsx';
import { products } from '../../data.js';

const categories = [...new Set(products.map(p => p.category))].sort();
const sortOptions = [
  { label: 'All', value: 'all' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating: High to Low', value: 'rating-desc' },
];

export default function Catalog() {
  const controlsRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const activeSort = sortOptions.find((opt) => opt.value === sortBy);

  const activeChips = useMemo(() => {
    const chips = [];
    if (selectedCategory !== 'All') {
      chips.push({
        key: 'category',
        label: `Type: ${selectedCategory}`,
        onRemove: () => setSelectedCategory('All'),
      });
    }
    if (sortBy !== 'all' && activeSort) {
      chips.push({
        key: 'sort',
        label: `Sort: ${activeSort.label}`,
        onRemove: () => setSortBy('all'),
      });
    }
    return chips;
  }, [selectedCategory, sortBy, activeSort]);

  useEffect(() => {
    function onDocClick(event) {
      if (!controlsRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    }

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function chooseCategory(category) {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  }

  function chooseSort(value) {
    setSortBy(value);
    setIsSortOpen(false);
  }

  return (
    <>
      <Nav className="navbar-overlay" />
      <div className="catalog-page">
        <div className="ambient-bg" aria-hidden="true" />
        <div className="catalog-shell">
          <div className="catalog-header">
            <PiSquaresFour size={28} />
            <h1 className="catalog-title">Catalog</h1>
          </div>
          <p className="catalog-subtitle">Browse our extensive collection of shoes.</p>

          <div className="catalog-toolbar" ref={controlsRef}>
            <div className="catalog-search-wrap">
              <PiMagnifyingGlass size={18} className="search-icon" />
              <input
                type="text"
                className="catalog-search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                  type="button"
                >
                  <PiX size={16} />
                </button>
              )}
            </div>

            <div className="catalog-actions">
              <div className="catalog-menu-wrap">
                <button
                  type="button"
                  className={`catalog-action-btn${isFilterOpen ? ' catalog-action-btn-active' : ''}`}
                  onClick={() => {
                    setIsFilterOpen((prev) => !prev);
                    setIsSortOpen(false);
                  }}
                >
                  <PiSquaresFour size={16} />
                  <span>Filter</span>
                  <PiCaretDown size={14} className={`catalog-caret${isFilterOpen ? ' catalog-caret-open' : ''}`} />
                </button>

                {isFilterOpen ? (
                  <div className="catalog-menu" role="menu" aria-label="Filter by type">
                    <button
                      type="button"
                      className={`catalog-menu-item${selectedCategory === 'All' ? ' catalog-menu-item-active' : ''}`}
                      onClick={() => chooseCategory('All')}
                    >
                      All Types
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`catalog-menu-item${selectedCategory === cat ? ' catalog-menu-item-active' : ''}`}
                        onClick={() => chooseCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="catalog-menu-wrap">
                <button
                  type="button"
                  className={`catalog-action-btn${isSortOpen ? ' catalog-action-btn-active' : ''}`}
                  onClick={() => {
                    setIsSortOpen((prev) => !prev);
                    setIsFilterOpen(false);
                  }}
                >
                  <PiCaretDown size={16} />
                  <span>Sort</span>
                  <PiCaretDown size={14} className={`catalog-caret${isSortOpen ? ' catalog-caret-open' : ''}`} />
                </button>

                {isSortOpen ? (
                  <div className="catalog-menu" role="menu" aria-label="Sort products">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`catalog-menu-item${sortBy === opt.value ? ' catalog-menu-item-active' : ''}`}
                        onClick={() => chooseSort(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {activeChips.length > 0 ? (
            <div className="catalog-chip-row">
              {activeChips.map((chip) => (
                <button key={chip.key} type="button" className="catalog-chip" onClick={chip.onRemove}>
                  <span>{chip.label}</span>
                  <PiX size={12} />
                </button>
              ))}
            </div>
          ) : null}

          {filtered.length === 0 ? (
            <div className="catalog-empty">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <p className="catalog-results">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="catalog-grid">
                {filtered.map(product => (
                  <Card
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}