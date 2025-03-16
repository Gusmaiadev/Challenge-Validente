import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'flex-start', // Altere de 'center' para 'flex-start'
    paddingTop: 200, // Adicione um espaçamento no topo
  },
  textOdonto: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconPerson: {
    width: 51,
    height: 52,
    position: 'absolute',
    top: 90, // Ajuste para mover o ícone mais para baixo
    right: 30,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50, // Aumente o valor para mover os botões mais para baixo
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