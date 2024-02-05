import { useEffect, useState } from "react";
import Layout from "@/layouts";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  CardFooter,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Button,
} from "@chakra-ui/react";

export default function ApiFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("api/api_sanber")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data); // Sesuaikan dengan struktur data yang benar
        console.log(res);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  return (
    <div>
      <Heading as="h1" size="2xl">
        Fetch API
      </Heading>
      <Layout metaTitle="Profil">
        <Container maxW="full" spacing="4" color="#262626">
            
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {data &&
              data.map((item) => (
                <Card>
                  <CardHeader spacing="1">
                    <Heading size="md">{item.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text> Deskripsi : {item.description}</Text>
                    <Text>Tanggal Create : {item.created_at}</Text>
                    <Text>Tanggal Update : {item.updated_at}</Text>
                  </CardBody>
                </Card>
              ))}
          </SimpleGrid>
        </Container>
      </Layout>
    </div>
  );
}
