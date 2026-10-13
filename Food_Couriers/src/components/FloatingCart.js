import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingCart() {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FFC107',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 6,
      }}
    >
      <Icon name="cart" size={20} />
      <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
        View Cart (3)
      </Text>
    </TouchableOpacity>
  );
}
