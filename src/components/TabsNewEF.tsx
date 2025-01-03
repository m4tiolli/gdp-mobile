import { ScrollView } from 'react-native'
import React from 'react'
import { TabsList, TabsTrigger, Tabs } from './Tabs'
import Section from './forms/Section'
import { infos } from '@/mocks/infos.ef'
import { Button } from './Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/schemas/ef.form.schema'
import { NextProposals } from '@/interfaces/proposals'
import { fetchNextProposals, fetchUserData } from '@/lib/fetchs'
import { storage } from '@/lib/storage'
import { UserData } from '@/interfaces/user'

const TabsNewEF = () => {

  const triggersScrollRef = React.useRef<ScrollView>(null)

  const [nextProposals, setNextProposals] = React.useState<NextProposals>()
  const [userData, setUserData] = React.useState<UserData>()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
    clearErrors,
    watch
  } = useForm({
    resolver: zodResolver(schema),
  });


  React.useEffect(() => {
    const token = storage.getString("token") || ""
    Promise.all([fetchNextProposals(token, setNextProposals), fetchUserData(token, setUserData)])
  }, [])

  React.useEffect(() => {
    if (userData) {
      setValue("nomeVendedor", userData.nome)
      setValue("emailVendedor", userData.email)
      setValue("telefone1Vendedor", userData.telefone1)
      setValue("telefone2Vendedor", userData.telefone2)
      setValue("departamentoVendedor", userData.departamento)
    }
  }, [userData])

  const cadastro = watch("cadastroElo")

  React.useEffect(() => {
    if (cadastro === 1) setValue("codigoProposta", nextProposals?.propostaRecuperadora);
    if (cadastro === 2) setValue("codigoProposta", nextProposals?.propostaServicos);
  }, [cadastro])

  return (
    <Tabs defaultValue='1'>
      <TabsList>
        <ScrollView ref={triggersScrollRef} horizontal snapToStart contentContainerClassName='gap-8' className='pr-8' showsHorizontalScrollIndicator={false}>
          <TabsTrigger className='w-20' value='1' id="1" title="Dados da proposta" />
          <TabsTrigger className='w-20' value='2' id="2" title="Dados do contrato" />
          <TabsTrigger className='w-20' value='3' id="3" title="Dados do vendedor" />
          <TabsTrigger className='w-20' value='4' id='4' title="Dados do tomador" />
        </ScrollView>
      </TabsList>

      {infos({ form: { control, setValue, getValues, errors } }).map((info, index) => (
        <Section {...info} key={index}>

          {info.inputs.map((input, index) => (
            React.createElement(input.component, { ...input, key: index, onBlur: 'onBlur' in input && input.onBlur })
          ))}

          <Button label="Avançar" onPress={() => console.log(getValues())} />
        </Section>
      ))}

    </Tabs>
  )
}

export default TabsNewEF