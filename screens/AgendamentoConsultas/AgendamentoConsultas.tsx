import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { buscarPacientePorRG, criarPaciente, agendarConsulta, buscarProcedimentos, buscarDentistas } from '../../api/endpoints';
import styles from './AgendamentoConsultas.styles';

const AgendamentoConsultas: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [rgPaciente, setRgPaciente] = useState('');
  const [paciente, setPaciente] = useState<any>(null);
  const [procedimentos, setProcedimentos] = useState<any[]>([]);
  const [dentistas, setDentistas] = useState<any[]>([]);
  const [dataConsulta, setDataConsulta] = useState<Date | null>(null);
  const [horarioConsulta, setHorarioConsulta] = useState<Date | null>(null);
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState<number>(0);
  const [dentistaSelecionado, setDentistaSelecionado] = useState<number>(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Carregar procedimentos e dentistas ao iniciar
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    setIsLoading(true);
    try {
      const procedimentosResponse = await buscarProcedimentos();
      setProcedimentos(procedimentosResponse);

      const dentistasResponse = await buscarDentistas();
      setDentistas(dentistasResponse);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuscarPaciente = async (rg: string) => {
    if (!rg.trim()) {
      Alert.alert('Atenção', 'Digite o RG do paciente.');
      return;
    }

    setIsLoading(true);
    try {
      const pacienteResponse = await buscarPacientePorRG(rg);
      setPaciente(pacienteResponse);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Paciente não encontrado');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCriarPaciente = async (dadosPaciente: any) => {
    setIsLoading(true);
    try {
      const pacienteResponse = await criarPaciente(dadosPaciente);
      setPaciente(pacienteResponse);
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao cadastrar paciente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgendarConsulta = async () => {
    if (!validarCampos()) return;

    setIsLoading(true);
    try {
      const dadosConsulta = {
        dateAppointment: dataConsulta?.toISOString().split('T')[0],
        timeAppointment: horarioConsulta?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dentistId: dentistas[dentistaSelecionado].id,
        patientId: paciente?.id,
        procedureTypeId: procedimentos[procedimentoSelecionado].id,
      };
      await agendarConsulta(dadosConsulta);
      Alert.alert('Sucesso', 'Consulta agendada com sucesso');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao agendar consulta');
    } finally {
      setIsLoading(false);
    }
  };

  const validarCampos = (): boolean => {
    if (!paciente) {
      Alert.alert('Erro', 'Paciente não informado');
      return false;
    }
    if (!dataConsulta) {
      Alert.alert('Erro', 'Data da consulta não informada');
      return false;
    }
    if (!horarioConsulta) {
      Alert.alert('Erro', 'Horário da consulta não informado');
      return false;
    }
    if (procedimentoSelecionado === 0) {
      Alert.alert('Erro', 'Selecione um procedimento');
      return false;
    }
    if (dentistaSelecionado === 0) {
      Alert.alert('Erro', 'Selecione um dentista');
      return false;
    }
    return true;
  };

  return (
    <ScrollView style={styles.container}>
      {/* ProgressBar */}
      {isLoading && (
        <View style={styles.progressBar}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Agendamento de Consulta</Text>

      {/* Campo de Busca de Paciente */}
      <TextInput
        style={styles.input}
        placeholder="RG do Paciente"
        keyboardType="numeric"
        value={rgPaciente}
        onChangeText={setRgPaciente}
        onSubmitEditing={() => handleBuscarPaciente(rgPaciente)}
      />

      {/* Dados do Paciente */}
      {paciente ? (
        <View style={styles.patientInfo}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{paciente.name}</Text>
          <Text style={styles.label}>RG:</Text>
          <Text style={styles.value}>{paciente.rg}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => handleCriarPaciente({})} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar Novo Paciente</Text>
        </TouchableOpacity>
      )}

      {/* Seletor de Data */}
      <Text style={styles.label}>Data da Consulta:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{dataConsulta ? dataConsulta.toLocaleDateString() : 'Selecione a data'}</Text>
      </TouchableOpacity>

      {/* Seletor de Horário */}
      <Text style={styles.label}>Horário da Consulta:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text>{horarioConsulta ? horarioConsulta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Selecione o horário'}</Text>
      </TouchableOpacity>

      {/* Procedimento */}
      <Text style={styles.label}>Procedimento:</Text>
      <View style={styles.pickerContainer}>
        {procedimentos.map((procedimento, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pickerItem,
              procedimentoSelecionado === procedimento.id && styles.pickerItemSelected,
            ]}
            onPress={() => setProcedimentoSelecionado(index)}
          >
            <Text>{procedimento.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dentista */}
      <Text style={styles.label}>Dentista:</Text>
      <View style={styles.pickerContainer}>
        {dentistas.map((dentista, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pickerItem,
              dentistaSelecionado === dentista.id && styles.pickerItemSelected,
            ]}
            onPress={() => setDentistaSelecionado(index)}
          >
            <Text>{dentista.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão Agendar */}
      <TouchableOpacity onPress={handleAgendarConsulta} style={styles.button}>
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>

      {/* Renderização condicional do DatePicker */}
      <DatePicker
        modal
        open={showDatePicker}
        date={dataConsulta || new Date()}
        mode="date"
        onConfirm={(date) => {
          setShowDatePicker(false);
          setDataConsulta(date);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      <DatePicker
        modal
        open={showTimePicker}
        date={horarioConsulta || new Date()}
        mode="time"
        onConfirm={(time) => {
          setShowTimePicker(false);
          setHorarioConsulta(time);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
    </ScrollView>
  );
};

export default AgendamentoConsultas;