import {
  Container,
  Box,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useProductStore } from "../store/product";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const { products, getAllProducts, deleteProduct, editProduct } =
    useProductStore();

  const udpateProduct = async () => {
    const { success, message } = await editProduct(
      selectedProduct._id,
      selectedProduct
    );

    console.log(message);
    toast({
      title: message,
      status: success ? "success" : "error",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });

    if (success) {
      onClose();
    }
  };

  const handleOnOpen = (data) => {
    setSelectedProduct(data);
    console.log("selectedProduct", selectedProduct);
    onOpen();
  };

  const navigate = useNavigate();

  const deleteProductHandler = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      console.log(message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  console.log(products);

  return (
    <Container
      maxW="container.lg"
      bg={useColorModeValue("white", "gray.8100")}
      mt={8}
      rounded={"lg"}
      padding={4}
    >
      {products.length === 0 && (
        <HStack>
          <Text fontSize={"md"}>No products found</Text>
          <Text
            color="teal"
            fontSize={"md"}
            fontWeight={"bold"}
            _hover={{ cursor: "pointer", color: "teal.400" }}
            onClick={() => navigate("/products")}
          >
            Add Product
          </Text>
        </HStack>
      )}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2}>
        {products &&
          products
            .filter((item) => item) // Filter out undefined or null items
            .map((item) => (
              <Box
                key={item._id}
                w="full"
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                _light={{
                  bg: "grey.200",
                }}
              >
                <Image
                  src={item.image}
                  alt={"Image"}
                  w={"full"}
                  height={"200px"}
                  fit={"cover"}
                />

                <Box p="6" d="flex" alignItems="baseline">
                  <Text
                    color="white"
                    fontWeight="bold"
                    letterSpacing="wide"
                    fontSize="lg"
                    textTransform="uppercase"
                    ml="2"
                    _light={{
                      color: "black",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="white"
                    letterSpacing="wide"
                    fontSize="sm"
                    textTransform="uppercase"
                    ml="2"
                    _light={{
                      color: "black",
                    }}
                  >
                    ${item.price}
                  </Text>
                  <Text
                    color="white"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                    _light={{
                      color: "black",
                    }}
                  >
                    {item.description}
                  </Text>

                  <HStack mt={2}>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => deleteProductHandler(item._id)}
                    >
                      <AiTwotoneDelete fontSize={20} />
                    </Button>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={() => handleOnOpen(item)}
                    >
                      <AiTwotoneEdit fontSize={20} />
                    </Button>
                  </HStack>
                </Box>
              </Box>
            ))}
      </SimpleGrid>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} margin={4}>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Price"
                name="price"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="iamge"
                value={selectedProduct.image}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    image: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Product Description"
                name="description"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => udpateProduct(selectedProduct)}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Product;
