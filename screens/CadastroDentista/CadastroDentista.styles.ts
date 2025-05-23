import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 60,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#000000',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0066FF',
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  pickerContainer: {
    width: '80%',
    height: 55, // Aumente a altura
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0066FF',
    marginBottom: 20,
    justifyContent: 'center',
    overflow: 'hidden', // Adicione para conter o Picker
  },
  picker: {
    width: '100%',
    height: '100%',
    fontFamily: 'Montserrat_400Regular',
    paddingVertical: -10, // Ajuste o padding
  },
  pickerItem: {
    fontSize: 16,
    height: 50, // Altura do item
  },
  placeholderItem: {
    fontSize: 16,
    color: '#343232', // Cor igual aos placeholders
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0066FF',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#0066FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default styles;