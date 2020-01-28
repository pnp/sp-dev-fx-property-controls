import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Spinner, ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';

export class PropertyPaneHelpers {
  private static propertyPaneElm: HTMLElement = null;
  private static spinnerElm: HTMLElement = null;

  /**
   * Add a spinner for the `loadPropertyPaneResources` method
   */
  public static setSpinner(props?: ISpinnerProps): void {
    this.clearSpinner();
    const className = `.spPropertyPaneContainer`;

    this.waitForElement(className).then(propPanelElm => {
      if (propPanelElm) {
        this.propertyPaneElm = propPanelElm;
        const spinnerElm = document.createElement("div");
        this.spinnerElm = propPanelElm.appendChild(spinnerElm);
        const element: React.ReactElement<ISpinnerProps> = React.createElement(Spinner, {
          ...props
        });
        ReactDom.render(element, propPanelElm);
      }
    });
  }

  /**
   * Clear the spinner from the property pane
   */
  public static clearSpinner(): void {
    // Check if the property pane element exists and remove the styling
    if (this.propertyPaneElm) {
      this.propertyPaneElm = null;
    }
    if (this.spinnerElm) {
      ReactDom.unmountComponentAtNode(this.spinnerElm);
      this.spinnerElm = null;
    }
  }


  /**
   * Waiting until an element exists
   *
   * @param selector
   */
  private static waitForElement(selector: string): Promise<HTMLElement | null> {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);

      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations) => {
        // Timeout
        const timer = setTimeout(() => {
          observer.disconnect();
          resolve(null);
          return;
        }, 5000);

        mutations.forEach((mutation) => {
          const nodes = [].slice.call(mutation.addedNodes);
          for (const node of nodes) {
            if (node.matches && node.matches(selector)) {
              clearTimeout(timer);
              observer.disconnect();
              resolve(node);
              return;
            }
          }
        });
      });

      observer.observe(document.documentElement, { childList: true, subtree: true });
    });
  }
}
