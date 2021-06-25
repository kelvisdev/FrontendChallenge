import { Tournament } from '../models/tournament.model';
import { TournamentPhaseEnum } from '../enums/tournament-phase.enum';
import { Phase } from '../models/phase.model';

export namespace TournamentMock {
  export const finishedGames: Tournament = {
    listPhases: [
      {
        phaseType: TournamentPhaseEnum.QUARTER_FINALS,
        matches: [
          {
            matchWinnerId: 1,
            teams: [
              {
                id: 1,
                name: 'Team 1'
              },
              {
                id: 2,
                name: 'Team 2'
              }
            ]
          },
          {
            matchWinnerId: 4,
            teams: [
              {
                id: 3,
                name: 'Team 3'
              },
              {
                id: 4,
                name: 'Team 4'
              }
            ]
          },
          {
            matchWinnerId: 5,
            teams: [
              {
                id: 5,
                name: 'Team 5'
              },
              {
                id: 6,
                name: 'Team 6'
              }
            ]
          },
          {
            matchWinnerId: 7,
            teams: [
              {
                id: 7,
                name: 'Team 7'
              },
              {
                id: 8,
                name: 'Team 8'
              }
            ]
          }
        ]
      },
      {
        phaseType: TournamentPhaseEnum.SEMIFINALS,
        matches: [
          {
            matchWinnerId: 1,
            teams: [
              {
                id: 1,
                name: 'Team 1'
              },
              {
                id: 4,
                name: 'Team 4'
              }
            ]
          },
          {
            matchWinnerId: 7,
            teams: [
              {
                id: 5,
                name: 'Team 5'
              },
              {
                id: 7,
                name: 'Team 7'
              }
            ]
          },
        ]
      },
      {
        phaseType: TournamentPhaseEnum.FINAL,
        matches: [
          {
            matchWinnerId: 7,
            teams: [
              {
                id: 1,
                name: 'Team 1'
              },
              {
                id: 7,
                name: 'Team 7'
              }
            ]
          },
        ]
      }
    ]
  }

  export const quarterFinalsGames: Tournament = {
    listPhases: [
      {
        phaseType: TournamentPhaseEnum.QUARTER_FINALS,
        matches: [
          {
            matchWinnerId: 0,
            teams: [
              {
                id: 1,
                name: 'Team 1'
              },
              {
                id: 2,
                name: 'Team 2'
              }
            ]
          },
          {
            matchWinnerId: 0,
            teams: [
              {
                id: 3,
                name: 'Team 3'
              },
              {
                id: 4,
                name: 'Team 4'
              }
            ]
          },
          {
            matchWinnerId: 0,
            teams: [
              {
                id: 5,
                name: 'Team 5'
              },
              {
                id: 6,
                name: 'Team 6'
              }
            ]
          },
          {
            matchWinnerId: 0,
            teams: [
              {
                id: 7,
                name: 'Team 7'
              },
              {
                id: 8,
                name: 'Team 8'
              }
            ]
          }
        ]
      },
      {
        phaseType: TournamentPhaseEnum.SEMIFINALS,
        matches: [
          {
            matchWinnerId: 0,
            teams: [{}, {}]
          },
          {
            matchWinnerId: 0,
            teams: [{}, {}]
          },
        ]
      },
      {
        phaseType: TournamentPhaseEnum.FINAL,
        matches: [
          {
            matchWinnerId: 0,
            teams: [{}, {}]
          },
        ]
      }
    ]
  };

  export const phasesDefault: Array<Phase> = [
    {
      phaseType: TournamentPhaseEnum.SEMIFINALS,
      matches: [
        {
          matchWinnerId: 0,
          teams: [{}, {}]
        },
        {
          teams: [{}, {}]
        },
      ]
    },
    {
      phaseType: TournamentPhaseEnum.FINAL,
      matches: [
        {
          matchWinnerId: 0,
          teams: [{}, {}]
        },
      ]
    }
  ];

  export const semiFinalStageGames: Tournament = {
    listPhases: [
      {
        phaseType: TournamentPhaseEnum.QUARTER_FINALS,
        matches: [
          {
            teams: [
              {
                id: 1,
                name: 'Team 1'
              },
              {
                id: 2,
                name: 'Team 2'
              }
            ]
          },
          {
            teams: [
              {
                id: 3,
                name: 'Team 3'
              },
              {
                id: 4,
                name: 'Team 4'
              }
            ]
          },
          {
            teams: [
              {
                id: 5,
                name: 'Team 5'
              },
              {
                id: 6,
                name: 'Team 6'
              }
            ]
          },
          {
            teams: [
              {
                id: 7,
                name: 'Team 7'
              },
              {
                id: 8,
                name: 'Team 8'
              }
            ]
          }
        ]
      },
      ...phasesDefault
    ]
  }
}
