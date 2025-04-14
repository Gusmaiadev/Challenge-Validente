import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './MenuPrincipal.styles';

const MenuPrincipal: React.FC = () => {
  const navigation = useNavigation();
  const [tipoUsuario, setTipoUsuario] = useState<string>('desconhecido');
  const [iconSource, setIconSource] = useState(require('../../assets/icone.png'));
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const fetchTipoUsuario = async () => {
      try {
        const tipo = await AsyncStorage.getItem('tipoUsuario');
        if (tipo) {
          setTipoUsuario(tipo);
          atualizarIcone(tipo);
        }
      } catch (error) {
        console.error('Erro ao recuperar tipo de usuário:', error);
      }
    };
    fetchTipoUsuario();
  }, []);

  const atualizarIcone = (tipo: string) => {
    switch (tipo) {
      case 'dentista':
        setIconSource(require('../../assets/iconedentista2.png'));
        break;
      case 'atendente':
        setIconSource(require('../../assets/iconeatendente2.png'));
        break;
      default:
        setIconSource(require('../../assets/icone.png'));
    }
  };

  const handleSuportePress = () => {
    Linking.openURL('https://www.odontoprev.com.br/fale-conosco');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('MenuLogin' as never);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícone do usuário com botão */}
      <TouchableOpacity 
        onPress={() => setShowLogout(!showLogout)}
        style={styles.logoContainer}
      >
        <Image source={iconSource} style={styles.logo} />
      </TouchableOpacity>

      {/* Botão de logout */}
      {showLogout && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.instructionText}>Olá, escolha uma das opções abaixo:</Text>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Consultas' as never)}
          >
            <Image source={require('../../assets/consultas.png')} style={styles.buttonIcon}/>
            <Text style={styles.buttonLabel}>Consultas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Configuracoes' as never)}
          >
            <Image source={require('../../assets/configuracoes.png')} style={styles.buttonIcon}/>
            <Text style={styles.buttonLabel}>Configurações</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('ComoUsar' as never)}
          >
            <Image source={require('../../assets/interrogacao.png')} style={styles.buttonIcon}/>
            <Text style={styles.buttonLabel}>Como usar o App</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={handleSuportePress}
          >
            <Image source={require('../../assets/chat.png')} style={styles.buttonIcon}/>
            <Text style={styles.buttonLabel}>Fale com a Odontoprev</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuPrincipal;