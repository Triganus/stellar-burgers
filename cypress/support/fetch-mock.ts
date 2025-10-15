// Мокирование fetch для тестов
Cypress.on('window:before:load', (win) => {
  // Сохраняем оригинальный fetch
  const originalFetch = win.fetch;
  
  // Создаем мок-функцию
  const mockFetch = (url: string | Request | URL, options?: RequestInit) => {
    const urlString = url.toString();
    
    // Мокируем запрос к ингредиентам
    if (urlString.includes('/api/ingredients')) {
      return cy.fixture('ingredients.json').then((data) => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(data),
          status: 200,
          statusText: 'OK'
        } as Response);
      });
    }
    
    // Мокируем запрос к пользователю
    if (urlString.includes('/api/auth/user')) {
      return cy.fixture('user.json').then((data) => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(data),
          status: 200,
          statusText: 'OK'
        } as Response);
      });
    }
    
    // Мокируем создание заказа
    if (urlString.includes('/api/orders') && options?.method === 'POST') {
      return cy.fixture('order.json').then((data) => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(data),
          status: 200,
          statusText: 'OK'
        } as Response);
      });
    }
    
    // Для всех остальных запросов используем оригинальный fetch
    return originalFetch(url, options);
  };
  
  // Заменяем fetch на мок
  win.fetch = mockFetch;
});
