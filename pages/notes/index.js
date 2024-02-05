import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Notes() {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const [textInput, setTextnput] = useState({
    id: "",
    title: "",
    description: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isOpen, onOpenDelete, onCloseDelete } = useDisclosure();

  async function fetchingData() {
    const res = await fetch(
      "https://paace-f178cafcae7b.nevacloud.io/api/notes"
    );
    const listNotes = await res.json();
    setNotes(listNotes);
  }
  useEffect(() => {
    fetchingData();
  }, []);

  const CreateBtn = () => {
    setTextnput(null);
    onOpen();
  };

  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        }
      );
      const result = await response.json();
      if (result?.success) {
        fetchingData();
        onClose();
      }
    } catch (error) {}
  };

  const ViewData = async (id) => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const listNotes = await response.json();
      onOpen();
      if (listNotes?.success) {
        setTextnput(listNotes?.data);
      }
    } catch (error) {}
  };

  const HandleDelete = (id) => {
    try {
      console.log(id);
      onOpenDelete();
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => {
                CreateBtn();
              }}
            >
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {notes?.data?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.description}</Text>
                    </CardBody>
                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button
                        onClick={() => {
                          ViewData(item.id);
                        }}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        flex="1"
                        colorScheme="red"
                        onClick={() => {
                          HandleDelete(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>

      {/* modal create and Update */}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Form Notes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GridItem>
                <Text>Title</Text>
                <Input
                  hidden={true}
                  type="text"
                  value={textInput?.id || ""}
                  onChange={(event) =>
                    setTextnput({ ...textInput, id: event.target.value })
                  }
                />
                <Input
                  type="text"
                  value={textInput?.title || ""}
                  onChange={(event) =>
                    setTextnput({ ...textInput, title: event.target.value })
                  }
                />
              </GridItem>
              <GridItem>
                <Text>Description</Text>
                <Textarea
                  value={textInput?.description || ""}
                  onChange={(event) =>
                    setTextnput({
                      ...textInput,
                      description: event.target.value,
                    })
                  }
                />
              </GridItem>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={HandleSubmit}>
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

      {/* modal close */}
      <Modal isDelete={isDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Data?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Apakah Anda yakin untuk menghapus data ini?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseDelete}>
              Close
            </Button>
            <Button variant="ghost" onClick={HandleDelete}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
