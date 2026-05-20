import { test, expect } from '@playwright/test'


/// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  //await page.locator('input[name="order-id"]').fill('VLO-4T782X')
  //await.page.locater('input[placeholder="Ex: VLO-ABC123"]').fill('VLO-4T782X')
  //await.page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-4T782X')
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-4T782X')
  // await page.getByLabel('Número do Pedido').fill('VLO-4T782X')
 // await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-4T782X')
  //await page.getByTestId('search-order-button').click()
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  // await page.locator('//button[text()="Buscar Pedido"]').click()

  // Assert
  //await page.waitForTimeout(30000) //Thread Sleep do Selenium ou Cypress wait cy.wait(10000), evitar usar, pois toda vez ele ficará parado por esse tempo antes de continuar a execução do teste
  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000}) // melhor estrategia é usar o timeout explicito para esperar o elemento aparecer, pois ele pode ficar até o tempo do timeout
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-4T782X')
  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

  // Desafio Módulo 2 order-result-id e order-result-status
  // Usando a estrategia do codegen
  await expect(page.getByText('PedidoVLO-4T782X')).toBeVisible({timeout: 10000})
  await expect(page.getByTestId('order-result-VLO-4T782X')).toContainText('PedidoVLO-4T782X')
  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.getByTestId('order-result-VLO-4T782X')).toContainText('APROVADO')

  // Desafio Módulo 2 order-result-id e order-result-status
  //Usando a estrategia do XPath
  await expect(page.locator('//div[contains(text(),"VLO-4T782X")]')).toBeVisible({timeout: 10000})
  await expect(page.locator('//div[contains(text(),"VLO-4T782X")]')).toContainText('VLO-4T782X')
  await expect(page.locator('//div[contains(text(),"APROVADO")]')).toBeVisible({timeout: 10000})
  await expect(page.locator('//div[contains(text(),"APROVADO")]')).toContainText('APROVADO')



})