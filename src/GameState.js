const gameState = {
  id: 0, //lfstats internal game id
  duration: 900, //game full length,
  length: 800, //game actual length - shorter in case of elim
  teams: [
    {
      index: 0, //internal per game team index - this should actually eb the index of the object in the teams array
      color_enum: 1, //color representation
      color_desc: "Red", //Color name
      is_neutral: false, //we dont want to represent this team in display but need it to track hits to bases and such
    },
  ],
  //objects is non player objects in a game, targets, referees
  objects: [
    {
      id: 0, //lfstats internal object id - this should actually be the index of the object in the objects array
      ipl_id: "@0100", //IPL website id...maybe not necessary here
      name: "Red Base",
      team_index: 0, //bases are technically on teams
    },
  ],
  players: [
    {
      id: 1, //lfstats internal player id - also index into the players array
      team_index: 0, //team index
      name: "Maniac", //name used in the game - possibly different thatn current active name
      position: "Commander", //current position
      score: 0, //current score
      shots_left: 0, //current shots left
      lives_left: 0, //current lives left
      missiles_left: 0, //missiles left
      missile_opponent: 5, //number of missiles that hit something
      missile_team: 0, //missiles that hit own team
      missile_base: 0, //missiles on a base
      shots_hit: 100, //how many shots hit something
      shots_fired: 200, //how many shots fired total
      shot_opponent: 100, //shot other team
      shot_team: 5, //shot own team
      shot_3hit: 40, //times shot a opposing 3 hit
      times_zapped: 50, //how many times been hit
      times_missiles: 0, //how many missiles eaten
      nukes_activated: 3, //nukes activated
      nukes_detonated: 2, //nukes detonated
      opp_nukes_canceled: 0, //opponent nukes canceled
      own_nukes_canceled: 0, //own team nukes canceled
      medic_hits: 5, // opponent medic hits
      nuke_medic_hits: 6, //medic lives taken on nukes
      own_medic_hits: 0, //own team medic hits
      rapid_fire: false, // is rapid fire active
      rapid_fire_activated: 0, //number of rapid fires activated
      ammo_boost: 0, //number of ammo boosts activated
      life_boost: 0, //number of life boosts activated
      penalty_count: 0, //number of penalties earned
      resupply_team: 0, //number of times an ammo or medic resupplies a team mate
      ammo_resupplies: 50, //number of times player received ammo
      life_resupplies: 50, //number fo times player recieved lives
      double_resupplies: 50, //number of times player received both ammo and lives within 1 second
      sp_earned: 100, //special points earned
      sp_spent: 80, //special points used
    },
  ],
};
