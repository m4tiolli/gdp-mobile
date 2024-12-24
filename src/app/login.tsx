import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import formSchema from '@/schemas/login.schema'
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'
import axios from 'axios'
import { router } from 'expo-router'
import { useToast } from '@/components/Toast'

const Login = () => {

  const { toast } = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    clearErrors("email");
    clearErrors("senha");

    try {
      const response = await axios.post("https://gdp.elosolutions.com.br/api/login", data);

      if (response.status === 200) {
        toast("Bem-vindo!", "success", 3000);
        router.push("/")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setError("email", { type: "manual", message: "Email não encontrado" });
        } else if (error.response?.status === 401) {
          setError("senha", { type: "manual", message: "Senha inválida" });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName='items-center justify-center h-full w-full relative flex'>
        <Image source={require("@/assets/images/pattern.png")} className='w-full h-full z-0 absolute' />
        <View className='z-10 bg-white rounded-md p-8 w-4/5 items-center gap-y-4'>
          <Text className='text-3xl text-blue font-bold'>Login</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input keyboardType='email-address'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="E-mail"
                  label='E-mail'
                />
                {errors.email && <Text className='text-red'>{errors.email.message as React.ReactNode}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Input
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Senha"
                  label='Senha'
                />
                {errors.senha && <Text className='text-red'>{errors.senha.message as React.ReactNode}</Text>}
              </View>
            )}
          />
          <Button label={isLoading ? <ActivityIndicator color={'white'} /> : 'Entrar'} onPress={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login