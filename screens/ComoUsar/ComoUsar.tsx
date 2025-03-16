import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './ComoUsar.styles';
import { ComoUsarRouteProp, ComoUsarNavigationProp } from '../../src/navigation/navigationTypes';

const ComoUsar: React.FC = () => {
  const navigation = useNavigation<ComoUsarNavigationProp>();
  const route = useRoute<ComoUsarRouteProp>();

  // Recupera o tipo de usuário passado como parâmetro
  const tipoUsuario = route.params?.tipoUsuario;

  // Função para voltar ao MenuPrincipal
  const handleVoltar = () => {
    navigation.navigate('MenuPrincipal', { tipoUsuario });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/icone.png')} // Substitua pelo caminho correto do ícone
        style={styles.logo}
      />

      {/* Texto de Boas-vindas */}
      <Text style={styles.welcomeText}>
        Bem-vindo ao serviço de foto consulta da Odontoprev, aqui a consulta de seus clientes tem mais segurança!
      </Text>

      {/* Seção: Agendar Consulta */}
      <Text style={styles.sectionTitle}>Agendar Consulta</Text>
      <Text style={styles.sectionDescription}>
        Após logar como atendente, vá até 'Consulta' e selecione 'Agendar Consulta'.
      </Text>
      <Text style={styles.sectionDescription}>
        Digite o RG do paciente. Se estiver cadastrado, selecione o nome e agende a consulta. Caso contrário, cadastre
        um novo paciente clicando no ícone '+'.
      </Text>

      {/* Seção: Iniciar Atendimento */}
      <Text style={styles.sectionTitle}>Iniciar Atendimento</Text>
      <Text style={styles.sectionDescription}>
        No dia da consulta, vá em 'Consultas', selecione o paciente, e clique em 'Iniciar'.
      </Text>

      {/* Seção: Envio de Fotos */}
      <Text style={styles.sectionTitle}>Envio de Fotos</Text>
      <Text style={styles.sectionDescription}>
        O dentista deve enviar fotos antes e depois do procedimento via aplicativo, podendo tirar diretamente ou escolher
        da galeria.
      </Text>
      <Text style={styles.sectionDescription}>
        Após o envio das fotos, aguarde a validação para continuar ou finalizar a consulta.
      </Text>

      {/* Seção: Finalização */}
      <Text style={styles.sectionTitle}>Finalização</Text>
      <Text style={styles.sectionDescription}>
        Após a consulta, o dentista será notificado do sucesso do atendimento.
      </Text>

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.button} onPress={handleVoltar}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ComoUsar;