import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 100,
    marginLeft: 16,
    marginBottom: -80,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: 600,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop:80,
  },
  headerTextContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  subTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 24,
    
  },
  content: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#0066FF',
    marginTop: 25,
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#000000',
    lineHeight: 22,
    marginLeft: 10,
    textAlign: 'justify',
  },
});

export default styles;