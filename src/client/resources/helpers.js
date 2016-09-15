export function populateTitle(props) {
  if (props.route && props.route.props && props.route.props.title) {
    props.onLoad(props.route.props.title, props.route.path);
  } else if (props.title) {
    props.onLoad(props.title);
  } else {
    props.onLoad();
  }
}

// This is here solely to please the linter
// until there is a 2nd export (so we don't have to
// use 'default' in here)
export const PLACEHOLDER = {};
