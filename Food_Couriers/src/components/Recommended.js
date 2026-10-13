import { View, Text } from 'react-native';

export default function Recommended() {
  return (
    <View style={{
      margin: 16,
      padding: 16,
      backgroundColor: '#FFF3CD',
      borderRadius: 16,
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Recommended For You
      </Text>
      <Text style={{ marginTop: 4, color: '#555' }}>
        Based on your previous orders
      </Text>
    </View>
  );
}