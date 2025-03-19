import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    marginTop: 90,
    marginRight: 20,
    resizeMode: 'contain',
  },
  instructionText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginTop: 120,
    marginLeft: 20,
    marginBottom:-60,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#E2EEFF',
    borderRadius: 10,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  buttonIcon: {
    width: 60,
    height: 60,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  buttonLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
});


export default styles;