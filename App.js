import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native';
import Loading from 'react-native-animated-ellipsis';

export default function App() {
  const [reRender, setReRender] = useState(false);
  const [msg, setMsg] = useState('');
  const [chats, setChats] = useState([
    {
      id: 0,
      by: 0,
      text: 'Hi!'
    },
    {
      id: 1,
      by: 1,
      text: 'Hi!'
    }
  ]);

  /**
   * @type {React.MutableRefObject<TextInput>}
   */
  // const input = useRef();

  const render = () => {
    setReRender(!reRender);
  };

  useEffect(() => {
    if (msg.length > 0) sendMessage();
  }, [reRender]);
  
  const addMessage = (message, author = 0) => {
    setChats([
      ...chats,
      {
        id: chats.length,
        by: author,
        text: message
      }
    ]);
  };

  /**
   * 
   * // @ param {NativeSyntheticEvent<TextInputSubmitEditingEventData>} e 
   */
  const sendMessage = () => {
    // addMessage(e.nativeEvent.text);
    addMessage(msg);
    setMsg('');

    if (chats[chats.length - 1].text !== '...')
      setTimeout(() => setChats(chats => {
        const id = chats.length;

        setTimeout(() => setChats(chats => {
          return chats.map(c => c.id !== id ? c : { ...c, text: 'Hmmm...' })
        }), 1500);

        return [
          ...chats,
          {
            id,
            by: 1,
            text: '...'
          }
        ];
      }), 500);
    // input.current.setNativeProps({ text: '' });
    // input.current.props.text;
    
    /* const id = chats.length;
    const newChat = {
      id,
      by: 1,
      text: '...'
    };

    alert(newChat); */

    /* setChats([
      ...chats,
      newChat
    ]);
    setTimeout(() => {
      setChats(chats.map(c => c.id !== id ? c : { ...c, text: 'Hmmm...' }));
    }, 1500); */
  };

  return (
    <View style={styles.container}>
      {
        chats.map(c => (
          <Text style={{
            ...styles.message,
            ...(c.by === 0 ? {
              borderBottomRightRadius: 0,
              alignSelf: 'flex-end'
            } : {
              borderBottomLeftRadius: 0,
              alignSelf: 'flex-start'
            })
          }} key={c.id}>
            {
              c.text !== '...'
              ? c.text
              : <Loading style={{
                  color: 'black',
                  fontSize: 50
                }} />
            }
          </Text>
        ))
      }
      <TextInput
        blurOnSubmit={false}
        value={msg}
        onChangeText={t => setMsg(t)}
        style={styles.input}
        onSubmitEditing={render} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  message: {
    fontSize: 40,
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'lightblue',
    margin: 5,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },
  input: {
    display: 'flex',
    alignSelf: 'stretch',
    marginTop: 35,
    borderColor: '#666',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 20,
    fontSize: 20,
    borderRadius: 23
  }
});
