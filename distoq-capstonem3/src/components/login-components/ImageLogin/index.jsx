import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import DEStoq from "../../../assets/imgs/DEStoq.png";

const ImageLogin = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      justify="center"
      align="center"
      background="#101010"
      backgroundImage={
        "https://www.jeronimoburger.com.br/img/home/banner-sobre-desk.png"
      }
      bgRepeat="no-repeat"
      backgroundSize="100% 90%"
      display={["none", "none", "none", "none", "flex"]}
    >
      <Flex ml={"50px"} alignItems={"center"}justify={"center"} flexDirection={"column"}>
        <Avatar
          w="200px"
          h="200px"
          ml="-100px"
          mt="150px"
          position="absolute"
          top="200px"
          src={DEStoq}
          alt="logo da empresa"
          />
        <Text mr={"80px"} mt={"250px"} color={"#ccc"} fontFamily={"rubik"} fontSize={"1.5rem"}>Descomplicando seu estoque!</Text>
      {/* <Flex>

      </Flex> */}
      </Flex>
    </Flex>
  );
};
export default ImageLogin;
