import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Link,
  ListItem,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  UnorderedList,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GoSearch } from "react-icons/go";
import { useActivePage } from "../../../Providers/DashboardPageController";

import { useContext, useEffect, useState } from "react";
import api from "../../../dataBase/db";
import { useToken } from "../../../Providers/Token";
import { DashFilterContext } from "../../../Providers/DashboardFilter";
import { ShowcaseContext } from "../../../Providers/showcase";
import { AiFillGithub } from "react-icons/ai";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaHeartbeat } from "react-icons/fa";
import { GiBrain, GiBrainstorm } from "react-icons/gi";

export const DevelopersPage = () => {
  const { activeDashboardPage, setActiveDashboardPage, handleIcons, options } =
    useActivePage();

  const [devs, setDevs] = useState([]);

  const { token } = useToken();


  const { inputSearch } = useContext(DashFilterContext);

  const getDevs = () => {
    api
      .get("/developers")
      .then((res) => setDevs(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    getDevs();
  }, []);

  console.log(devs)
  
  const { getProducts } = useContext(ShowcaseContext);

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
          borderRadius="md"
          fontWeight="bold"
          fontSize="26px"
          color="white"
          alignItems="center"
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
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:1}}
    >
      <Flex className="fullPage" width="100%" minHeight="calc(100vh)">
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
          minHeight="100vh"
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
            Developers
            
          </Heading>
          <Flex
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex
              backgroundColor={"#aeaeae4e"}
              boxShadow={"0 0 15px #464646"}
              width={["100%", "100%", "100%", "100%", "90%"]}
              height={["100%", "100%", "100%", "100%", "100%"]}
              marginTop={["20px", "20px", "20px", "20px", "0px"]}
              borderTopRadius={"15px"}
              borderBottomRadius={["0px", "0px", "0px", "0px", "15px"]}
              color={"white"}
              mt={"170px"}
              direction={"column"}
            >
              <Heading fontSize={"1.8rem"} color={"#111"} mt={"70px"} width={"100%"} textAlign={"center"}>
                <Flex justify={"center"} align={"center"}>
                  Developed with <Box m={"10px"}><GiBrainstorm /></Box> and <Box m={"10px"}><FaHeartbeat/></Box>, by :
                </Flex>
              </Heading>
              <Flex 
                w="100%" 
                align="center" 
                justify="center">
                <UnorderedList 
                  w="100%" 
                  maxW="1500px" 
                  display="flex" 
                  direction={"column"} 
                  flexWrap={"wrap"} 
                  justifyContent={"center"}>

                  {devs.map((elem, index) => 
                    <ListItem
                      _hover={{
                        "transform": "scale(1.05)",
                        "boxShadow":" 0px 20px 40px rgba(0, 0, 0, 0.25)",
                        "border": "solid 1px #de9e36"
                        
                      }}
                      listStyleType={"none"}
                      transition= "all ease .5s"
                      w="300px"
                      h="507px"
                      border="1px solid #E5E5E5"
                      borderRadius="10px"
                      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                      key={index}
                      ml={"15px"}
                      mt={"50px"}
                    >
                      <Image
                        w="300px"
                        h="257px"
                        src={elem.picture}
                        alt={elem.name}
                        borderRadius="10px 10px 0px 0px"
                      />
                      <Text 
                        fontWeight={"800"} 
                        mt={"20px"} 
                        fontSize={"1.5rem"} 
                        textAlign={"center"} 
                        color={"#111"}
                      >
                        {elem.name}
                      </Text>
                      <Text 
                        fontSize={"1.5rem"} 
                        mt={"30px"} 
                        textAlign={"center"} 
                        color={"#111"}
                      >
                        {elem.position}
                      </Text>
                      <Flex 
                        mt={"50px"} 
                        width={"300px"} 
                        alignItems={"center"} 
                        justify={"center"}>
                      <Link 
                        fontSize={"1.3rem"} 
                        textAlign={"center"} 
                        color={"#111"} 
                        href={elem.contact} 
                        isExternal
                      >
                        Portfólio 
                      </Link>
                        <AiFillGithub fontSize={"1.5rem"} color={"#111"} ml={"15px"} />
                      </Flex>
                    </ListItem>                  
                  )}
                </UnorderedList>
              </Flex>          
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};
export default DevelopersPage;
