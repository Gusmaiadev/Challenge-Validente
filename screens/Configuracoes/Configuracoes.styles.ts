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
    marginTop: 30,
    marginBottom: 40,
  },
  permissionsText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginLeft: 16,
    marginBottom: 20,
  },
  settingsContainer: {
    paddingHorizontal: 0,
  },
  settingWrapper: {
    borderWidth: 1,
    borderColor: '#0066FF',
    borderRadius: 20,
    marginBottom: 16,
    padding: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#000000',
  },
});

export default styles;