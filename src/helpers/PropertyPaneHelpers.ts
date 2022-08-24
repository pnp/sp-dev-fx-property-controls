import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneSpinner } from '../common/propertyPaneSpinner';
import { ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';

export interface IPropertyPaneSpinner {
  /**
   * Spinner background color
   */
  bgColor?: string;
  /**
   * Class name
   */
  className?: string;
  /**
   * Office UI Fabric spinner properties
   */
  spinnerProps?: ISpinnerProps;
}

export class PropertyPaneHelpers {
  private static propertyPaneElm: HTMLElement = null;
  private static spinnerElm: Element = null;

  /**
   * Add a spinner for the `loadPropertyPaneResources` method
   */
  public static setSpinner(props?: IPropertyPaneSpinner): void {
    this.clearSpinner();
    const className = `.spPropertyPaneContainer`;

    this.waitForElement(className).then(propPanelElm => {
      if (propPanelElm) {
        this.propertyPaneElm = propPanelElm;
        const spinnerElm = document.createElement("div");
        spinnerElm.style.height = "100%";
        spinnerElm.style.backgroundColor = props && props.bgColor ? props.bgColor : "rgba(255, 255, 255, 0.8)";
        spinnerElm.style.zIndex = "99";
        spinnerElm.style.position = "relative";
        if (props && props.className) {
          spinnerElm.classList.add(className);
        }
        this.spinnerElm = propPanelElm.appendChild(spinnerElm);
        const element: React.ReactElement<ISpinnerProps> = React.createElement(PropertyPaneSpinner, props && props.spinnerProps);
        ReactDom.render(element, this.spinnerElm);
      }
    }).catch(() => { /* no-op; */ });
  }

  /**
   * Clear the spinner from the property pane
   */
  public static clearSpinner(delay: number = 0): void {
    if (delay <= 0) {
      // Check if the property pane element exists and remove the styling
      if (this.propertyPaneElm) {
        this.propertyPaneElm = null;
      }
      if (this.spinnerElm) {
        this.spinnerElm.remove();
        this.spinnerElm = null;
      }
    } else {
      setTimeout(() => {
        this.clearSpinner();
      }, delay);
    }
  }


  /**
   * Waiting until an element exists
   *
   * @param selector
   */
  private static waitForElement(selector: string): Promise<HTMLElement | null> {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector) as HTMLElement;

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
