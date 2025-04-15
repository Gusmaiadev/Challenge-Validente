import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logoContainer: {
    alignSelf: 'flex-end',
    marginTop: 80,
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  instructionText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginTop: 100,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#E2EEFF',
    borderRadius: 10,
    width: '48%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  fullWidthContainer: {
    width: '100%',
  },
  fullWidthButton: {
    backgroundColor: '#E2EEFF',
    borderRadius: 10,
    width: '100%',
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
  logoutButton: {
    position: 'absolute',
    top: 170,
    right: 45,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  logoutText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default styles;