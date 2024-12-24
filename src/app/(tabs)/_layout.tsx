import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#38457a', tabBarLabelStyle: { color: "#38457a" } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <MaterialIcons size={28} name="home" color={"#38457a"} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: () => <MaterialIcons size={28} name="menu" color={"#38457a"} />,
        }}
      />
    </Tabs>
  );
}
