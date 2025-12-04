# fdmcadastros 🚀

Este é meu **primeiro projeto desenvolvido do zero**. Um sistema web completo de cadastro de alunos e gerenciamento de mensalidades, visando organizar e controlar alunos e seus pagamentos.

---

## 🎯 Sobre o Projeto

Sistema de gestão educacional que permite:
- ✅ Cadastro e gerenciamento de alunos
- ✅ Controle de pagamentos e mensalidades
- ✅ Autenticação segura com JWT

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
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## ⚙️ Requisitos

Antes de começar, certifique-se de ter instalado:

- **MySQL 8.0+** - [Download](https://www.mysql.com/downloads/)
- **JDK 17+** - [Download](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **Node.js e NPM** - [Download](https://nodejs.org/)

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Backend (Kotlin/Spring Boot)

**Clone e configure o banco de dados:**

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/seu_banco?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: seu_usuario
    password: sua_senha
