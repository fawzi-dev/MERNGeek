import {
  Button,
  Container,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW={"1140px"}
      display="flex"
      paddingTop={8}
      flexDirection={{
        base: "column",
        md: "row",
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text
        fontSize={{ base: "22px", sm: "28px" }}
        fontWeight="bold"
        textTransform="uppercase"
        textAlign="center"
        bgGradient="linear(to-r, cyan.100, blue.500)"
        bgClip="text"
      >
        <Link to="/">Product Store 🛒</Link>
      </Text>
      <HStack spacing={2} alignItems="center">
        <Link to="/products">
          <Button>
            <CiCirclePlus fontSize={20} />
          </Button>
        </Link>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
        </Button>
      </HStack>
    </Container>
  );
};

export default Navbar;
