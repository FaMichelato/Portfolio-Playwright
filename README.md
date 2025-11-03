
# Portfólio técnico

Este é um projeto de testes automatizados utilizando Playwright para testar a aplicação https://www.saucedemo.com/

Estrutura do Projeto</br>
playwright/e2e: Contém os arquivos de teste organizados em pastas e arquivos.</br>
playwright/support: Arquivos de suporte para comandos personalizados e configuração do Playwrigth.</br>
playwright.json: Arquivo de configuração do playwright.</br>

Neste demostrativo realizo testes funcionais na tela de login e valido as funcionalidades de compra de produtos, sacola, checkout.

Lembrando que é uma amostra de como eu estruturo os testes e quais métodos utilizo!

## Execução

Instalação das dependências

```bash
npm init playwright@latest

```

Verifica a instação

```bash
npx playwright --version

```
Para rodar o playwright em todos os browsers configurados:

```bash
npx playwright test

```

