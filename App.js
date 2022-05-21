import react, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from 'react-native-web';
import Task from './component/task';

export default function App() {

  const [text, setText] = useState('')
  const [tackItem, setTaskItem] = useState([])
  console.log('tackItem',tackItem, text);
  const handelAddTasks = () => {
    // if(text !== ""){
      Keyboard.dismiss()
      setTaskItem([...tackItem, text])
      setText('')
    // }

  }

  const taskCompleted = (index) => {
    let copyItem = [...tackItem];
    console.log(index);
    copyItem.splice(index, 1)
    setTaskItem(copyItem)
  }

  return (
    <View style={styles.container}>

      {/* today tasks */}

      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView style={styles.scrollView}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sessionTittle}> Today's Tasks</Text>

        <View style={styles.items}>
          {/* this is where the task will go */}
          {
            tackItem.map((item, index) => {
              return (
                // <TouchableOpacity key={index} onPress={()=> taskCompleted(index)}>
                  <Task 
                  key={index} 
                  text={item}
                  num={index}
                  taskCompleted={taskCompleted}
                  />
                // </TouchableOpacity>
              )
            })
          }
        </View>

      </View>
      </ScrollView>
      {/* </SafeAreaView> */}

      {/*write a task*/}
      <KeyboardAvoidingView
      behavior={Platform.os === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a Task'} value={text} onChangeText={text => setText(text)}/>
        <TouchableOpacity onPress = {() => handelAddTasks()}>
          <View style={styles.addWrapper}>
            <Text style={styles.AddText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sessionTittle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    height: 570,
    wiedth: '100%',
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  AddText: {
    position: 'relative',
    top: -8,
    fontSize: 65,
    color: '#C0C0C0',
  },
});
