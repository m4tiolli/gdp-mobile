import { View, Text, StyleSheet } from 'react-native';

export default function Menu() {
  return (
    <View style={styles.container}>
      <Text>Menu Menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
