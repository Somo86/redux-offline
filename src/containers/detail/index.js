import React from "react";
import PropTypes from 'prop-types';

const DetailBox = ({data}) => {
    return (
      <div>
          <h1>{ data.name }</h1>
          <div>
              <div>
                  <h3>Habilities:</h3>
                  {data.abilities.map((ability, i) => {
                      return <p key={`ability_${i}`}>{ ability.ability.name }</p>;
                  })}
              </div>
          </div>
      </div>
    );
};

class DetailComponent extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            <div onClick={this.props.onClick} className="detail_wrapper">
                <p>Close</p>
                <div>
                    {this.props.data ? <DetailBox data={this.props.data} /> : null}
                </div>
            </div>
        );
    }
}

DetailComponent.propTypes = {
    data: PropTypes.object,
};

export default DetailComponent;