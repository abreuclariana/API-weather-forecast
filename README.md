# 🌦️ Projeto Previsão do Tempo

Este projeto utiliza **Node.js**, **Express** e **OpenWeatherMap API** para exibir a previsão do tempo com base no nome de uma cidade inserida pelo usuário.

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **Body-parser**
- **HTTPS (módulo nativo do Node.js)**
- **OpenWeatherMap API**

## 📌 Como Executar o Projeto

### 1️⃣ Instale as Dependências
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Depois, instale as dependências do projeto rodando o seguinte comando no terminal:

```sh
npm install express body-parser
```

### 2️⃣ Obtenha uma API Key do OpenWeatherMap
Registre-se no site [OpenWeatherMap](https://openweathermap.org/api) e obtenha uma **API Key** gratuita.

### 3️⃣ Execute o Servidor
Substitua `SUA_API_KEY` no código pelo valor correto e inicie o servidor com o comando:

```sh
node app.js
```

O servidor rodará na porta **3002**. Acesse:

```
http://localhost:3002/
```

## 📥 Estrutura do Projeto
```
projeto-tempo/
├── index.html   # Formulário para inserção da cidade
├── app.js       # Código principal do servidor
├── package.json # Arquivo de configuração do Node.js
└── README.md    # Documentação do projeto
```

## 📜 Como Funciona
1. O usuário insere o nome de uma cidade no **formulário** (`index.html`).
2. O servidor **Express** recebe o dado e faz uma requisição para a API do **OpenWeatherMap**.
3. O servidor retorna a previsão do tempo para a cidade inserida, incluindo:
   - **Temperatura (°C)**
   - **Descrição do clima** (Ex: Chuva leve, Sol, Nublado)
   - **Ícone representativo do clima**

## ⚠️ Possíveis Erros e Soluções
| Erro | Possível Causa | Solução |
|------|---------------|----------|
| `404 Not Found` | Nome da cidade digitado errado ou API Key inválida | Verifique se digitou corretamente a cidade e se a API Key está ativa |
| `TypeError: Cannot read properties of undefined` | A resposta da API não tem os dados esperados | Verifique se a API está retornando os campos corretamente |
| `EADDRINUSE: address already in use` | A porta **3002** já está sendo usada | Use outra porta ou finalize o processo anterior com `kill -9 PID` |

## 📜 Licença
Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e modificá-lo! 😊

---
💡 **Dúvidas ou sugestões?** Me avise! 🚀

