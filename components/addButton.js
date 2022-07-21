import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useDisclosure
  } from '@chakra-ui/react'
export default function AddButton(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
    <Button 
   onClick={onOpen}
    colorScheme='pink'
    borderRadius='full'
    height='20'
    width='20'
    >
        <AddIcon
        fontSize='3xl'
      
        />
    </Button>
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    scrollBehavior={'inside'}
    className='text-white bg-black'
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input placeholder = "Enter Collection Name"/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='pink'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}