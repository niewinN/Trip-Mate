import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phone: Yup.string().matches(/^\d{9}$/, 'Phone number must be 9 digits').required('Phone is required'),
});

describe('SignUpForm validation', () => {
  it('validates correct data', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '123456789',
    };

    await expect(validationSchema.validate(validData)).resolves.toBeTruthy();
  });

  it('invalidates incorrect email format', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '123456789',
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow('Invalid email format');
  });

  it('invalidates non-matching passwords', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'differentpassword',
      phone: '123456789',
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow('Passwords must match');
  });

  it('invalidates incorrect phone number format', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '12345',
    };

    await expect(validationSchema.validate(invalidData)).rejects.toThrow('Phone number must be 9 digits');
  });
});
