import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const { createProduct, } = useProductStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(product);
    toast({
      title: message,
      status: success ? "success" : "error",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
    if (success) navigate("/");
  };

  return (
    <Container>
      <Heading textAlign={"center"} my={4} as={"h1"}>
        Create Product
      </Heading>

      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        rounded={"lg"}
        shadow={"md"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <VStack spacing={4} alignItems={"center"} justifyContent={"center"}>
          <Input
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Input
            placeholder="Product Price"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            name="iamge"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <Input
            placeholder="Product Description"
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <Button onClick={handleSubmit} w={"full"} bg={"blue.400"}>
            Submit
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateProduct;
