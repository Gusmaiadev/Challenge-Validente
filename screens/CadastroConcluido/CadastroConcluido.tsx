import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './CadastroConcluido.styles';
import { CadastroConcluidoRouteProp } from '../../src/navigation/navigationTypes';

const CadastroConcluido: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<CadastroConcluidoRouteProp>();

  // Recuperar o tipo de usuário passado como parâmetro
  const tipoUsuario = route.params?.tipoUsuario || 'desconhecido';

  // Função para redirecionar para a tela de login correspondente
  const handleVoltarLogin = () => {
    switch (tipoUsuario) {
      case 'dentista':
        navigation.navigate('LoginDentista' as never);
        break;
      case 'atendente':
        navigation.navigate('LoginAtendente' as never);
        break;
      default:
        navigation.navigate('MenuLogin' as never);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem de Sucesso */}
      <Image
        source={require('../../assets/ok.png')} // Substitua pelo caminho correto do ícone
        style={styles.successImage}
      />

      {/* Mensagem de Sucesso */}
      <Text style={styles.successMessage}>Cadastro concluído com sucesso!</Text>

      {/* Botão para Voltar ao Login */}
      <TouchableOpacity style={styles.button} onPress={handleVoltarLogin}>
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroConcluido;