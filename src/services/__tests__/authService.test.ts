import { AuthService } from '../authService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should register a user and return a token', async () => {
    const token = await authService.register('testuser2', 'password123');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should throw error for duplicate username', async () => {
    await authService.register('testuser3', 'password123');
    await expect(authService.register('testuser3', 'password123')).rejects.toThrow('Username already exists');
  });

  it('should login a user and return a token', async () => {
    await authService.register('testuser4', 'password123');
    const token = await authService.login('testuser4', 'password123');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should throw error for invalid credentials', async () => {
    await expect(authService.login('testuser5', 'wrongpassword')).rejects.toThrow('Invalid credentials');
  });
});