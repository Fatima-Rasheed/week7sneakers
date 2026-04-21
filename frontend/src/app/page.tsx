'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ProductSection from '@/components/ProductSection';
import CategorySection from '@/components/CategorySection';
import PromoSection from '@/components/PromoSection';
import NikePromoSection from '@/components/NikePromoSection';
import MembershipBanner from '@/components/MembershipBanner';
import Footer from '@/components/Footer';
import { useGetProductsQuery } from '@/services/api';

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const allProducts = products ?? [];

  // Products for each section
  const nikePromoProducts = allProducts.filter((p) => p.nikePromo && p.image?.url);
  const promoProducts = allProducts.filter(
    (p) => p.discountedPrice != null && p.discountedPrice < p.price && p.image?.url
  );
  const topSneakers = allProducts.filter(
    (p) =>
      !p.nikePromo &&
      !(p.discountedPrice != null && p.discountedPrice < p.price) &&
      p.image?.url
  );

  // Filter products by search query (name or category)
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : activeCategory === 'ALL'
    ? allProducts
    : allProducts.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
      );

  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = !isSearching && activeCategory !== 'ALL';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar onSearch={setSearchQuery} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Show search results when searching */}
      {isSearching || isFiltering ? (
        <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              mb: 1,
            }}
          >
            {isSearching ? <>Results for &ldquo;{searchQuery}&rdquo;</> : activeCategory.toUpperCase()}
          </Typography>
          <Typography sx={{ color: '#999', fontSize: '0.9rem', mb: 3 }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </Typography>
          <ProductSection
            title=""
            products={filteredProducts}
            isLoading={isLoading}
            error={!!error}
          />
        </Box>
      ) : (
        <>
          <HeroBanner />

          {/* Nike Promo Section */}
          <NikePromoSection products={nikePromoProducts} />

          {/* Summertime Mood section */}
          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 2, md: 3 },
              px: 2,
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: { xs: '0.9rem', md: '2.5rem' },
                lineHeight: 1,
                letterSpacing: '0%',
                color: '#999',
                display: 'block',
                mb: 0.5,
              }}
            >
              At the moment
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: { xs: '1.6rem', md: '5rem' },
                lineHeight: 1,
                letterSpacing: '0%',
                mb: 0.5,
              }}
            >
              SUMMERTIME MOOD
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: { xs: '0.85rem', md: '2.5rem' },
                lineHeight: 1,
                letterSpacing: '0%',
                color: '#666',
              }}
            >
              Fight the heat in a sunny look!
            </Typography>
          </Box>

          {/* Top Sneakers product section */}
          <ProductSection
            title="Top sneakers"
            products={topSneakers}
            isLoading={isLoading}
            error={!!error}
          />

          {/* Category section */}
          <CategorySection />

          {/* Promo section */}
          <PromoSection products={promoProducts} />

          {/* Membership banner */}
          <MembershipBanner />

          {/* Footer */}
          <Footer />
        </>
      )}
    </Box>
  );
}
