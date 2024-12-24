import Proposal from '@/components/Proposal';
import Separator from '@/components/Separator';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  // useEffect(() => {
  //   if (Platform.OS === "ios") {
  //     setTimeout(() => {
  //       router.replace("/login");
  //     }, 1)
  //   } else {
  //     setImmediate(() => {
  //       router.replace("/login");
  //     });
  //   }
  // }, [])
  return (
    <SafeAreaView className='px-8 py-4'>
      <Text className='text-3xl text-blue'>Propostas</Text>
      <FlatList data={ } keyExtractor={item => item.codigoProposta} renderItem={({ item }) => <Proposal />} ItemSeparatorComponent={Separator} />
      <Proposal />
      <Separator />

    </SafeAreaView>
  );
}