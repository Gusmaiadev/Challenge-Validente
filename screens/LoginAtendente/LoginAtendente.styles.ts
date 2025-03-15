import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    width: 210,
    height: 202,
    marginBottom: 20,
    resizeMode: 'contain', // Garante que a imagem não seja cortada
  },
  atendenteIcon: {
    width: 125,
    height: 121,
    marginBottom: 20,
    resizeMode: 'contain', // Garante que a imagem não seja cortada
  },
  title: {
    fontFamily: 'OpenSans-Bold', // Certifique-se de carregar a fonte Open Sans Bold
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: 341,
    height: 51,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    width: 130,
    height: 64,
    backgroundColor: '#FF6052',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default styles;