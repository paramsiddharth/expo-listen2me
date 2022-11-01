import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Input from './components/input';
import Messages from './components/messages';

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


  const sendMessage = () => {
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
  };

  return (
    <View style={styles.container}>
      <Messages msgs={chats} />
      <Input value={msg} onChange={setMsg} onSubmit={render} />
      <StatusBar style='auto' />
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
  }
});
