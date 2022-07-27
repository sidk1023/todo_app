import { v4 as uuidv4 } from "uuid";
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
import { useState } from "react";
export default function AddButton({count,setCount}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputText, setInputText] = useState('')
    const handleChanges = (e) => {
      setInputText(e.target.value);
    };
    const onSubmit = (e)=>{
      e.preventDefault();
      if (!inputText) {
        alert("Input should not be blank");
    }else{
      console.log(inputText)
      let items = JSON.parse(window.localStorage.getItem("collections"));
      items.unshift({
        name: inputText,
        _id: uuidv4()
        
      })
      window.localStorage.setItem("collections", JSON.stringify(items));
      setCount(count+1)
      setInputText('')
      onClose()
    }
  }
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
          <Input placeholder = "Enter Collection Name" value = {inputText} onChange={handleChanges}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='pink' onClick={onSubmit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}