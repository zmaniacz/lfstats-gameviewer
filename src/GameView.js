import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiInMemoryTable,
  EuiEmptyPrompt
} from "@elastic/eui";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const GET_ACTIONS = gql`
  query MyQuery {
    game_actions(
      where: { game_id: { _eq: "7667" } }
      order_by: { action_time: asc }
    ) {
      action_time
      action_type
      action_text
      playerByPlayerId {
        player_name
        id
      }
      playerByTargetId {
        id
        player_name
      }
    }
  }
`;

export default function GameView() {
  const { data, loading, error } = useQuery(GET_ACTIONS);

  if (loading) return "Loading...";
  if (error) return `Error!`;

  const columns = [
    {
      field: "action_time",
      name: "Time",
      render: time => millisToMinutesAndSeconds(time)
    },
    {
      field: "player_name",
      name: "Player Name"
    },
    {
      field: "action_text",
      name: "Action"
    },
    {
      field: "target_name",
      name: "Target Name"
    }
  ];

  const search = {
    box: {
      incremental: true,
      schema: true
    }
  };
  let items = [];
  if (data) {
    items = data.game_actions.map(action => {
      if (action.playerByPlayerId != null) {
        action.player_id = action.playerByPlayerId.id;
        action.player_name = action.playerByPlayerId.player_name;
      }
      if (action.playerByTargetId != null) {
        action.target_id = action.playerByTargetId.id;
        action.target_name = action.playerByTargetId.player_name;
      }
      return action;
    });
  }

  return (
    <div>
      <EuiInMemoryTable items={items} columns={columns} search={search} />
    </div>
  );
}
