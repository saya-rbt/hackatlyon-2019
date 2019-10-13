import { Component, h, State } from '@stencil/core';
import { Order } from '@/repositories/Order';
import { user } from '@/services/authentication';
import { getCommandList, getCommandAction, doCommandAction } from '@/services/command';

@Component({
  tag: 'app-commands',
})
export class AppCommands {
  @State() orders: Order[];

  @State() selected: boolean[];
  @State() opened: boolean[];

  selectStep!: HTMLSelectElement;

  async componentDidLoad() {
    this.orders = await getCommandList(user);
    this.selected = Array.from({ length: this.orders.length }, () => false);
    this.opened = Array.from({ length: this.orders.length }, () => false);
  }

  toggleSelected(index: number) {
    this.selected = [
      ...this.selected.slice(0, index),
      !this.selected[index],
      ...this.selected.slice(index + 1),
    ];
  }

  toggleOpened(index: number) {
    this.opened = [
      ...this.opened.slice(0, index),
      !this.opened[index],
      ...this.opened.slice(index + 1),
    ];
  }

  async doAction() {
    let selected = this.orders.filter((_, i) => this.selected[i]);
    await doCommandAction(user, selected, this.selectStep && this.selectStep.value);

    this.orders = [...this.orders];
  }

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
            <div class="column">Demandeur</div>
            <div class="column">Etape</div>
            {user.role.id_role !== 1 && <div class="column">Sélectionner</div>}
            <div class="column"></div>
          </div>,
          this.orders.map((order, index) => [
            <div
              class={{ columns: true, 'has-background-primary': this.selected[index] }}
              onClick={() => this.toggleOpened(index)}
            >
              <div class="column">
                {order.asker.name} {order.asker.surname}
              </div>
              <div class="column">{order.requestStep.label}</div>
              {user.role.id_role !== 1 && (
                <div class="column">
                  <label class="checkbox">
                    <input
                      type="checkbox"
                      onClick={event => {
                        event.stopPropagation();
                        this.toggleSelected(index);
                      }}
                    />
                  </label>
                </div>
              )}

              <div class="column">
                <i class="material-icons">
                  {this.opened[index] ? 'arrow_drop_up' : 'arrow_drop_down'}
                </i>
              </div>
            </div>,
            order.appliances.map(({ appliance }) => [
              <div
                class={{
                  columns: true,
                  'has-border': true,
                  'is-hidden': !this.opened[index],
                }}
                onClick={() => this.toggleOpened(index)}
              >
                <div class="column">{appliance.ref.name}</div>
              </div>,
              appliance.ref.criterias.map(({ value, type: { label } }) => (
                <div class={{ columns: true, 'is-hidden': !this.opened[index] }}>
                  <div class="column is-1">&nbsp;</div>
                  <div class="column">{label}:</div>
                  <div class="column">{value}</div>
                </div>
              )),
            ]),
          ]),
        ]
      ),
      user.role.id_role === 2 && (
        <div class="select">
          <select ref={el => (this.selectStep = el)}>
            <option value="2">accepted</option>
            <option value="3">delivering</option>
            <option value="4">delivered</option>
            <option value="5">refused</option>
            <option value="6">bad address</option>
            <option value="7">lost</option>
          </select>
        </div>
      ),
      user.role.id_role !== 1 && (
        <button class="button" onClick={() => this.doAction()}>
          {getCommandAction(user)}
        </button>
      ),
    ];
  }
}
