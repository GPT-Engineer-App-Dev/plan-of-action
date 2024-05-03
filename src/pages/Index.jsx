import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%">
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            flexGrow={1}
            mr={2}
          />
          <Button colorScheme="blue" px={8} onClick={addTask}>Add</Button>
        </Flex>
        <List width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
              <Flex>
                <IconButton icon={<FaCheck />} onClick={() => toggleTaskCompletion(task.id)} colorScheme="green" aria-label="Complete Task" mr={2} />
                <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" aria-label="Delete Task" />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;