# Documento de Casos de Teste - Velô Sprint

---

### CT01 - Acesso à Landing Page
#### Objetivo
Validar se a Landing Page é carregada corretamente e apresenta as informações principais do veículo.
#### Pré-Condições
- O sistema deve estar no ar e acessível pelo navegador.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a URL principal do sistema | A página carrega com sucesso, exibindo o título, imagens do Velô Sprint e botão para iniciar a configuração |
| 2 | Clicar no botão para iniciar configuração | O usuário é redirecionado para o módulo de Configurador de Veículo |
#### Resultados Esperados
- O usuário acessa a Landing Page sem erros e consegue iniciar a jornada de compra.
#### Critérios de Aceitação
- A página inicial deve carregar corretamente.
- O botão de iniciar configuração deve estar visível e funcional.

---

### CT02 - Configuração do Veículo - Valor Base
#### Objetivo
Validar se o veículo é precificado corretamente sem a adição de opcionais.
#### Pré-Condições
- Usuário deve estar na página de Configurador de Veículo.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Visualizar o resumo inicial do veículo sem marcar nenhum opcional | O valor total exibido deve ser de R$ 40.000,00 |
#### Resultados Esperados
- O preço final calculado e exibido para um carro sem opcionais é de R$ 40.000,00.
#### Critérios de Aceitação
- O cálculo do valor inicial deve corresponder a R$ 40.000,00 exatamente.

---

### CT03 - Configuração do Veículo - Adição de Opcionais e Recálculo
#### Objetivo
Validar se a adição de itens opcionais altera corretamente o valor final do veículo.
#### Pré-Condições
- Usuário deve estar na página de Configurador de Veículo.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção de rodas "Sport" | O valor total é atualizado para R$ 42.000,00 (R$ 40.000 + R$ 2.000) |
| 2 | Selecionar a opção "Precision Park" | O valor total é atualizado para R$ 47.500,00 (R$ 42.000 + R$ 5.500) |
| 3 | Selecionar a opção "Flux Capacitor" | O valor total é atualizado para R$ 52.500,00 (R$ 47.500 + R$ 5.000) |
| 4 | Desmarcar a opção de rodas "Sport" | O valor total é atualizado para R$ 50.500,00 |
#### Resultados Esperados
- O sistema recalcula o valor dinamicamente e de forma precisa a cada seleção ou remoção de opcionais.
#### Critérios de Aceitação
- Rodas "Sport": +R$ 2.000.
- "Precision Park": +R$ 5.500.
- "Flux Capacitor": +R$ 5.000.

---

### CT04 - Simulação de Financiamento - Cálculo de Juros
#### Objetivo
Validar se a simulação de financiamento parcelado aplica corretamente a regra de 12x com juros compostos de 2% ao mês.
#### Pré-Condições
- Usuário configurou o veículo (ex: sem opcionais, total R$ 40.000,00).
- Usuário avançou para a simulação de pagamento.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção de pagamento "Parcelado" sem dar entrada | O sistema trava a opção de parcelamento em 12 vezes |
| 2 | Visualizar as parcelas e o valor final | O sistema exibe o cálculo com juros compostos de 2% ao mês sobre R$ 40.000,00 |
#### Resultados Esperados
- O parcelamento deve estar bloqueado na opção de 12 parcelas.
- O valor final deve refletir o cálculo de juros compostos de 2% a.m.
#### Critérios de Aceitação
- Apenas a opção de 12x deve ser permitida no financiamento.
- A taxa de juros aplicada deve ser composta e de 2% ao mês.

---

### CT05 - Checkout e Pedido - Preenchimento Incompleto
#### Objetivo
Validar o comportamento do sistema ao tentar prosseguir com dados obrigatórios ausentes.
#### Pré-Condições
- Usuário finalizou a configuração do carro e simulação, e está na tela de Checkout/Pedido.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar campos obrigatórios (ex: Nome, CPF, Email) em branco | Os campos permanecem em branco |
| 2 | Clicar em "Finalizar Pedido" | O sistema exibe mensagens de erro indicando que os campos são obrigatórios e não avança |
#### Resultados Esperados
- O usuário é impedido de prosseguir sem fornecer todos os dados obrigatórios.
#### Critérios de Aceitação
- Mensagens de erro claras devem ser exibidas ao lado de campos obrigatórios não preenchidos.
- O pedido não deve ser criado.

---

### CT06 - Análise de Crédito - Score Aprovado
#### Objetivo
Validar se a análise de crédito aprova um pedido com score superior a 700.
#### Pré-Condições
- Usuário no Checkout com dados preenchidos válidos e entrada < 50%.
- O CPF/Dados inseridos retornam um Score > 700 na API de crédito.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Clicar em "Finalizar Pedido" | O sistema envia a requisição para análise |
| 2 | Aguardar o retorno da análise | O sistema exibe tela de Confirmação com status "Aprovado" e informa o número do pedido |
#### Resultados Esperados
- O pedido é concluído com sucesso e aprovado.
#### Critérios de Aceitação
- Score > 700 resulta em aprovação imediata (se entrada < 50%).

---

### CT07 - Análise de Crédito - Score Em Análise
#### Objetivo
Validar se a análise de crédito coloca um pedido com score entre 501 e 700 no status "Em análise".
#### Pré-Condições
- Usuário no Checkout com entrada < 50%.
- O CPF/Dados inseridos retornam um Score entre 501 e 700 na API de crédito.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Clicar em "Finalizar Pedido" | O sistema envia a requisição para análise |
| 2 | Aguardar o retorno da análise | O sistema exibe tela de Confirmação com status "Em análise" |
#### Resultados Esperados
- O pedido é registrado, mas o status final para o usuário é "Em análise".
#### Critérios de Aceitação
- Score 501 a 700 deve refletir em status "Em análise".

---

### CT08 - Análise de Crédito - Score Reprovado
#### Objetivo
Validar se a análise de crédito reprova um pedido com score inferior ou igual a 500.
#### Pré-Condições
- Usuário no Checkout com entrada < 50%.
- O CPF/Dados inseridos retornam um Score <= 500 na API de crédito.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Clicar em "Finalizar Pedido" | O sistema envia a requisição para análise |
| 2 | Aguardar o retorno da análise | O sistema exibe tela com status "Reprovado" e impede a conclusão da compra |
#### Resultados Esperados
- A compra não é finalizada e o usuário é notificado da reprovação de crédito.
#### Critérios de Aceitação
- Score <= 500 resulta em reprovação automática, desde que a entrada não seja >= 50%.

---

### CT09 - Análise de Crédito - Exceção de Entrada Maior que 50%
#### Objetivo
Validar se o sistema aprova o pedido independentemente do score de crédito quando o valor de entrada é maior ou igual a 50% do valor total.
#### Pré-Condições
- Veículo configurado no valor de R$ 40.000,00.
- Usuário selecionou pagamento com entrada de R$ 20.000,00 (50%) ou mais.
- O CPF/Dados inseridos retornam um Score <= 500 (que normalmente seria reprovado).
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Clicar em "Finalizar Pedido" | O sistema envia a requisição para processamento |
| 2 | Aguardar retorno | O sistema exibe tela de Confirmação com status "Aprovado" e informa o número do pedido |
#### Resultados Esperados
- O sistema aprova a compra automaticamente devido à regra de exceção da entrada.
#### Critérios de Aceitação
- Entrada >= 50% do total sobrepõe a validação do score de crédito, resultando em aprovação garantida.

---

### CT10 - Confirmação de Pedido
#### Objetivo
Validar se a tela de confirmação exibe todos os dados pertinentes ao pedido após uma compra aprovada.
#### Pré-Condições
- Usuário finalizou uma compra com status de "Aprovado".
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Visualizar a tela de Confirmação | O sistema exibe o número do pedido (`order_number`), resumo do veículo, opcionais, valores totais e forma de pagamento escolhida |
#### Resultados Esperados
- Todas as informações do pedido são visíveis para o cliente conferir.
#### Critérios de Aceitação
- O `order_number` deve ser gerado e exibido claramente na tela de confirmação.

---

### CT11 - Consulta de Pedidos - Sucesso
#### Objetivo
Validar se a consulta de pedidos retorna os dados corretamente mediante o fornecimento de um número de pedido válido.
#### Pré-Condições
- O usuário possui um número de pedido válido (`order_number`).
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Acessar a área de Consulta de Pedidos | A tela apresenta um campo para inserção do número do pedido |
| 2 | Inserir o `order_number` válido e consultar | O sistema busca o pedido e exibe os detalhes corretos associados àquele número |
#### Resultados Esperados
- Os detalhes do pedido são retornados e apresentados em tela para o cliente.
#### Critérios de Aceitação
- A consulta só retorna dados se o `order_number` estiver correto.

---

### CT12 - Consulta de Pedidos - Acesso Negado (Dados Inválidos)
#### Objetivo
Validar se o sistema protege os dados e impede a consulta com número de pedido inválido, vazio ou incorreto.
#### Pré-Condições
- O usuário acessa a área de Consulta de Pedidos.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Tentar consultar com o campo `order_number` vazio | O sistema exige o preenchimento e não realiza a busca |
| 2 | Inserir um `order_number` inexistente e consultar | O sistema informa que o pedido não foi encontrado ou não existe |
#### Resultados Esperados
- Nenhuma informação de pedido é revelada.
#### Critérios de Aceitação
- É obrigatório o número do pedido (`order_number`) correto para consultar e visualizar informações, garantindo a privacidade e segurança de dados do cliente.
