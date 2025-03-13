import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center', // Centraliza os textos horizontalmente
    marginBottom: 30, // Espaçamento abaixo dos textos
  },
  title: {
    fontFamily: 'OpenSans-Regular', // Certifique-se de carregar a fonte Open Sans
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  topText: {
    marginBottom: 5, // Espaçamento entre o primeiro e o segundo texto
  },
  bottomText: {
    fontWeight: 'bold', // Destaca "Atuo como:" com negrito
  },
  roleText: {
    fontFamily: 'OpenSans-Bold', // Certifique-se de carregar a fonte Open Sans Bold
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 50,
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default styles;