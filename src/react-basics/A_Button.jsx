// import classnames from "classnames";
import React from "react";

export default class A_Button extends React.Component {
  render() {
    const { text, isOn, type, handleClick } = this.props;

    // const classes = classnames({
    //   A_Button: true,
    //   active: isOn,
    //   [`${type}`]: true,
    // });

    return (
      <div className="A_Button" onClick={handleClick}>
        {text}
      </div>
    );
  }
}
