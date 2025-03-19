import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './Configuracoes.styles';
import { ConfiguracoesRouteProp, ConfiguracoesNavigationProp } from '../../src/navigation/navigationTypes';

const Configuracoes: React.FC = () => {
  const navigation = useNavigation<ConfiguracoesNavigationProp>();
  const route = useRoute<ConfiguracoesRouteProp>();

  // Recupera o tipo de usuário passado como parâmetro
  const tipoUsuario = route.params?.tipoUsuario;

  // Estado dos switches
  const [cameraEnabled, setCameraEnabled] = React.useState(false);
  const [flashEnabled, setFlashEnabled] = React.useState(false);
  const [backgroundEnabled, setBackgroundEnabled] = React.useState(false);

  // Função para voltar ao MenuPrincipal
  const handleVoltar = () => {
    navigation.navigate('MenuPrincipal', { tipoUsuario });
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
        <Image
          source={require('../../assets/vol.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Configurações</Text>

      {/* Texto de Permissões */}
      <Text style={styles.permissionsText}>Permitir acesso:</Text>

      {/* Opções de Configuração */}
      <View style={styles.settingsContainer}>
        {/* Câmera */}
        <View style={styles.settingWrapper}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Câmera</Text>
            <Switch
              value={cameraEnabled}
              onValueChange={setCameraEnabled}
              trackColor={{ false: '#767577', true: '#0066FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Flash */}
        <View style={styles.settingWrapper}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Flash</Text>
            <Switch
              value={flashEnabled}
              onValueChange={setFlashEnabled}
              trackColor={{ false: '#767577', true: '#0066FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Segundo Plano */}
        <View style={styles.settingWrapper}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Segundo plano</Text>
            <Switch
              value={backgroundEnabled}
              onValueChange={setBackgroundEnabled}
              trackColor={{ false: '#767577', true: '#0066FF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Configuracoes;