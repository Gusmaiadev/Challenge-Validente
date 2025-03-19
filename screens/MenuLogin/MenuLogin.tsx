// MenuLogin.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './MenuLogin.styles';

const MenuLogin: React.FC = () => {
  const navigation = useNavigation();

  const handleAtendentePress = () => {
    navigation.navigate('LoginAtendente' as never);
  };

  const handleDentistaPress = () => {
    navigation.navigate('LoginDentista' as never);
  };

  return (
    <View style={styles.container}>
      {/* Ícone Odontoprev (ajuste o caminho) */}
      <Image
        source={require('../../assets/odontoprev-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Texto de instrução */}
      <Text style={styles.instructionText}>Para começar, escolha o seu papel:</Text>

      {/* Container dos botões */}
      <View style={styles.buttonsContainer}>
        {/* Botão Dentista */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleDentistaPress}
          >
            <Image
              source={require('../../assets/iconedentista.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Dentista</Text>
        </View>

        {/* Botão Atendente */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAtendentePress}
          >
            <Image
              source={require('../../assets/iconeatendente.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Atendente</Text>
        </View>
      </View>
    </View>
  );
};

export default MenuLogin;