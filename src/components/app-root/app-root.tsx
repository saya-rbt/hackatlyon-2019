import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <div>
        <nav class="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <stencil-route-link class="navbar-item" url="/home">
              <img src="../../assets/arc-logo_dark.png" />
            </stencil-route-link>

            <a
              role="button"
              class="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="main-navbar"
            >
              {/* TODO State navbar open */}
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="main-navbar" class="navbar-menu">
            <div class="navbar-start">
              <stencil-route-link class="navbar-item" url="/login">
                Login
              </stencil-route-link>
              <stencil-route-link class="navbar-item" url="/commands">
                Commandes
              </stencil-route-link>
              <stencil-route-link class="navbar-item" url="/market">
                Marché
              </stencil-route-link>
            </div>
          </div>
        </nav>

        <main class="container">
          <stencil-router titleSuffix=" - ARC">
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/home" component="app-home" exact={true} />
              <stencil-route url="/market" component="app-market" exact={true} />
              <stencil-route url="/commands" component="app-commands" exact={true} />
              <stencil-route url="/login" component="app-login" exact={true} />
              <stencil-route-redirect url="/login" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
