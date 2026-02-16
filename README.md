# 🏥 PatientStudio - Testes Automatizados

Uma suíte de testes automatizados E2E desenvolvida em **Playwright** para validar funcionalidades críticas da plataforma **PatientStudio**, um sistema de gerenciamento de pacientes e pagamentos.

---

## 📋 Sobre o Projeto

Este projeto implementa testes automatizados para a aplicação PatientStudio, focando em:

- ✅ Criação e gerenciamento de pacientes
- ✅ Processamento de pagamentos
- ✅ Autenticação e fluxo de login
- ✅ Gerenciamento de usuários administrativos

**Stack de Tecnologia:**
- **Playwright** v1.58.2 - Framework de testes E2E
- **TypeScript** v5.0 - Tipagem estática
- **Faker.js** v10.3 - Geração de dados aleatórios

---

## 🗂️ Estrutura do Projeto

```
teste-patientStudio/
├── 📄 package.json              # Configuração e dependências
├── 📄 playwright.config.ts      # Configuração do Playwright
├── 📄 tsconfig.json             # Configuração TypeScript
│
├── 📁 global/
│   └── globalSetup.ts           # Setup global: autentica e cria paciente de teste
│
├── 📁 pages/                    # Page Object Models (POM)
│   ├── LoginPage.ts             # Página de login
│   ├── UsersPage.ts             # Página de criação/gerenciamento de usuários
│   ├── PatientsPage.ts          # Página de lista e busca de pacientes
│   ├── PatientProfilePage.ts    # Página de perfil do paciente
│   └── FinancialPage.ts         # Página de pagamentos
│
├── 📁 tests/                    # Testes E2E
│   ├── patient.spec.ts          # Testes de criação de pacientes
│   ├── payment.spec.ts          # Testes de pagamentos
│   └── 📁 fixtures/
│       └── patient.fixture.ts   # Fixture customizada com dados de paciente
│
└── 📁 utils/                    # Utilitários
    ├── dataFactory.ts           # Geução de dados para testes
    └── fileUtils.ts             # Funções de manipulação de arquivos
```

---

## 🚀 Como Executar

### 📦 Pré-requisitos

- **Node.js** 16+ instalado
- **npm** ou **yarn** como gerenciador de pacotes
- Acesso à URL: `https://doctors.qa.patientstudio.com`

### 1️⃣ Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd teste-patientStudio

# Instalar dependências
npm install
```

### 2️⃣ Configurar Credenciais

O projeto utiliza uma conta de teste pré-configurada no `globalSetup.ts`:
- **Email:** `office-admin@patientstudio.com`
- **Senha:** `1 Super Safe Password!`

> ⚠️ Para um ambiente diferente, atualize as credenciais no arquivo `global/globalSetup.ts`

### 3️⃣ Executar os Testes

```bash
# Executar todos os testes (modo headless)
npm test

# Executar testes com a janela do navegador visível
npm run test:headed

# Executar testes em modo debug (pause e step-through)
npm run test:debug
```

---

## 📚 Detalhes dos Testes

### 🧪 Test 1: Criação de Paciente (`patient.spec.ts`)

**Objetivo:** Validar se um paciente pode ser criado com sucesso

**Fluxo:**
1. Acessar a página de pacientes
2. Clicar em "Create New Patient"
3. Preencher dados aleatórios do paciente
4. Submeter o formulário
5. Validar se o paciente aparece na lista

**Dados Gerados Automaticamente:**
```typescript
{
  firstName: "João",           // Primeiro nome aleatório
  lastName: "Silva",           // Último nome aleatório
  email: "joao.silva@test.com", // Email baseado no nome
  dateOfBirth: "01-16-2000"    // Data fixa de nascimento
}
```

### 💳 Test 2: Criação de Pagamento (`payment.spec.ts`)

**Objetivo:** Validar se um pagamento pode ser processado para um paciente existente

**Fluxo:**
1. Fazer login automaticamente (via `globalSetup`)
2. Abrir a lista de pacientes
3. Abrir o perfil do paciente criado no setup
4. Navegar até a seção "Financial"
5. Criar um pagamento de $100 em dinheiro
6. Validar mensagem de sucesso

**Dados do Pagamento:**
```typescript
{
  amount: "100",          // Valor em dólares
  paymentMethod: "Cash"   // Método de pagamento
}
```

---

## 🔐 Autenticação e Setup Global

### O que acontece no `globalSetup.ts`?

Quando você executa os testes, o seguinte processo ocorre **uma única vez**:

```
1. Cria diretório .auth (se não existir)
2. Faz login na aplicação com credenciais de admin
3. Salva o estado de sessão em .auth/storageState.json
4. Cria um paciente de teste automaticamente
5. Salva os dados do paciente em .auth/patient.json
6. Fecha o navegador
```

**Resultado:**
- ✅ Todos os testes posteriores reutilizam a sessão autenticada
- ✅ Um paciente já existe para testes de pagamento
- ✅ Reduz tempo de execução significativamente

---

## 🏗️ Padrão de Arquitetura: Page Object Model

O projeto utiliza **POM** para melhorar manutenibilidade:

```typescript
// ❌ SEM POM (frágil e repetitivo)
test('create patient', async ({ page }) => {
  await page.goto('/patients');
  await page.click('button:has-text("Create New Patient")');
  // ...muitas linhas de código...
});

// ✅ COM POM (limpo e reutilizável)
test('create patient', async ({ page }) => {
  const patientsPage = new PatientsPage(page);
  await patientsPage.createPatient(data);
});
```

### Classes de Page:

| Classe | Responsabilidade |
|--------|------------------|
| `LoginPage` | Navegação e autenticação |
| `UsersPage` | Criação de pacientes/usuários |
| `PatientsPage` | Busca e abertura de pacientes |
| `PatientProfilePage` | Navegação no perfil do paciente |
| `FinancialPage` | Processamento de pagamentos |

---

## 🔧 Configurações Importantes

### `playwright.config.ts`

```typescript
{
  baseURL: 'https://doctors.qa.patientstudio.com', // URL base
  workers: 2,                                       // Execução paralela com 2 workers
  fullyParallel: true,                              // Todos os testes em paralelo
  headless: false                                   // Navegador visível por padrão
}
```

### `tsconfig.json`

```typescript
{
  compilerOptions: {
    target: "ES2020",           // Sintaxe JavaScript moderna
    strict: true,               // Verificação de tipos rigorosa
    moduleResolution: "node"    // Resolução de módulos Node.js
  }
}
```

---

## 📂 Fluxo de Dados

```
globalSetup.ts (executa UMA VEZ antes de tudo)
├── Login automático
├── Cria paciente de teste
└── Salva em .auth/

tests/patient.spec.ts
├── Cria novo paciente (alegatório)
└── Valida criação

tests/payment.spec.ts
├── Usa paciente do setup (.auth/patient.json)
├── Cria pagamento
└── Valida pagamento
```

---

## 🐛 Debugging

### Modo Debug Passo a Passo

```bash
npm run test:debug
```

Isso abre o **Playwright Inspector** permitindo:
- ⏸️ Pausar em qualquer ponto
- 🔍 Inspecionar elementos
- ▶️ Executar passo a passo

### Visualizar o Navegador Aberto

```bash
npm run test:headed
```

Mostra o navegador executando todos os passos do teste em tempo real.

### Logs Detalhados

```bash
DEBUG=pw:api npm test
```

---

## 📊 Fixtures Customizadas

O projeto utiliza **Fixtures do Playwright** para compartilhar dados:

```typescript
// patient.fixture.ts
export const test = base.extend<Fixtures>({
  patient: async ({}, use) => {
    const patient = JSON.parse(
      fs.readFileSync('.auth/patient.json', 'utf-8')
    );
    await use(patient); // Injetar no teste
  }
});

// Uso no teste
test('create payment', async ({ page, patient }) => {
  // patient contém os dados do setup global
  await patientsPage.openPatient(patient.fullName);
});
```

---

## 🛠️ Geração de Dados com Faker

O `dataFactory.ts` gera dados realistas:

```typescript
import { faker } from '@faker-js/faker';

export function generatePatient() {
  return {
    firstName: faker.person.firstName(),      // "Maria"
    lastName: faker.person.lastName(),        // "Santos"
    email: faker.internet.email(),            // "maria.santos@example.com"
    dateOfBirth: "01-16-2000"                // Data fixa
  };
}
```

**Benefícios:**
- 🎲 Dados diferentes a cada execução
- 🌍 Nomes realistas em vários idiomas
- 📧 Emails válidos e únicos

---

## 📝 Criando Novos Testes

### 1. Criar a Page

```typescript
// pages/MyPage.ts
import { Page } from '@playwright/test';

export class MyPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto('/meu-caminho');
  }

  async executarAcao(param: string) {
    await this.page.click('#botao');
    // ...
  }
}
```

### 2. Criar o Teste

```typescript
// tests/meu-teste.spec.ts
import { test, expect } from '@playwright/test';
import { MyPage } from '../pages/MyPage';

test('descrição do teste', async ({ page }) => {
  const myPage = new MyPage(page);
  
  await myPage.navigateTo();
  await myPage.executarAcao('valor');
  
  await expect(page.getByText('Esperado')).toBeVisible();
});
```

### 3. Executar

```bash
npm test -- tests/meu-teste.spec.ts
```

---

## 📦 Arquivo de Autenticação

Após executar:
```
.auth/
├── storageState.json  # Cookies e sessão
└── patient.json       # Dados do paciente criado
```

Para **resetar o estado**, delete a pasta `.auth/`:
```bash
rm -r .auth
npm test  # Vai gerar um novo setup
```

---

## 🚨 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Element not found" | Aumentar timeout: `await page.waitForSelector(seletor, { timeout: 10000 })` |
| Testes lentos | Reduzir workers em `playwright.config.ts` |
| Erro de autenticação | Verificar credenciais em `globalSetup.ts` |
| Arquivo `.auth` corrompido | Deletar pasta `.auth` e executar novamente |
| Timeout no setup | Aumentar timeout de login em `globalSetup.ts` |

---

## 📞 Scripts Disponíveis

```bash
npm test              # Executar testes (headless)
npm run test:headed   # Executar testes com navegador visível
npm run test:debug    # Executar em modo debug interativo
```

---

## 📄 Licença

Este projeto é de uso interno.

---

## 👨‍💻 Autor

Desenvolvido com Playwright e TypeScript.

**Última atualização:** Fevereiro de 2026

---

## 🤝 Como Contribuir

1. Criar uma branch: `git checkout -b feature/nova-funcionalidade`
2. Commit das mudanças: `git commit -m 'Adiciona novos testes'`
3. Push para a branch: `git push origin feature/nova-funcionalidade`
4. Abrir um Pull Request

---

**Happy Testing! 🚀**
