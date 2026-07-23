import { Page, expect } from '@playwright/test'
import { Navbar } from '../components/Navbar'

export class HomePage {
  readonly navbar: Navbar

  constructor(private page: Page) {
    this.navbar = new Navbar(page)
  }

  async open() {
    await this.page.goto('http://localhost:5173/')
    await expect(this.page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  }
}
