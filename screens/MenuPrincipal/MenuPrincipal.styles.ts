import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOdonto: {
    fontFamily: 'OpenSans-Bold', // Certifique-se de carregar a fonte Open Sans Bold
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconPerson: {
    width: 51,
    height: 52,
    position: 'absolute',
    top: 20,
    right: 20,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: 177,
    height: 157,
    backgroundColor: '#FF6052',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  suporteButton: {
    width: 387,
    height: 137,
    backgroundColor: '#FF6052',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default styles;