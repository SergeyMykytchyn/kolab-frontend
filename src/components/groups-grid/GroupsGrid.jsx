import React from "react";
import "./GroupsGrid.css";
import GroupCard from "../group-card/GroupCard";

const GroupsGrid = ({ groups }) => {
  const gridContainerWidth = window.innerWidth - 17 - 46;
  const cardWidth = 337;
  let rows = [];
  let cards = [];
  for (let i = 0, j = 0; i < groups.length; i++) {
    j++;
    if (cardWidth * j > gridContainerWidth) {
      // i === 8 ? console.log()
      console.log(i);
      console.log(j);
      console.log(cards);
      rows.push(cards);
      cards = [];
      j = 1;
    }
    cards.push(groups[i]);
    if (i === groups.length - 1) {
      rows.push(cards);
    }
  }
  console.log(rows);
  return (
    <div className="groups-grid-container">
      {/* go containers to second line if they do not fit */}
      {rows.map((row) => {
        return (
          <div className="groups-row">
            {row.map((group) => {
              return <GroupCard group={group} />
            })}
          </div>
        )}
      )}
    </div>
  );
};

export default GroupsGrid;
