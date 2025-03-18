// screens/ConsultaPaciente/ConsultaPaciente.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    padding: 24,
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 2,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 4,
  },
  value: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#0066FF',
    letterSpacing: 0.5,
  },
  loadingText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default styles;