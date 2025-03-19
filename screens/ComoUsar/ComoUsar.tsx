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

  const tipoUsuario = route.params?.tipoUsuario;

  const handleVoltar = () => {
    navigation.navigate('MenuPrincipal', { tipoUsuario });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botão Voltar com ícone */}
      <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
        <Image 
          source={require('../../assets/vol.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require('../../assets/odontoprev-logo.png')}
        style={styles.logo}
      />

      {/* Textos principais */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.mainTitle}>Bem-vindo ao Serviço de Foto Consulta da Odontoprev!</Text>
        <Text style={styles.subTitle}>
          Aqui, a consulta dos seus clientes ganha mais segurança e praticidade!
        </Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        {/* Seção 1 */}
        <Text style={styles.sectionTitle}>1. Agendar Consulta</Text>
        <Text style={styles.sectionText}>
          • Faça login como atendente.{"\n"}
          • Acesse a opção "Consulta" e clique em "Agendar Consulta".{"\n"}
          • Insira o RG do paciente. Se já cadastrado, selecione o nome.{"\n"}
          • Caso novo paciente, clique no ícone "+" para cadastrar.
        </Text>

        {/* Seção 2 */}
        <Text style={styles.sectionTitle}>2. Iniciar Atendimento</Text>
        <Text style={styles.sectionText}>
          • No dia da consulta, acesse "Consultas".{"\n"}
          • Selecione o paciente e clique em "Iniciar".
        </Text>

        {/* Seção 3 */}
        <Text style={styles.sectionTitle}>3. Envio de Fotos</Text>
        <Text style={styles.sectionText}>
          • Envie fotos antes/depois do procedimento.{"\n"}
          • Fotos podem ser tiradas ou selecionadas da galeria.{"\n"}
          • Aguarde validação das imagens para continuar.
        </Text>

        {/* Seção 4 */}
        <Text style={styles.sectionTitle}>4. Finalização</Text>
        <Text style={styles.sectionText}>
          • Dentista será notificado sobre o sucesso do atendimento.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ComoUsar;