import { v4 as uuidv4 } from 'uuid';
import Task from "./task";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Lorem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    ButtonGroup,
    Portal,
    Textarea,
    useDisclosure
  } from '@chakra-ui/react'
  import {DeleteIcon,AddIcon} from '@chakra-ui/icons'
 import DatePicker from 'react-datepicker'
  import { useState } from "react"
  

function addNewTask(text){

}

export default function Collection({collectionData}){ 
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [startDate, setStartDate] = useState(new Date());
    const [inputText, setInputText] = useState("");
    const handleChanges = e => {
        setInputText(e.target.value);
      };

    const onSubmit = e =>{
        e.preventDefault();
        if(!inputText){  alert("Input should not be blank");} 
        else if(startDate< Date.now())
        {
            alert("Date Should be after today")
        }
        
        else{
            console.log(inputText, startDate);
            collectionData.tasks.push({text:inputText,date:startDate})
            setInputText("");
            setStartDate(new Date());
            onClose();}
        
    }

    return(
        <>
        <div className="my-10 mx-10">
    <div className="text-white text-md sm:text-xl mb-2 flex justify-between">
        <div>{collectionData.collectionName}</div>
        <div className="mr-2 hover:text-pink-500"><DeleteIcon/></div>
    </div>
    {
        collectionData.tasks.map(
            (taskData)=>(
                <Task taskData = {taskData} key={taskData.text}/>
            )
        )
    }
   
    <div className="text-sm sm:text-lg text-white">
    <Button onClick={onOpen} colorScheme = 'pink'><AddIcon className="mr-2"/> Add Task</Button>
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    scrollBehavior={'inside'}
    className='text-white bg-black'
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Textarea placeholder = "Enter Task"
          value = {inputText}
          onChange={handleChanges}
          />
          <div className="mx-4 text-lg">Deadline</div>
          <div className="border-2">
          <DatePicker 
          showTimeSelect
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          dateFormat="dd/MM/yyyy h:mm:ss a"
          />
          </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
             colorScheme='pink' 
             onClick = {onSubmit}
             >
                Save
                </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</div>
    </div>
    </>
    )
}