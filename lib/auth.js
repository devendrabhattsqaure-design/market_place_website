import { mockUsers } from './mockData'

export function loginUser(email, password) {
  const user = mockUsers.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  if (password.length < 6) {
    return { success: false, error: 'Invalid password' }
  }

  const { password: _, ...userWithoutPassword } = user
  return { success: true, user: userWithoutPassword }
}

export function registerBusiness(
  name,
  email,
  phone,
  businessName,
  whatsapp,
  password
) {
  if (mockUsers.find((u) => u.email === email)) {
    return { success: false, error: 'Email already registered' }
  }

  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    name: businessName,
    email,
    password,
    role: 'business',
  }

  mockUsers.push(newUser)

  const { password: _, ...userWithoutPassword } = newUser
  return { success: true, user: userWithoutPassword }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  const userData = localStorage.getItem('user')
  return userData ? JSON.parse(userData) : null
}

export function setCurrentUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

export function isBusinessUser() {
  const user = getCurrentUser()
  return user?.role === 'business'
}