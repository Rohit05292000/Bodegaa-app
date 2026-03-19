import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import CategoryItem from '../../components/CategoryItem';
import SearchBar from '../../components/SearchBar';
import { getCategoriesApi } from '../../api/categoryApi';
import Loader from '../../components/ui/Loader';

const CategoryScreen = ({ navigation }) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategoriesApi();
     const apiData = res?.categories || res?.data?.categories || [];

    console.log('FORMATTED DATA:', formattedData);

      // 🔥 GROUP DATA
      const grouped = {};

      apiData.forEach((item) => {
        const mainCat = item.main_category?.name;

        if (!grouped[mainCat]) {
          grouped[mainCat] = {
            name: mainCat,
            subCategories: [],
          };
        }

        grouped[mainCat].subCategories.push(item);
      });

      const formattedData = Object.values(grouped);

      setCategories(formattedData);

      if (formattedData.length > 0) {
        setSelectedCategory(formattedData[0]);
       }

    } catch (error) {
      console.log('Category Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Loader
  if (loading) {
    return <Loader fullScreen />;
  }

  return (
     <SafeAreaView style={styles.container}>
      
      {/* 🔹 Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Icon
            name="arrow-back"
            size={22}
            color="#000"
            onPress={() => navigation.navigate('Home')}
          />
          <Text style={styles.headerTitle}>Main Categories</Text>
        </View>

        <SearchBar placeholder="Search Sub Categories..." />
      </View>

      {/* 🔹 Main Categories */}
      <FlatList
        data={categories}
         numColumns={3}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.mainList}
        renderItem={({ item }) => {
          const isSelected =
            selectedCategory?.name === item?.name;

          return (
            <CategoryItem
              item={{
                name: item?.name,
                image:
                  item?.subCategories?.[0]?.image ||
                  'https://via.placeholder.com/100',
              }}
              onPress={() => setSelectedCategory(item)}
              isSelected={isSelected} 
            />
          );
        }}
      />

      {/* 🔹 Sub Categories */}
      <Text style={styles.sectionTitle}>Sub Categories</Text>

      {!selectedCategory ? (
        <Text style={styles.emptyText}>
          No Category Selected
        </Text>
      ) : (
        <FlatList
          data={selectedCategory?.subCategories ?? []}
          numColumns={3}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.subList}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({ item }) => (
            <CategoryItem
              item={{
                name: item?.name,
                image:
                  item?.image ||
                  'https://via.placeholder.com/100',
              }}
            />
          )}
        />
      )}

    </SafeAreaView>
  );
};

export default CategoryScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#a5d6a7',
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },

  mainList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 15,
  },

  subList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});