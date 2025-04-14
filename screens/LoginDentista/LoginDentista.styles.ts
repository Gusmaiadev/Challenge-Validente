import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: 20,
    marginTop: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: height * 0.028,
    color: '#000000',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: height * 0.018,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: height * 0.06,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: height * 0.02,
    fontFamily: 'Montserrat-Regular',
    fontSize: height * 0.016,
  },
  passwordInput: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: height * 0.03,
  },
  forgotPasswordText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: height * 0.014,
    color: '#0066FF',
  },
  loginButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  loginButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: height * 0.018,
    color: '#FFFFFF',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  registerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: height * 0.014,
    color: '#000000',
    marginBottom: height * 0.01,
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#0066FF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  registerButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: height * 0.016,
    color: '#0066FF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalEmoji: {
    fontSize: 40,
    marginBottom: 15,
  },
  modalTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FF3B30',
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default styles;