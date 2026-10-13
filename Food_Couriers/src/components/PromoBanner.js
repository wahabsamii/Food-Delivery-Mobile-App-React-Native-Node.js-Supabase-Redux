
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const PRIMARY = '#FFC107';

const banners = [
  {
    id: '1',
    title: '50% OFF Burgers',
    subtitle: 'Grab your favorite burger today!',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349',
    badge: 'LIMITED OFFER',
  },
  {
    id: '2',
    title: 'Free Delivery Today',
    subtitle: 'Order your favorite food now.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    badge: 'TODAY ONLY',
  },
];

export default function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={banners}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.card}>

              {/* Banner Image */}
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />

              {/* Dark Gradient-like Overlay */}
              <View style={styles.overlay} />

              {/* Content */}
              <View style={styles.content}>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {item.badge}
                  </Text>
                </View>

                <Text style={styles.title}>
                  {item.title}
                </Text>

                <Text style={styles.subtitle}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.dots}>
        {banners.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    paddingHorizontal: 16,
  },

  card: {
    height: 165,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#eee',

    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },

  content: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 15,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: PRIMARY,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
    marginBottom: 6,
  },

  badgeText: {
    color: '#111827',
    fontSize: 9,
    fontFamily: 'Outfit-SemiBold',
    letterSpacing: 0.5,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Outfit-SemiBold',
    marginBottom: 2,
  },

  subtitle: {
    color: '#F3F4F6',
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
    marginBottom: 4,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 3,
  },

  activeDot: {
    width: 18,
    backgroundColor: PRIMARY,
  },
});
