/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  RouterHistory,
} from '@stencil/router';

export namespace Components {
  interface AppCommands {}
  interface AppHome {
    'history': RouterHistory;
  }
  interface AppLogin {
    'history': RouterHistory;
  }
  interface AppMarket {}
  interface AppRoot {}
}

declare global {


  interface HTMLAppCommandsElement extends Components.AppCommands, HTMLStencilElement {}
  var HTMLAppCommandsElement: {
    prototype: HTMLAppCommandsElement;
    new (): HTMLAppCommandsElement;
  };

  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppLoginElement extends Components.AppLogin, HTMLStencilElement {}
  var HTMLAppLoginElement: {
    prototype: HTMLAppLoginElement;
    new (): HTMLAppLoginElement;
  };

  interface HTMLAppMarketElement extends Components.AppMarket, HTMLStencilElement {}
  var HTMLAppMarketElement: {
    prototype: HTMLAppMarketElement;
    new (): HTMLAppMarketElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };
  interface HTMLElementTagNameMap {
    'app-commands': HTMLAppCommandsElement;
    'app-home': HTMLAppHomeElement;
    'app-login': HTMLAppLoginElement;
    'app-market': HTMLAppMarketElement;
    'app-root': HTMLAppRootElement;
  }
}

declare namespace LocalJSX {
  interface AppCommands {}
  interface AppHome {
    'history'?: RouterHistory;
  }
  interface AppLogin {
    'history'?: RouterHistory;
  }
  interface AppMarket {}
  interface AppRoot {}

  interface IntrinsicElements {
    'app-commands': AppCommands;
    'app-home': AppHome;
    'app-login': AppLogin;
    'app-market': AppMarket;
    'app-root': AppRoot;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-commands': LocalJSX.AppCommands & JSXBase.HTMLAttributes<HTMLAppCommandsElement>;
      'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
      'app-login': LocalJSX.AppLogin & JSXBase.HTMLAttributes<HTMLAppLoginElement>;
      'app-market': LocalJSX.AppMarket & JSXBase.HTMLAttributes<HTMLAppMarketElement>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
    }
  }
}

