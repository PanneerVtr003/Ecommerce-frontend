// services/authService.js

// Mock authentication service - replace with actual API calls
export const authService = {
async login(email, password) {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        resolve({
          user: { id: 1, name: 'Demo User', email: email },
          token: 'mock-jwt-token'
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
},

async register(userData) {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password) {
        resolve({
          user: { id: Date.now(), name: userData.name, email: userData.email },
          token: 'mock-jwt-token'
        });
      } else {
        reject(new Error('Registration failed'));
      }
    }, 1000);
  });
},

async verifyToken(token) {
  // Simulate token verification
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === 'mock-jwt-token') {
        resolve({ id: 1, name: 'Demo User', email: 'demo@example.com' });
      } else {
        reject(new Error('Invalid token'));
      }
    }, 500);
  });
}
};