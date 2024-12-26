import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Button } from './Button'
import { AntDesign } from '@expo/vector-icons'
import { AlLProposals } from '@/interfaces/proposals'
import { router } from 'expo-router'
import { DialogTrigger, DialogContent, useDialog } from './Dialog'
import { storage } from '@/lib/storage'
import axios from 'axios'
import { useToast } from './Toast'

const Proposal = ({ ...props }: AlLProposals) => {

  const [loading, setLoading] = React.useState(false)

  const { toast } = useToast()

  const { setOpen } = useDialog()

  const token = storage.getString("token")

  const deleteProposal = async () => {
    try {
      if (props) {
        setLoading(true)
        const body = { code: props.codigoProposta, table: props.nomeTabela };
        const response = await axios.delete("https://gdp.elosolutions.com.br/api/proposals", { data: body, headers: { Authorization: "Bearer " + token } });
        if (response.status === 200) {
          setLoading(false)
          setOpen(false)
          toast("Proposta deletada com sucesso.", "success", 3000);
          setTimeout(() => {
            router.replace("/")
          }, 500);
        }
      }
    } catch (error) {
      console.error(error);
      toast("Ocorreu um erro ao tentar deletar a proposta.", "destructive", 3000);
      setLoading(false)
      setOpen(false)
    }
  }

  const label = loading ? <ActivityIndicator color={"white"} /> : "Confirmar"

  return (
    <View className='h-16 rounded-md border border-stone-200 px-2 justify-between items-center flex-row bg-white my-3'>
      <Text className='font-bold w-1/2'>{props.codigoProposta}</Text>
      <Button label={<AntDesign name='eyeo' size={15} />} className='w-12' onPress={() => router.navigate(props.linkPdf)} />
      <Button label={<AntDesign name='edit' size={15} />} className='w-12' />
      <DialogTrigger>
        <Button label={<AntDesign name='delete' size={15} />} className='w-12' variant={"destructive"} />
      </DialogTrigger>
      <DialogContent>
        <View className="flex gap-4 w-3/4">
          <Text className="font-semibold text-xl text-primary">Você tem certeza?</Text>
          <Text className="text-primary">
            Você irá excluir a proposta {props.codigoProposta} para sempre de nossa base de dados. Essa ação é irreversível.
          </Text>
          <View className='flex-row gap-2 w-full items-center justify-between'>
            <Button label="Fechar" variant={"destructive"} onPress={() => setOpen(false)} className='w-2/5' />
            <Button label={label} onPress={deleteProposal} className='w-2/5' />
          </View>
        </View>
      </DialogContent>
    </View>
  )
}

export default Proposal