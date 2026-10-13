import { View, Text } from 'react-native';

export default function FastDelivery() {
  return (
    <View style={{
      margin: 16,
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 16,
      elevation: 3,
    }}>
      <Text style={{ fontSize: 18, fontFamily: "Outfit-Bold" }}>
        ⚡ Delivered in 30 Minutes
      </Text>
      <Text style={{ marginTop: 4, color: '#666', fontFamily: 'Outfit-Regular' }}>
        Quick meals near your location
      </Text>
    </View>
  );
}