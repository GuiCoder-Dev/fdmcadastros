# fdmcadastros 🚀

Este é meu **primeiro projeto desenvolvido do zero**. Um sistema web completo de cadastro de alunos e gerenciamento de mensalidades, visando organizar e controlar alunos e seus pagamentos.

---

## 🎯 Sobre o Projeto

Sistema de gestão educacional que permite:
- ✅ Cadastro e gerenciamento de alunos
- ✅ Controle de pagamentos e mensalidades

---

## 🧑‍💻 Tecnologias Utilizadas

### Backend (Desenvolvido 100% por mim)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Frontend (Com auxílio de IA)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Ferramentas de Desenvolvimento
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 🔐 Funcionalidades de Segurança  
- ✅ Autenticação com JWT  
- ✅ Validação de tokens em endpoints  
- ✅ Tratamento de erros customizado  

---

## ⚙️ Requisitos

Antes de começar, certifique-se de ter instalado:

- **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)
- **JDK 21+** - [Download](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html)
- **Node.js e NPM** - [Download](https://nodejs.org/)
- Possuir meu .env

---

## ✨ Como Rodar o Projeto

### Backend (Kotlin/Spring Boot)

**Clone e configure o banco de dados:**

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/seu_banco?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: seu_usuario
    password: sua_senha
```

### Frontend 

**Instale as dependências e inicie o servidor (na pasta do frontend):**

```
npm install
npm install axios
npm install react-router-dom
nmp start
```

---

## 👀 Rodar Localmente

- 🔄️ Backend (porta: 8080)  
- 🔄️ Frontend (porta: 3000)

---

## ❌ Erros Internos

- FDM 101 a 200 (id error)
- FDM 201 a 300 (inactive error)
- FDM 301 a 400 (query error)
- FDM 401 A 500 (e-mail error)
- FDM 501 a 600 (authentication error)
- FDM 601 a 700 (authorization error)
- FDM 701 a 800 (request error)
- FDM 801 a 900 (date error)

