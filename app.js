// Importando os módulos necessários
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

// Define a pasta "public" como estática para servir arquivos (CSS, imagens, etc.)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para processar dados do formulário

// Configurando o EJS como o motor de visualização
app.set('view engine', 'ejs');

// Rota principal - Exibe a página inicial com o formulário e valores vazios
app.get('/', (req, res) => {
    res.render('index', { 
        query: "", 
        temperatura: "", 
        descricao: "", 
        imgURL: "" 
    }); 
});

// Rota que processa a submissão do formulário
app.post('/', (req, res) => {
    const query = req.body.cityName; // Captura o nome da cidade digitado no formulário
    const apiKey = '3f29d54e1ecc92984b0b636e741da76d'; // Chave da API do OpenWeatherMap
    const parametro = 'metric'; // Unidades de medida (métrico = Celsius)
    
    // Construção da URL da API com os parâmetros corretos
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${parametro}`;

    // Faz a requisição GET para a API do OpenWeatherMap
    https.get(url, (response) => {
        console.log(`Status da resposta: ${response.statusCode}`);

        // O evento 'data' recebe os dados da resposta HTTP (vêm em formato de buffer)
        response.on('data', (data) => {
            const tempoData = JSON.parse(data); // Converte a string JSON para um objeto JavaScript

            // Verifica se a API retornou um erro (exemplo: cidade não encontrada)
            if (tempoData.cod !== 200) {
                return res.render('index', { 
                    query: "City not found!",
                    temperatura: "--",
                    descricao: "Error when searching for data.",
                    imgURL: ""
                });
            }

            // Extraindo dados do JSON da API
            const temperatura = tempoData.main.temp; // Temperatura em Celsius
            const descricao = tempoData.weather[0].description; // Descrição do tempo (ex: "chuva leve")
            const icon = tempoData.weather[0].icon; // Ícone do clima
            const imgURL = `https://openweathermap.org/img/wn/${icon}.png`; // URL da imagem do ícone

            // Renderiza a página EJS passando os dados
            res.render('index', { query, temperatura, descricao, imgURL });
        });
    }).on('error', (error) => {
        console.error('Erro na requisição:', error);
        res.render('index', { 
            query: "Erro na conexão!",
            temperatura: "--",
            descricao: "Check your internet and try again.",
            imgURL: ""
        });
    });
});

// Inicia o servidor na porta 3002
app.listen(3002, () => {
    console.log('O servidor está rodando na porta 3002!');
});
