import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  buscarPacientePorRG, 
  criarPaciente, 
  agendarConsulta, 
  buscarProcedimentos, 
  buscarDentistas 
} from '../../api/endpoints';
import styles from './AgendamentoConsultas.styles';

const AgendamentoConsultas: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [rgPaciente, setRgPaciente] = useState('');
  const [paciente, setPaciente] = useState<any>(null);
  const [procedimentos, setProcedimentos] = useState<{ id: number; name: string }[]>([]);
  const [dentistas, setDentistas] = useState<{ id: number; name: string }[]>([]);
  const [nomePaciente, setNomePaciente] = useState('');
  const [rgPacienteDados, setRgPacienteDados] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idOdontoPrev, setIdOdontoPrev] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState<number | null>(null);
  const [dentistaSelecionado, setDentistaSelecionado] = useState<number | null>(null);
  const [showProcedimentoOptions, setShowProcedimentoOptions] = useState(false);
  const [showDentistaOptions, setShowDentistaOptions] = useState(false);
  const [clinicId, setClinicId] = useState<number>(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      await carregarDadosIniciais();
      const storedClinicId = await AsyncStorage.getItem('clinicId');
      if (storedClinicId) setClinicId(parseInt(storedClinicId, 10));
    };
    carregarDados();
  }, []);

  const carregarDadosIniciais = async () => {
    setIsLoading(true);
    try {
      const [procedimentosRes, dentistasRes] = await Promise.all([
        buscarProcedimentos(),
        buscarDentistas()
      ]);
      
      setProcedimentos(procedimentosRes.map((p: any) => ({ id: p.id, name: p.name })));
      setDentistas(dentistasRes.map((d: any) => ({ id: d.id, name: d.name })));
    } catch (error: any) {
      handleError('Carregar dados iniciais', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuscarPaciente = async () => {
    if (!rgPaciente.trim()) {
      Alert.alert('Atenção', 'Digite o RG do paciente');
      return;
    }

    setIsLoading(true);
    try {
      const pacienteRes = await buscarPacientePorRG(rgPaciente);
      setPaciente(pacienteRes);
      setNomePaciente(pacienteRes.name);
      setRgPacienteDados(pacienteRes.rg);
      setDataNascimento(formatarDataBrasileira(pacienteRes.birthDate));
      setIdOdontoPrev(pacienteRes.numCard.toString());
    } catch (error: any) {
      handleError('Buscar paciente', error);
      limparDadosPaciente();
    } finally {
      setIsLoading(false);
    }
  };

  const limparDadosPaciente = () => {
    setPaciente(null);
    setNomePaciente('');
    setRgPacienteDados('');
    setDataNascimento('');
    setIdOdontoPrev('');
  };

  const validarFormatoData = (data: string, formato: RegExp): boolean => {
    if (!formato.test(data)) {
      Alert.alert('Formato inválido', `Use o formato ${formato}`);
      return false;
    }
    return true;
  };

  const formatarDataBrasileira = (data: string) => {
    const [ano, mes, dia] = data.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const converterDataParaAPI = (data: string) => {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  };

  const validarCampos = (): boolean => {
    const validacoes = [
      { condicao: !rgPacienteDados.trim(), mensagem: 'Informe o RG do paciente' },
      { condicao: !nomePaciente.trim(), mensagem: 'Informe o nome do paciente' },
      { condicao: !dataNascimento.trim(), mensagem: 'Informe a data de nascimento' },
      { condicao: !idOdontoPrev.trim(), mensagem: 'Informe o ID Odontoprev' },
      { condicao: !dataConsulta.trim(), mensagem: 'Informe a data da consulta' },
      { condicao: !horarioConsulta.trim(), mensagem: 'Informe o horário da consulta' },
      { condicao: !procedimentoSelecionado, mensagem: 'Selecione um procedimento' },
      { condicao: !dentistaSelecionado, mensagem: 'Selecione um dentista' },
    ];

    for (const validacao of validacoes) {
      if (validacao.condicao) {
        Alert.alert('Erro', validacao.mensagem);
        return false;
      }
    }

    if (!validarFormatoData(dataConsulta, /^\d{2}\/\d{2}\/\d{4}$/)) return false;
    if (!validarFormatoData(horarioConsulta, /^\d{2}:\d{2}$/)) return false;

    return true;
  };

  const handleAgendarConsulta = async () => {
    if (!validarCampos()) return;

    setIsLoading(true);
    try {
      let patientId = paciente?.id;
      
      if (!patientId) {
        const novoPaciente = await criarPaciente({
          name: nomePaciente,
          rg: rgPacienteDados,
          birthDate: converterDataParaAPI(dataNascimento),
          numCard: parseInt(idOdontoPrev, 10)
        });
        patientId = novoPaciente.id;
      }

      const payload = {
        dateAppointment: converterDataParaAPI(dataConsulta),
        timeAppointment: horarioConsulta,
        dentistId: dentistaSelecionado!,
        patientId: patientId!,
        procedureTypeId: procedimentoSelecionado!,
        clinicId: clinicId,
        procedureValidationId: 1
      };

      await agendarConsulta(payload);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigation.goBack();
      }, 2000);
    } catch (error: any) {
      handleError('Agendar consulta', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (contexto: string, error: any) => {
    console.error(`Erro em ${contexto}:`, error);
    const mensagem = error.response?.data?.message || error.message || 'Erro desconhecido';
    Alert.alert('Erro', `${mensagem} (${contexto})`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0066FF" />
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/vol.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Agendamento</Text>
        <Text style={styles.subtitle}>Consulta</Text>
      </View>

      {/* Seção de Busca por RG */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RG do Paciente:</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, styles.searchInput]}
            placeholder="RG do paciente"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={rgPaciente}
            onChangeText={setRgPaciente}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleBuscarPaciente}>
            <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dados do Paciente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados do Paciente:</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu Nome Completo"
            placeholderTextColor="#666"
            value={nomePaciente}
            onChangeText={setNomePaciente}
            editable={!paciente}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>RG:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu RG"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={rgPacienteDados}
            onChangeText={setRgPacienteDados}
            editable={!paciente}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#666"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            editable={!paciente}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Odontoprev:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o ID"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={idOdontoPrev}
            onChangeText={setIdOdontoPrev}
            editable={!paciente}
          />
        </View>
      </View>

      {/* Dados da Consulta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados da Consulta:</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data Consulta:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#666"
            value={dataConsulta}
            onChangeText={setDataConsulta}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Horário da Consulta:</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#666"
            value={horarioConsulta}
            onChangeText={setHorarioConsulta}
          />
        </View>

        {/* Seleção de Procedimento */}
        <Text style={styles.label}>Procedimento:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowProcedimentoOptions(!showProcedimentoOptions)}
        >
          <Text style={styles.dropdownText}>
            {procedimentoSelecionado 
              ? procedimentos.find(p => p.id === procedimentoSelecionado)?.name
              : 'Selecione o procedimento'}
          </Text>
        </TouchableOpacity>
        
        {showProcedimentoOptions && (
          <View style={styles.optionsList}>
            {procedimentos.map((procedimento) => (
              <TouchableOpacity
                key={procedimento.id}
                style={styles.optionItem}
                onPress={() => {
                  setProcedimentoSelecionado(procedimento.id);
                  setShowProcedimentoOptions(false);
                }}
              >
                <Text style={styles.optionText}>{procedimento.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Seleção de Dentista */}
        <Text style={styles.label}>Dentista:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDentistaOptions(!showDentistaOptions)}
        >
          
          <Text style={styles.dropdownText}>
            {dentistaSelecionado 
              ? dentistas.find(d => d.id === dentistaSelecionado)?.name
              : 'Selecione o dentista'}
          </Text>
        </TouchableOpacity>
        
        {showDentistaOptions && (
          <View style={styles.optionsList}>
            {dentistas.map((dentista) => (
              <TouchableOpacity
                key={dentista.id}
                style={styles.optionItem}
                onPress={() => {
                  setDentistaSelecionado(dentista.id);
                  setShowDentistaOptions(false);
                }}
              >
                <Text style={styles.optionText}>{dentista.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleAgendarConsulta}>
        <Text style={styles.submitButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>

     {/* Alert Centralizado */}
     {showSuccessAlert && (
      <View style={styles.modalOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Consulta Agendada com Sucesso! 😊</Text>
        </View>
      </View>
    )}
    </ScrollView>
  );
};

export default AgendamentoConsultas;