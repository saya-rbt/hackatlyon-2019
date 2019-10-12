import { Component, h, State } from '@stencil/core';
import { getUser, User } from '@/repositories/user';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
  shadow: true,
})
export class AppLogin {
  @State() user?: User;

  async componentWillLoad() {
    this.user = await getUser(1);
    console.log(this.user);
  }

  render() {
    <div class="field is-grouped">
      <div class="control">
        <button class="button">Manager 1</button>
      </div>
      <div class="control">
        <button class="button">Manager 2</button>
      </div>
      <div class="control">
        <button class="button">Assistant</button>
      </div>
      <div class="control">
        <button class="button">DSI</button>
      </div>
    </div>
  };
}
