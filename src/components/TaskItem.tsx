import React, { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Feather';

import { Task } from "./TasksList"

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TaskItemProps {
    item: Task
    index: number
    toggleTaskDone: (id: number) => void
    removeTask: (id: number) => void
    editTask: (taskId: number, taskNewTitle: string) => void
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [taskEdited, setTaskEdited] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setTaskEdited(item.title)
        setIsEditing(false)
    }
    
    function handleSubmitEditing() {
        editTask(item.id, taskEdited)
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])
    
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                <View
                    style={item.done ? styles.taskMarkerDone : styles.taskMarker }
                >
                    { item.done && (
                    <Icon
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                    )}
                </View>
                <TextInput 
                    ref={textInputRef}
                    style={ item.done ? styles.taskTextDone : styles.taskText}
                    value={taskEdited}
                    editable={isEditing}
                    onChangeText={setTaskEdited}
                    onSubmitEditing={handleSubmitEditing}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>

                )}

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1,
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        height: 24,
        width: 1,
        borderRadius: 0,
        marginHorizontal: 12,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    }
  })