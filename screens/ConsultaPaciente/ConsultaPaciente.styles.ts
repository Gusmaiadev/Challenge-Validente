import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 24,
    zIndex: 2,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginTop: 170,
    marginBottom: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
  },
  infoItem: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#0066FF',
    marginBottom: 8,
  },
  value: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#000000',
  },
  primaryButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  secondaryButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  loadingText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 40,
  },
  // Novos estilos para os modais
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  successContainer: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    padding: 50,
    width: '80%',
    alignItems: 'center',
  },
  successText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default styles;