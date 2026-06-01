import { Page } from '@playwright/test'

export function generateOrderCode(pattern = 'N L N N N L') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    const map = {
      'L': letters,
      'N': numbers
    };
  
    return 'VLO-' + pattern
      .split(' ')
      .map(p => map[p].charAt(Math.floor(Math.random() * map[p].length)))
      .join('');
  }
  

export async function searchOrder(page: Page, orderNumber: string) {
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderNumber)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
}