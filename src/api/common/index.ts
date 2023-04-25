import request from '@/config/axios'

// Получить все словари
export const getDictApi = (): Promise<IResponse> => {
  return request.get({ url: '/dict/list' })
}

// Имитировать получение словаря
export const getDictOneApi = async (): Promise<IResponse> => {
  return request.get({ url: '/dict/one' })
}
