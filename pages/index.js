// pages/index.js
import Layout from "@/layouts";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

export default function Home({ repo }) {
  console.log(repo);
  return (
    <Container>
      <Heading as="h1" size="2xl">
        MINI PROJECT
      </Heading>
      <Layout metaTitle="Profil">
        <Stack spacing="4">
          {repo.data.map((item) => (
            <Card>
              <CardHeader spacing='1'>
                <Heading size="md">{item.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{item.description}</Text>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Layout>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const repo = await res.json();
  return { props: { repo } };
}
