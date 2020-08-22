import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { EuiInMemoryTable } from "@elastic/eui";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const GET_ACTIONS = gql`
  query GetGameLog($game: bigint!) {
    game_logs(where: { game_id: { _eq: $game } }) {
      player_id
      player_name
      target_id
      target_name
      player_color
      target_color
      action_text
      action_time
      action_type
      game_id
    }
  }
`;

export default function GameView({ game }) {
  const { data, loading, error } = useQuery(GET_ACTIONS, {
    variables: { game }
  });

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

  return (
    <div>
      <EuiInMemoryTable
        items={data.game_logs}
        columns={columns}
        search={search}
      />
    </div>
  );
}
