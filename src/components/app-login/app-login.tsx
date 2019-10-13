import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { authenticate } from '@/services/authentication';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
})
export class AppLogin {
  @Prop() history: RouterHistory;

  async authenticate(id: number) {
    await authenticate(id);
    this.history.push('/home');
  }

  render() {
    return [
      <h1 class="is-size-1">Se connecter</h1>,
      <div class="field is-grouped">
        <div class="control">
          <button class="button" onClick={() => this.authenticate(1)}>
            Manager 1
          </button>
        </div>
        <div class="control">
          <button class="button" onClick={() => this.authenticate(4)}>
            Manager 2
          </button>
        </div>
        <div class="control">
          <button class="button" onClick={() => this.authenticate(2)}>
            Assistant
          </button>
        </div>
        <div class="control">
          <button class="button" onClick={() => this.authenticate(3)}>
            DSI
          </button>
        </div>
      </div>
    ];
  }
}
