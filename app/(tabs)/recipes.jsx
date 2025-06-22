import { StyleSheet, Text, View } from 'react-native';

export default function RecetasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReciPeels Recipes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
}); 