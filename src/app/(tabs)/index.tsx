import NoProposals from '@/components/NoProposals';
import Proposal from '@/components/Proposal';
import { AlLProposals } from '@/interfaces/proposals';
import { fetchAllProposals, fetchFatoresFinanceiros } from '@/lib/fetchs';
import { storage } from '@/lib/storage';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Platform, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {

  const [proposals, setProposals] = React.useState<AlLProposals[]>([])

  const [refreshing, setRefreshing] = React.useState(false);

  const token = storage.getString("token") || ""

  React.useEffect(() => {
    Promise.all([fetchAllProposals(token, setProposals)])
  }, [])

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      Promise.all([fetchAllProposals(token, setProposals)])
      setRefreshing(false);
    }, 2000);
  };

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
    <SafeAreaView className='px-8 py-4 gap-6'>
      <Text className='text-3xl text-blue font-semibold mt-3'>Propostas</Text>
      <FlatList
        data={proposals}
        keyExtractor={item => item.codigoProposta}
        renderItem={({ item }) => <Proposal {...item} />}
        ListEmptyComponent={NoProposals}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#fff']}
            progressBackgroundColor={'#38457a'}
          />
        }
      />
    </SafeAreaView>
  );
}