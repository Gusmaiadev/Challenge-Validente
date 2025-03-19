// MenuLogin.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 400,
    height: 250,
    marginTop: -50,
  },
  instructionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: '#0066FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },
  buttonIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#0066FF',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default styles;