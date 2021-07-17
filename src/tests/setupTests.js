import { unmountComponentAtNode } from "react-dom";


export default function setupTests(test) {
  let settings = {container: null};
  beforeEach(() => {
    // setup a DOM element as a render target
    settings.container = document.createElement("div");
    document.body.appendChild(settings.container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(settings.container);
    settings.container.remove();
    settings.container = null;
  });

  test(settings);
}
