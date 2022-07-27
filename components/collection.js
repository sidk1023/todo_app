import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";
import Task from "./task";
import {
  FormControl,
  FormLabel,
  Switch ,
  FormErrorMessage,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  ButtonGroup,
  Portal,
  Textarea,
  useDisclosure,
  Radio, 
  RadioGroup,Stack, 
  filter,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { useEffect, useState, useRef } from "react";


export default function Collection({ collectionData, count2, setCount2}) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { 
    isOpen: isOpenAlert, 
    onOpen: onOpenAlert, 
    onClose: onCloseAlert 
} = useDisclosure()
const cancelRef = useRef()
  const [startDate, setStartDate] = useState(new Date());
  const [inputText, setInputText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sorted, setSorted] = useState(1);
  const [value, setValue] = useState('1')
  const [taskData, setTaskData] = useState([]);
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Inside task useEffect");
    console.log(sorted)
    filterItems()
  }, [sorted,value,count]);

  function filterItems(){
    console.log("value is",value)
    let items = JSON.parse(window.localStorage.getItem("tasks"))
    if(items){
    if(value==='1'){
     items= items.filter((a) => a.collectionId === collectionData._id);
    }
    if(value==='2'){
     items= items.filter((a) => a.collectionId === collectionData._id && a.completionDate!==null);
    }
    if(value==='3'){
     items =  items.filter((a) => a.collectionId === collectionData._id && a.completionDate===null);
    }
    if(value==='4'){
      items =  items.filter((a) => (a.collectionId === collectionData._id) && (new Date(a.date)<Date.now()) && (a.completionDate===null));
     }    
    if(sorted===1){
      items.sort((a,b)=>(new Date(a.date)> new Date(b.date))?1 : (new Date(a.date)< new Date(b.date))?-1:0)
  }
 
      setTaskData(items)
    }
 }

 
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const currentPageData = taskData.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(taskData.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleChanges = (e) => {
    setInputText(e.target.value);
  };

   

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputText) {
      alert("Input should not be blank");
    } else if (startDate < Date.now()) {
      alert("Date Should be after today");
    } else {
      console.log(inputText, startDate);
      let items = JSON.parse(window.localStorage.getItem("tasks"));
      items.unshift({
        _id: uuidv4(),
        text: inputText,
        date: new Date(startDate),
        completionDate: null,
        collectionId: collectionData._id,
      });
      window.localStorage.setItem("tasks", JSON.stringify(items));
      filterItems()
      setInputText("");
      setStartDate(new Date());
      onClose();
    }
  };



  const onToggle = (e) => {
    e.preventDefault()
   if(sorted===1){
    setSorted(0)
   }
   else{
    setSorted(1)
   }
   console.log("sort is ",sorted)     
}

const onDelete = (e)=> {
  e.preventDefault()
  let tasks = JSON.parse(window.localStorage.getItem('tasks'))
        let filteredTasks = tasks.filter((obj=> obj.collectionId !== collectionData._id))
        let collections = JSON.parse(window.localStorage.getItem('collections'))
        let filteredCollections = collections.filter((obj=> obj._id !== collectionData._id))
        window.localStorage.setItem('collections',JSON.stringify(filteredCollections))
        window.localStorage.setItem('tasks',JSON.stringify(filteredTasks))
       setCount2(count2+1)
  onCloseAlert()
}


  return (
    <>
      <div className="my-10 mx-10">
        <div className="text-white text-md sm:text-xl mb-2 flex justify-between">
          <div className="text-2xl">{collectionData.name}</div>
          <div className="flex justify-start" >
          <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' >
    Sort By Date
  </FormLabel>
  <Switch colorScheme='pink' onChange={onToggle} isChecked={sorted} mr='2'/>
</FormControl>
          <div className="mr-2 hover:text-pink-500" onClick = {onOpenAlert}>
            <DeleteIcon />
          </div>
          <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Collection
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
            </div>
        </div>
        <div className="App">
          
          <div className=" text-white mb-4 text-xs">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>

          {currentPageData.map((task) => (
            <Task taskData={task} key={task._id} setCount={setCount} count = {count} />
          ))}

        </div>
        <div className="text-sm sm:text-lg text-white flex flex-row">
          <Button onClick={onOpen} colorScheme="pink">
            <AddIcon className="mr-2" /> Add Task
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior={"inside"}
            className="text-white bg-black"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea
                  placeholder="Enter Task"
                  value={inputText}
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
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="pink" onClick={onSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <RadioGroup onChange={setValue} value={value} className="ml-5">
      <Stack direction='row'>
        <Radio value='1' colorScheme='pink' size='lg'>All Tasks</Radio>
        <Radio value='2' colorScheme='pink' size='lg'>Completed</Radio>
        <Radio value='3' colorScheme='pink' size='lg'>Pending</Radio> 
        <Radio value='4' colorScheme='pink' size='lg'>Overdue</Radio> 
      </Stack>
    </RadioGroup>
        </div>
      </div>
    </>
  );
}
