import { Component, h, State } from '@stencil/core';
import { Appliance, getAvailableAppliance } from '@/repositories/Appliance';
import { orderAppliances } from '@/repositories/Order';

@Component({
  tag: 'app-market',
})
export class AppMarket {
  @State() appliances: Appliance[];

  @State() selected: boolean[] = [];
  @State() opened: boolean[] = [];

  async componentDidLoad() {
    this.appliances = await getAvailableAppliance();
    this.selected = Array.from({ length: this.appliances.length }, () => false);
    this.opened = Array.from({ length: this.appliances.length }, () => false);
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
    let selected = this.appliances.filter((_, i) => this.selected[i]);
    await orderAppliances(selected);

    this.appliances = this.appliances.filter(appliance => !selected.includes(appliance));
  }

  render() {
    return [
      <h1 class="is-size-1">Marché</h1>,
      !this.appliances ? (
        <progress class="progress is-primary">Loading...</progress>
      ) : (
        [
          <div class="field">
            <input class="input is-small" type="text" placeholder="Rechercher..." />
          </div>,
          <div class="columns has-border is-border-thick">
            <div class="column">Type</div>
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
