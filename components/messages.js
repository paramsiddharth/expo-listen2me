import {
  StyleSheet,
  Text
} from 'react-native';
import Loading from 'react-native-animated-ellipsis';

const Messages = ({ msgs }) => {
  return msgs.map(c => (
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
  ));
};

const styles = StyleSheet.create({
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
  }
});

export default Messages;
