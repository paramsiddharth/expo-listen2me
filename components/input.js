import { StyleSheet, TextInput } from 'react-native';

const Input = ({
  value,
  onChange,
  onSubmit
}) => {
  return <TextInput
    blurOnSubmit={false}
    value={value}
    onChangeText={onChange}
    style={styles.input}
    onSubmitEditing={onSubmit}
  />;
};

const styles = StyleSheet.create({
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

export default Input;
