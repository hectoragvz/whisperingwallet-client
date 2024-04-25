import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

function AddTaskBtn() {
  return (
    <div>
      <Button leftIcon={<IoMdAdd />} colorScheme="messenger" variant="solid">
        <Link to={"/add-expense"}>Add</Link>
      </Button>
    </div>
  );
}

export default AddTaskBtn;
