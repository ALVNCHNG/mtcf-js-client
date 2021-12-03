import {
  Auth0User,
  UserResponse,
  UserResponseMinimal,
  UserSortableEntityFields,
} from '../../types/User';

export const isUserResponse = (
  response: UserResponse | UserResponseMinimal
): response is UserResponse => {
  return !!(response as UserResponse).updatedAt;
};

export const isUserResponseMinimal = (
  response: UserResponse | UserResponseMinimal
): response is UserResponseMinimal => {
  return !(response as UserResponse).updatedAt;
};

export const getAuth0UserMapKeys = (): Record<
  UserSortableEntityFields,
  keyof Auth0User
> => ({
  email: 'email',
  firstName: 'given_name',
  lastName: 'family_name',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
