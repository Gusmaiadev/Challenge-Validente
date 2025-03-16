import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginTop:80,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 180,
  },
  settingsContainer: {
    marginTop: 40,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default styles;