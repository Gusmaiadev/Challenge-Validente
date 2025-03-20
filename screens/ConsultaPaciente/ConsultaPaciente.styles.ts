import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // CONTAINER PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },

  // LOADING
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },

  // BOTÃO VOLTAR
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

  // TÍTULO
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginTop: 170,
    marginBottom: 32,
  },

  // CONTEÚDO PRINCIPAL
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

  // BOTÕES PRINCIPAIS
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

  // TEXTO DE CARREGAMENTO
  loadingText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 40,
  },

  // ESTILOS COMUNS AOS MODAIS
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },

  // MODAL DE EXCLUSÃO (ESTILOS ESPECÍFICOS)
  modalDeleteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
    padding: 20,
    alignItems: 'center',
  },
  modalDeleteButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalDeleteButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },

  // MODAL DE EDIÇÃO (ESTILOS ESPECÍFICOS)
  modalContainerScroll: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    maxHeight: '70%',
    elevation: 5,
  },
  modalContainerContent: {
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },

  // LISTAS DE OPÇÕES
  optionsList: {
    maxHeight: 150,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },

  // MODAL DE SUCESSO
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