import { faker } from '@faker-js/faker';

export function generatePatient() {

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const email = faker.internet
    .email({ firstName, lastName })
    .toLowerCase();

  const dateOfBirth = '01-16-2000';

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email,
    dateOfBirth
  };

}
