import React from 'react';
import Chessboard from '../components/Chessboard';
import SynergyActiveList from '../components/Synergy.active.list';
// import FocusedHero from '../components/FocusedHero';
// import FocusedSynergy from '../components/FocusedSynergy';
// import CurrentSynergyList from '../components/Synergy.current.list';
import HeroList from '../components/Hero.list';
import HeroFilters from '../components/HeroFilters';

export const ChessboardView = () => {
  return (
    <div className="grid grid-cols-4 h-screen gap-5">
      <div className="col-span-3 pt-[10px]">
        <Chessboard />
        {/*<CurrentSynergyList type="inactive" />*/}
        {/*<CurrentSynergyList type="active" />*/}
        <SynergyActiveList />
        {/*<FocusedHero />
        <FocusedSynergy />*/}
      </div>
      <div className="flex flex-col h-screen">
        <HeroFilters />
        <div className="overflow-y-auto">
          <HeroList />
        </div>
      </div>
    </div>
  );
};
export default ChessboardView;
