// LoginDentista.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 90,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: 160,
    marginBottom: 0,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 40,
  },
  form: {
    paddingHorizontal: 30,
  },
  inputLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  passwordInput: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#0066FF',
  },
  loginButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
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
    fontSize: 16,
    color: '#0066FF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;