import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { AnyObject } from "yup/lib/types";
import Button from "../components/Button";
import Input from "../components/Input";
import LoadingScreen from "../components/LoadingScreen";
import Select from "../components/Select";
import Title from "../components/Title";
import ConversionResult from "../hooks/UseConversionResult";
import * as S from "../styles/Pages/Home";
import { ConverterDataProps } from "../types/converter";



const schema = yup.object().shape({
  value: yup.string().required("Digite o Valor."),
  currency: yup.string().required("Selecione a moeda."),
});

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showResultModule, setShowResultModule] = useState(false);
  const [resultData, setResultData] = useState({} as ConverterDataProps);

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AnyObject) => {
    converterRequest();
  };

  const formartValuesData = [
    {
      id: "BRL",
      name: "Real",
    },
    {
      id: "USD",
      name: "Dólar Americano",
    },
    {
      id: "EUR",
      name: "Euro",
    },
  ];

  const converterRequest = async () => {
    setLoading(true);

    const selectedCurrency = getValues("currency");

    let currencies: any[] = [];

    formartValuesData.map((item) => {
      if (item.id !== selectedCurrency) {
        currencies.push(item.id);
      }
    });

    const response = await axios.get<ConverterDataProps>(
      `https://economia.awesomeapi.com.br/last/${selectedCurrency}-${currencies[0]},${selectedCurrency}-${currencies[1]}
      `
    );

    const data = response.data;

    
    setResultData(data);

    setShowResultModule(true);

    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <S.Container>
       

        <Title
          size={2.1}
          variant="h2"
          content="Bem-vindo ao Conversor de Moedas!"
        />

        <S.WelcomeText>
          O aplicativo de Conversor de Moedas
         
        </S.WelcomeText>

     
        <Title
          size={1}
          variant="h3"
          content="Insira o valor e a moeda para conversão"
        />

        <S.Form>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <NumberFormat
                decimalSeparator=","
                thousandSeparator="."
                decimalScale={2}
                fixedDecimalScale
                customInput={Input}
                allowNegative={false}
                id="value"
                placeholder="Digite o valor..."
                label="Valor"
                required={true}
                name="value"
                onChange={onChange}
                data-testid="value"
              />
            )}
            name="value"
          />

          <S.Error>
            {errors.value?.message ? errors.value?.message : ""}
          </S.Error>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                id="currency"
                placeholder="Selecione a moeda..."
                label="Moeda"
                required={true}
                name="currency"
                onChange={onChange}
                data={formartValuesData}
                data-testid="currency"
              />
            )}
            name="currency"
          />

          <S.Error>
            {errors.currency?.message ? errors.currency?.message : ""}
          </S.Error>

          <S.ButtonContainer>
            <Button
              data-testid="converterButton"
              variant="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Converter
            </Button>
          </S.ButtonContainer>
        </S.Form>

      

        {showResultModule && (
          <ConversionResult data={resultData} value={getValues("value")} />
        )}
      </S.Container>
    </>
  );
};

export default Home;
