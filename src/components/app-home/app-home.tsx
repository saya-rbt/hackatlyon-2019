import { Component, h, State, Prop } from '@stencil/core';
import { user } from '@/services/authentication';
import { getHomeList, getHomeAction, doHomeAction } from '@/services/home';
import { RouterHistory } from '@stencil/router';
import { Appliance } from '@/repositories/Appliance';

@Component({
  tag: 'app-home',
})
export class AppHome {
  @Prop() history: RouterHistory;

  @State() appliances?: Appliance[];

  @State() filter: string = '';
  @State() selected: boolean[] = [];
  @State() opened: boolean[] = [];

  selectStatus!: HTMLSelectElement

  async componentDidLoad() {
    this.appliances = await getHomeList(user);
    this.selected = Array.from({ length: this.appliances.length }, () => false);
    this.opened = Array.from({ length: this.appliances.length }, () => false);
  }

  async doAction() {
    let selected = this.appliances.filter((_, i) => this.selected[i]);
    await doHomeAction(user, selected, this.selectStatus && this.selectStatus.value);

    this.appliances = [...this.appliances];
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

  async handleFilterInput(filter: string) {
    this.filter = filter;
  }

  render() {
    return [
      <h1 class="is-size-1">Liste du matériel</h1>,
      !this.appliances ? (
        <progress class="progress is-primary">Loading...</progress>
      ) : (
        [
          <div class="field">
            <input
              class="input is-small"
              type="text"
              placeholder="Rechercher..."
              onInput={event => this.handleFilterInput((event.target as HTMLInputElement).value)}
            />
          </div>,
          <div class="columns has-border is-border-thick">
            <div class="column">Type</div>
            <div class="column">Référent</div>
            <div class="column">Statut</div>
            <div class="column">Séléctionner</div>
            <div class="column"></div>
          </div>,

          this.appliances.map((appliance, index) => [
            <div
              class={{
                columns: true,
                'has-border': true,
                'has-background-primary': this.selected[index],
              }}
              onClick={() => this.toggleOpened(index)}
            >
              <div class="column">{appliance.ref.name}</div>
              <div class="column">
                {appliance.manager.name} {appliance.manager.surname}
              </div>
              <div class="column">{appliance.status.label}</div>
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
              <div class="column">
                <i class="material-icons">
                  {this.opened[index] ? 'arrow_drop_up' : 'arrow_drop_down'}
                </i>
              </div>
            </div>,
            appliance.ref.criterias.map(({ value, type: { label } }) => [
              <div class={{ columns: true, 'is-hidden': !this.opened[index] }}>
                <div class="column is-1">&nbsp;</div>
                <div class="column">{label}:</div>
                <div class="column">{value}</div>
              </div>,
            ]),
          ]),
          <div class="columns">
            <div class="column">
              <button class="button is-primary">Flasher un QR Code</button>
            </div>
            <div class="column has-text-right">
              {user.role.id_role === 2 && (
                <div class="select">
                  <select ref={el => this.selectStatus = el}>
                    <option value="4">available</option>
                    <option value="5">trashed</option>
                    <option value="6">given</option>
                    <option value="8">acquiring</option>
                  </select>
                </div>
              )}
              <button class="button" onClick={() => this.doAction()}>
                {getHomeAction(user)}
              </button>
            </div>
          </div>
        ]
      ),
    ];
  }
}
