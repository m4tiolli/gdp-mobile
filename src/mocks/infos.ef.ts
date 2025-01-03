import DatePicker from "@/components/forms/DatePicker";
import Input, { IInput } from "@/components/forms/Input"
import MaskedInput from "@/components/forms/MaskedInput";
import Select from "@/components/forms/Select"
import { calcularValorTotal } from "@/lib/calcs";
import { fetchAllDepartamentos, fetchDataEmpresa, fetchFatoresFinanceiros } from "@/lib/fetchs";
import { storage } from "@/lib/storage";
import React from "react";
import { Control, FieldValues, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { KeyboardTypeOptions } from "react-native";
import { Mask, Masks } from "react-native-mask-input";

interface InfosProps {
  form: {
    control: Control<FieldValues, any>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    errors: FieldErrors<FieldErrors>;
  }
}

interface InputBase extends IInput {
  component: React.FC<any>;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (() => void);
}

interface InputSelect extends InputBase {
  component: typeof Select;
  options: Array<{ label: string, id: number }>;
}

interface InputMasked extends InputBase {
  component: typeof MaskedInput;
  mask: Mask;
  onBlur?: (() => void) | undefined;
}

interface InputTyped extends InputBase {
  component: Exclude<React.FC<any>, typeof Select | typeof MaskedInput>;
}

type Input = InputSelect | InputMasked | InputTyped;


export interface Infos {
  value: string;
  title: string;
  description: string;
  inputs: Input[];
}

export interface SelectDataType {
  label: string,
  id: number
}

export const infos = ({ form }: InfosProps): Infos[] => {
  const [fatoresFinanceiros, setFatoresFinanceiros] = React.useState<SelectDataType[] | undefined>()
  const [departamentos, setDepartamentos] = React.useState<SelectDataType[] | undefined>()
  const token = storage.getString("token") || ""

  const cadastrosElo = [{ label: "Elo Recuperadora", id: 1 }, { label: "Elo Serviços", id: 2 }]

  React.useEffect(() => {
    const getFatores = async () => {
      setFatoresFinanceiros(await fetchFatoresFinanceiros(token))
    }
    const getDepartamentos = async () => {
      await fetchAllDepartamentos(token, setDepartamentos)
    }
    getDepartamentos()
    getFatores()
  })

  return [
    {
      value: "1",
      title: "Dados da proposta",
      description: "Informações como código, data e dados da empresa",
      inputs: [
        { component: Select, control: form.control, errors: form.errors, name: "cadastroElo", placeholder: "Selecione o cadastro da Elo", label: "Cadastro da Elo", options: cadastrosElo },
        { component: Input, control: form.control, errors: form.errors, name: "codigoProposta", keyboardType: "default", placeholder: "Código da proposta", label: "Código da proposta" },
        { component: Select, control: form.control, errors: form.errors, name: "duracaoContrato", placeholder: "Selecione a duração do contrato", label: "Duração do contrato", options: fatoresFinanceiros || [{ label: "", id: 0 }] },
        { component: DatePicker, control: form.control, errors: form.errors, name: "dataProposta", placeholder: "Selecione a data", label: "Data da proposta" },
        { component: MaskedInput, control: form.control, errors: form.errors, name: "cnpjEmpresa", placeholder: "CNPJ", label: "CNPJ da empresa", mask: Masks.BRL_CNPJ, onBlur: () => fetchDataEmpresa(form.getValues, form.setValue) },
        { component: Input, control: form.control, errors: form.errors, name: "nomeEmpresa", keyboardType: "default", placeholder: "Nome fantasia da empresa", label: "Nome fantasia da empresa" },
        { component: Input, control: form.control, errors: form.errors, name: "razaoEmpresa", keyboardType: "default", placeholder: "Razão social da empresa", label: "Razão social da empresa" }
      ]
    },
    {
      value: "2",
      title: "Dados do contrato",
      description: "Informações como valores técnicos usados para calcular o valor da proposta.",
      inputs: [
        { component: Input, control: form.control, errors: form.errors, name: "potenciaEquipamento", keyboardType: "number-pad", placeholder: "Potência em KVA do equipamento", label: "Potência em KVA do equipamento" },
        { component: MaskedInput, control: form.control, errors: form.errors, name: "valorContaEnergia", keyboardType: "number-pad", placeholder: "Valor da conta de energia em R$", label: "Valor da conta de energia em R$", mask: Masks.BRL_CURRENCY, onBlur: () => calcularValorTotal(form.getValues, form.setValue) },
        { component: MaskedInput, control: form.control, errors: form.errors, name: "valorTotal", keyboardType: "number-pad", placeholder: "Valor total da proposta em R$", label: "Valor total da proposta em R$", mask: Masks.BRL_CURRENCY },
      ]
    },
    {
      value: "3",
      title: "Dados do vendedor",
      description: "Informações como nome, email e telefone do vendedor.",
      inputs: [
        { component: Input, control: form.control, errors: form.errors, name: "nomeVendedor", keyboardType: "default", placeholder: "Nome do vendedor", label: "Nome do vendedor" },
        { component: Input, control: form.control, errors: form.errors, name: "emailVendedor", keyboardType: "default", placeholder: "E-mail do vendedor", label: "E-mail do vendedor" },
        { component: Input, control: form.control, errors: form.errors, name: "telefone1Vendedor", keyboardType: "default", placeholder: "Telefone 1 do vendedor", label: "Telefone 1 do vendedor" },
        { component: Input, control: form.control, errors: form.errors, name: "telefone2Vendedor", keyboardType: "default", placeholder: "Telefone 2 do vendedor", label: "Telefone 2 do vendedor" },
        { component: Select, control: form.control, errors: form.errors, name: "departamentoVendedor", placeholder: "Selecione o departamento", label: "Departamento do vendedor", options: departamentos },
      ]
    },
    {
      value: "4",
      title: "Dados do tomador",
      description: "Informações como nome, email e telefone do tomador.",
      inputs: [
        { component: Input, control: form.control, errors: form.errors, name: "nomeTomador", keyboardType: "default", placeholder: "Nome do tomador", label: "Nome do tomador" },
        { component: Input, control: form.control, errors: form.errors, name: "emailTomador", keyboardType: "default", placeholder: "E-mail do tomador", label: "E-mail do tomador" },
        { component: Input, control: form.control, errors: form.errors, name: "telefoneTomador", keyboardType: "default", placeholder: "Telefone do tomador", label: "Telefone do tomador" },
        { component: Select, control: form.control, errors: form.errors, name: "departamentoTomador", placeholder: "Selecione o departamento", label: "Departamento do tomador", options: departamentos },
      ]
    }
  ]
}