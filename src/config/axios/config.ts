const config: {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
} = {
  /**
   * api Запросить базовый путь
   */
  base_url: {
    // Префикс интерфейса среды разработки
    base: '',

    // Префикс интерфейса среды разработки пакета
    dev: '',

    // Упакованные префиксы интерфейсов производственной среды
    pro: '',

    // Префиксы интерфейсов упакованной тестовой среды
    test: ''
  },

  /**
   * Код статуса возврата успеха интерфейса
   */
  result_code: '0000',

  /**
   * Таймаут запроса интерфейса
   */
  request_timeout: 30000,

  /**
   * Тип запроса на интерфейс по умолчанию
   * Необязательные значения：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
