# Validente - Aplicativo de Agendamento Odontológico

## 📌 Sobre o Projeto
Validente é um aplicativo mobile desenvolvido em **React Native** para auxiliar no gerenciamento de consultas odontológicas. Ele permite que pacientes agendem consultas, dentistas realizem avaliações e atendentes administrem agendamentos de forma eficiente.

O aplicativo se comunica com uma API REST desenvolvida em **Java Spring Boot**, hospedada no repositório: [ChallengeOdontoPrev](https://github.com/ChallengeOdontoPrev/javaAdvanced/tree/main/challenge).

## 🚀 Tecnologias Utilizadas
- **React Native**: Desenvolvimento mobile multiplataforma
- **TypeScript**: Tipagem estática para maior segurança do código
- **Axios**: Consumo da API
- **AsyncStorage**: Armazenamento local de dados
- **React Navigation**: Gerenciamento de navegação entre telas
- **Expo ImagePicker**: Captura e upload de imagens

## 📂 Estrutura do Projeto

```bash
Validente/
├── api/  # Pasta dedicada à comunicação com a API
│   ├── apiClient.ts  # Configuração da instância Axios, incluindo interceptadores para autenticação
│   └── endpoints.ts  # Funções que realizam chamadas HTTP para endpoints específicos (ex.: login, cadastro, consultas)
├── app.json  # Arquivo de configuração do Expo, contendo metadados como nome, ícones, splash screen e permissões
├── assets/  # Pasta que armazena todos os recursos visuais utilizados no aplicativo
│   ├── fonts/  # Fontes usadas no projeto (Montserrat em diferentes pesos)
│   │   ├── Montserrat-Bold.ttf
│   │   ├── Montserrat-Regular.ttf
│   │   └── Montserrat-SemiBold.ttf
│   ├── adaptive-icon.png  # Ícone adaptativo para Android
│   ├── favicon.png  # Ícone para web
│   ├── icone.png  # Ícone principal do aplicativo
│   ├── iconedentista.png  # Ícone específico para dentistas
│   ├── iconedentista2.png  # Versão alternativa do ícone para dentistas
│   ├── iconeatendente2.png  # Ícone específico para atendentes
│   ├── ok.png  # Imagem de confirmação ou sucesso
│   ├── splash-icon.png  # Ícone exibido na tela de splash
│   ├── vol.png  # Ícone de voltar usado em várias telas
│   ├── mais.png  # Ícone de adicionar/mais usado em várias telas
│   ├── search.png  # Ícone de busca usado na funcionalidade de pesquisa
│   └── odontoprev-logo.png  # Logo da Odontoprev
├── src/  # Pasta principal que organiza o código-fonte do aplicativo
│   ├── navigation/  # Contém arquivos relacionados à navegação do aplicativo
│   │   └── navigationTypes.ts  # Define os tipos de navegação e parâmetros para cada tela
├── screens/  # Pasta que organiza todas as telas do aplicativo
│   ├── AgendamentoConsulta/  # Tela para agendamento de consultas
│   ├── AnaliseConsulta/  # Tela para análise de consultas com upload de fotos
│   ├── CadastroAtendente/  # Tela para cadastro de atendentes
│   ├── CadastroDentista/  # Tela para cadastro de dentistas
│   ├── ComoUsar/  # Tela explicativa sobre como usar o aplicativo
│   ├── Configuracoes/  # Tela de configurações do aplicativo
│   ├── ConsultaPaciente/  # Tela para visualização de detalhes de uma consulta específica
│   ├── Consultas/  # Tela que lista todas as consultas agendadas (status SCHEDULED)
│   ├── LoginAtendente/  # Tela de login para atendentes
│   ├── LoginDentista/  # Tela de login para dentistas
│   ├── MenuLogin/  # Tela inicial com opções de login (dentista ou atendente)
│   └── MenuPrincipal/  # Tela principal após o login
├── App.tsx  # Ponto de entrada principal do aplicativo, configurando navegação, carregamento de fontes e rotas iniciais
└── package.json  # Arquivo que lista as dependências e scripts do projeto
```

## 🔗 API Utilizada
O aplicativo consome os serviços REST da API **ChallengeOdontoPrev**, cujos principais endpoints são:

### 📌 Autenticação
- `POST /auth/login`: Realiza login e retorna um token
- `POST /auth/signup`: Cadastro de usuários (atendentes/dentistas)

### 📌 Pacientes
- `GET /patients/{rg}`: Busca paciente por RG
- `POST /patients`: Cadastra um novo paciente

### 📌 Consultas
- `POST /appointments`: Agendar consulta
- `GET /appointments`: Listar todas as consultas
- `GET /appointments/status?status=SCHEDULED`: Listar apenas consultas agendadas
- `GET /appointments/{id}`: Buscar consulta por ID
- `GET /appointments/byPatientIdOdontoPrev/{id}`: Buscar consultas por ID Odontoprev
- `POST /appointments/{id}/validate`: Validar consulta com upload de fotos
- `PATCH /appointments/{id}`: Alterar dados da consulta
- `DELETE /appointments/{id}`: Excluir consulta

### 📌 Clínicas e Procedimentos
- `GET /clinics`: Lista todas as clínicas
- `GET /proceduresType`: Obtém os tipos de procedimentos odontológicos disponíveis
- `GET /auth?role=DENTISTA`: Lista todos os dentistas cadastrados

## 📲 Como Executar o Projeto

### **Pré-requisitos**
- Node.js instalado
- Java JDK 11+ instalado
- IDE para Java (IntelliJ IDEA, Eclipse, etc.)
- Expo CLI instalado globalmente: `npm install -g @expo/cli`

### **1. Configuração da API (Backend)**
1. **Clone o repositório da API Java**
   ```bash
   git clone https://github.com/ChallengeOdontoPrev/javaAdvanced.git
   ```
2. **Navegue para o diretório do projeto**
   ```bash
   cd javaAdvanced/challenge
   ```
3. **Execute a aplicação Java**
   - Abra o projeto em sua IDE preferida
   - Execute o arquivo `ChallengeApplication.java`
   - A API estará disponível em `http://localhost:8080`

### **2. Configuração do App Mobile (Frontend)**
1. **Clone o repositório do aplicativo**
   ```bash
   git clone https://github.com/Gusmaiadev/Challenge-Validente
   ```
2. **Instale as dependências**
   ```bash
   cd validente
   npm install
   ```
3. **Ajuste a configuração da API (se necessário)**
   - Se a API estiver rodando em um endereço diferente, ajuste a variável `BASE_URL` no arquivo `api/apiClient.ts`
4. **Inicie o app**
   ```bash
   npx expo start
   ```

## 📌 Funcionalidades Principais
✅ Login e autenticação de usuários (atendentes e dentistas)  
✅ Cadastro e gerenciamento de pacientes  
✅ Agendamento de consultas odontológicas  
✅ Listagem de consultas filtradas por status (SCHEDULED)  
✅ Busca de consultas por ID Odontoprev  
✅ Análise e validação de consultas com upload de fotos (antes/depois)  
✅ Captura de fotos via câmera ou galeria  
✅ Envio de imagens para avaliação odontológica via FormData  
✅ Listagem e edição de consultas  
✅ Controle de permissões para dentistas e atendentes  
✅ Navegação otimizada com tipos TypeScript  
✅ Tratamento de erros com feedback visual ao usuário  

## 🔧 Recursos Técnicos Implementados
- **Autenticação JWT**: Sistema seguro de login com tokens
- **Upload de Arquivos**: Envio de imagens via FormData para validação de consultas  
- **Filtros de Status**: Consultas filtradas por status diretamente na API
- **Busca Avançada**: Pesquisa de consultas por ID Odontoprev
- **Interceptadores HTTP**: Gerenciamento automático de tokens de autenticação
- **TypeScript**: Tipagem forte para maior robustez do código
- **AsyncStorage**: Persistência de dados locais para melhor UX
- **Tratamento de Permissões**: Gerenciamento de acesso à câmera e galeria

## 👥 Grupo
- **Nome:** Gustavo Araújo Maia **RM:** 553270
- **Nome:** Rafael Vida Fernandes **RM:** 553721
- **Nome:** Kauã Almeida Silveira **RM:** 552618
- **Turma:** 2TDSPS
