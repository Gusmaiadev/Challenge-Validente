import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './MenuPrincipal.styles';

const MenuPrincipal: React.FC = () => {
  const navigation = useNavigation();
  const [tipoUsuario, setTipoUsuario] = useState<string>('desconhecido');
  const [iconSource, setIconSource] = useState(require('../../assets/icone.png')); // Ícone padrão

  useEffect(() => {
    // Recuperar o tipo de usuário do AsyncStorage
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
        setIconSource(require('../../assets/iconedentista.png'));
        break;
      case 'atendente':
        setIconSource(require('../../assets/iconeatendente.png'));
        break;
      default:
        setIconSource(require('../../assets/icone.png'));
    }
  };

  const handleSuportePress = () => {
    Linking.openURL('https://www.odontoprev.com.br/fale-conosco');
  };

  return (
    <View style={styles.container}>
      {/* Ícone do Usuário */}
      <Image source={iconSource} style={styles.iconPerson} />

      {/* Título */}
      <Text style={styles.textOdonto}>Trabalhe com segurança e qualidade</Text>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Consultas' as never)}>
          <Text style={styles.buttonText}>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HistoricoConsultas' as never)}>
          <Text style={styles.buttonText}>Histórico de Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Configuracoes' as never)}>
          <Text style={styles.buttonText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ComoUsar' as never)}>
          <Text style={styles.buttonText}>Como usar o App</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Suporte */}
      <TouchableOpacity style={styles.suporteButton} onPress={handleSuportePress}>
        <Text style={styles.buttonText}>Fale com a Odontoprev</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuPrincipal;