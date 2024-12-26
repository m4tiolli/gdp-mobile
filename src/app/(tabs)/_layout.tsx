import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View, ViewComponent } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import Icon, { Icons } from '@/components/Icons';
import Dashboard from '.';
import Menu from './menu';
import { Icon as IIcon } from '@expo/vector-icons/build/createIconSet';
import { useEffect, useRef } from 'react';
import * as Animatable from 'react-native-animatable';

interface ITabArr {
  route: string;
  label: string;
  type: IIcon<any, any>;
  activeIcon: string;
  inActiveIcon: string;
  component: () => React.JSX.Element;
}

const TabArr: ITabArr[] = [
  { route: 'index', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: Dashboard },
  { route: 'new', label: 'New', type: Icons.AntDesign, activeIcon: 'pluscircle', inActiveIcon: 'pluscircleo', component: Menu },
  { route: 'menu', label: 'Menu', type: Icons.Ionicons, activeIcon: 'menu', inActiveIcon: 'menu', component: Menu },
];

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarActiveTintColor: '#38457a', tabBarStyle: {
        height: 60,
        position: 'absolute',
        margin: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }
    }}>

      {TabArr.map((item, index) => (
        <Tabs.Screen
          key={index}
          name={item.route}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />
          }}
        />
      ))}

    </Tabs>
  );
}

interface Props extends BottomTabBarButtonProps {
  item: ITabArr
}

const TabButton = (props: Props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<Animatable.View>(null);

  useEffect(() => {
    if (viewRef.current) {
      if (focused) {
        viewRef.current.animate({
          0: { scaleX: .5, scaleY: .5, transform: [{ rotate: '0deg' }] },
          1: { scaleX: 1.5, scaleY: 1.5, transform: [{ rotate: '360deg' }] }
        });
      } else {
        viewRef.current.animate({
          0: { scaleX: 1.5, scaleY: 1.5, transform: [{ rotate: '360deg' }] },
          1: { scaleX: 1, scaleY: 1, transform: [{ rotate: '0deg' }] }
        });
      }
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
      }}
    >
      <Animatable.View
        ref={viewRef}
        duration={500}
      >
        <Icon type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? "#38457a" : "#c1c1c1"} />
      </Animatable.View>
    </TouchableOpacity>
  )
} 