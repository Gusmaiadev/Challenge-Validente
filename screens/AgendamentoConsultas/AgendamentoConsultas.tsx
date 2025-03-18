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
import { useNavigation } from '@react-navigation/native';
import { buscarPacientePorRG, criarPaciente, agendarConsulta, buscarProcedimentos, buscarDentistas } from '../../api/endpoints';
import styles from './AgendamentoConsultas.styles';

const AgendamentoConsultas: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [rgPaciente, setRgPaciente] = useState('');
  const [paciente, setPaciente] = useState<any>(null);
  const [procedimentos, setProcedimentos] = useState<{ id: number; name: string }[]>([]);
  const [dentistas, setDentistas] = useState<{ id: number; name: string }[]>([]);
  const [nomePaciente, setNomePaciente] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idOdontoPrev, setIdOdontoPrev] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState<number | null>(null);
  const [dentistaSelecionado, setDentistaSelecionado] = useState<number | null>(null);
  const [showProcedimentoOptions, setShowProcedimentoOptions] = useState(false);
  const [showDentistaOptions, setShowDentistaOptions] = useState(false);

  // Carregar procedimentos e dentistas ao iniciar
  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    setIsLoading(true);
    try {
      console.log('Carregando procedimentos...');
      const procedimentosResponse = await buscarProcedimentos();
      console.log('Procedimentos carregados:', procedimentosResponse);
      setProcedimentos(procedimentosResponse.map((p: any) => ({ id: p.id, name: p.name })));

      console.log('Carregando dentistas...');
      const dentistasResponse = await buscarDentistas();
      console.log('Dentistas carregados:', dentistasResponse);
      setDentistas(dentistasResponse.map((d: any) => ({ id: d.id, name: d.name })));
    } catch (error: any) {
      console.error('Erro ao carregar dados iniciais:', error.message || error);
      Alert.alert('Erro', error.message || 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuscarPaciente = async () => {
    if (!rgPaciente.trim()) {
      Alert.alert('Atenção', 'Digite o RG do paciente.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Buscando paciente por RG:', rgPaciente);
      const pacienteResponse = await buscarPacientePorRG(rgPaciente);
      console.log('Paciente encontrado:', pacienteResponse);
      setPaciente(pacienteResponse);
      setNomePaciente(pacienteResponse.name);
      setDataNascimento(pacienteResponse.birthDate.split('T')[0]); // Formato: yyyy-MM-dd
      setIdOdontoPrev(pacienteResponse.numCard.toString());
    } catch (error: any) {
      console.error('Erro ao buscar paciente:', error.message || error);
      Alert.alert('Erro', error.message || 'Paciente não encontrado');
      limparDadosPaciente();
    } finally {
      setIsLoading(false);
    }
  };

  const limparDadosPaciente = () => {
    console.log('Limpando dados do paciente...');
    setPaciente(null);
    setNomePaciente('');
    setDataNascimento('');
    setIdOdontoPrev('');
  };

  const handleCriarPaciente = async () => {
    setIsLoading(true);
    try {
      const novoPaciente = await criarPaciente({
        name: nomePaciente,
        rg: rgPaciente,
        birthDate: dataNascimento,
        numCard: parseInt(idOdontoPrev, 10),
      });
      console.log('Novo paciente criado:', novoPaciente);
      setPaciente(novoPaciente);
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
    } catch (error: any) {
      console.error('Erro ao cadastrar paciente:', error.message || error);
      Alert.alert('Erro', error.message || 'Erro ao cadastrar paciente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgendarConsulta = async () => {
    if (!validarCampos()) return;

    setIsLoading(true);
    try {
      let patientId = paciente?.id;
      if (!patientId) {
        const novoPaciente = await criarPaciente({
          name: nomePaciente,
          rg: rgPaciente,
          birthDate: dataNascimento,
          numCard: parseInt(idOdontoPrev, 10),
        });
        console.log('Novo paciente criado:', novoPaciente);
        patientId = novoPaciente.id;
      }

      if (!procedimentoSelecionado || !dentistaSelecionado) {
        throw new Error('Selecione um procedimento e um dentista válidos.');
      }

      const dadosConsulta = {
        dateAppointment: dataConsulta,
        timeAppointment: horarioConsulta,
        dentistId: dentistaSelecionado,
        patientId: patientId,
        procedureTypeId: procedimentoSelecionado,
      };
      console.log('Enviando dados para agendar consulta:', dadosConsulta);

      await agendarConsulta(dadosConsulta);
      console.log('Consulta agendada com sucesso');
      Alert.alert('Sucesso', 'Consulta agendada com sucesso');
      navigation.goBack();
    } catch (error: any) {
      console.error('Erro ao agendar consulta:', error.message || error);
      Alert.alert('Erro', error.message || 'Erro ao agendar consulta');
    } finally {
      setIsLoading(false);
    }
  };

  const validarCampos = (): boolean => {
    if (!rgPaciente.trim()) {
      Alert.alert('Erro', 'Informe o RG do paciente.');
      return false;
    }
    if (!nomePaciente.trim()) {
      Alert.alert('Erro', 'Informe o nome do paciente.');
      return false;
    }
    if (!dataNascimento.trim()) {
      Alert.alert('Erro', 'Informe a data de nascimento do paciente.');
      return false;
    }
    if (!idOdontoPrev.trim()) {
      Alert.alert('Erro', 'Informe o ID Odontoprev do paciente.');
      return false;
    }
    if (!dataConsulta.trim()) {
      Alert.alert('Erro', 'Informe a data da consulta.');
      return false;
    }
    if (!horarioConsulta.trim()) {
      Alert.alert('Erro', 'Informe o horário da consulta.');
      return false;
    }
    if (!procedimentoSelecionado) {
      Alert.alert('Erro', 'Selecione um procedimento.');
      return false;
    }
    if (!dentistaSelecionado) {
      Alert.alert('Erro', 'Selecione um dentista.');
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

      {/* Campo de RG do Paciente */}
      <View style={styles.rgContainer}>
        <TextInput
          style={styles.input}
          placeholder="RG do Paciente"
          keyboardType="numeric"
          value={rgPaciente}
          onChangeText={setRgPaciente}
        />
        <TouchableOpacity onPress={handleBuscarPaciente} style={styles.searchIcon}>
          <Text>🔍</Text> {/* Ícone de lupa */}
        </TouchableOpacity>
      </View>

      {/* Dados do Paciente */}
      <Text style={styles.label}>Dados do Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nomePaciente}
        onChangeText={setNomePaciente}
        editable={!paciente}
      />
      <TextInput
        style={styles.input}
        placeholder="RG"
        value={rgPaciente}
        onChangeText={setRgPaciente}
        editable={!paciente}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (yyyy-MM-dd)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        editable={!paciente}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Odontoprev"
        value={idOdontoPrev}
        onChangeText={setIdOdontoPrev}
        keyboardType="numeric"
        editable={!paciente}
      />

      {/* Dados da Consulta */}
      <Text style={styles.label}>Dados da Consulta</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da Consulta (yyyy-MM-dd)"
        value={dataConsulta}
        onChangeText={setDataConsulta}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário da Consulta (HH:mm)"
        value={horarioConsulta}
        onChangeText={setHorarioConsulta}
      />

      {/* Procedimento */}
      <Text style={styles.label}>Procedimento</Text>
      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setShowProcedimentoOptions(!showProcedimentoOptions)}
      >
        <Text>{procedimentoSelecionado ? procedimentos.find(p => p.id === procedimentoSelecionado)?.name : 'Selecione um procedimento'}</Text>
      </TouchableOpacity>
      {showProcedimentoOptions && (
        <View style={styles.optionsContainer}>
          {procedimentos.map((procedimento) => (
            <TouchableOpacity
              key={procedimento.id}
              style={styles.optionItem}
              onPress={() => {
                setProcedimentoSelecionado(procedimento.id);
                setShowProcedimentoOptions(false);
              }}
            >
              <Text>{procedimento.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Dentista */}
      <Text style={styles.label}>Dentista</Text>
      <TouchableOpacity
        style={styles.dropdownInput}
        onPress={() => setShowDentistaOptions(!showDentistaOptions)}
      >
        <Text>{dentistaSelecionado ? dentistas.find(d => d.id === dentistaSelecionado)?.name : 'Selecione um dentista'}</Text>
      </TouchableOpacity>
      {showDentistaOptions && (
        <View style={styles.optionsContainer}>
          {dentistas.map((dentista) => (
            <TouchableOpacity
              key={dentista.id}
              style={styles.optionItem}
              onPress={() => {
                setDentistaSelecionado(dentista.id);
                setShowDentistaOptions(false);
              }}
            >
              <Text>{dentista.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Botão Agendar */}
      <TouchableOpacity onPress={handleAgendarConsulta} style={styles.button}>
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AgendamentoConsultas;
