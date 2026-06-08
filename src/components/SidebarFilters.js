import React from 'react';

const SidebarFilters = ({ 
  filterBrand, 
  setFilterBrand, 
  filterCategory, 
  setFilterCategory, 
  viewMode, 
  setViewMode,
  brands,
  categories,
  selectedDecade,
  setSelectedDecade,
  decades,
  isUsedPage = false
}) => {
  return (
    <div className="sidebar-filters">
      <div className="filter-section">
        <h3>Filters</h3>
        
        {/* Brand Filter */}
        <div className="filter-group">
          <label>Brands</label>
          <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label>Categories</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Decade Filter (for Used Cars only) */}
        {isUsedPage && decades && decades.length > 0 && (
          <div className="filter-group">
            <label>Year</label>
            <select value={selectedDecade} onChange={(e) => setSelectedDecade(e.target.value)}>
              {decades.map(decade => (
                <option key={decade} value={decade}>
                  {decade === 'all' ? 'All Years' : decade}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* View Toggle */}
        <div className="filter-group">
          <label>View</label>
          <div className="view-toggle-sidebar">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')}
            >
              ≡ List
            </button>
          </div>
        </div>

        {/* Reset Filters Button */}
        <button 
          className="reset-filters-btn"
          onClick={() => {
            setFilterBrand('all');
            setFilterCategory('all');
            if (setSelectedDecade) setSelectedDecade('all');
          }}
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default SidebarFilters;