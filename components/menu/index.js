import Link from "next/link";
import { Box, Text, VStack } from "@chakra-ui/react";

const Menuku = () => {
  return (
    <Box>
      <VStack spacing={4} align="left">
        <Link href="/">
          <Text fontSize="lg" color="gray.500">
            getServerSideProps
          </Text>
        </Link>
        <Link href="/api_fetch">
          <Text fontSize="lg" color="gray.500">
            api routes
          </Text>
        </Link>
        <Link href="/notes">
          <Text fontSize="lg" color="gray.500">
            Crud Notes
          </Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default Menuku;
