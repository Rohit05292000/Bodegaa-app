import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductImageSlider from '../../components/products/ProductImageSlider';
import ProductInfo from '../../components/products/ProductInfo';
import ProductAccordion from '../../components/products/ProductAccordion';
import RatingSection from '../../components/RatingSection';
import RelatedProducts from '../../components/RelatedProducts';
import CustomButton from '../../components/ui/CustomButton';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 🖼 Images */}
        <ProductImageSlider images={product?.image} />

        {/* 📦 Info */}
        <ProductInfo product={product} />

        {/* 📂 Accordion */}
        <ProductAccordion title="Product Info" content={product?.description} />

        {/* ⭐ Rating */}
        <RatingSection rating={3} />

        {/* 🔗 Related */}
       <RelatedProducts products={[product]} />

      </ScrollView>

      {/* 🛒 Fixed Button */}
      <CustomButton title="Add to Cart" />
    </View>
  );
}