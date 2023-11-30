# Desafio-01-Nodejs-Rocketseat-Ignite

## Introdução

Este é o repositório da aplicação desenvolvida para o Desafio 01 de NodeJS da Rocketseat.
A aplicação consiste em uma API em NodeJS que utiliza o módulo interno http para atender a requisições. Além disso, há a funcionalidade de processar dados de um arquivo CSV de maneira assíncrona, utilizando stream de leitura e transformação, e enviar os dados transformados para a API.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

## Instalação

1. Clone este repositório:

##### https://github.com/AlexFlavio/Desafio-01-Nodejs-Rocketseat-Ignite

2. Acesse o diretório do projeto:

   ```bash
       cd desafio-nodejs-rocketseat
   ```

3. Instale as dependências:

   ```bash
       npm install
   ```

## Uso

### Para iniciar a API, utilize o seguinte comando:

```bash
    npm run dev
```

Isso iniciará a aplicação na porta padrão 3333. Você pode acessar a API em http://localhost:3333.

### Para simular o envio de dados a partir de um arquivo CSV, execute o seguinte comando:

```bash
    npm run csv
```

Esse comando lê o arquivo CSV de maneira assíncrona, realiza a transformação dos dados e os envia para a API.

> Espero que esta documentação ajude na utilização e entendimento da aplicação. Se tiver alguma dúvida ou problema, não hesite em entrar em contato.
