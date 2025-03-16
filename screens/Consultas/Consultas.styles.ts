import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 16,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  addButton: {
    position: 'absolute',
    top: 70,
    right: 16,
  },
  addIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 180,
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
  appointmentItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginTop:60,
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  appointmentText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  emptyListText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default styles;