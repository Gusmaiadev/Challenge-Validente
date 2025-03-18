// screens/AnaliseConsulta/AnaliseConsulta.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  Linking
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchCamera, launchImageLibrary, type CameraOptions, type ImageLibraryOptions } from 'react-native-image-picker';
import { request, PERMISSIONS, type PermissionStatus } from 'react-native-permissions';
import { AnaliseConsultaNavigationProp, AnaliseConsultaRouteProp } from '../../src/navigation/navigationTypes';
import { buscarConsultaPorID } from '../../api/endpoints';
import styles from './AnaliseConsulta.styles';

type ConsultaData = {
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  procedureType: string;
};

const AnaliseConsulta: React.FC = () => {
  const navigation = useNavigation<AnaliseConsultaNavigationProp>();
  const route = useRoute<AnaliseConsultaRouteProp>();
  
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [consulta, setConsulta] = useState<ConsultaData | null>(null);
  const [fotoInicialUri, setFotoInicialUri] = useState<string | null>(null);
  const [fotoFinalUri, setFotoFinalUri] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentPhotoType, setCurrentPhotoType] = useState<'inicial' | 'final'>('inicial');
  const [fileName, setFileName] = useState<{ inicial: string | null; final: string | null }>({
    inicial: null,
    final: null,
  });

  const { appointmentId, tipoUsuario } = route.params;

  // Carrega dados da consulta
  useEffect(() => {
    const carregarConsulta = async () => {
      setIsLoading(true);
      try {
        const response = await buscarConsultaPorID(appointmentId);
        
        setConsulta({
          patientName: response.patient,
          appointmentDate: response.dateAppointment 
            ? new Date(response.dateAppointment).toLocaleDateString('pt-BR')
            : 'Não informado',
          appointmentTime: response.timeAppointment,
          procedureType: response.procedureType
        });

      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Falha ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    carregarConsulta();
  }, [appointmentId]);

  // Verifica permissões
  const verificarPermissao = async (permission: any): Promise<PermissionStatus> => {
    try {
      return await request(permission);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao verificar permissões');
      return 'unavailable';
    }
  };

  // Manipula seleção de imagem
  const handleImageSelection = async (source: 'camera' | 'gallery') => {
    try {
      let permission;
      if (source === 'camera') {
        permission = PERMISSIONS.ANDROID.CAMERA;
      } else {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      }

      const status = await verificarPermissao(permission);

      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Por favor, permita o acesso nas configurações',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Abrir Configurações', onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }

      const options: CameraOptions | ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      };

      const result = source === 'camera' 
        ? await launchCamera(options as CameraOptions)
        : await launchImageLibrary(options as ImageLibraryOptions);

      if (result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        const fileName = uri.split('/').pop() || 'foto.jpg';

        currentPhotoType === 'inicial'
          ? (setFotoInicialUri(uri), setFileName(prev => ({ ...prev, inicial: fileName })))
          : (setFotoFinalUri(uri), setFileName(prev => ({ ...prev, final: fileName })));
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao acessar a imagem');
    } finally {
      setShowImagePicker(false);
    }
  };

  // Finaliza consulta
  const handleFinalizar = () => {
    if (!fotoInicialUri || !fotoFinalUri) {
      Alert.alert('Atenção', 'É necessário enviar ambas as fotos');
      return;
    }
    setShowSuccessModal(true);
  };

  // Fecha modal e navega
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigation.navigate('MenuPrincipal', { tipoUsuario });
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}

      <Text style={styles.title}>Consulta Iniciada</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Nome:</Text>
        <Text style={styles.infoValue}>{consulta?.patientName || 'Carregando...'}</Text>

        <View style={styles.rowContainer}>
          <View style={styles.column}>
            <Text style={styles.infoLabel}>Data:</Text>
            <Text style={styles.infoValue}>{consulta?.appointmentDate}</Text>
          </View>
          
          <View style={styles.column}>
            <Text style={styles.infoLabel}>Horário:</Text>
            <Text style={styles.infoValue}>{consulta?.appointmentTime}</Text>
          </View>
        </View>

        <Text style={styles.infoLabel}>Motivo da Consulta:</Text>
        <Text style={styles.infoValue}>{consulta?.procedureType}</Text>
      </View>

      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>Foto Inicial</Text>
        <TouchableOpacity 
          style={styles.photoButton}
          onPress={() => {
            setCurrentPhotoType('inicial');
            setShowImagePicker(true);
          }}
        >
          <Text style={styles.buttonText}>Enviar ou tirar foto</Text>
        </TouchableOpacity>
        {fileName.inicial && (
          <Text style={styles.photoStatus}>Arquivo: {fileName.inicial}</Text>
        )}
      </View>

      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>Foto Final</Text>
        <TouchableOpacity 
          style={styles.photoButton}
          onPress={() => {
            setCurrentPhotoType('final');
            setShowImagePicker(true);
          }}
        >
          <Text style={styles.buttonText}>Enviar ou tirar foto</Text>
        </TouchableOpacity>
        {fileName.final && (
          <Text style={styles.photoStatus}>Arquivo: {fileName.final}</Text>
        )}
      </View>

      {/* Modal de Seleção de Imagem */}
      <Modal
        visible={showImagePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleImageSelection('camera')}
            >
              <Text style={styles.modalOptionText}>📷 Usar Câmera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleImageSelection('gallery')}
            >
              <Text style={styles.modalOptionText}>🖼️ Escolher da Galeria</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowImagePicker(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <Text style={styles.successEmoji}>😊</Text>
            <Text style={styles.successTitle}>Consulta Finalizada!</Text>
            <Text style={styles.successMessage}>O procedimento foi registrado com sucesso</Text>
            
            <TouchableOpacity
              style={styles.successButton}
              onPress={handleCloseSuccessModal}
            >
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.finalizeButton, (!fotoInicialUri || !fotoFinalUri) && styles.disabledButton]}
        onPress={handleFinalizar}
        disabled={!fotoInicialUri || !fotoFinalUri}
      >
        <Text style={styles.finalizeButtonText}>Finalizar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AnaliseConsulta;