import React from "react";
import Chessboard from "../components/Chessboard";
import SynergyList from "../components/Synergy.list";
import FocusedHero from "../components/FocusedHero";
import FocusedSynergy from "../components/FocusedSynergy";

export const ChessboardView = () => {
  return (
    <div className="chessboard-view">
      <div className="chessboard-container">
        <Chessboard />
      </div>
      <SynergyList />
      <FocusedHero />
      <FocusedSynergy />
    </div>
  );
}
export default ChessboardView;
