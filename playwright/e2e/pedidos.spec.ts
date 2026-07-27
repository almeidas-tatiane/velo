import { test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLookupActions'

/// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    await app.orderLookup.open()
    await app.orderLookup.expectLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    // Test Data
    // const order = 'VLO-4T782X'

    const order: OrderDetails = {
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
    await app.orderLookup.searchOrder(order.number)



    // Assert
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)

    // await expect (containerPedido).toContainText(order, { timeout: 10_000 })
    // await expect (page.getByText('APROVADO')).toBeVisible()

    await app.orderLookup.validateOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await app.orderLookup.validateStatusBadge(order.status)

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
    // Para o desafio não removi apenas o data-test-id, mas todo o parágrafo, ficando
    // De <p className="font-mono font-medium" data-test-id="order-resultid"> {searchedOrder.id} </p>
    // Para <div> <p className="text-sm text-muted-foreground">Pedido</p> {searchedOrder.id} </div>
    // Usando a estrategia do codegen
    // await expect(page.getByText('PedidoVLO-4T782X')).toBeVisible({timeout: 10000})
    // await expect(page.getByTestId('order-result-VLO-4T782X')).toContainText('PedidoVLO-4T782X')
    // await expect(page.getByText('APROVADO')).toBeVisible()
    // await expect(page.getByTestId('order-result-VLO-4T782X')).toContainText('APROVADO')

    // Desafio Módulo 2 order-result-id e order-result-status
    // Usando a estrategia do XPath
    // await expect(page.locator('//div[contains(text(),"VLO-4T782X")]')).toBeVisible({timeout: 10000})
    // await expect(page.locator('//div[contains(text(),"VLO-4T782X")]')).toContainText('VLO-4T782X')
    // await expect(page.locator('//div[contains(text(),"APROVADO")]')).toBeVisible({timeout: 10000})
    // await expect(page.locator('//div[contains(text(),"APROVADO")]')).toContainText('APROVADO')

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
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
     await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)


    await app.orderLookup.validateStatusBadge(order.status)
    // const statusBadge = page.getByRole('status').filter({hasText: order.status})

    // await expect(statusBadge).toHaveClass(/bg-red-100/)
    // await expect(statusBadge).toHaveClass(/text-red-700/)

    // const statusIcon = statusBadge.locator('svg')
    // await expect(statusIcon).toHaveClass(/lucide-circle-x/)

  })

  test('deve consultar um pedido em analise', async ({ app }) => {
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
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)

    await app.orderLookup.validateStatusBadge(order.status)
    // const statusBadge = page.getByRole('status').filter({hasText: order.status})

    // await expect(statusBadge).toHaveClass(/bg-amber-100/)
    // await expect(statusBadge).toHaveClass(/text-amber-700/)

    // const statusIcon = statusBadge.locator('svg')
    // await expect(statusIcon).toHaveClass(/lucide-clock-icon/)


  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()


    // Act
    //await searchOrder(page, order)
    await app.orderLookup.searchOrder(order)

    // Assert
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')

    // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3})
    // await expect(title).toBeVisible()

    // const message = page.getByText('Verifique o número do pedido e tente novamente')
    // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
    // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente'})
    // await expect(message).toBeVisible()

    await app.orderLookup.validateOrderNotFound()



  })

  test('deve exibir mensagem quando o pedido em qualquer formato não é encontrado', async ({ app }) => {
    //const order = generateOrderCode()


    // Act
    //await searchOrder(page, order)
    await app.orderLookup.searchOrder('ABC123')

    // Assert
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado')
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')

    // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3})
    // await expect(title).toBeVisible()

    // const message = page.getByText('Verifique o número do pedido e tente novamente')
    // const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
    // const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente'})
    // await expect(message).toBeVisible()

    await app.orderLookup.validateOrderNotFound()



  })

})
