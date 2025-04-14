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
│   └── odontoprev-logo.png  # Logo da Odontoprev
├── src/  # Pasta principal que organiza o código-fonte do aplicativo
│   ├── navigation/  # Contém arquivos relacionados à navegação do aplicativo
│   │   └── navigationTypes.ts  # Define os tipos de navegação e parâmetros para cada tela
├── screens/  # Pasta que organiza todas as telas do aplicativo
│   ├── AgendamentoConsulta/  # Tela para agendamento de consultas
│   ├── AnaliseConsulta/  # Tela para análise de consultas
│   ├── CadastroAtendente/  # Tela para cadastro de atendentes
│   ├── CadastroDentista/  # Tela para cadastro de dentistas
│   ├── ComoUsar/  # Tela explicativa sobre como usar o aplicativo
│   ├── Configuracoes/  # Tela de configurações do aplicativo
│   ├── ConsultaPaciente/  # Tela para visualização de detalhes de uma consulta específica
│   ├── Consultas/  # Tela que lista todas as consultas
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
- `GET /appointments`: Listar consultas
- `GET /appointments/{id}`: Buscar consulta por ID
- `PATCH /appointments/{id}`: Alterar dados da consulta
- `DELETE /appointments/{id}`: Excluir consulta

### 📌 Clínicas e Procedimentos
- `GET /clinics`: Lista todas as clínicas
- `GET /proceduresType`: Obtém os tipos de procedimentos odontológicos disponíveis

## 📲 Como Executar o Projeto
1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-repo/validente.git
   ```
2. **Instale as dependências**
   ```bash
   cd validente
   npm install
   ```
3. **Inicie o app**
   ```bash
   npx expo start
   ```
4. **Configuração da API**
   - Certifique-se de que a API Java está rodando localmente ou em um servidor acessível.
   - Se necessário, ajuste a variável `BASE_URL` no arquivo `api/apiClient.ts`.

## 📌 Funcionalidades Principais
✅ Login e autenticação de usuários
✅ Cadastro e gerenciamento de pacientes
✅ Agendamento de consultas
✅ Envio de imagens para avaliação odontológica
✅ Listagem e edição de consultas
✅ Controle de permissões para dentistas e atendentes

## 👥 Grupo
- **Nome:** Gustavo Araújo Maia **RM:** 553270
- **Nome:** Rafael Vida Fernandes **RM:** 553721
- **Nome:** Kauã Almeida Silveira **RM:** 552618
- **Turma:** 2TDSPS



