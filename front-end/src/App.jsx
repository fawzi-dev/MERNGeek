import { Route, Routes } from "react-router-dom";

import { Box, useColorModeValue } from "@chakra-ui/react";

import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import NavBar from "./components/custom/Navbar";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<CreateProduct />} />
      </Routes>
    </Box>
  );
}

export default App;
