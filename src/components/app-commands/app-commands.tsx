import { Component, h, State } from '@stencil/core';
import { Order } from '@/repositories/Order';

@Component({
  tag: 'app-commands',
})
export class AppCommands {
  @State() orders: Order[];

  doAction() {}

  render() {
    return [
      <h1 class="is-size-1">Commandes</h1>,
      !this.orders ? (
        <progress class="progress is-primary">Loading...</progress>
      ) : (
        [
          <div class="field">
            <input class="input is-small" type="text" placeholder="Rechercher..." />
          </div>,
          <div class="columns has-border is-border-thick">
            <div class="column">Type</div>
            <div class="column">Demandeur</div>
            <div class="column">Statut</div>
            <div class="column">Séléctionner</div>
            <div class="column"></div>
          </div>,
          this.orders.map(() => (
            <div class="columns">
              <div class="column">
                <label class="checkbox">
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          )),
          <div class="columns">
            <div class="column">
              <button class="button is-primary">Flasher un QR Code</button>
            </div>
            <div class="column has-text-right">
              <button class="button" onClick={() => this.doAction()}>
                Commander
              </button>
            </div>
          </div>,
        ]
      ),
    ];
  }
}
