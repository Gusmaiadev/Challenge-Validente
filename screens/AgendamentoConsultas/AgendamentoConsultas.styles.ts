import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  backButton: {
    position: 'absolute',
    top: 90,
    left: 20,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 130,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#000000',
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    padding: 12,
    borderRadius: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  dropdownText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#000000',
  },
  optionsList: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    marginTop: 2,
    marginBottom:10,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#FFF',
  },
  submitButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  alertContainer: {
    backgroundColor: '#0066FF',
    padding: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    top:20,
  },
  alertText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default styles;