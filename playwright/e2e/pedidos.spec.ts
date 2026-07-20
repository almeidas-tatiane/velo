import { test, expect } from '@playwright/test'
import { generateOrderCode} from '../support/helpers'
import { OrderLockupPage } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)

test.describe('Consulta de Pedido', () => {

  
  test.beforeEach(async ({page}) => {
        // Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })
  
  test('deve consultar um pedido aprovado', async ({ page }) => {
    // Test Data
    // const order = 'VLO-4T782X'

    const order = {
      number: 'VLO-4T782X',
      status: 'APROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Test test',
        email: 'test@test.com.br'
      },
      payment: 'À Vista'
    }
  
  
    // Act
    //await page.locator('input[name="order-id"]').fill('VLO-4T782X')
    //await.page.locater('input[placeholder="Ex: VLO-ABC123"]').fill('VLO-4T782X')
    //await.page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-4T782X')
    // await page.getByLabel('Número do Pedido').fill('VLO-4T782X')
    // await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-4T782X')
    //await page.getByTestId('search-order-button').click()
    // await page.locator('//button[text()="Buscar Pedido"]').click()
    //await searchOrder(page, order.number)
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    
  
    // Assert
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)
  
    // await expect (containerPedido).toContainText(order, { timeout: 10_000 })
    // await expect (page.getByText('APROVADO')).toBeVisible()

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - text: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

      // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)

      // const statusBadge = page.getByRole('status').filter({hasText: order.status})

      // await expect(statusBadge).toHaveClass(/bg-green-100/)
      // await expect(statusBadge).toHaveClass(/text-green-700/)

      // const statusIcon = statusBadge.locator('svg')
      // await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)


    //await page.waitForTimeout(30000) //Thread Sleep do Selenium ou Cypress wait cy.wait(10000), evitar usar, pois toda vez ele ficará parado por esse tempo antes de continuar a execução do teste
    //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000}) // melhor estrategia é usar o timeout explicito para esperar o elemento aparecer, pois ele pode ficar até o tempo do timeout
    //await expect(page.getByTestId('order-result-id')).toContainText('VLO-4T782X')
    //await expect(page.getByTestId('order-result-status')).toBeVisible()
    //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  
  
  
    // Desafio Módulo 2 order-result-id e order-result-status
    // Para o desafio não removi apenas o data-test-id, mas todo o paragrafo, ficando
    // De <p className="font-mono font-medium" data-test-id="order-resultid"> {searchedOrder.id} </p>
    // Para <div> <p className="text-sm text-muted-foreground">Pedido</p> {searchedOrder.id} </div>
    // Usando a estrategia do codegen
    // await expect(page.getByText('PedidoVLO-4T782X')).toBeVisible({timeout: 10000})
    // await expect(page.getByTestId('order-result-VLO-4T782X')).toContainText('PedidoVLO-4T782X')
    // await expect(page.getByText('APROVADO')).toBeVisible()
    // await expect(page.getByTestId('order-result-VLO-4T782X')).toContainText('APROVADO')
  
    // Desafio Módulo 2 order-result-id e order-result-status
    //Usando a estrategia do XPath
    // await expect(page.locator('//div[contains(text(),"VLO-4T782X")]')).toBeVisible({timeout: 10000})
    // await expect(page.locator('//div[contains(text(),"VLO-4T782X")]')).toContainText('VLO-4T782X')
    // await expect(page.locator('//div[contains(text(),"APROVADO")]')).toBeVisible({timeout: 10000})
    // await expect(page.locator('//div[contains(text(),"APROVADO")]')).toContainText('APROVADO')
  
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    // Test Data
    // const order = 'VLO-7GM008'

    const order = {
      number: 'VLO-7GM008',
      status: 'REPROVADO' as const,
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

   
  
    // Act
    //await searchOrder(page, order.number)
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)
    
    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - text: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)
  
      
      await orderLockupPage.validateStatusBadge(order.status)
      // const statusBadge = page.getByRole('status').filter({hasText: order.status})

      // await expect(statusBadge).toHaveClass(/bg-red-100/)
      // await expect(statusBadge).toHaveClass(/text-red-700/)

      // const statusIcon = statusBadge.locator('svg')
      // await expect(statusIcon).toHaveClass(/lucide-circle-x/)

  })

  test('deve consultar um pedido em analise', async ({ page }) => {
    // Test Data
    // const order = 'VLO-7GM008'

    const order = {
      number: 'VLO-TEMJOX',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Joao da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }

   
  
    // Act
    //await searchOrder(page, order.number)
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)
    
    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - text: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

      await orderLockupPage.validateStatusBadge(order.status)
      // const statusBadge = page.getByRole('status').filter({hasText: order.status})

      // await expect(statusBadge).toHaveClass(/bg-amber-100/)
      // await expect(statusBadge).toHaveClass(/text-amber-700/)

      // const statusIcon = statusBadge.locator('svg')
      // await expect(statusIcon).toHaveClass(/lucide-clock-icon/)
  
    
  })
  
  test ('deve exibir mensagem quando o pedido não é encontrado', async({page}) => {
    const order = generateOrderCode()
  
 
    // Act
    //await searchOrder(page, order)
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)
  
    // Assert
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
  
    // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3})
    // await expect(title).toBeVisible()
  
    // const message = page.getByText('Verifique o número do pedido e tente novamente')
    // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
    // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente'})
    // await expect(message).toBeVisible()
  
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
   
  
  
  })

})


