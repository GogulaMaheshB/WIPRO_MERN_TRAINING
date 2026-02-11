import React from "react";

class StatsCard extends React.PureComponent {
  render() {
    console.log("Rendering:", this.props.title);
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold">{this.props.title}</h3>
        <p className="text-xl">{this.props.value}</p>
        <small className="text-gray-500">{this.props.lastUpdated}</small>
      </div>
    );
  }
}

export default StatsCard;
