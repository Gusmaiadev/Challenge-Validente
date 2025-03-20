import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { buscarConsultaPorID, excluirConsulta } from '../../api/endpoints';
import styles from './ConsultaPaciente.styles';
import { ConsultaPacienteNavigationProp, ConsultaPacienteRouteProp } from '../../src/navigation/navigationTypes';

type ConsultaData = {
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  procedureType: string;
};

const ConsultaPaciente: React.FC = () => {
  const navigation = useNavigation<ConsultaPacienteNavigationProp>();
  const route = useRoute<ConsultaPacienteRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [consulta, setConsulta] = useState<ConsultaData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { appointmentId, tipoUsuario } = route.params;

  useEffect(() => {
    const carregarConsulta = async () => {
      setIsLoading(true);
      try {
        const response = await buscarConsultaPorID(appointmentId);
        
        setConsulta({
          patientName: response.patient || 'Não informado',
          appointmentDate: response.dateAppointment 
            ? new Date(response.dateAppointment).toLocaleDateString('pt-BR')
            : 'Não informado',
          appointmentTime: response.timeAppointment || 'Não informado',
          procedureType: response.procedureType || 'Não informado',
        });

      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Falha ao carregar consulta');
      } finally {
        setIsLoading(false);
      }
    };

    carregarConsulta();
  }, [appointmentId]);

  const handleIniciarAnalise = () => {
    navigation.navigate('AnaliseConsulta', {
      appointmentId: appointmentId,
      tipoUsuario: tipoUsuario
    });
  };

  const handleExcluirConsulta = async () => {
    try {
      setIsLoading(true);
      await excluirConsulta(appointmentId);
      setShowSuccess(true);
      setTimeout(() => {
        navigation.navigate('Consultas');
      }, 1500);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao excluir consulta');
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Deseja excluir a consulta? 😟</Text>
            
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleExcluirConsulta}
              >
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Modal de Sucesso */}
      {showSuccess && (
        <View style={styles.modalOverlay}>
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Consulta excluída com sucesso! ✅</Text>
          </View>
        </View>
      )}

      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Image
          source={require('../../assets/vol.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Consulta Paciente</Text>

      {consulta ? (
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{consulta.patientName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Data:</Text>
              <Text style={styles.value}>{consulta.appointmentDate}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Horário:</Text>
              <Text style={styles.value}>{consulta.appointmentTime}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Motivo da Consulta:</Text>
              <Text style={styles.value}>{consulta.procedureType}</Text>
            </View>
          </View>

          {tipoUsuario === 'dentista' ? (
            <TouchableOpacity 
              onPress={handleIniciarAnalise}
              style={styles.primaryButton}
            >
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setShowDeleteModal(true)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.buttonText}>Alterar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando dados da consulta...</Text>
      )}
    </View>
  );
};

export default ConsultaPaciente;