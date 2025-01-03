import { Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Select } from '@/components/Select'
import TabsNewEF from '@/components/TabsNewEF'

function NewProposal() {

  const [selectedOption, setSelectedOption] = React.useState<string | number>(0)

  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName='px-8 py-4 gap-6 pb-80'>
        <Text className='text-3xl text-blue font-semibold mt-3'>Nova proposta</Text>
        <Select
          label="Selecione o modelo de proposta"
          options={[
            { id: 1, name: 'Eficiência energética' },
            { id: 2, name: 'Serviço de campo' },
          ]}

          labelKey="name"
          valueKey="id"
          selectedValue={selectedOption}
          onSelect={value => setSelectedOption(value)}
        />

        {selectedOption === 1 && <TabsNewEF />}
      </ScrollView >
    </SafeAreaView>
  )
}

export default NewProposal