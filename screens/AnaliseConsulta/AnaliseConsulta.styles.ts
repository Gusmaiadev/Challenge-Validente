// screens/AnaliseConsulta/AnaliseConsulta.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  successModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContent: {
    backgroundColor: '#0066FF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '80%',
  },
  successEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  successTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  successButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  successButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#0066FF',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#2D3748',
    textAlign: 'center',
    marginVertical: 24,
    marginTop: 80
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  column: {
    flex: 1,
    marginTop: 10,
  },
  infoLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 5,
  },
  infoValue: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#2D3748',
  },
  photoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 16,
  },
  photoButton: {
    backgroundColor: '#4299E1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  photoStatus: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#48BB78',
    textAlign: 'center',
    marginTop: 8,
  },
  finalizeButton: {
    backgroundColor: '#48BB78',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
    marginBottom:80,
  
  },
  disabledButton: {
    backgroundColor: '#0066FF',
  },
  finalizeButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalOption: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#2D3748',
    fontFamily: 'Montserrat-SemiBold',
  },
  cancelButton: {
    padding: 18,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#E53E3E',
    fontFamily: 'Montserrat-Bold',
  },
});

export default styles;