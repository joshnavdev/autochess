import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as synergyStore } from '../store/services/synergy.service';
// import classNames from 'classnames';
import SynergyActiveItem from './Synergy.active.item';

class SynergyActiveList extends Component {
  getActives = (actives) => {
    const activeSynergies = [];
    Object.keys(actives).forEach((active) => {
      const synergy = this.props.synergies[active];
      const numberActives = actives[active];

      if (numberActives && synergy.active) {
        activeSynergies.push(
          <SynergyActiveItem
            key={`${active}-perks`}
            name={active}
            synergy={synergy}
            numberActives={numberActives}
            image={this.props.images[active + '.png']}
            onClick={() => this.props.setActiveSynergy(active, numberActives)}
          />
        );
      }
    });

    return activeSynergies;
  };

  render() {
    return (
      <div className="synergy-container mt-5">
        <div className="synergy-list">{this.getActives(this.props.actives)}</div>
      </div>
    );
  }
}

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes').heroes,
    actives: getData(state, 'synergies').actives,
    synergies: getData(state, 'synergies').synergies,
    images: getData(state, 'images'),
  };
};
//setActiveSynergy
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveSynergy: (active, count) => dispatch(synergyStore.setActiveSynergy(active, count)),
  };
};

const SynergyActiveListConnected = connect(mapStateToProps, mapDispatchToProps)(SynergyActiveList);
export default SynergyActiveListConnected;
