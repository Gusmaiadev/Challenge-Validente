import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop:40,
  },
  addIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    tintColor: '#0066FF',
    marginTop:40,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 90,
  
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 16,
    marginLeft: 8,
    marginTop:80,
  },
  appointmentItem: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  appointmentText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  verButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -12,
  },
  verButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop:16,
  },
  emptyListText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 24,
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  listContent: {
    paddingBottom: 80,
  },
});

export default styles;