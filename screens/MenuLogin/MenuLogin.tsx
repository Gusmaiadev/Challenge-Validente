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
      {/* Ícone superior */}
      <Image
      source={require('../../assets/icone.png')} 
      style={{ width: 187, height: 148, marginBottom: 20 }}
      resizeMode="contain" // Garante que a imagem não seja cortada
    />

      {/* Título principal */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, styles.topText]}>
          Olá, escolha uma das opções abaixo.
        </Text>
        <Text style={[styles.title, styles.bottomText]}>
          Atuo como:
        </Text>
      </View>

      {/* Container dos botões */}
      <View style={styles.iconContainer}>
        {/* Botão Atendente */}
        <TouchableOpacity onPress={handleAtendentePress}>
          <Image
            source={require('../../assets/iconeatendente.png')} 
            style={styles.icon}
          />
          <Text style={styles.roleText}>Atendente</Text>
        </TouchableOpacity>

        {/* Botão Dentista */}
        <TouchableOpacity onPress={handleDentistaPress}>
          <Image
            source={require('../../assets/iconedentista.png')} 
            style={styles.icon}
          />
          <Text style={styles.roleText}>Dentista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuLogin;