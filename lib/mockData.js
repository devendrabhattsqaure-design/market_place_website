// Mock Businesses Data
export const mockBusinesses = [
  {
    id: '1',
    name: 'Premium Textiles Co.',
    email: 'contact@textiles.com',
    phone: '+1-800-TEXTILE',
    whatsapp: '+13125551234',
    verified: true,
    verifiedDate: new Date('2024-01-15'),
    rating: 4.8,
    totalSales: 342,
    products: [
      {
        id: '1-1',
        businessId: '1',
        name: 'Organic Cotton Fabric',
        price: 45.99,
        description: 'Premium organic cotton fabric, 100% pure cotton.',
        image: 'https://images.unsplash.com/photo-1599122518889-a0e8ad5f5dbe?w=500',
        createdAt: new Date('2024-02-01'),
      },
    ],
    createdAt: new Date('2023-12-01'),
  },
]

export const mockUsers = [
  {
    id: '1',
    name: 'John Textile',
    email: 'john@textiles.com',
    password: 'hashed_password_1',
    role: 'business',
    businessId: '1',
  },
]