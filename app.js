const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // Middleware para processar dados do formulário

// Rota principal para exibir o HTML do formulário
app.get('/', (req, res) => { // O GET é usado para criar e mapear uma requisição. Tudo o que for mapeado tem que estar dentro dele, entre as chaves.
    res.sendFile(__dirname + '/index.html'); // Envia o arquivo HTML para o navegador
});

// Rota que processa a submissão do formulário
app.post('/', (req, res) => {
    console.log(req.body.cityName); // Exibe no console o nome da cidade digitado no formulário

    const query = req.body.cityName; // Exemplo: Se o usuário digitou 'Londres', query será 'Londres'
    const apiKey = '3f29d54e1ecc92984b0b636e741da76d'; // Chave da API
    const parametro = 'metric'; // Unidades de medida (métrico = Celsius)
    
    // Construção da URL da API com os parâmetros corretos
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${parametro}`;

    // Faz a requisição GET para a API do OpenWeatherMap
    https.get(url, (response) => {
        console.log(response.statusCode); // statusCode serve para mostrar o status da resposta (200 = sucesso)

        // O evento 'data' recebe os dados da resposta HTTP (vêm em formato de buffer)
        response.on('data', (data) => {
            const tempoData = JSON.parse(data); // Converte a string JSON para um objeto JavaScript

            // Verifica se a API retornou um erro (exemplo: cidade não encontrada)
            if (tempoData.cod !== 200) {
                res.send(`<h1>Erro: ${tempoData.message}</h1>`); // Se houver erro, exibe a mensagem
                return;
            }

            // Extraindo dados do JSON da API
            const temperatura = tempoData.main.temp;
            const descricao = tempoData.weather[0].description; // Descrição do tempo (ex: "chuva leve")
            const icon = tempoData.weather[0].icon; // Ícone do clima
            const imgURL = `https://openweathermap.org/img/wn/${icon}.png`; // URL da imagem do ícone

            // Enviando resposta para o navegador
            res.write(`<h1>A temperatura em ${query} é: ${temperatura}°C.</h1>`); // Título com a temperatura
            res.write(`<p>O tempo está assim: ${descricao}.</p>`); // Descrição do clima
            res.write(`<img src="${imgURL}" />`); // Ícone do clima

            res.send(); // Finaliza a resposta
        });
    }).on('error', (error) => {
        console.error('Erro na requisição:', error);
        res.send('<h1>Erro ao obter os dados. Verifique sua conexão.</h1>'); // Exibe erro no navegador
    });
});

// Inicia o servidor na porta 3002
app.listen(3002, () => {
    console.log('O servidor está rodando na porta 3002!');
});
