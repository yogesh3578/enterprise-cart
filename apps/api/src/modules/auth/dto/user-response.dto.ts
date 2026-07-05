export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
}