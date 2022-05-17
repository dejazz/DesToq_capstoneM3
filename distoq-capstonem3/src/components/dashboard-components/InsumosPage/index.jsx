import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { useActivePage } from "../../../Providers/DashboardPageController";
import { useSelectValues } from "../../../Providers/SelectValues";
import { CardInsumo } from "./InsumoCard";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProvidersList } from "../../../Providers/ProvidersList";
import api from "../../../dataBase/db";
import { useToken } from "../../../Providers/Token";
import { useState } from "react";
import { useEffect } from "react";

export const InsumosPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();
  const { unidadesDeMedidaOptions, categoriasOptions } = useSelectValues();

  const { providersList, setProvidersList } = useProvidersList();
  const [suppliesList, setSupliesList] = useState([]);

  const [supplyName, setSupplyName] = useState("");
  const [supplyCategory, setSupplyCategory] = useState("");
  const [supplyProvider, setSupplyProvider] = useState("");
  const [supplyPurchasePrice, setSupplyPurchasePrice] = useState(null);
  const [supplyUnt, setSupplyUnt] = useState("");

  const { token } = useToken();

  const handleInputsValue = () => {
    setSupplyName("");
    setSupplyCategory("");
    setSupplyProvider("");
    setSupplyPurchasePrice(0);
    setSupplyUnt("");
  };

  useEffect(() => {
    api.get("/supplies").then((res) => {
      console.log(res.data);
      setSupliesList(res.data);
    });
  }, []);

  console.log(suppliesList);
  console.log(providersList);

  const getApi = () => {
    api.get(`/supplies`).then((resp) => {
      console.log(resp.data);
      setSupliesList(resp.data);
    });
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório!"),
    category: yup.string().required("Selecione a categoria!"),
    provider: yup.string().required("Selecione o fornecedor!"),
    purchasePrice: yup
      .number()
      .typeError("*** Valor obrigatório!")
      .positive("Proíbido valor negativo!")
      .nullable(true)
      .required("*** Valor obrigaório!"),
    measurementUnit: yup
      .string()
      .required("*** Selecione uma unidade de medida!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);
    api
      .post(
        "/supplies",
        {
          ...data,
          ownerId: 1,
          userId: 1,
          providerId: +data.provider,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => handleInputsValue())
      .then((_) => getApi());
  };

  console.log(errors);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "menuOptions",
    defaultValue: activeDashboardPage,
    onChange: setActiveDashboardPage,
  });

  const group = getRootProps();

  function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label" width={"100%"}>
        <input {...input} />
        <Flex
          {...checkbox}
          cursor="pointer"
          //   borderWidth="1px"
          borderRadius="md"
          fontWeight="bold"
          fontSize="26px"
          color="white"
          alignItems="center"
          //   boxShadow="md"
          _checked={{
            bg: "#F4BF39",
            color: "#434343",
            fontWeight: "bold",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
          sx={{
            svg: {
              marginRight: "10px",
            },
          }}
        >
          {props.children}
        </Flex>
      </Box>
    );
  }
  return (
    //FULL CONTAINER
    <Flex className="fullPage" width="100%" minHeight="calc(100vh - 80px)">
      <VStack
        {...group}
        alignItems="flex-start"
        backgroundColor={"#434343"}
        display={["none", "none", "none", "none", "flex"]}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {handleIcons(value)} {value}
            </RadioCard>
          );
        })}
      </VStack>
      <Flex
        className="contentContainer"
        width="100%"
        minHeight="100%"
        flexDir="column"
        alignItems={"center"}
        backgroundImage={
          "https://www.jeronimoburger.com.br/img/home/banner-sobre-desk.png"
        }
        bgRepeat="no-repeat"
        backgroundSize="100% 100%"
      >
        <Heading
          variant="primary"
          width="100%"
          margin={["0px", "0px", "0px", "0px", "20px 20px"]}
          display={[
            "inline-block",
            "inline-block",
            "inline-block",
            "inline-block",
            "none",
          ]}
          textAlign="center"
        >
          Insumos
        </Heading>
        <InputGroup
          size="md"
          width={"90%"}
          maxW={"500px"}
          margin={["0px", "0px", "0px", "0px", "20px 0 0 0"]}
          display={["flex", "flex", "flex", "flex", "none"]}
        >
          <Input
            pr="4.5rem"
            type={"text"}
            placeholder="Faça sua pesquisa..."
            backgroundColor={"white"}
            fontWeight={"bold"}
            boxShadow={"0 0 5px grey"}
            _focus={{
              boxShadow: "0 0 10px grey",
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => console.log("teste")}>
              <GoSearch />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Flex
          width={"100%"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            backgroundColor={"#dbdbdb"}
            boxShadow={"0 0 15px #464646"}
            width={["100%", "100%", "100%", "100%", "90%"]}
            height={["100%", "100%", "100%", "100%", "90%"]}
            marginTop={["20px", "20px", "20px", "20px", "0px"]}
            borderTopRadius={"15px"}
            borderBottomRadius={["0px", "0px", "0px", "0px", "15px"]}
            color={"white"}
          >
            <Tabs
              isFitted
              variant="enclosed"
              w={"100%"}
              backgroundColor={"#434343"}
              borderRadius={"20px"}
            >
              <TabList mb="1em">
                <Tab
                  color={"#fff"}
                  fontWeight={"bold"}
                  fontSize={"26px"}
                  _selected={{
                    color: "#F4BF39",
                    borderBottomColor: "#F4BF39",
                    borderBottomWidth: "2px",
                  }}
                  _focus={{
                    borderColor: "#F4BF39",
                    borderTopLeftRadius: "18px",
                    border: "2px",
                  }}
                >
                  Insumos Cadastrados
                </Tab>
                <Tab
                  color={"#fff"}
                  fontWeight={"bold"}
                  fontSize={"26px"}
                  _selected={{
                    color: "#F4BF39",
                    borderBottomColor: "#F4BF39",
                    borderBottomWidth: "2px",
                  }}
                  _focus={{
                    borderColor: "#F4BF39",
                    borderTopRightRadius: "18px",
                    border: "2px",
                  }}
                >
                  Adicionar Insumos
                </Tab>
              </TabList>
              <TabPanels
                sx={{
                  minWidth: "100%",
                  height: "100%",
                  // maxHeight: "calc(100% - 75px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                maxHeight={[
                  "calc(100% - 115px)",
                  "calc(100% - 110px)",
                  "calc(100% - 110px)",
                  "calc(100% - 110px)",
                  "calc(100% - 80px)",
                ]}
              >
                <TabPanel
                  // backgroundColor={"#feffce"}
                  width={"90%"}
                  height={"100%"}
                  maxH={"80vh"}
                  display={"flex"}
                  justfyContent={"center"}
                  alignItens={"center"}
                  flexDirection={"column"}
                  overflowY={"auto"}
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "5px",
                      height: "50px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#7a7a7a",
                      marginTop: "25px",
                      marginBottom: "25px",
                      borderRadius: "5px",
                      boxShadow: "inset 0 0 3px black",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#505050",
                      boxShadow: "inset 0 0 5px #e7e7e7dd",
                      borderRadius: "5px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#555",
                    },
                  }}
                >
                  {suppliesList?.map((resp) => (
                    <CardInsumo supply={resp} />
                  ))}
                </TabPanel>
                <TabPanel
                  width={"100%"}
                  height={"100%"}
                  maxH={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{}}
                >
                  <Flex
                    w={"100%"}
                    maxWidth={"700px"}
                    height={"100%"}
                    justifyContent={"center"}
                  >
                    <Stack
                      spacing={3}
                      width="400px"
                      maxWidth={"90%"}
                      height={"100%"}
                      display="flex"
                      flexDir={"column"}
                      alignItems="center"
                      justifyContent={"center"}
                      padding={"0 30px"}
                      backgroundColor={"#fff"}
                      borderRadius={"10px"}
                      boxShadow="0 0 10px grey"
                      color={"black"}
                    >
                      <Heading fontSize={"30px"}> Cadastro novo insumo</Heading>
                      <Input
                        placeholder="Nome do insumo..."
                        size="md"
                        minHeight={"40px"}
                        {...register("name")}
                        borderColor={errors.name && "#ff0000"}
                        border={errors.name && "2px"}
                        value={supplyName}
                        onChange={(e) => setSupplyName(e.target.value)}
                      />
                      {errors.name && (
                        <Text color={"#ff0000"} width={"95%"}>
                          {errors.name.message}
                        </Text>
                      )}
                      <Select
                        placeholder="Categoria"
                        {...register("category")}
                        borderColor={errors.category && "#ff0000"}
                        border={errors.category && "2px"}
                        value={supplyCategory}
                        onChange={(e) => setSupplyCategory(e.target.value)}
                      >
                        {categoriasOptions.map((e) => (
                          <option value={e}>{e}</option>
                        ))}
                      </Select>
                      {errors.category && (
                        <Text color={"#ff0000"} width={"95%"}>
                          {errors.category.message}
                        </Text>
                      )}
                      <Select
                        placeholder="Fornecedor"
                        {...register("provider")}
                        borderColor={errors.provider && "#ff0000"}
                        border={errors.provider && "2px"}
                        value={supplyProvider}
                        onChange={(e) => setSupplyProvider(e.target.value)}
                      >
                        {providersList?.map((ele) => (
                          <option value={ele.id}>{ele.fantasyName}</option>
                        ))}
                      </Select>
                      {errors.provider && (
                        <Text color={"#ff0000"} width={"95%"}>
                          {errors.provider.message}
                        </Text>
                      )}
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                          children="$"
                        />
                        <Input
                          placeholder="Preço de compra..."
                          type={"number"}
                          {...register("purchasePrice")}
                          borderColor={errors.purchasePrice && "#ff0000"}
                          border={errors.purchasePrice && "2px"}
                          value={supplyPurchasePrice}
                          onChange={(e) =>
                            setSupplyPurchasePrice(e.target.value)
                          }
                        />

                        <Select
                          placeholder="Un. de Medida"
                          {...register("measurementUnit")}
                          borderColor={errors.measurementUnit && "#ff0000"}
                          border={errors.measurementUnit && "2px"}
                          value={supplyUnt}
                          onChange={(e) => setSupplyUnt(e.target.value)}
                        >
                          {unidadesDeMedidaOptions.map((e) => (
                            <option value={e}>{e}</option>
                          ))}
                        </Select>
                      </InputGroup>
                      {errors.purchasePrice && (
                        <Text color={"#ff0000"} width={"95%"}>
                          {errors.purchasePrice.message}
                        </Text>
                      )}
                      {errors.measurementUnit && (
                        <Text color={"#ff0000"} width={"95%"}>
                          {errors.measurementUnit.message}
                        </Text>
                      )}
                      <Button
                        colorScheme="blue"
                        minHeight={"40px"}
                        onClick={handleSubmit(onSubmitFunction)}
                      >
                        Cadastrar Insumo
                      </Button>
                    </Stack>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InsumosPage;
