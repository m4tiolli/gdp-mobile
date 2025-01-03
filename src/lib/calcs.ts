import { UseFormGetValues, FieldValues, UseFormSetValue } from "react-hook-form";

export const calcularValorTotal = (getValues: UseFormGetValues<FieldValues>, setValue: UseFormSetValue<FieldValues>) => {
  const potencia = parseFloat(getValues("potenciaEquipamento")) || 0;
  const valorConta = parseFloat(getValues("valorContaEnergia").replace(/[^\d,]/g, "").replace(",", ".")) || 0;
  const fatorFinanceiroMeses = parseFloat(getValues("duracaoContrato")) || 0;

  let fatorFinanceiro = 0
  if (fatorFinanceiroMeses === 12) fatorFinanceiro = 10;
  if (fatorFinanceiroMeses === 24) fatorFinanceiro = 8.5;
  if (fatorFinanceiroMeses === 36) fatorFinanceiro = 7;

  console.table([
    "Potência * Fator: " + potencia * fatorFinanceiro,
    "Valor da conta: " + valorConta,
    "5% Conta de energia: " + (valorConta * 0.05),
    "10% Conta de energia: " + (valorConta * 0.1),
  ]);

  let valorTotal = 0;

  if ((potencia * fatorFinanceiro) < (valorConta * 0.05)) {
    valorTotal = (valorConta * 0.05);
  } else if ((potencia * fatorFinanceiro) > (valorConta * 0.10)) {
    valorTotal = (valorConta * 0.10);
  } else {
    valorTotal = (potencia * fatorFinanceiro);
  }

  setValue("valorTotal", valorTotal.toFixed(2).toString());
};