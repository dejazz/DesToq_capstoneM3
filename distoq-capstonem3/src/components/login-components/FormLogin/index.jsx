import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../dataBase/db";
import { Link, useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmitForm = (data) => {
    api
      .post("login", data)
      .then((res) => {
        toast({
          description: "Logado com sucesso!",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem(
          "@DEStoq:token",
          JSON.stringify(res.data.accessToken)
        );
        return navigate("/")
      })
      .catch((err) => {
        toast({
          description: "Ops! Algo deu errado",
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      });
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("digite um e-mail válido")
      .required("E-mail obrigatório!"),
    password: yup.string().required("Senha obrigatória!"),
    // .matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    //   "Senha Inválida. Sua senha deve conter pelo menos: uma letra Maiuscula, um número e um caracter especial($*&@#)"
    // )
    // .min(8, "Sua senha deve possuir no minimo 6 caracteres"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <Flex
        w="100%"
        maxW="400px"
        direction="column"
        justify="center"
        align="center"
      >
        <Heading
          mt="50px"
          mb="20px"
          variant="primary"
          as="h1"
          position="relative"
        >
          Faça seu login aqui!
        </Heading>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormControl
            display="flex"
            flexDirection="column"
            align="center"
            sx={{
              label: {
                margin: "0 10px",
              },
              input: {
                borderColor: "black",
                color: "#101010",
                width: "100%",
                maxW: "300px",
                margin: "auto",
                _placeholder: {
                  color: "black",
                  borderColor: "black",
                },
              },
            }}
          >
            <FormLabel htmlFor="email">E-mail </FormLabel>
            <Input
              variant="outline"
              id="email"
              type="email"
              placeholder="digite seu e-mail"
              {...register("email")}
            />
            {errors.email && (
              <FormHelperText color="red.500" variant={"error"}>
                {errors.email.message}
              </FormHelperText>
            )}
            <FormLabel htmlFor="email">Senha </FormLabel>
            <Input
              variant="outline"
              id="password"
              type="password"
              placeholder="digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <FormHelperText color="red.500" variant={"error"}>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button type="submit" variant="primary">
            LOGAR
          </Button>
        </form>
        <Text variant="primary">Ainda não possui cadastro?</Text>
        <Link to="/register">
          <Button type="button" variant="primary">
            CADASTRAR
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default FormLogin;
