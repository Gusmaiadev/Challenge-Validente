import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  buscarConsultaPorID, 
  excluirConsulta, 
  alterarConsulta,
  buscarProcedimentos,
  buscarDentistas
} from '../../api/endpoints';
import styles from './ConsultaPaciente.styles';
import { ConsultaPacienteNavigationProp, ConsultaPacienteRouteProp } from '../../src/navigation/navigationTypes';

type ConsultaData = {
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  procedureType: string;
  dateAppointment: string;
  timeAppointment: string;
  procedureTypeId: number;
  dentistId: number;
};

const ConsultaPaciente: React.FC = () => {
  const navigation = useNavigation<ConsultaPacienteNavigationProp>();
  const route = useRoute<ConsultaPacienteRouteProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [consulta, setConsulta] = useState<ConsultaData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [procedimentos, setProcedimentos] = useState<{ id: number; name: string }[]>([]);
  const [dentistas, setDentistas] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    procedureTypeId: 0,
    dentistId: 0,
    dateAppointment: '',
    timeAppointment: ''
  });
  const [showProcedimentoOptions, setShowProcedimentoOptions] = useState(false);
  const [showDentistaOptions, setShowDentistaOptions] = useState(false);

  const { appointmentId, tipoUsuario } = route.params;

  useEffect(() => {
    const carregarDados = async () => {
      setIsLoading(true);
      try {
        const [consultaRes, procedimentosRes, dentistasRes] = await Promise.all([
          buscarConsultaPorID(appointmentId),
          buscarProcedimentos(),
          buscarDentistas()
        ]);

        const dataBR = new Date(consultaRes.dateAppointment).toLocaleDateString('pt-BR');
        
        setConsulta({
          patientName: consultaRes.patient || 'Não informado',
          appointmentDate: dataBR,
          appointmentTime: consultaRes.timeAppointment || 'Não informado',
          procedureType: consultaRes.procedureType || 'Não informado',
          dateAppointment: dataBR,
          timeAppointment: consultaRes.timeAppointment,
          procedureTypeId: consultaRes.procedureTypeId,
          dentistId: consultaRes.dentistId
        });

        setProcedimentos(procedimentosRes.map((p: any) => ({ id: p.id, name: p.name })));
        setDentistas(dentistasRes.map((d: any) => ({ id: d.id, name: d.name })));

        setFormData({
          procedureTypeId: consultaRes.procedureTypeId,
          dentistId: consultaRes.dentistId,
          dateAppointment: dataBR,
          timeAppointment: consultaRes.timeAppointment
        });

      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Falha ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    carregarDados();
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

  const handleAlterarConsulta = async () => {
    try {
      setIsLoading(true);
      
      const [dia, mes, ano] = formData.dateAppointment.split('/');
      const dataISO = `${ano}-${mes}-${dia}`;

      const payload = {
        procedureTypeId: formData.procedureTypeId,
        dentistId: formData.dentistId,
        dateAppointment: dataISO,
        timeAppointment: formData.timeAppointment
      };

      await alterarConsulta(appointmentId, payload);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigation.navigate('Consultas');
      }, 1500);
      
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao atualizar consulta');
    } finally {
      setIsLoading(false);
      setShowEditModal(false);
    }
  };

  const validarFormatoDataHora = () => {
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const horaRegex = /^\d{2}:\d{2}$/;
    
    if (!dataRegex.test(formData.dateAppointment)) {
      Alert.alert('Formato inválido', 'Use o formato DD/MM/AAAA');
      return false;
    }
    
    if (!horaRegex.test(formData.timeAppointment)) {
      Alert.alert('Formato inválido', 'Use o formato HH:MM');
      return false;
    }
    
    return true;
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}

      {/* Modal de Exclusão - Estilos Específicos */}
      {showDeleteModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalDeleteContainer}>
            <Text style={styles.modalTitle}>Deseja excluir a consulta? 😟</Text>
            <View style={styles.modalDeleteButtonGroup}>
              <TouchableOpacity 
                style={styles.modalDeleteButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalDeleteButton}
                onPress={handleExcluirConsulta}
              >
                <Text style={styles.modalButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Modal de Edição - Estilos Intactos */}
      {showEditModal && (
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalContainerScroll}
            contentContainerStyle={styles.modalContainerContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.modalTitle}>Alterar Consulta</Text>

            <Text style={styles.label}>Procedimento:</Text>
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => setShowProcedimentoOptions(!showProcedimentoOptions)}
            >
              <Text>
                {procedimentos.find(p => p.id === formData.procedureTypeId)?.name || 'Selecione'}
              </Text>
            </TouchableOpacity>
            
            {showProcedimentoOptions && (
              <View style={styles.optionsList}>
                {procedimentos.map((procedimento) => (
                  <TouchableOpacity
                    key={procedimento.id}
                    style={styles.optionItem}
                    onPress={() => {
                      setFormData({...formData, procedureTypeId: procedimento.id});
                      setShowProcedimentoOptions(false);
                    }}
                  >
                    <Text style={styles.optionText}>{procedimento.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Dentista:</Text>
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => setShowDentistaOptions(!showDentistaOptions)}
            >
              <Text>
                {dentistas.find(d => d.id === formData.dentistId)?.name || 'Selecione'}
              </Text>
            </TouchableOpacity>
            
            {showDentistaOptions && (
              <View style={styles.optionsList}>
                {dentistas.map((dentista) => (
                  <TouchableOpacity
                    key={dentista.id}
                    style={styles.optionItem}
                    onPress={() => {
                      setFormData({...formData, dentistId: dentista.id});
                      setShowDentistaOptions(false);
                    }}
                  >
                    <Text style={styles.optionText}>{dentista.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Data (DD/MM/AAAA):</Text>
            <TextInput
              style={styles.modalInput}
              value={formData.dateAppointment}
              onChangeText={text => {
                const formatted = text
                  .replace(/\D/g, '')
                  .replace(/(\d{2})(\d)/, '$1/$2')
                  .replace(/(\d{2})(\d)/, '$1/$2')
                  .slice(0, 10);
                setFormData({...formData, dateAppointment: formatted});
              }}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              maxLength={10}
            />

            <Text style={styles.label}>Horário (HH:MM):</Text>
            <TextInput
              style={styles.modalInput}
              value={formData.timeAppointment}
              onChangeText={text => setFormData({...formData, timeAppointment: text})}
              placeholder="14:30"
            />

            <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={[styles.modalButton, { marginTop: 20 }]}
                onPress={() => validarFormatoDataHora() && handleAlterarConsulta()}
              >
                <Text style={styles.modalButtonText}>Alterar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: '#FF6052', marginTop: 10}]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Modal de Sucesso */}
      {showSuccess && (
        <View style={styles.modalOverlay}>
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Ação realizada com sucesso! 😊</Text>
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
              <Text style={styles.label}>Motivo:</Text>
              <Text style={styles.value}>{consulta.procedureType}</Text>
            </View>
          </View>

          {tipoUsuario === 'dentista' ? (
            <TouchableOpacity 
              onPress={handleIniciarAnalise}
              style={styles.primaryButton}
            >
              <Text style={styles.buttonText}>Iniciar Análise</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setShowDeleteModal(true)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setShowEditModal(true)}
              >
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