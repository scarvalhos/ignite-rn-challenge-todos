import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);   

  function handleAddTask(newTaskTitle: string) {
    const existingTask = tasks.find(task => task.title === newTaskTitle)

    if(existingTask) {
      return (
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        )
      )
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks]

    const item = updatedTasks.find(task => task.id === id)

    if(!item) {
      return
    }

    item.done = !item.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ))
          },
          style: "default",
        },
        {
          text: "Não",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = [...tasks]

    const item = updatedTasks.find(task => task.id === taskId)

    if(!item) {
      return
    }

    item.title = taskNewTitle
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})