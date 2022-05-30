// eslint-disable-next-line import/no-extraneous-dependencies,max-classes-per-file
import { faker } from '@faker-js/faker';

class Address {
  readonly city: string;

  readonly street: string;

  readonly homeNumber: string;

  constructor(city?: string, street?: string, homeNumber?: string) {
    this.city = city;
    this.street = street;
    this.homeNumber = homeNumber;
  }

  random() {
    const city = (this.city === undefined) ? faker.address.city() : this.city;
    const street = (this.street === undefined) ? faker.address.streetAddress() : this.street;
    const homeNumber = (this.homeNumber === undefined) ? faker.phone.phoneNumber()
      : this.homeNumber;
    return new Address(city, street, homeNumber);
  }
}

class UserInfo {
  readonly phone: string;

  readonly email: string;

  readonly address: Address;

  constructor(phone?: string, email?: string, address?: Address) {
    this.phone = phone;
    this.address = address;
    this.email = email;
  }

  random() {
    const phone = (this.phone === undefined) ? faker.phone.phoneNumber() : this.phone;
    const email = (this.email === undefined) ? faker.internet.email() : this.email;
    const address = (this.address === undefined) ? new Address().random() : this.address;
    return new UserInfo(phone, email, address);
  }
}

export default UserInfo;
