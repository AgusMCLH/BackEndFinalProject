import { encriptPassword } from '../utils/tools/encript.tool.js';

export default class CreateUserDTO {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = encriptPassword(user.password);
    this.role = user.role;
    this.cartId = user.cartId;
  }
}
