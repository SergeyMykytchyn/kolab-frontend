import React, { useContext } from "react";
import "./GroupsGrid.css";
import GroupCard from "../group-card/GroupCard";
import { GroupsContext } from "../../context/GroupsContext"

const GroupsGrid = () => {
  const { groups } = useContext(GroupsContext);
  
  // const gridContainerWidth = window.innerWidth - 17 - 46;
  // const cardWidth = 337;
  // let rows = [];
  // let cards = [];
  // for (let i = 0, j = 0; i < groups.length; i++) {
  //   j++;
  //   if (cardWidth * j > gridContainerWidth) {
  //     rows.push(cards);
  //     cards = [];
  //     j = 1;
  //   }
  //   cards.push(groups[i]);
  //   if (i === groups.length - 1) {
  //     rows.push(cards);
  //   }
  // }

  return (
    <div className="groups-grid-container">
      {groups.map((group) => {
            return <GroupCard key={group.id} group={group} />
      })}
      {/* {rows.map((row, index) => {
        return (
          <div key={`row-${index}`} className="groups-row">
            {row.map((group) => {
              return <GroupCard key={group.id} group={group} />
            })}
          </div>
        )}
      )} */}
    </div>
  );
};

export default GroupsGrid;
