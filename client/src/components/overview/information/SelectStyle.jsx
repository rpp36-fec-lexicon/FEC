import React from 'react';


class SelectStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Style > "Selected Style Name Here" </h3>
          {/* map through styles, getting img id, src url, and handleClick change */}
      </div>
    )
  }
}

export default SelectStyle;