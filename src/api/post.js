
import axios from '@/axios'

export async function post (form) {
  try {
    const response = await axios.post('/', form)
    return response.data
  } catch (err) {
    console.log('message', err)
    if (err.response) {
      throw Error(err.response.data.message)
    }
    throw err
  }
}

export async function priceList (form) {
  try {
    const response = await axios.post('/priceList', form)
    return response.data
  } catch (err) {
    console.log('message', err)
    if (err.response) {
      throw Error(err.response.data.message)
    }
    throw err
  }
}

export async function status (form) {
  try {
    const response = await axios.post('/status', form)
    return response.data
  } catch (err) {
    console.log('message', err)
    if (err.response) {
      throw Error(err.response.data.message)
    }
    throw err
  }
}

export async function sales (form) {
  try {
    const response = await axios.post('/sales', form)
    return response.data
  } catch (err) {
    console.log('message', err)
    if (err.response) {
      throw Error(err.response.data.message)
    }
    throw err
  }
}
