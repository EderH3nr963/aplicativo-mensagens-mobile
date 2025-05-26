# FalaAi - Aplicativo Mobile

## 📱 Sobre o Projeto

FalaAi é um aplicativo mobile desenvolvido com React Native e Expo, oferecendo uma interface moderna e intuitiva para comunicação.

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- UI Kitten (Framework de UI)
- Socket.IO (Comunicação em tempo real)
- Expo Router (Navegação)
- Axios (Requisições HTTP)

## 📋 Pré-requisitos

- Node.js
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o projeto:

```bash
npm start
# ou
yarn start
```

## 📱 Executando o Aplicativo

- Para Android:

```bash
npm run android
# ou
yarn android
```

- Para iOS:

```bash
npm run ios
# ou
yarn ios
```

- Para Web:

```bash
npm run web
# ou
yarn web
```

## 🛠️ Scripts Disponíveis

- `npm start` ou `yarn start`: Inicia o servidor de desenvolvimento
- `npm run android` ou `yarn android`: Executa o app no Android
- `npm run ios` ou `yarn ios`: Executa o app no iOS
- `npm run web` ou `yarn web`: Executa o app na web
- `npm run lint` ou `yarn lint`: Executa a verificação de código
- `npm run reset-project` ou `yarn reset-project`: Reseta o projeto

## 📦 Dependências Principais

- **@ui-kitten/components**: Framework de UI
- **expo-router**: Sistema de navegação
- **socket.io-client**: Comunicação em tempo real
- **axios**: Cliente HTTP
- **expo-secure-store**: Armazenamento seguro
- **react-native-reanimated**: Animações
- **expo-blur**: Efeitos de blur
- **expo-haptics**: Feedback tátil

## 🔐 Configuração do Ambiente

O projeto utiliza o Expo com as seguintes configurações:

- Orientação: Portrait
- Interface adaptativa
- Suporte a tablets (iOS)
- Edge-to-edge habilitado (Android)
- Suporte a rotas tipadas

## 📱 Estrutura do Projeto

```
mobile/
├── app/                    # Diretório principal da aplicação
│   ├── (app)/             # Rotas da aplicação
│   ├── (auth)/            # Rotas de autenticação
│   └── _layout.tsx        # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── formLogin.tsx      # Formulário de login
│   ├── modalAlert.tsx     # Modal de alerta
│   ├── useBackButtonHandlerLogin.tsx  # Handler do botão voltar
│   └── renderIcon.tsx     # Componente de renderização de ícones
├── constants/             # Constantes e configurações
│   ├── Endpoints.ts       # Endpoints da API
│   ├── Messages.ts        # Mensagens do sistema
│   ├── Colors.ts          # Paleta de cores
│   └── Regex.ts           # Expressões regulares
├── context/              # Contextos do React
│   ├── Algo.tsx          # Contexto de algoritmo
│   └── loggedContext.tsx  # Contexto de autenticação
├── hooks/                # Custom hooks
│   ├── useAuthCheck.ts   # Hook de verificação de autenticação
│   ├── useAuth.ts        # Hook de autenticação
│   ├── useForm.ts        # Hook de formulário
│   └── registerHook.ts   # Hook de registro
├── assets/              # Recursos estáticos
├── app.json            # Configuração do Expo
└── package.json        # Dependências e scripts
```

## 📦 Descrição dos Componentes

### Components

- **formLogin.tsx**: Componente de formulário de login com validação
- **modalAlert.tsx**: Modal reutilizável para exibição de alertas
- **useBackButtonHandlerLogin.tsx**: Gerenciamento do botão voltar na tela de login
- **renderIcon.tsx**: Componente para renderização padronizada de ícones

### Constants

- **Endpoints.ts**: Configuração dos endpoints da API
- **Messages.ts**: Mensagens do sistema para feedback ao usuário
- **Colors.ts**: Definição da paleta de cores do aplicativo
- **Regex.ts**: Expressões regulares para validação

### Context

- **Algo.tsx**: Contexto para gerenciamento de algoritmos
- **loggedContext.tsx**: Contexto para gerenciamento do estado de autenticação

### Hooks

- **useAuthCheck.ts**: Hook para verificação do estado de autenticação
- **useAuth.ts**: Hook principal de autenticação com funções de login/logout
- **useForm.ts**: Hook para gerenciamento de formulários
- **registerHook.ts**: Hook para gerenciamento do processo de registro
