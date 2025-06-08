import * as Icons from '../components/icons';
export const TestActions = [
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0001-missiongroup',
      guid: 'mirconst-guid-0000-0001-missiongroup',
      name: 'Move',
      style: {
        icon: <Icons.Move />,
        color: '#2563EB',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/move',
          action_type: 'move',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Move to %(position)s',
          parameters: [
            {
              id: 'position',
              type: 'Reference',
              help: 'Select a position from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Position',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: 'IN',
                      fieldname: 'type_id',
                      value: [
                        0, 1, 5, 7, 9, 11, 13, 16, 18, 20, 22, 25, 26, 42,
                      ],
                    },
                  ],
                },
                value_field: 'guid',
                name_field: 'name',
                url: '/positions/search',
                choices: [
                  {
                    name: 'Config position',
                    value: 'mirconst-guid-0000-0001-positions000',
                  },
                  {
                    name: 'BB',
                    value: '30cc460e-753a-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'TT',
                    value: 'c4139848-753a-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'CC',
                    value: '4dcef373-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'DD',
                    value: '54654780-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'EE',
                    value: '5d3e56fc-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'Tram24V',
                    value: '9c2a3648-753c-11ed-938a-000129af8ea5',
                  },
                  {
                    name: '11',
                    value: '3c2019b8-753e-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'B',
                    value: '44953d6a-75d8-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'C',
                    value: '52085258-75d8-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'A',
                    value: 'f304ebe4-75dd-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'An_Charger',
                    value: 'b2ee0882-75e5-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'An_map_p0',
                    value: 'e4d8727e-75ff-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'target',
                    value: '1d7298ee-7601-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'A_Target',
                    value: 'a2cd0818-7602-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'B_target',
                    value: 'bdecbfba-7602-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'C-Target',
                    value: 'fd25935f-7605-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'Charge24V',
                    value: '9b14fb01-760d-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'D_Charger',
                    value: 'e8496d27-760d-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'An_P5',
                    value: '9685989c-760e-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'BB',
                    value: 'd1e5dfc5-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'AA',
                    value: 'da0f0fbe-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'CB',
                    value: 'fea2fe00-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'SAC',
                    value: '02321c0c-7c5e-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'CC',
                    value: '5c37f64b-7c5f-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'T8-1',
                    value: '333eab23-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-2',
                    value: '4d7d2e5f-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-3',
                    value: '5b8ba886-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-4',
                    value: '62d07eeb-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-5',
                    value: '689bed41-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-6',
                    value: '6e09b7b2-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-7',
                    value: '7a4ed5a1-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-8',
                    value: '8e6e23ff-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-9',
                    value: '95d8e087-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-10',
                    value: '9e488359-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-11',
                    value: 'ac9143f9-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-12',
                    value: 'b5a5ddc2-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-13',
                    value: 'bbc7cca7-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-14',
                    value: 'c10d432b-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-15',
                    value: 'c7a46485-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-16',
                    value: 'd2a28fff-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-17',
                    value: 'd9eb6590-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-18',
                    value: 'e294cbab-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-19',
                    value: 'e7a681b1-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-20',
                    value: 'f1d79500-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-21',
                    value: '0caad605-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-21',
                    value: '1e78320d-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-22',
                    value: '224afb5f-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-23',
                    value: '29120490-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-24',
                    value: '3057844c-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-25',
                    value: '3551f800-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-26',
                    value: '3aa66d2e-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-27',
                    value: '3e1fe98d-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-28',
                    value: '423c3835-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-29',
                    value: '4af2c2c1-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-30',
                    value: '5660e500-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-31',
                    value: '5d4f3b65-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-32',
                    value: '6275f161-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'Test',
                    value: '1e38a391-2c64-11ee-831f-000129af8ea5',
                  },
                  {
                    name: 'P1-811',
                    value: '9fcefb39-4436-11ee-b236-000129af8ea5',
                  },
                  {
                    name: 'P2-811',
                    value: 'a84a69e1-4436-11ee-b236-000129af8ea5',
                  },
                  {
                    name: 'T8-P1',
                    value: '5b25ce57-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P2',
                    value: '62a538ce-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P3',
                    value: '69d5903d-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P4',
                    value: '71adfab2-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'sac2',
                    value: '58f888b8-f33d-11ee-9e69-000129af8ea5',
                  },
                  {
                    name: 'so3',
                    value: '38d8d4e4-00a5-11ef-9f0a-000129af8ea5',
                  },
                  {
                    name: 'so0',
                    value: 'f992a818-0ba2-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'quay0',
                    value: '8e7c88b8-0ba8-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'lt',
                    value: 'f0901fb9-0bb1-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'vv',
                    value: 'a17855c3-0bb2-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'u',
                    value: 'a0088120-0ed6-11ef-b5a1-000129af8ea5',
                  },
                  {
                    name: 't',
                    value: 'bfa9d5b0-0ed6-11ef-b5a1-000129af8ea5',
                  },
                  {
                    name: 'sac',
                    value: '1cc8e001-16ae-11ef-bf45-000129af8ea5',
                  },
                  {
                    name: 't',
                    value: 'b94b9d9d-1c16-11ef-ad01-000129af8ea5',
                  },
                  {
                    name: 'q',
                    value: 'e2ab486c-1dbd-11ef-af25-000129af8ea5',
                  },
                  {
                    name: 'K',
                    value: '814aecbe-2198-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'k1',
                    value: '25836735-219a-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'k2',
                    value: '3bd4716e-219a-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'rt',
                    value: '9e1c6d5f-2a45-11ef-999a-000129af8ea5',
                  },
                  {
                    name: 'oo',
                    value: '1a3b9736-2a48-11ef-999a-000129af8ea5',
                  },
                  {
                    name: 'ghgh',
                    value: 'e24b0aa0-2c97-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P1',
                    value: '353db769-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'V',
                    value: '8042b20a-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'L',
                    value: 'a8a164f8-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'VL',
                    value: 'c993a862-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P2',
                    value: 'f0ea9301-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'Sac',
                    value: '0c5ef5c0-2c9a-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P3',
                    value: '2f50eedd-2c9f-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'p1',
                    value: '4c70e81a-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'p2',
                    value: '525fbf77-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '1',
                    value: '73b2310d-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '2',
                    value: '937a0993-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '3',
                    value: 'a15f7eb7-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '4',
                    value: 'adfc3e19-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '4',
                    value: 'b92cb902-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'Lay hang',
                    value: '8e12fe5c-3063-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D1',
                    value: 'e321ba74-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'p1',
                    value: 'e84a204c-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D2',
                    value: 'ed1db1c1-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D3',
                    value: 'ff7be74c-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D4',
                    value: '0641d386-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D5',
                    value: '16beb100-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D6',
                    value: '1dddce57-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Sac612',
                    value: '2cfd8aae-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Nhan hang',
                    value: '7af709e9-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Chờ',
                    value: 'b9c2fd4d-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Nhan hang 1',
                    value: 'e3c0b651-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Lay hang 1',
                    value: '2a76eda6-3079-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'v1',
                    value: 'a163310b-3b70-11ef-9f22-000129af8ea5',
                  },
                  {
                    name: 'vl1',
                    value: '582087be-3b96-11ef-893b-000129af8ea5',
                  },
                  {
                    name: 'VL_ss',
                    value: 'df58719b-3dc0-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: '10m20mvl',
                    value: '0ba39922-3dd4-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: '10m',
                    value: '39f173fa-3dd4-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: 'Charge Dock',
                    value: '1c1caf15-fa81-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 1',
                    value: '1eaf4128-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 3',
                    value: '29fda235-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 4',
                    value: '30399fa7-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 5',
                    value: 'f6b12465-fa8a-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 7',
                    value: '7ec3d7b9-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 8',
                    value: '8e836b5f-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 9',
                    value: '94f6370f-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 2',
                    value: '197221dd-fe93-11ef-9736-000129af8ea5',
                  },
                  {
                    name: 'position 11',
                    value: '0c9ca3a6-0bc2-11f0-8046-000129af8ea5',
                  },
                  {
                    name: 'Position 15',
                    value: '528e2602-0fcc-11f0-8cf1-000129af8ea5',
                  },
                  {
                    name: 'pos1',
                    value: '6aaf9bbb-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'pos2',
                    value: '828afebe-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'pos5',
                    value: 'd036fd32-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'start',
                    value: 'ced89ad0-3645-11f0-adb5-000129af8ea5',
                  },
                  {
                    name: 'start',
                    value: '54ee8fed-364f-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'end',
                    value: '5ad67969-365b-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint',
                    value: '7b3fea9a-365b-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint2',
                    value: '91c7bc28-3667-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint4',
                    value: 'd854749c-3667-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'G',
                    value: 'd54cb40a-366d-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'dock',
                    value: '0de20099-3670-11f0-b3f0-000129af8ea5',
                  },
                ],
                method: 'POST',
              },
            },
            {
              help: 'Select a position, <b>Entry</b> or <b>Main</b>, from the list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Cart position',
              dependencies: [
                {
                  dependency_id: 'position',
                  value: [1],
                  check_field: 'type_id',
                },
              ],
              type: 'Selection',
              id: 'cart_entry_position',
              constraints: {
                default: 'main',
                choices: [
                  {
                    name: 'Main',
                    value: 'main',
                  },
                  {
                    name: 'Front',
                    value: 'entry',
                  },
                  {
                    name: 'Left',
                    value: 'left',
                  },
                  {
                    name: 'Right',
                    value: 'right',
                  },
                ],
              },
            },
            {
              help: 'Select a position, <b>Entry</b> or <b>Main</b>, from the list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Position type',
              dependencies: [
                {
                  dependency_id: 'position',
                  value: [5, 22],
                  check_field: 'type_id',
                },
              ],
              type: 'Selection',
              id: 'main_or_entry_position',
              constraints: {
                default: 'main',
                choices: [
                  {
                    name: 'Main',
                    value: 'main',
                  },
                  {
                    name: 'Entry',
                    value: 'entry',
                  },
                ],
              },
            },
            {
              help: 'Select a position, <b>Entry</b> or <b>Main</b>, from the list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Position type',
              dependencies: [
                {
                  dependency_id: 'position',
                  value: [7, 9, 11, 13, 16, 18, 20, 24],
                  check_field: 'type_id',
                },
              ],
              type: 'Selection',
              id: 'marker_entry_position',
              constraints: {
                default: 'entry',
                choices: [
                  {
                    name: 'Entry',
                    value: 'entry',
                  },
                ],
              },
            },
            {
              id: 'retries',
              type: 'Integer',
              help: 'Set the number of times the robot should try to reach the position if the path is blocked, or select the <b>XYZ</b> icon to define a variable. If, after the set number of retries, the path is still blocked, the robot stops and produces an error message.',
              name: 'Retries (Blocked Path)',
              constraints: {
                default: 10,
                max: 1000,
                min: 0,
              },
            },
            {
              id: 'distance_threshold',
              type: 'Float',
              help: 'Depending on how accurately the robot is required to position itself on the goal position, the threshold can be increased or decreased. The default is 0.1 m.',
              name: 'Distance threshold',
              constraints: {
                default: 0.1,
                max: 3,
                min: 0.1,
              },
            },
          ],
          help: 'A Move action defines a map position the robot should move to.',
          action_type: 'move',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Move',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/adjust_localization',
          action_type: 'adjust_localization',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Adjust localization of robot',
          parameters: [],
          help: 'An Adjust localization action adjusts the robot to the correct position on the map. This is useful if it has to move through an area with many dynamic obstacles where the localization is likely to drift.',
          action_type: 'adjust_localization',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Adjust localization',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/switch_map',
          action_type: 'switch_map',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Switch map to position %(entry_position)s',
          parameters: [
            {
              id: 'entry_position',
              type: 'Reference',
              help: '<p>In the  map you are switching to, select the position  the robot should start from after the map transition, or select the <b>XYZ</b> icon to define a variable.</p><p>The <b>Switch map</b> action must be preceded by a <b>Move</b> action to the position in the current map that physically overlaps the Entry position in the other map that the robot is switching to. The overlap of the these two positions in the physical area is important for the robot to localize itself in the new map.</p>',
              name: 'Entry Position',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: 'IN',
                      fieldname: 'type_id',
                      value: [0, 1, 5, 25],
                    },
                  ],
                },
                value_field: 'guid',
                name_field: 'name',
                url: '/positions/search',
                choices: [
                  {
                    name: 'Config position',
                    value: 'mirconst-guid-0000-0001-positions000',
                  },
                  {
                    name: 'BB',
                    value: '30cc460e-753a-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'TT',
                    value: 'c4139848-753a-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'CC',
                    value: '4dcef373-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'DD',
                    value: '54654780-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'EE',
                    value: '5d3e56fc-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: '11',
                    value: '3c2019b8-753e-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'B',
                    value: '44953d6a-75d8-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'C',
                    value: '52085258-75d8-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'A',
                    value: 'f304ebe4-75dd-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'An_map_p0',
                    value: 'e4d8727e-75ff-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'target',
                    value: '1d7298ee-7601-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'A_Target',
                    value: 'a2cd0818-7602-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'B_target',
                    value: 'bdecbfba-7602-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'C-Target',
                    value: 'fd25935f-7605-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'An_P5',
                    value: '9685989c-760e-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'BB',
                    value: 'd1e5dfc5-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'AA',
                    value: 'da0f0fbe-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'CB',
                    value: 'fea2fe00-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'CC',
                    value: '5c37f64b-7c5f-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'T8-1',
                    value: '333eab23-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-2',
                    value: '4d7d2e5f-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-3',
                    value: '5b8ba886-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-4',
                    value: '62d07eeb-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-5',
                    value: '689bed41-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-6',
                    value: '6e09b7b2-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-7',
                    value: '7a4ed5a1-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-8',
                    value: '8e6e23ff-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-9',
                    value: '95d8e087-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-10',
                    value: '9e488359-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-11',
                    value: 'ac9143f9-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-12',
                    value: 'b5a5ddc2-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-13',
                    value: 'bbc7cca7-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-14',
                    value: 'c10d432b-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-15',
                    value: 'c7a46485-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-16',
                    value: 'd2a28fff-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-17',
                    value: 'd9eb6590-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-18',
                    value: 'e294cbab-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-19',
                    value: 'e7a681b1-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-20',
                    value: 'f1d79500-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-21',
                    value: '0caad605-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-21',
                    value: '1e78320d-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-22',
                    value: '224afb5f-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-23',
                    value: '29120490-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-24',
                    value: '3057844c-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-25',
                    value: '3551f800-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-26',
                    value: '3aa66d2e-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-27',
                    value: '3e1fe98d-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-28',
                    value: '423c3835-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-29',
                    value: '4af2c2c1-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-30',
                    value: '5660e500-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-31',
                    value: '5d4f3b65-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-32',
                    value: '6275f161-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'Test',
                    value: '1e38a391-2c64-11ee-831f-000129af8ea5',
                  },
                  {
                    name: 'P1-811',
                    value: '9fcefb39-4436-11ee-b236-000129af8ea5',
                  },
                  {
                    name: 'P2-811',
                    value: 'a84a69e1-4436-11ee-b236-000129af8ea5',
                  },
                  {
                    name: 'T8-P1',
                    value: '5b25ce57-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P2',
                    value: '62a538ce-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P3',
                    value: '69d5903d-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P4',
                    value: '71adfab2-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'so3',
                    value: '38d8d4e4-00a5-11ef-9f0a-000129af8ea5',
                  },
                  {
                    name: 'so0',
                    value: 'f992a818-0ba2-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'quay0',
                    value: '8e7c88b8-0ba8-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'u',
                    value: 'a0088120-0ed6-11ef-b5a1-000129af8ea5',
                  },
                  {
                    name: 't',
                    value: 'bfa9d5b0-0ed6-11ef-b5a1-000129af8ea5',
                  },
                  {
                    name: 'k1',
                    value: '25836735-219a-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'k2',
                    value: '3bd4716e-219a-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'P1',
                    value: '353db769-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P2',
                    value: 'f0ea9301-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P3',
                    value: '2f50eedd-2c9f-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'p1',
                    value: '4c70e81a-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'p2',
                    value: '525fbf77-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'D1',
                    value: 'e321ba74-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'p1',
                    value: 'e84a204c-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D2',
                    value: 'ed1db1c1-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D3',
                    value: 'ff7be74c-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D4',
                    value: '0641d386-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D5',
                    value: '16beb100-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D6',
                    value: '1dddce57-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: '10m',
                    value: '39f173fa-3dd4-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: 'Position 1',
                    value: '1eaf4128-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 3',
                    value: '29fda235-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 4',
                    value: '30399fa7-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 5',
                    value: 'f6b12465-fa8a-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 7',
                    value: '7ec3d7b9-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 8',
                    value: '8e836b5f-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 9',
                    value: '94f6370f-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 2',
                    value: '197221dd-fe93-11ef-9736-000129af8ea5',
                  },
                  {
                    name: 'position 11',
                    value: '0c9ca3a6-0bc2-11f0-8046-000129af8ea5',
                  },
                  {
                    name: 'Position 15',
                    value: '528e2602-0fcc-11f0-8cf1-000129af8ea5',
                  },
                  {
                    name: 'pos1',
                    value: '6aaf9bbb-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'pos2',
                    value: '828afebe-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'pos5',
                    value: 'd036fd32-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'start',
                    value: 'ced89ad0-3645-11f0-adb5-000129af8ea5',
                  },
                  {
                    name: 'start',
                    value: '54ee8fed-364f-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'end',
                    value: '5ad67969-365b-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint',
                    value: '7b3fea9a-365b-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint2',
                    value: '91c7bc28-3667-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint4',
                    value: 'd854749c-3667-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'G',
                    value: 'd54cb40a-366d-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'dock',
                    value: '0de20099-3670-11f0-b3f0-000129af8ea5',
                  },
                ],
                method: 'POST',
              },
            },
          ],
          help: 'A Switch map action is required if the robot needs to switch automatically from one map to another within a mission. The maps must have overlapping areas where the robot can locate itself in the physical environment. Switch map actions are the basis for Transitions (<b>Setup</b> > <b>Transitions</b>), which handle map switches automatically once they are set up. ',
          action_type: 'switch_map',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Switch map',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/docking',
          action_type: 'docking',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Dock to %(marker)s',
          parameters: [
            {
              id: 'marker',
              type: 'Reference',
              help: 'Select a marker from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Marker position',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: 'IN',
                      fieldname: 'type_id',
                      value: [5, 7, 9, 11, 13, 16, 18, 20, 22],
                    },
                  ],
                },
                value_field: 'guid',
                null_option: 'Current position',
                nullable: true,
                url: '/positions/search',
                name_field: 'name',
                choices: [
                  {
                    name: 'Tram24V',
                    value: '9c2a3648-753c-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'An_Charger',
                    value: 'b2ee0882-75e5-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'Charge24V',
                    value: '9b14fb01-760d-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'D_Charger',
                    value: 'e8496d27-760d-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'SAC',
                    value: '02321c0c-7c5e-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'sac2',
                    value: '58f888b8-f33d-11ee-9e69-000129af8ea5',
                  },
                  {
                    name: 'lt',
                    value: 'f0901fb9-0bb1-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'vv',
                    value: 'a17855c3-0bb2-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'sac',
                    value: '1cc8e001-16ae-11ef-bf45-000129af8ea5',
                  },
                  {
                    name: 't',
                    value: 'b94b9d9d-1c16-11ef-ad01-000129af8ea5',
                  },
                  {
                    name: 'q',
                    value: 'e2ab486c-1dbd-11ef-af25-000129af8ea5',
                  },
                  {
                    name: 'K',
                    value: '814aecbe-2198-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'rt',
                    value: '9e1c6d5f-2a45-11ef-999a-000129af8ea5',
                  },
                  {
                    name: 'oo',
                    value: '1a3b9736-2a48-11ef-999a-000129af8ea5',
                  },
                  {
                    name: 'ghgh',
                    value: 'e24b0aa0-2c97-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'V',
                    value: '8042b20a-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'L',
                    value: 'a8a164f8-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'VL',
                    value: 'c993a862-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'Sac',
                    value: '0c5ef5c0-2c9a-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '1',
                    value: '73b2310d-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '2',
                    value: '937a0993-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '3',
                    value: 'a15f7eb7-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '4',
                    value: 'adfc3e19-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: '4',
                    value: 'b92cb902-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'Lay hang',
                    value: '8e12fe5c-3063-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Sac612',
                    value: '2cfd8aae-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Nhan hang',
                    value: '7af709e9-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Chờ',
                    value: 'b9c2fd4d-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Nhan hang 1',
                    value: 'e3c0b651-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'Lay hang 1',
                    value: '2a76eda6-3079-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'v1',
                    value: 'a163310b-3b70-11ef-9f22-000129af8ea5',
                  },
                  {
                    name: 'vl1',
                    value: '582087be-3b96-11ef-893b-000129af8ea5',
                  },
                  {
                    name: 'VL_ss',
                    value: 'df58719b-3dc0-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: '10m20mvl',
                    value: '0ba39922-3dd4-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: 'Charge Dock',
                    value: '1c1caf15-fa81-11ef-b058-000129af8ea5',
                  },
                ],
                method: 'POST',
              },
            },
            {
              help: 'Select a marker type from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Marker type',
              dependencies: [
                {
                  dependency_id: 'marker',
                  check_field: 'type_id',
                  value: [5],
                },
                {
                  dependency_id: 'marker',
                  value: null,
                },
              ],
              type: 'Reference',
              id: 'marker_type',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: '=',
                      fieldname: 'pos_id',
                      value: null,
                    },
                  ],
                },
                value_field: 'guid',
                name_field: 'name',
                url: '/docking_offsets/search',
                choices: [
                  {
                    name: 'Narrow asymmetric MiR500/1000 shelf',
                    value: 'mirconst-guid-0000-0001-marker000001',
                  },
                  {
                    name: 'Wide asymmetric MiR500/1000 shelf',
                    value: 'mirconst-guid-0000-0001-marker000002',
                  },
                  {
                    name: 'Narrow symmetric MiR500/1000 shelf',
                    value: 'mirconst-guid-0000-0001-marker000003',
                  },
                  {
                    name: 'Wide symmetric MiR500/1000 shelf',
                    value: 'mirconst-guid-0000-0001-marker000004',
                  },
                  {
                    name: 'Asymmetric MiR250 shelf',
                    value: 'mirconst-guid-0000-0001-marker000005',
                  },
                  {
                    name: 'L_maker_creat',
                    value: '0385e692-16b1-11ef-bf45-000129af8ea5',
                  },
                ],
                method: 'POST',
              },
            },
            {
              help: 'Set the number of times the robot should try to reach the position if the path is blocked, or select the <b>XYZ</b> icon to define a variable. If, after the set number of retries, the path is still blocked, the robot stops and produces an error message.',
              name: 'Retries (Blocked Path)',
              dependencies: [
                {
                  dependency_id: 'marker',
                  check_field: 'type_id',
                  value: [5, 7, 9, 11, 13, 16, 18, 20, 22, 24],
                },
              ],
              type: 'Integer',
              id: 'retries',
              constraints: {
                default: 10,
                max: 1000,
                min: 0,
              },
            },
            {
              id: 'max_linear_speed',
              type: 'Float',
              help: 'Enter a value in meters per second for the maximum forward or backward speed during the <b>Relative move</b>, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Maximum linear speed',
              constraints: {
                default: 0.25,
                max: 0.5,
                min: 0.1,
              },
            },
          ],
          help: 'A Docking action sends the robot to dock to a marker.',
          action_type: 'docking',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Docking',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/relative_move',
          action_type: 'relative_move',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description:
            '<b>Relative move</b>: X: %(x)f Y: %(y)f Orientation: %(orientation)f',
          parameters: [
            {
              id: 'x',
              type: 'Float',
              help: 'Enter a value in meters for how much the robot should move forward or backward from its current position. A positive value moves the robot forward, and a negative value moves it backward. Select the <b>XYZ </b>icon if you want to define a variable.',
              name: 'X',
              constraints: {
                default: 0,
                max: 5,
                min: -5,
              },
            },
            {
              id: 'y',
              type: 'Float',
              help: 'Enter a value in meters for how much the robot should move left or right from its current position. A positive value moves the robot to the right and a negative value moves it to the left. Select the <b>XYZ </b>icon if you want to define a variable.',
              name: 'Y',
              constraints: {
                default: 0,
                max: 1,
                min: -1,
              },
            },
            {
              id: 'orientation',
              type: 'Float',
              help: 'Enter a value in degrees for how much the robot should turn (yaw) when finalizing the <b>Relative move</b>. A positive value moves it counterclockwise, and a negative value moves it clockwise. Select the <b>XYZ </b>icon if you want to define a variable.',
              name: 'Orientation',
              constraints: {
                default: 0,
                max: 180,
                min: -180,
              },
            },
            {
              id: 'max_linear_speed',
              type: 'Float',
              help: 'Enter a value in meters per second for the maximum forward or backward speed during the <b>Relative move</b>, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Maximum linear speed',
              constraints: {
                default: 0.25,
                max: 0.5,
                min: 0.1,
              },
            },
            {
              id: 'max_angular_speed',
              type: 'Float',
              help: 'Enter a value in meters per second for the maximum turning speed during the <b>Relative move</b>, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Maximum angular speed',
              constraints: {
                default: 0.25,
                max: 1,
                min: 0.15,
              },
            },
            {
              id: 'collision_detection',
              type: 'Boolean',
              help: '<p>Select the check box to turn on automatic Collision detection. \n\n</p><p>Collision detection makes the robot look for obstacles while it executes the action, and the robot will either stop or slow down to avoid colliding with the obstacle. Once the obstacle is no longer in the way, the robot will finish the action.</p><p>In most situations we recommend enabling Collision detection, but in cases where the robot needs to turn around its own center in tight spaces, it can be a good idea to disable it to prevent the robot from stopping when it gets too close to surrounding obstacles or walls.</p><p><b>Note!</b> Collision detection is not a safety function. If a person enters the Protective field of the robot while Collision detection is disabled, the robot will still enter Protective stop.</p>',
              name: 'Collision detection',
              constraints: {
                default: true,
              },
            },
          ],
          help: 'A Relative move action defines an X and a Y distance you want the robot to move and an orientation you want it to turn relative to its current position.  A Relative move can be used, for example, to undock a robot from a marker.',
          action_type: 'relative_move',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Relative move',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/planner_settings',
          action_type: 'planner_settings',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Changing %(planner_params)s',
          parameters: [
            {
              id: 'planner_params',
              type: 'Selection',
              help: '<p><b>Desired speed</b>:  sets the desired speed of the robot while it runs this mission.  </p><p><b>Path deviation</b>: sets the maximum distance the robot is allowed to deviate from its path before it generates a new path. Setting the value to 0 means no deviation is allowed.</p><p><b>Path timeout</b> sets the amount of time the robot will wait for the path to clear before generating a new one. If you set the value to -1 the robot will wait indefinitely for obstacles to move out of its way instead of generating a new path.</p><p><b>Obstacle history clearing</b> sets how the robot will clear its obstacle history during driving. The available options are, <b>No clearing</b>, <b>Clear all</b>, <b>Clear in front of robot</b>.</p>',
              name: 'Planner settings',
              constraints: {
                default: 'desired_speed_key',
                choices: [
                  {
                    name: 'Desired speed',
                    value: 'desired_speed_key',
                  },
                  {
                    name: 'Path Timeout',
                    value: 'path_timeout_key',
                  },
                  {
                    name: 'Path Deviation',
                    value: 'path_deviation_key',
                  },
                  {
                    name: 'Obstacle history clearing',
                    value: 'obstacle_history',
                  },
                ],
              },
            },
            {
              help: 'Set the speed of the robot in meters per second.',
              name: 'Value',
              dependencies: [
                {
                  dependency_id: 'planner_params',
                  value: 'desired_speed_key',
                },
              ],
              type: 'Float',
              id: 'desired_speed',
              constraints: {
                default: 0.8,
                max: 1.5,
                min: 0.1,
              },
            },
            {
              help: 'New path will be created after this time (in seconds). Note! Negative value disables the feature.',
              name: 'Value',
              dependencies: [
                {
                  dependency_id: 'planner_params',
                  value: 'path_timeout_key',
                },
              ],
              type: 'Float',
              id: 'path_timeout',
              constraints: {
                default: 5,
                max: 300,
                min: -1,
              },
            },
            {
              help: "Enter the maximum distance in meters that the robot's local plan is allowed to deviate from the global plan. Enter a negative value to disable the feature.",
              name: 'Value',
              dependencies: [
                {
                  dependency_id: 'planner_params',
                  value: 'path_deviation_key',
                },
              ],
              type: 'Float',
              id: 'path_deviation',
              constraints: {
                default: 5,
                max: 300,
                min: -1,
              },
            },
            {
              help: '',
              name: 'Value',
              dependencies: [
                {
                  dependency_id: 'planner_params',
                  value: 'obstacle_history',
                },
              ],
              type: 'Selection',
              id: 'obstacle_history',
              constraints: {
                default: 'no_clearing',
                choices: [
                  {
                    name: 'No clearing',
                    value: 'no_clearing',
                  },
                  {
                    name: 'Clear in front of robot',
                    value: 'clear_in_front',
                  },
                  {
                    name: 'Clear all',
                    value: 'clear_all',
                  },
                ],
              },
            },
          ],
          help: '<p>A Planner settings action allows you to set the desired speed of the robot, to change the settings for how much the robot is allowed to deviate from its planned path, and to set how it should filter out obstacles when driving. </p><p> Path deviation and obstacle clearing can be used, for example, if you want your robot to follow its path without it attempting to maneuver around any dynamic obstacles, the so-called Line-following mode.</p>',
          action_type: 'planner_settings',
          descriptions: [
            {
              text: 'Set desired speed to %(desired_speed)f m/s',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'planner_params',
                  value: 'desired_speed_key',
                },
              ],
            },
            {
              text: 'Set path timeout to %(path_timeout)f secs',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'planner_params',
                  value: 'path_timeout_key',
                },
              ],
            },
            {
              text: 'Set maximum path deviation to %(path_deviation)f m',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'planner_params',
                  value: 'path_deviation_key',
                },
              ],
            },
          ],
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Planner settings',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/check_pose',
          action_type: 'check_pose',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description:
            'Check whether %(position)s is %(option)s with timeout %(timeout)s',
          parameters: [
            {
              id: 'position',
              type: 'Reference',
              help: 'Select a position from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Position',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: 'IN',
                      fieldname: 'type_id',
                      value: [0, 1, 5, 18, 42],
                    },
                  ],
                },
                value_field: 'guid',
                null_option: 'Current position',
                nullable: true,
                default: null,
                name_field: 'name',
                choices: [
                  {
                    name: 'Config position',
                    value: 'mirconst-guid-0000-0001-positions000',
                  },
                  {
                    name: 'BB',
                    value: '30cc460e-753a-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'TT',
                    value: 'c4139848-753a-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'CC',
                    value: '4dcef373-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'DD',
                    value: '54654780-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'EE',
                    value: '5d3e56fc-753b-11ed-938a-000129af8ea5',
                  },
                  {
                    name: '11',
                    value: '3c2019b8-753e-11ed-938a-000129af8ea5',
                  },
                  {
                    name: 'B',
                    value: '44953d6a-75d8-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'C',
                    value: '52085258-75d8-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'A',
                    value: 'f304ebe4-75dd-11ed-9fb2-000129af8ea5',
                  },
                  {
                    name: 'An_map_p0',
                    value: 'e4d8727e-75ff-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'target',
                    value: '1d7298ee-7601-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'A_Target',
                    value: 'a2cd0818-7602-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'B_target',
                    value: 'bdecbfba-7602-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'C-Target',
                    value: 'fd25935f-7605-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'An_P5',
                    value: '9685989c-760e-11ed-a088-000129af8ea5',
                  },
                  {
                    name: 'BB',
                    value: 'd1e5dfc5-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'AA',
                    value: 'da0f0fbe-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'CB',
                    value: 'fea2fe00-7c5c-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'CC',
                    value: '5c37f64b-7c5f-11ed-8c6e-000129af8ea5',
                  },
                  {
                    name: 'T8-1',
                    value: '333eab23-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-2',
                    value: '4d7d2e5f-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-3',
                    value: '5b8ba886-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-4',
                    value: '62d07eeb-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-5',
                    value: '689bed41-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-6',
                    value: '6e09b7b2-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-7',
                    value: '7a4ed5a1-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-8',
                    value: '8e6e23ff-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-9',
                    value: '95d8e087-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-10',
                    value: '9e488359-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-11',
                    value: 'ac9143f9-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-12',
                    value: 'b5a5ddc2-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-13',
                    value: 'bbc7cca7-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-14',
                    value: 'c10d432b-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-15',
                    value: 'c7a46485-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-16',
                    value: 'd2a28fff-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-17',
                    value: 'd9eb6590-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-18',
                    value: 'e294cbab-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-19',
                    value: 'e7a681b1-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-20',
                    value: 'f1d79500-175d-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-21',
                    value: '0caad605-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-21',
                    value: '1e78320d-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-22',
                    value: '224afb5f-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-23',
                    value: '29120490-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-24',
                    value: '3057844c-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-25',
                    value: '3551f800-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-26',
                    value: '3aa66d2e-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-27',
                    value: '3e1fe98d-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-28',
                    value: '423c3835-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-29',
                    value: '4af2c2c1-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-30',
                    value: '5660e500-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-31',
                    value: '5d4f3b65-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'T8-32',
                    value: '6275f161-175e-11ee-8393-000129af8ea5',
                  },
                  {
                    name: 'Test',
                    value: '1e38a391-2c64-11ee-831f-000129af8ea5',
                  },
                  {
                    name: 'P1-811',
                    value: '9fcefb39-4436-11ee-b236-000129af8ea5',
                  },
                  {
                    name: 'P2-811',
                    value: 'a84a69e1-4436-11ee-b236-000129af8ea5',
                  },
                  {
                    name: 'T8-P1',
                    value: '5b25ce57-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P2',
                    value: '62a538ce-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P3',
                    value: '69d5903d-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'T8-P4',
                    value: '71adfab2-47f3-11ee-89b0-000129af8ea5',
                  },
                  {
                    name: 'so3',
                    value: '38d8d4e4-00a5-11ef-9f0a-000129af8ea5',
                  },
                  {
                    name: 'so0',
                    value: 'f992a818-0ba2-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'quay0',
                    value: '8e7c88b8-0ba8-11ef-86e2-000129af8ea5',
                  },
                  {
                    name: 'u',
                    value: 'a0088120-0ed6-11ef-b5a1-000129af8ea5',
                  },
                  {
                    name: 't',
                    value: 'bfa9d5b0-0ed6-11ef-b5a1-000129af8ea5',
                  },
                  {
                    name: 'k1',
                    value: '25836735-219a-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'k2',
                    value: '3bd4716e-219a-11ef-bbf9-000129af8ea5',
                  },
                  {
                    name: 'P1',
                    value: '353db769-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P2',
                    value: 'f0ea9301-2c99-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'P3',
                    value: '2f50eedd-2c9f-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'p1',
                    value: '4c70e81a-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'p2',
                    value: '525fbf77-2ca6-11ef-95a5-000129af8ea5',
                  },
                  {
                    name: 'D1',
                    value: 'e321ba74-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'p1',
                    value: 'e84a204c-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D2',
                    value: 'ed1db1c1-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D3',
                    value: 'ff7be74c-3077-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D4',
                    value: '0641d386-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D5',
                    value: '16beb100-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: 'D6',
                    value: '1dddce57-3078-11ef-b04e-000129af8ea5',
                  },
                  {
                    name: '10m',
                    value: '39f173fa-3dd4-11ef-90c2-000129af8ea5',
                  },
                  {
                    name: 'Position 1',
                    value: '1eaf4128-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 3',
                    value: '29fda235-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 4',
                    value: '30399fa7-fa89-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 5',
                    value: 'f6b12465-fa8a-11ef-b058-000129af8ea5',
                  },
                  {
                    name: 'Position 7',
                    value: '7ec3d7b9-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 8',
                    value: '8e836b5f-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 9',
                    value: '94f6370f-fb37-11ef-a27c-000129af8ea5',
                  },
                  {
                    name: 'Position 2',
                    value: '197221dd-fe93-11ef-9736-000129af8ea5',
                  },
                  {
                    name: 'position 11',
                    value: '0c9ca3a6-0bc2-11f0-8046-000129af8ea5',
                  },
                  {
                    name: 'Position 15',
                    value: '528e2602-0fcc-11f0-8cf1-000129af8ea5',
                  },
                  {
                    name: 'pos1',
                    value: '6aaf9bbb-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'pos2',
                    value: '828afebe-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'pos5',
                    value: 'd036fd32-1f8e-11f0-ac01-000129af8ea5',
                  },
                  {
                    name: 'start',
                    value: 'ced89ad0-3645-11f0-adb5-000129af8ea5',
                  },
                  {
                    name: 'start',
                    value: '54ee8fed-364f-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'end',
                    value: '5ad67969-365b-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint',
                    value: '7b3fea9a-365b-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint2',
                    value: '91c7bc28-3667-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'waypoint4',
                    value: 'd854749c-3667-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'G',
                    value: 'd54cb40a-366d-11f0-b3f0-000129af8ea5',
                  },
                  {
                    name: 'dock',
                    value: '0de20099-3670-11f0-b3f0-000129af8ea5',
                  },
                ],
                url: '/positions/search',
                method: 'POST',
              },
            },
            {
              help: 'Enter a value in meters for how much the robot should check in front of or behind its current position, for example, 1 for 1 meter forwards or -1 for 1 meter backwards, or select the <b>XYZ </b>icon to define a variable.',
              name: 'X',
              dependencies: [
                {
                  dependency_id: 'position',
                  value: null,
                },
              ],
              type: 'Float',
              id: 'x',
              constraints: {
                default: 0,
                max: 1000000,
                min: -1000000,
              },
            },
            {
              help: 'Enter a value in meters for how much the robot should check to the left or to the right of its current position, for example, 1 for 1 meter to the right or -1 for 1 meter to the left, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Y',
              dependencies: [
                {
                  dependency_id: 'position',
                  value: null,
                },
              ],
              type: 'Float',
              id: 'y',
              constraints: {
                default: 0,
                max: 1000000,
                min: -1000000,
              },
            },
            {
              help: 'Enter the orientation in degrees, that is the way the robot should turn relatively to the 0-orientation when arriving on the position, or select the <b>XYZ </b>icon to define a variable. A positive value rotates the robot counterclockwise, and a negative value rotates it clockwise.',
              name: 'Orientation',
              dependencies: [
                {
                  dependency_id: 'position',
                  value: null,
                },
              ],
              type: 'Float',
              id: 'orientation',
              constraints: {
                default: 0,
                max: 180,
                min: -180,
              },
            },
            {
              id: 'option',
              type: 'Selection',
              help: 'Select if the robot should check if a position is empty or occupied, or select the <b>XYZ </b>icon to define a variable',
              name: 'Option',
              constraints: {
                default: 'free',
                choices: [
                  {
                    name: 'Free',
                    value: 'free',
                  },
                  {
                    name: 'Occupied',
                    value: 'occupied',
                  },
                ],
              },
            },
            {
              id: 'timeout',
              type: 'Duration',
              help: 'Enter the maximum time during which the robot checks the position status. If the position status does not match the option selected for this position and the time expires, the robot shows an error.',
              name: 'Timeout (seconds)',
              constraints: {
                default: null,
                max: '01:00:00.000000',
                null_option: 'Forever',
                nullable: true,
                min: '00:00:01.000000',
              },
            },
          ],
          help: '<p>A Check position status action makes the robot check the status of a position or marker for a given amount of time. Positions and markers can be in the states <b>free</b> or <b>occupied</b>.</p><p>If the condition in the action is satisfied, the robot continues executing the mission. Otherwise, the robot reports an error.<br/></p><p>Example: Use this action for the following purposes:</p><ul><li>Check whether the load is on the pallet rack before docking to the rack.<p><b>Note!</b> This feature only works for pallet racks with the same dimensions as the pallet racks designed by MiR.</p></li><li>Check whether the cart is in position before picking it up with the hook.</li><li>Check whether the target position is free.</li></ul>',
          action_type: 'check_pose',
          descriptions: [
            {
              text: 'Check whether X=%(x)f Y=%(y)f Orientation=%(orientation)f is %(option)s with timeout %(timeout)s',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'position',
                  value: null,
                },
              ],
            },
            {
              text: 'Check whether %(position)s is %(option)s with timeout %(timeout)s',
              conditions: [
                {
                  operator: '!=',
                  parameter_id: 'position',
                  value: null,
                },
              ],
            },
          ],
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Check position status',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/move_to_position',
          action_type: 'move_to_position',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Move to X: %(x)f Y: %(y)f Orientation: %(orientation)f',
          parameters: [
            {
              id: 'x',
              type: 'Float',
              help: 'Enter the X (horizontal) map position the robot should move to, or select the <b>XYZ</b> icon to define a variable.',
              name: 'X',
              constraints: {
                default: 0,
                max: 1000000,
                min: -1000000,
              },
            },
            {
              id: 'y',
              type: 'Float',
              help: 'Enter the Y (vertical) map position the robot should move to, or select the XYZ icon to define a variable.',
              name: 'Y',
              constraints: {
                default: 0,
                max: 1000000,
                min: -1000000,
              },
            },
            {
              id: 'orientation',
              type: 'Float',
              help: 'Enter the orientation in degrees, that is the way the robot should turn relatively to the 0-orientation when arriving on the position, or select the <b>XYZ </b>icon to define a variable. A positive value rotates the robot counterclockwise, and a negative value rotates it clockwise.',
              name: 'Orientation',
              constraints: {
                default: 0,
                max: 180,
                min: -180,
              },
            },
            {
              id: 'retries',
              type: 'Integer',
              help: 'Set the number of times the robot should try to reach the position if the path is blocked, or select the <b>XYZ</b> icon to define a variable. If, after the set number of retries, the path is still blocked, the robot stops and produces an error message.',
              name: 'Retries (Blocked Path)',
              constraints: {
                default: 10,
                max: 1000,
                min: 0,
              },
            },
            {
              id: 'distance_threshold',
              type: 'Float',
              help: 'Depending on how accurately the robot is required to position itself on the goal position, the threshold can be increased or decreased.',
              name: 'Distance threshold',
              constraints: {
                default: 0.1,
                max: 3,
                min: 0.1,
              },
            },
          ],
          help: "<p>A Move to coordinate action defines an X, Y position on the map the robot should move to. The map's origin  (the 0.0 position with 0 orientation) is located at the point where the robot began mapping.</p><p>If you don't know the map's origin, you can create a fixed position with those values as a reference point.</p>",
          action_type: 'move_to_position',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Move to coordinate',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/set_footprint',
          action_type: 'set_footprint',
          style: {
            icon: <Icons.Move />,
            color: '#2563EB',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Set footprint to %(footprint)s.',
          parameters: [
            {
              id: 'footprint',
              type: 'Reference',
              help: 'Select a footprint, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Footprint',
              constraints: {
                value_field: 'guid',
                null_option: 'Default footprint',
                nullable: true,
                url: '/footprints',
                name_field: 'name',
                choices: [
                  {
                    name: 'MiR100-200',
                    value: 'mirconst-guid-0000-0001-footprint000',
                  },
                  {
                    name: 'MiRHook100-200',
                    value: 'mirconst-guid-0000-0001-footprint001',
                  },
                  {
                    name: 'MiR500-1000',
                    value: 'mirconst-guid-0000-0001-footprint002',
                  },
                  {
                    name: 'Narrow MiR500/1000 shelf footprint',
                    value: 'mirconst-guid-0000-0001-footprint003',
                  },
                  {
                    name: 'Wide MiR500/1000 shelf footprint',
                    value: 'mirconst-guid-0000-0001-footprint004',
                  },
                  {
                    name: 'MiR250',
                    value: 'mirconst-guid-0000-0001-footprint005',
                  },
                  {
                    name: 'MiR250 Dynamic',
                    value: 'mirconst-guid-0000-0001-footprint006',
                  },
                  {
                    name: 'MiR250 shelf footprint',
                    value: 'mirconst-guid-0000-0001-footprint007',
                  },
                  {
                    name: 'MiRHook250',
                    value: 'mirconst-guid-0000-0001-footprint008',
                  },
                  {
                    name: 'MiR600-1350',
                    value: 'mirconst-guid-0000-0001-footprint009',
                  },
                  {
                    name: 'Narrow MiR600/1350 shelf footprint',
                    value: 'mirconst-guid-0000-0001-footprint010',
                  },
                  {
                    name: 'Wide MiR600/1350 shelf footprint',
                    value: 'mirconst-guid-0000-0001-footprint011',
                  },
                ],
                method: 'GET',
              },
            },
          ],
          help: "A Set footprint action makes it possible to change the robot's default footprint. This can be necessary, for example, if the robot carries a top module with larger proportions than the robot's own or you want to extend the footprint when the robot tows a cart. The footprint is shown as a shadow around the robot on the map.",
          action_type: 'set_footprint',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0001-missiongroup',
          name: 'Set footprint',
        },
      },
    ],
  },
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0002-missiongroup',
      guid: 'mirconst-guid-0000-0002-missiongroup',
      name: 'Battery',
      style: {
        icon: <Icons.Move />,
        color: '#2A7378',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/charging',
          action_type: 'charging',
          style: {
            icon: <Icons.Move />,
            color: '#2A7378',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Charging',
          parameters: [
            {
              id: 'minimum_time',
              type: 'Duration',
              help: '<p>Set a minimum amount of time the robot should charge before it moves on, or select the <b>XYZ</b> icon to define a variable. The system will compare the set minimum time with the minimum percentage, and when the first of those two requirements is fulfilled, the mission continues.</p><p>You may skip defining a minimum time by selecting the<b> Ignore value </b>check box. The robot will then charge until the minimum battery percentage level is reached.</p>',
              name: 'Minimum Time',
              constraints: {
                default: '00:10:00.000000',
                max: '24:59:59.000000',
                null_option: 'Ignore value',
                nullable: true,
                min: '00:00:00.000000',
              },
            },
            {
              id: 'minimum_percentage',
              type: 'Float',
              help: 'Enter the minimum battery percentage the robot should charge to before it moves on, or select the <b>XYZ </b>icon to define a variable. The system will compare the set minimum percentage with the minimum time, and when the first of those two requirements is fulfilled, the mission continues. You may skip defining a minimum percentage by selecting the <b>Ignore value</b> check box. The robot will then charge until the minimum charge time is reached.',
              name: 'Minimum Percentage',
              constraints: {
                default: 25,
                max: 100,
                null_option: 'Ignore value',
                nullable: true,
                min: 0,
              },
            },
            {
              id: 'charge_until_new_mission',
              type: 'Boolean',
              help: '<p>Select this check box if you want the robot to continue charging until it receives a new mission. If selected, the robot stays in the charging station until it receives a new mission, but not until at least one of the criteria for minimum time or minimum percentage is reached.</p><p>If deselected, the robot leaves the charging station when either of the two charging criteria are reached regardless of queued missions.</p>',
              name: 'Charge until new mission in queue',
              constraints: {
                default: false,
              },
            },
          ],
          help: '<p>A Charging action is used to make the robot go to a charging station for automatic battery recharge. The action is defined by setting a minimum charging time and a minimum charging percentage. When the first of those are reached, the action is completed. For example, if you set the minimum time to 30 minutes and the minimum percentage to 80%, the robot will charge for minimum 30 minutes or until it reaches a battery level of 80%. You may also choose to ignore either time or percentage.</p><p>A Charging action must be preceded by a Docking action where the robot moves to a previously defined charging marker in front of the charging station.</p>',
          action_type: 'charging',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0002-missiongroup',
          name: 'Charging',
        },
      },
    ],
  },
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0003-missiongroup',
      guid: 'mirconst-guid-0000-0003-missiongroup',
      name: 'Logic',
      style: {
        icon: <Icons.Move />,
        color: '#9333EA',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/prompt_user',
          action_type: 'prompt_user',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Prompt user: %(question)s',
          parameters: [
            {
              id: 'question',
              type: 'String',
              help: 'Write a question which can be answered with a yes or a no, or select the <b>XYZ</b> icon to define a variable. ',
              name: 'Question',
              constraints: {
                default: '',
                min_length: 1,
                max_length: 255,
              },
            },
            {
              id: 'user_group',
              type: 'Reference',
              help: 'Select which User group the mission is intended for, or select the <b>XYZ</b> icon to define a variable.',
              name: 'User group',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: 'NOT IN',
                      fieldname: 'guid',
                      value: [
                        'mirconst-guid-0000-0001-user_groups0',
                        'mirconst-guid-0000-0002-user_groups0',
                      ],
                    },
                  ],
                },
                value_field: 'guid',
                name_field: 'name',
                url: '/user_groups/search',
                choices: [
                  {
                    name: 'Distributor',
                    value: 'mirconst-guid-0000-0003-user_groups0',
                  },
                  {
                    name: 'Administrator',
                    value: 'mirconst-guid-0000-0004-user_groups0',
                  },
                  {
                    name: 'Users',
                    value: 'mirconst-guid-0000-0005-user_groups0',
                  },
                ],
                method: 'POST',
              },
            },
            {
              id: 'timeout',
              type: 'Duration',
              help: 'Set a timeout for when the robot should continue if the user does not answer the question. If the timeout is reached, the robot will execute the actions in the Timeout scope.',
              name: 'Timeout (seconds)',
              constraints: {
                default: '00:05:00.000000',
                max: '24:00:00.000000',
                min: '00:00:00.000000',
              },
            },
            {
              id: 'yes',
              type: 'Scope',
              help: '',
              name: 'Yes',
              constraints: {},
            },
            {
              id: 'no',
              type: 'Scope',
              help: '',
              name: 'No',
              constraints: {},
            },
            {
              id: 'timeout_scope',
              type: 'Scope',
              help: '',
              name: 'Timeout (seconds)',
              constraints: {},
            },
          ],
          help: 'A Prompt user action can be used when it is required to stop and ask the operator what the next step in the mission should be. The action consists of a Yes action, a No action, and a Time-out action. The operator will be asked, for example, “Do you want to go to position X?”. If the operator answers Yes, the robot will go to position X. If the operator answers No, the robot will carry on to the defined No action, for example, move to an alternative position. If the operator does not answer yes or no within a given time, the Time-out action will be executed, for example, sending an email.',
          action_type: 'prompt_user',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Prompt user',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/if',
          action_type: 'if',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'If %(compare)s %(operator)s %(value)f',
          parameters: [
            {
              id: 'compare',
              type: 'Selection',
              help: 'Select either <b>Battery Percentage</b>, <b>PLC Register</b>, <b>Pending Missions</b>, or <b>I/O input</b>, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Compare',
              constraints: {
                default: 'battery',
                choices: [
                  {
                    name: 'Battery Percentage',
                    value: 'battery',
                  },
                  {
                    name: 'PLC Register',
                    value: 'plc_register',
                  },
                  {
                    name: 'Pending missions',
                    value: 'mission_queue_length',
                  },
                  {
                    name: 'I/O input',
                    value: 'io_module',
                  },
                ],
              },
            },
            {
              help: 'For I/O inputs, select an I/O module from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Module',
              dependencies: [
                {
                  dependency_id: 'compare',
                  value: 'io_module',
                },
              ],
              type: 'Reference',
              id: 'module',
              constraints: {
                url: '/io_modules',
                value_field: 'guid',
                name_field: 'name',
                method: 'GET',
                choices: [
                  {
                    name: 'ur5',
                    value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
                  },
                ],
              },
            },
            {
              help: 'Select I/O port',
              name: 'I/O port',
              dependencies: [
                {
                  dependency_id: 'compare',
                  value: 'io_module',
                },
              ],
              type: 'Integer',
              id: 'io_port',
              constraints: {
                default: 0,
                max: 99,
                min: 0,
              },
            },
            {
              help: 'For PLC registers: enter the required index number (Integer registers 1-100, Floating point registers 101-200), or select the <b>XYZ </b>icon to define a variable.',
              name: 'Register',
              dependencies: [
                {
                  dependency_id: 'compare',
                  value: 'plc_register',
                },
              ],
              type: 'Reference',
              id: 'register',
              constraints: {
                value_field: 'id',
                name_field: 'label',
                default: 1,
                choices: [
                  {
                    name: '',
                    value: 1,
                  },
                  {
                    name: '',
                    value: 2,
                  },
                  {
                    name: '',
                    value: 3,
                  },
                  {
                    name: '',
                    value: 4,
                  },
                  {
                    name: '',
                    value: 5,
                  },
                  {
                    name: '',
                    value: 6,
                  },
                  {
                    name: '',
                    value: 7,
                  },
                  {
                    name: '',
                    value: 8,
                  },
                  {
                    name: '',
                    value: 9,
                  },
                  {
                    name: '',
                    value: 10,
                  },
                  {
                    name: '',
                    value: 11,
                  },
                  {
                    name: '',
                    value: 12,
                  },
                  {
                    name: '',
                    value: 13,
                  },
                  {
                    name: '',
                    value: 14,
                  },
                  {
                    name: '',
                    value: 15,
                  },
                  {
                    name: '',
                    value: 16,
                  },
                  {
                    name: '',
                    value: 17,
                  },
                  {
                    name: '',
                    value: 18,
                  },
                  {
                    name: '',
                    value: 19,
                  },
                  {
                    name: '',
                    value: 20,
                  },
                  {
                    name: '',
                    value: 21,
                  },
                  {
                    name: '',
                    value: 22,
                  },
                  {
                    name: '',
                    value: 23,
                  },
                  {
                    name: '',
                    value: 24,
                  },
                  {
                    name: '',
                    value: 25,
                  },
                  {
                    name: '',
                    value: 26,
                  },
                  {
                    name: '',
                    value: 27,
                  },
                  {
                    name: '',
                    value: 28,
                  },
                  {
                    name: '',
                    value: 29,
                  },
                  {
                    name: '',
                    value: 30,
                  },
                  {
                    name: '',
                    value: 31,
                  },
                  {
                    name: '',
                    value: 32,
                  },
                  {
                    name: '',
                    value: 33,
                  },
                  {
                    name: '',
                    value: 34,
                  },
                  {
                    name: '',
                    value: 35,
                  },
                  {
                    name: '',
                    value: 36,
                  },
                  {
                    name: '',
                    value: 37,
                  },
                  {
                    name: '',
                    value: 38,
                  },
                  {
                    name: '',
                    value: 39,
                  },
                  {
                    name: '',
                    value: 40,
                  },
                  {
                    name: '',
                    value: 41,
                  },
                  {
                    name: '',
                    value: 42,
                  },
                  {
                    name: '',
                    value: 43,
                  },
                  {
                    name: '',
                    value: 44,
                  },
                  {
                    name: '',
                    value: 45,
                  },
                  {
                    name: '',
                    value: 46,
                  },
                  {
                    name: '',
                    value: 47,
                  },
                  {
                    name: '',
                    value: 48,
                  },
                  {
                    name: '',
                    value: 49,
                  },
                  {
                    name: '',
                    value: 50,
                  },
                  {
                    name: '',
                    value: 51,
                  },
                  {
                    name: '',
                    value: 52,
                  },
                  {
                    name: '',
                    value: 53,
                  },
                  {
                    name: '',
                    value: 54,
                  },
                  {
                    name: '',
                    value: 55,
                  },
                  {
                    name: '',
                    value: 56,
                  },
                  {
                    name: '',
                    value: 57,
                  },
                  {
                    name: '',
                    value: 58,
                  },
                  {
                    name: '',
                    value: 59,
                  },
                  {
                    name: '',
                    value: 60,
                  },
                  {
                    name: '',
                    value: 61,
                  },
                  {
                    name: '',
                    value: 62,
                  },
                  {
                    name: '',
                    value: 63,
                  },
                  {
                    name: '',
                    value: 64,
                  },
                  {
                    name: '',
                    value: 65,
                  },
                  {
                    name: '',
                    value: 66,
                  },
                  {
                    name: '',
                    value: 67,
                  },
                  {
                    name: '',
                    value: 68,
                  },
                  {
                    name: '',
                    value: 69,
                  },
                  {
                    name: '',
                    value: 70,
                  },
                  {
                    name: '',
                    value: 71,
                  },
                  {
                    name: '',
                    value: 72,
                  },
                  {
                    name: '',
                    value: 73,
                  },
                  {
                    name: '',
                    value: 74,
                  },
                  {
                    name: '',
                    value: 75,
                  },
                  {
                    name: '',
                    value: 76,
                  },
                  {
                    name: '',
                    value: 77,
                  },
                  {
                    name: '',
                    value: 78,
                  },
                  {
                    name: '',
                    value: 79,
                  },
                  {
                    name: '',
                    value: 80,
                  },
                  {
                    name: '',
                    value: 81,
                  },
                  {
                    name: '',
                    value: 82,
                  },
                  {
                    name: '',
                    value: 83,
                  },
                  {
                    name: '',
                    value: 84,
                  },
                  {
                    name: '',
                    value: 85,
                  },
                  {
                    name: '',
                    value: 86,
                  },
                  {
                    name: '',
                    value: 87,
                  },
                  {
                    name: '',
                    value: 88,
                  },
                  {
                    name: '',
                    value: 89,
                  },
                  {
                    name: '',
                    value: 90,
                  },
                  {
                    name: '',
                    value: 91,
                  },
                  {
                    name: '',
                    value: 92,
                  },
                  {
                    name: '',
                    value: 93,
                  },
                  {
                    name: '',
                    value: 94,
                  },
                  {
                    name: '',
                    value: 95,
                  },
                  {
                    name: '',
                    value: 96,
                  },
                  {
                    name: '',
                    value: 97,
                  },
                  {
                    name: '',
                    value: 98,
                  },
                  {
                    name: '',
                    value: 99,
                  },
                  {
                    name: '',
                    value: 100,
                  },
                  {
                    name: '',
                    value: 101,
                  },
                  {
                    name: '',
                    value: 102,
                  },
                  {
                    name: '',
                    value: 103,
                  },
                  {
                    name: '',
                    value: 104,
                  },
                  {
                    name: '',
                    value: 105,
                  },
                  {
                    name: '',
                    value: 106,
                  },
                  {
                    name: '',
                    value: 107,
                  },
                  {
                    name: '',
                    value: 108,
                  },
                  {
                    name: '',
                    value: 109,
                  },
                  {
                    name: '',
                    value: 110,
                  },
                  {
                    name: '',
                    value: 111,
                  },
                  {
                    name: '',
                    value: 112,
                  },
                  {
                    name: '',
                    value: 113,
                  },
                  {
                    name: '',
                    value: 114,
                  },
                  {
                    name: '',
                    value: 115,
                  },
                  {
                    name: '',
                    value: 116,
                  },
                  {
                    name: '',
                    value: 117,
                  },
                  {
                    name: '',
                    value: 118,
                  },
                  {
                    name: '',
                    value: 119,
                  },
                  {
                    name: '',
                    value: 120,
                  },
                  {
                    name: '',
                    value: 121,
                  },
                  {
                    name: '',
                    value: 122,
                  },
                  {
                    name: '',
                    value: 123,
                  },
                  {
                    name: '',
                    value: 124,
                  },
                  {
                    name: '',
                    value: 125,
                  },
                  {
                    name: '',
                    value: 126,
                  },
                  {
                    name: '',
                    value: 127,
                  },
                  {
                    name: '',
                    value: 128,
                  },
                  {
                    name: '',
                    value: 129,
                  },
                  {
                    name: '',
                    value: 130,
                  },
                  {
                    name: '',
                    value: 131,
                  },
                  {
                    name: '',
                    value: 132,
                  },
                  {
                    name: '',
                    value: 133,
                  },
                  {
                    name: '',
                    value: 134,
                  },
                  {
                    name: '',
                    value: 135,
                  },
                  {
                    name: '',
                    value: 136,
                  },
                  {
                    name: '',
                    value: 137,
                  },
                  {
                    name: '',
                    value: 138,
                  },
                  {
                    name: '',
                    value: 139,
                  },
                  {
                    name: '',
                    value: 140,
                  },
                  {
                    name: '',
                    value: 141,
                  },
                  {
                    name: '',
                    value: 142,
                  },
                  {
                    name: '',
                    value: 143,
                  },
                  {
                    name: '',
                    value: 144,
                  },
                  {
                    name: '',
                    value: 145,
                  },
                  {
                    name: '',
                    value: 146,
                  },
                  {
                    name: '',
                    value: 147,
                  },
                  {
                    name: '',
                    value: 148,
                  },
                  {
                    name: '',
                    value: 149,
                  },
                  {
                    name: '',
                    value: 150,
                  },
                  {
                    name: '',
                    value: 151,
                  },
                  {
                    name: '',
                    value: 152,
                  },
                  {
                    name: '',
                    value: 153,
                  },
                  {
                    name: '',
                    value: 154,
                  },
                  {
                    name: '',
                    value: 155,
                  },
                  {
                    name: '',
                    value: 156,
                  },
                  {
                    name: '',
                    value: 157,
                  },
                  {
                    name: '',
                    value: 158,
                  },
                  {
                    name: '',
                    value: 159,
                  },
                  {
                    name: '',
                    value: 160,
                  },
                  {
                    name: '',
                    value: 161,
                  },
                  {
                    name: '',
                    value: 162,
                  },
                  {
                    name: '',
                    value: 163,
                  },
                  {
                    name: '',
                    value: 164,
                  },
                  {
                    name: '',
                    value: 165,
                  },
                  {
                    name: '',
                    value: 166,
                  },
                  {
                    name: '',
                    value: 167,
                  },
                  {
                    name: '',
                    value: 168,
                  },
                  {
                    name: '',
                    value: 169,
                  },
                  {
                    name: '',
                    value: 170,
                  },
                  {
                    name: '',
                    value: 171,
                  },
                  {
                    name: '',
                    value: 172,
                  },
                  {
                    name: '',
                    value: 173,
                  },
                  {
                    name: '',
                    value: 174,
                  },
                  {
                    name: '',
                    value: 175,
                  },
                  {
                    name: '',
                    value: 176,
                  },
                  {
                    name: '',
                    value: 177,
                  },
                  {
                    name: '',
                    value: 178,
                  },
                  {
                    name: '',
                    value: 179,
                  },
                  {
                    name: '',
                    value: 180,
                  },
                  {
                    name: '',
                    value: 181,
                  },
                  {
                    name: '',
                    value: 182,
                  },
                  {
                    name: '',
                    value: 183,
                  },
                  {
                    name: '',
                    value: 184,
                  },
                  {
                    name: '',
                    value: 185,
                  },
                  {
                    name: '',
                    value: 186,
                  },
                  {
                    name: '',
                    value: 187,
                  },
                  {
                    name: '',
                    value: 188,
                  },
                  {
                    name: '',
                    value: 189,
                  },
                  {
                    name: '',
                    value: 190,
                  },
                  {
                    name: '',
                    value: 191,
                  },
                  {
                    name: '',
                    value: 192,
                  },
                  {
                    name: '',
                    value: 193,
                  },
                  {
                    name: '',
                    value: 194,
                  },
                  {
                    name: '',
                    value: 195,
                  },
                  {
                    name: '',
                    value: 196,
                  },
                  {
                    name: '',
                    value: 197,
                  },
                  {
                    name: '',
                    value: 198,
                  },
                  {
                    name: '',
                    value: 199,
                  },
                  {
                    name: '',
                    value: 200,
                  },
                ],
                url: '/registers',
                validator: 'PLCId',
                method: 'GET',
              },
            },
            {
              id: 'operator',
              type: 'Selection',
              help: '<p>Select the arithmetic operator you want to use, or select the <b>XYZ</b> icon to define a variable.</p><p>Operators are arithmetic operators used to specify the compare mission, for example, use the < operator to specify “If Battery percentage is below 50 percent”.</p><p>The available operators are:</p><ul><li>== ‘equal to’</li><li>!= ‘not equal to’</li><li>> ‘greater than’</li><li>>= ‘greater than or equal to’</li><li>< ‘lesser than’</li><li><= ‘lesser than or equal to’.</li></ul>',
              name: 'Operator',
              constraints: {
                default: '==',
                choices: [
                  {
                    name: '==',
                    value: '==',
                  },
                  {
                    name: '!=',
                    value: '!=',
                  },
                  {
                    name: '>',
                    value: '>',
                  },
                  {
                    name: '>=',
                    value: '>=',
                  },
                  {
                    name: '<',
                    value: '<',
                  },
                  {
                    name: '<=',
                    value: '<=',
                  },
                ],
              },
            },
            {
              id: 'value',
              type: 'Float',
              help: 'Enter the value for the selected register, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Value',
              constraints: {
                default: 1,
                max: 1000000000,
                min: -1000000000,
              },
            },
            {
              id: 'true',
              type: 'Scope',
              help: '',
              name: 'True',
              constraints: {},
            },
            {
              id: 'false',
              type: 'Scope',
              help: '',
              name: 'False',
              constraints: {},
            },
          ],
          help: '<p>An If action makes it possible to check battery level, number of pending missions, PLC registers, or input from I/O modules and then define which actions or missions should be performed if the conditions return either true or false. You may use one or more actions or missions to define both true and false conditions.</p><p><b>Battery Percentage</b>: An If action on battery percentage checks if the battery percentage is below, above, or equal to a set limit and, depending on the result, either sends the robot to a charging station or continues the mission. The True action could be a previously defined charging mission. The False action could be any alternative actions or missions, but may also be left blank. In that case, the robot will continue to the next step in the mission.</p><p><b>Pending missions</b>: An If action on pending missions checks if the number of pending (queued) missions is below, above, or equal to a set number. You then set actions that define what the robot should do if the set condition returns true or false. An example could be to send the robot to a charging station if the number of queued missions exceeds a certain amount.</p><p><b>PLC Register</b>: An If action on a PLC register checks if the register is set to a certain value, for example, register 6=1, indicating that a lift is lowered when the robot arrives at a shelf. The True action (the lift is lowered) could then be a Wait for PLC register action, for example, wait for register 6 to reset to 0.</p><p><b>I/O input</b>: An If action on an I/O input checks if the register is set to a certain value, for example, register 6=1, indicating that a lift is lowered when the robot arrives at a shelf. The True action (the lift is lowered) could then be a Wait for PLC register action, for example, wait for register 6 to reset to 0.</p>',
          action_type: 'if',
          descriptions: [
            {
              text: 'If %(compare)s %(operator)s %(value)f',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'compare',
                  value: 'battery',
                },
              ],
            },
            {
              text: 'If %(compare)s (%(register)s) %(operator)s %(value)f',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'compare',
                  value: 'plc_register',
                },
              ],
            },
            {
              text: 'If %(module)s port %(io_port)f %(operator)s %(value)f',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'compare',
                  value: 'io_module',
                },
              ],
            },
          ],
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'If',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/pause',
          action_type: 'pause',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Pause mission execution.',
          parameters: [],
          help: '<p>A Pause action pauses the mission execution until an operator selects <b>Continue</b>.</p><p>This can be used in missions where the robot should wait for an operator to do something, for example, placing items on the robot and manually sending the robot on to another position by selecting <b>Continue</b>.</p>',
          action_type: 'pause',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Pause',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/return',
          action_type: 'return',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Return',
          parameters: [],
          help: 'A Return action is used to abort a mission. It can be used, for example, as catch action in a <b>Try/Catch</b> action.',
          action_type: 'return',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Return',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/wait',
          action_type: 'wait',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Wait for %(time)s',
          parameters: [
            {
              id: 'time',
              type: 'Duration',
              help: 'Set an amount of time the robot should wait before moving to the next action in the mission.',
              name: 'Time',
              constraints: {
                default: '00:00:05.000000',
                max: '24:00:00.000000',
                min: '00:00:00.000000',
              },
            },
          ],
          help: 'A Wait action pauses the mission in a given period of time.',
          action_type: 'wait',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Wait',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/break',
          action_type: 'break',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Break',
          parameters: [],
          help: 'A Break action is used to interrupt a Loop action.',
          action_type: 'break',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Break',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/while',
          action_type: 'while',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'While %(compare)s %(operator)s %(value)f',
          parameters: [
            {
              id: 'compare',
              type: 'Selection',
              help: 'Select either <b>Battery Percentage</b>, <b>PLC Register</b>, <b>Pending Missions</b>, or <b>I/O input</b>, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Compare',
              constraints: {
                default: 'battery',
                choices: [
                  {
                    name: 'Battery Percentage',
                    value: 'battery',
                  },
                  {
                    name: 'PLC Register',
                    value: 'plc_register',
                  },
                  {
                    name: 'Pending missions',
                    value: 'mission_queue_length',
                  },
                  {
                    name: 'I/O input',
                    value: 'io_module',
                  },
                ],
              },
            },
            {
              help: 'For I/O inputs, select an I/O module from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Module',
              dependencies: [
                {
                  dependency_id: 'compare',
                  value: 'io_module',
                },
              ],
              type: 'Reference',
              id: 'module',
              constraints: {
                value_field: 'guid',
                null_option: 'None',
                nullable: true,
                default: null,
                name_field: 'name',
                choices: [
                  {
                    name: 'ur5',
                    value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
                  },
                ],
                url: '/io_modules',
                method: 'GET',
              },
            },
            {
              help: 'Select I/O port',
              name: 'I/O port',
              dependencies: [
                {
                  dependency_id: 'compare',
                  value: 'io_module',
                },
              ],
              type: 'Integer',
              id: 'io_port',
              constraints: {
                default: 0,
                max: 99,
                min: 0,
              },
            },
            {
              help: 'For PLC registers: enter the required index number (Integer registers 1-100, Floating point registers 101-200), or select the <b>XYZ </b>icon to define a variable.',
              name: 'Register',
              dependencies: [
                {
                  dependency_id: 'compare',
                  value: 'plc_register',
                },
              ],
              type: 'Reference',
              id: 'register',
              constraints: {
                value_field: 'id',
                name_field: 'label',
                default: 1,
                choices: [
                  {
                    name: '',
                    value: 1,
                  },
                  {
                    name: '',
                    value: 2,
                  },
                  {
                    name: '',
                    value: 3,
                  },
                  {
                    name: '',
                    value: 4,
                  },
                  {
                    name: '',
                    value: 5,
                  },
                  {
                    name: '',
                    value: 6,
                  },
                  {
                    name: '',
                    value: 7,
                  },
                  {
                    name: '',
                    value: 8,
                  },
                  {
                    name: '',
                    value: 9,
                  },
                  {
                    name: '',
                    value: 10,
                  },
                  {
                    name: '',
                    value: 11,
                  },
                  {
                    name: '',
                    value: 12,
                  },
                  {
                    name: '',
                    value: 13,
                  },
                  {
                    name: '',
                    value: 14,
                  },
                  {
                    name: '',
                    value: 15,
                  },
                  {
                    name: '',
                    value: 16,
                  },
                  {
                    name: '',
                    value: 17,
                  },
                  {
                    name: '',
                    value: 18,
                  },
                  {
                    name: '',
                    value: 19,
                  },
                  {
                    name: '',
                    value: 20,
                  },
                  {
                    name: '',
                    value: 21,
                  },
                  {
                    name: '',
                    value: 22,
                  },
                  {
                    name: '',
                    value: 23,
                  },
                  {
                    name: '',
                    value: 24,
                  },
                  {
                    name: '',
                    value: 25,
                  },
                  {
                    name: '',
                    value: 26,
                  },
                  {
                    name: '',
                    value: 27,
                  },
                  {
                    name: '',
                    value: 28,
                  },
                  {
                    name: '',
                    value: 29,
                  },
                  {
                    name: '',
                    value: 30,
                  },
                  {
                    name: '',
                    value: 31,
                  },
                  {
                    name: '',
                    value: 32,
                  },
                  {
                    name: '',
                    value: 33,
                  },
                  {
                    name: '',
                    value: 34,
                  },
                  {
                    name: '',
                    value: 35,
                  },
                  {
                    name: '',
                    value: 36,
                  },
                  {
                    name: '',
                    value: 37,
                  },
                  {
                    name: '',
                    value: 38,
                  },
                  {
                    name: '',
                    value: 39,
                  },
                  {
                    name: '',
                    value: 40,
                  },
                  {
                    name: '',
                    value: 41,
                  },
                  {
                    name: '',
                    value: 42,
                  },
                  {
                    name: '',
                    value: 43,
                  },
                  {
                    name: '',
                    value: 44,
                  },
                  {
                    name: '',
                    value: 45,
                  },
                  {
                    name: '',
                    value: 46,
                  },
                  {
                    name: '',
                    value: 47,
                  },
                  {
                    name: '',
                    value: 48,
                  },
                  {
                    name: '',
                    value: 49,
                  },
                  {
                    name: '',
                    value: 50,
                  },
                  {
                    name: '',
                    value: 51,
                  },
                  {
                    name: '',
                    value: 52,
                  },
                  {
                    name: '',
                    value: 53,
                  },
                  {
                    name: '',
                    value: 54,
                  },
                  {
                    name: '',
                    value: 55,
                  },
                  {
                    name: '',
                    value: 56,
                  },
                  {
                    name: '',
                    value: 57,
                  },
                  {
                    name: '',
                    value: 58,
                  },
                  {
                    name: '',
                    value: 59,
                  },
                  {
                    name: '',
                    value: 60,
                  },
                  {
                    name: '',
                    value: 61,
                  },
                  {
                    name: '',
                    value: 62,
                  },
                  {
                    name: '',
                    value: 63,
                  },
                  {
                    name: '',
                    value: 64,
                  },
                  {
                    name: '',
                    value: 65,
                  },
                  {
                    name: '',
                    value: 66,
                  },
                  {
                    name: '',
                    value: 67,
                  },
                  {
                    name: '',
                    value: 68,
                  },
                  {
                    name: '',
                    value: 69,
                  },
                  {
                    name: '',
                    value: 70,
                  },
                  {
                    name: '',
                    value: 71,
                  },
                  {
                    name: '',
                    value: 72,
                  },
                  {
                    name: '',
                    value: 73,
                  },
                  {
                    name: '',
                    value: 74,
                  },
                  {
                    name: '',
                    value: 75,
                  },
                  {
                    name: '',
                    value: 76,
                  },
                  {
                    name: '',
                    value: 77,
                  },
                  {
                    name: '',
                    value: 78,
                  },
                  {
                    name: '',
                    value: 79,
                  },
                  {
                    name: '',
                    value: 80,
                  },
                  {
                    name: '',
                    value: 81,
                  },
                  {
                    name: '',
                    value: 82,
                  },
                  {
                    name: '',
                    value: 83,
                  },
                  {
                    name: '',
                    value: 84,
                  },
                  {
                    name: '',
                    value: 85,
                  },
                  {
                    name: '',
                    value: 86,
                  },
                  {
                    name: '',
                    value: 87,
                  },
                  {
                    name: '',
                    value: 88,
                  },
                  {
                    name: '',
                    value: 89,
                  },
                  {
                    name: '',
                    value: 90,
                  },
                  {
                    name: '',
                    value: 91,
                  },
                  {
                    name: '',
                    value: 92,
                  },
                  {
                    name: '',
                    value: 93,
                  },
                  {
                    name: '',
                    value: 94,
                  },
                  {
                    name: '',
                    value: 95,
                  },
                  {
                    name: '',
                    value: 96,
                  },
                  {
                    name: '',
                    value: 97,
                  },
                  {
                    name: '',
                    value: 98,
                  },
                  {
                    name: '',
                    value: 99,
                  },
                  {
                    name: '',
                    value: 100,
                  },
                  {
                    name: '',
                    value: 101,
                  },
                  {
                    name: '',
                    value: 102,
                  },
                  {
                    name: '',
                    value: 103,
                  },
                  {
                    name: '',
                    value: 104,
                  },
                  {
                    name: '',
                    value: 105,
                  },
                  {
                    name: '',
                    value: 106,
                  },
                  {
                    name: '',
                    value: 107,
                  },
                  {
                    name: '',
                    value: 108,
                  },
                  {
                    name: '',
                    value: 109,
                  },
                  {
                    name: '',
                    value: 110,
                  },
                  {
                    name: '',
                    value: 111,
                  },
                  {
                    name: '',
                    value: 112,
                  },
                  {
                    name: '',
                    value: 113,
                  },
                  {
                    name: '',
                    value: 114,
                  },
                  {
                    name: '',
                    value: 115,
                  },
                  {
                    name: '',
                    value: 116,
                  },
                  {
                    name: '',
                    value: 117,
                  },
                  {
                    name: '',
                    value: 118,
                  },
                  {
                    name: '',
                    value: 119,
                  },
                  {
                    name: '',
                    value: 120,
                  },
                  {
                    name: '',
                    value: 121,
                  },
                  {
                    name: '',
                    value: 122,
                  },
                  {
                    name: '',
                    value: 123,
                  },
                  {
                    name: '',
                    value: 124,
                  },
                  {
                    name: '',
                    value: 125,
                  },
                  {
                    name: '',
                    value: 126,
                  },
                  {
                    name: '',
                    value: 127,
                  },
                  {
                    name: '',
                    value: 128,
                  },
                  {
                    name: '',
                    value: 129,
                  },
                  {
                    name: '',
                    value: 130,
                  },
                  {
                    name: '',
                    value: 131,
                  },
                  {
                    name: '',
                    value: 132,
                  },
                  {
                    name: '',
                    value: 133,
                  },
                  {
                    name: '',
                    value: 134,
                  },
                  {
                    name: '',
                    value: 135,
                  },
                  {
                    name: '',
                    value: 136,
                  },
                  {
                    name: '',
                    value: 137,
                  },
                  {
                    name: '',
                    value: 138,
                  },
                  {
                    name: '',
                    value: 139,
                  },
                  {
                    name: '',
                    value: 140,
                  },
                  {
                    name: '',
                    value: 141,
                  },
                  {
                    name: '',
                    value: 142,
                  },
                  {
                    name: '',
                    value: 143,
                  },
                  {
                    name: '',
                    value: 144,
                  },
                  {
                    name: '',
                    value: 145,
                  },
                  {
                    name: '',
                    value: 146,
                  },
                  {
                    name: '',
                    value: 147,
                  },
                  {
                    name: '',
                    value: 148,
                  },
                  {
                    name: '',
                    value: 149,
                  },
                  {
                    name: '',
                    value: 150,
                  },
                  {
                    name: '',
                    value: 151,
                  },
                  {
                    name: '',
                    value: 152,
                  },
                  {
                    name: '',
                    value: 153,
                  },
                  {
                    name: '',
                    value: 154,
                  },
                  {
                    name: '',
                    value: 155,
                  },
                  {
                    name: '',
                    value: 156,
                  },
                  {
                    name: '',
                    value: 157,
                  },
                  {
                    name: '',
                    value: 158,
                  },
                  {
                    name: '',
                    value: 159,
                  },
                  {
                    name: '',
                    value: 160,
                  },
                  {
                    name: '',
                    value: 161,
                  },
                  {
                    name: '',
                    value: 162,
                  },
                  {
                    name: '',
                    value: 163,
                  },
                  {
                    name: '',
                    value: 164,
                  },
                  {
                    name: '',
                    value: 165,
                  },
                  {
                    name: '',
                    value: 166,
                  },
                  {
                    name: '',
                    value: 167,
                  },
                  {
                    name: '',
                    value: 168,
                  },
                  {
                    name: '',
                    value: 169,
                  },
                  {
                    name: '',
                    value: 170,
                  },
                  {
                    name: '',
                    value: 171,
                  },
                  {
                    name: '',
                    value: 172,
                  },
                  {
                    name: '',
                    value: 173,
                  },
                  {
                    name: '',
                    value: 174,
                  },
                  {
                    name: '',
                    value: 175,
                  },
                  {
                    name: '',
                    value: 176,
                  },
                  {
                    name: '',
                    value: 177,
                  },
                  {
                    name: '',
                    value: 178,
                  },
                  {
                    name: '',
                    value: 179,
                  },
                  {
                    name: '',
                    value: 180,
                  },
                  {
                    name: '',
                    value: 181,
                  },
                  {
                    name: '',
                    value: 182,
                  },
                  {
                    name: '',
                    value: 183,
                  },
                  {
                    name: '',
                    value: 184,
                  },
                  {
                    name: '',
                    value: 185,
                  },
                  {
                    name: '',
                    value: 186,
                  },
                  {
                    name: '',
                    value: 187,
                  },
                  {
                    name: '',
                    value: 188,
                  },
                  {
                    name: '',
                    value: 189,
                  },
                  {
                    name: '',
                    value: 190,
                  },
                  {
                    name: '',
                    value: 191,
                  },
                  {
                    name: '',
                    value: 192,
                  },
                  {
                    name: '',
                    value: 193,
                  },
                  {
                    name: '',
                    value: 194,
                  },
                  {
                    name: '',
                    value: 195,
                  },
                  {
                    name: '',
                    value: 196,
                  },
                  {
                    name: '',
                    value: 197,
                  },
                  {
                    name: '',
                    value: 198,
                  },
                  {
                    name: '',
                    value: 199,
                  },
                  {
                    name: '',
                    value: 200,
                  },
                ],
                url: '/registers',
                validator: 'PLCId',
                method: 'GET',
              },
            },
            {
              id: 'operator',
              type: 'Selection',
              help: '<p>Select the arithmetic operator you want to use, or select the <b>XYZ</b> icon to define a variable.</p><p>Operators are arithmetic operators used to specify the compare mission, for example, use the < operator to specify “If Battery percentage is below 50 percent”.</p><p>The available operators are:</p><ul><li>== ‘equal to’</li><li>!= ‘not equal to’</li><li>> ‘greater than’</li><li>>= ‘greater than or equal to’</li><li>< ‘lesser than’</li><li><= ‘lesser than or equal to’.</li></ul>',
              name: 'Operator',
              constraints: {
                default: '==',
                choices: [
                  {
                    name: '==',
                    value: '==',
                  },
                  {
                    name: '!=',
                    value: '!=',
                  },
                  {
                    name: '>',
                    value: '>',
                  },
                  {
                    name: '>=',
                    value: '>=',
                  },
                  {
                    name: '<',
                    value: '<',
                  },
                  {
                    name: '<=',
                    value: '<=',
                  },
                ],
              },
            },
            {
              id: 'value',
              type: 'Float',
              help: 'Enter the value for the selected register, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Value',
              constraints: {
                default: 1,
                max: 1000000000,
                min: -1000000000,
              },
            },
            {
              id: 'content',
              type: 'Scope',
              help: '',
              name: 'Content',
              constraints: {},
            },
          ],
          help: '<p>A While action makes it possible to check battery level, number of pending missions, PLC registers, or input from I/O modules and then define which actions or missions should be performed while these conditions return true. You may use one or more actions or missions to define the while conditions.</p><p><b>Battery Percentage</b>: A <b>While</b> action on battery percentage checks if the battery percentage is below or above a set limit and, depending on the result, either sends the robot to a charging station or continues the mission.</p><p><b>PLC Register</b>: A <b>While</b> action on a PLC register checks if the register is set to a certain value, for example, register 6=1, indicating that a lift is lowered when the robot arrives at a shelf.</p><p><b>Pending missions</b>: A <b>While</b> action on pending missions checks if the number of pending (queued) missions is below, above or equal to the set number. You then set an action that defines what the robot should do if the set condition returns true. An example could be to send the robot to a charging station if the number of queued missions exceeds a certain amount.</p><p><b>I/O input</b>: A <b>While</b> action on an I/O input checks if the register is set to a certain value, for example, register 6=1, indicating that a lift is lowered when the robot arrives at a shelf. The <b>True</b> action (the lift is lowered) could then be a <b>Wait for PLC register</b> action, for example wait for register 6 to reset to 0.</p>',
          action_type: 'while',
          descriptions: [
            {
              text: 'While %(compare)s %(operator)s %(value)f',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'compare',
                  value: 'battery',
                },
              ],
            },
            {
              text: 'While %(compare)s (%(register)s) %(operator)s %(value)f',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'compare',
                  value: 'plc_register',
                },
              ],
            },
            {
              text: 'While %(module)s port %(io_port)f %(operator)s %(value)f',
              conditions: [
                {
                  operator: '==',
                  parameter_id: 'compare',
                  value: 'io_module',
                },
              ],
            },
          ],
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'While',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/continue',
          action_type: 'continue',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Continue',
          parameters: [],
          help: 'A Continue action is used to abort the rest of a loop action and continue from the start.',
          action_type: 'continue',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Continue',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/loop',
          action_type: 'loop',
          style: {
            icon: <Icons.Move />,
            color: '#9333EA',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Loop for %(iterations)d iterations',
          parameters: [
            {
              id: 'iterations',
              type: 'Integer',
              help: 'Set the number of times the robot should run the loop, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Iterations',
              constraints: {
                default: null,
                max: 1000,
                null_option: 'Endless',
                nullable: true,
                min: 1,
              },
            },
            {
              id: 'content',
              type: 'Scope',
              help: '',
              name: 'Content',
              constraints: {},
            },
          ],
          help: 'A Loop action makes it possible to have the robot repeat a mission either a specified number of times or indefinitely (until stopped by an operator). Drag actions or predefined missions into the loop action to define the sequence of actions the robot will repeat. A loop can be interrupted with a Break action.',
          action_type: 'loop',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0003-missiongroup',
          name: 'Loop',
        },
      },
    ],
  },
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0004-missiongroup',
      guid: 'mirconst-guid-0000-0004-missiongroup',
      name: 'Sound/Light',
      style: {
        icon: <Icons.Move />,
        color: '#F59E0B',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/sound_stop',
          action_type: 'sound_stop',
          style: {
            icon: <Icons.Move />,
            color: '#F59E0B',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Stop playing sounds',
          parameters: [],
          help: 'Stop playing the current sound.',
          action_type: 'sound_stop',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0004-missiongroup',
          name: 'Stop sound',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/sound',
          action_type: 'sound',
          style: {
            icon: <Icons.Move />,
            color: '#F59E0B',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Play sound %(sound)s in %(mode)s',
          parameters: [
            {
              id: 'sound',
              type: 'Reference',
              help: '<p>Select a sound from the list, or select the <b>XYZ</b> icon to define a variable.</p><p>If you want to hear the sounds before selecting one, go to <b>Setup</b> > <b>Sounds</b>. You can hear the sounds on your computer by selecting the headset icon.</p>',
              name: 'Sound',
              constraints: {
                url: '/sounds',
                value_field: 'guid',
                name_field: 'name',
                method: 'GET',
                choices: [
                  {
                    name: 'Beep',
                    value: 'mirconst-guid-0000-0001-sounds000000',
                  },
                  {
                    name: 'Horn',
                    value: 'mirconst-guid-0000-0002-sounds000000',
                  },
                  {
                    name: 'Foghorn',
                    value: 'mirconst-guid-0000-0003-sounds000000',
                  },
                  {
                    name: 'Anh-Chang-Sao-Ma-Remix-Khang-Viet',
                    value: '229dc03f-21a8-11ef-bbf9-000129af8ea5',
                  },
                ],
              },
            },
            {
              id: 'volume',
              type: 'Float',
              help: 'Set the volume of the sound (0-100), or select the <b>XYZ</b> icon to define a variable. 100% is approximately 80 dB.',
              name: 'Volume',
              constraints: {
                default: 100,
                max: 100,
                min: 0,
              },
            },
            {
              id: 'mode',
              type: 'Selection',
              help: '<p>Select how the sound should be used in the mission:</p><p><b>Full length</b> plays the sound from start to finish, starting at the point in the mission where it is inserted and ending when the sound file finishes.</p><p><b>Loop</b> keeps repeating the sound file until the mission is completed.</p><p><b>Custom length</b> plays the sound for the duration of time you set under<b> Duration</b>. If the set duration exceeds the duration of the sound file itself, the sound file will loop for the duration of the set time.</p><p><b>Note!</b> You can insert a Stop sound action anywhere in the mission. This will stop the playing of the current sound no matter which mode you have selected.</p>',
              name: 'Mode',
              constraints: {
                default: 'full',
                choices: [
                  {
                    name: 'Full length',
                    value: 'full',
                  },
                  {
                    name: 'Loop',
                    value: 'loop',
                  },
                  {
                    name: 'Custom length',
                    value: 'custom',
                  },
                ],
              },
            },
            {
              help: 'Set an amount of time the sound should play, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Duration',
              dependencies: [
                {
                  dependency_id: 'mode',
                  value: 'custom',
                },
              ],
              type: 'Duration',
              id: 'duration',
              constraints: {
                default: '00:00:01.000000',
                max: '00:05:00.000000',
                min: '00:00:00.000000',
              },
            },
          ],
          help: 'A Play sound action sets a sound, for example, a beep, a horn, or a voice message that the robot will play at a given stage in the mission or for the whole duration of the mission. There is a selection of standard sound bites to choose from, or you can upload your own sounds to the robot in the section <b>Setup</b> > <b>Sounds</b>.',
          action_type: 'sound',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0004-missiongroup',
          name: 'Play sound',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/light',
          action_type: 'light',
          style: {
            icon: <Icons.Move />,
            color: '#F59E0B',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Show light: %(light_effect)s',
          parameters: [
            {
              id: 'light_effect',
              type: 'Selection',
              help: 'Select a light effect from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Effect',
              constraints: {
                default: 'solid',
                choices: [
                  {
                    name: 'Cancel',
                    value: 'cancel',
                  },
                  {
                    name: 'Solid',
                    value: 'solid',
                  },
                  {
                    name: 'Blink',
                    value: 'blink',
                  },
                  {
                    name: 'Fade',
                    value: 'fade',
                  },
                  {
                    name: 'Chase',
                    value: 'chase',
                  },
                  {
                    name: 'Wave',
                    value: 'wave',
                  },
                  {
                    name: 'Rainbow',
                    value: 'rainbow',
                  },
                ],
              },
            },
            {
              id: 'speed',
              type: 'Selection',
              help: 'Select a fast or slow speed from the drop-down list, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Speed',
              constraints: {
                default: 'slow',
                choices: [
                  {
                    name: 'Slow (0.5 m/s)',
                    value: 'slow',
                  },
                  {
                    name: 'Fast',
                    value: 'fast',
                  },
                ],
              },
            },
            {
              help: 'Select a color from the drop-down list, or select the <b>XYZ</b> icon to define a variable. If you select two different colors for Color 1 and 2, the robot will alternate between the two.',
              name: 'Color 1',
              dependencies: [
                {
                  dependency_id: 'light_effect',
                  value: 'solid',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'blink',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'fade',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'chase',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'wave',
                },
              ],
              type: 'Selection',
              id: 'color_1',
              constraints: {
                default: '#00ff00',
                choices: [
                  {
                    name: 'Red',
                    value: '#ff0000',
                  },
                  {
                    name: 'Green',
                    value: '#00ff00',
                  },
                  {
                    name: 'Blue',
                    value: '#0000ff',
                  },
                  {
                    name: 'White',
                    value: '#ffffff',
                  },
                  {
                    name: 'Black',
                    value: '#000000',
                  },
                  {
                    name: 'Yellow',
                    value: '#ffff00',
                  },
                  {
                    name: 'Magenta',
                    value: '#ff00ff',
                  },
                  {
                    name: 'Cyan',
                    value: '#00ffff',
                  },
                  {
                    name: 'Orange',
                    value: '#ffa500',
                  },
                  {
                    name: 'Pink',
                    value: '#ffc0cb',
                  },
                ],
              },
            },
            {
              help: 'Select a color from the drop-down list, or select the <b>XYZ</b> icon to define a variable. If you select two different colors for Color 1 and 2, the robot will alternate between the two.',
              name: 'Color 2',
              dependencies: [
                {
                  dependency_id: 'light_effect',
                  value: 'blink',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'fade',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'chase',
                },
                {
                  dependency_id: 'light_effect',
                  value: 'wave',
                },
              ],
              type: 'Selection',
              id: 'color_2',
              constraints: {
                default: '#0000ff',
                choices: [
                  {
                    name: 'Red',
                    value: '#ff0000',
                  },
                  {
                    name: 'Green',
                    value: '#00ff00',
                  },
                  {
                    name: 'Blue',
                    value: '#0000ff',
                  },
                  {
                    name: 'White',
                    value: '#ffffff',
                  },
                  {
                    name: 'Black',
                    value: '#000000',
                  },
                  {
                    name: 'Yellow',
                    value: '#ffff00',
                  },
                  {
                    name: 'Magenta',
                    value: '#ff00ff',
                  },
                  {
                    name: 'Cyan',
                    value: '#00ffff',
                  },
                  {
                    name: 'Orange',
                    value: '#ffa500',
                  },
                  {
                    name: 'Pink',
                    value: '#ffc0cb',
                  },
                ],
              },
            },
            {
              id: 'intensity',
              type: 'Integer',
              help: 'Set the intensity of the light, or select the <b>XYZ</b> icon to define a variable. The intensity is defined as a percentage where 100 is full intensity.',
              name: 'Intensity',
              constraints: {
                default: 100,
                max: 100,
                min: 0,
              },
            },
            {
              id: 'timeout',
              type: 'Duration',
              help: 'Set an amount of time the light should show, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Timeout (seconds)',
              constraints: {
                default: null,
                max: '00:05:00.000000',
                null_option: 'Forever',
                nullable: true,
                min: '00:00:00.000000',
              },
            },
          ],
          help: "A Show light action sets  a combination of light effect, speed, color, and intensity of the robot's status lights at a given point in the mission.",
          action_type: 'light',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0004-missiongroup',
          name: 'Show light',
        },
      },
    ],
  },
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0005-missiongroup',
      guid: 'mirconst-guid-0000-0005-missiongroup',
      name: 'PLC',
      style: {
        icon: <Icons.Move />,
        color: '#A16207',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/wait_for_plc_register',
          action_type: 'wait_for_plc_register',
          style: {
            icon: <Icons.Move />,
            color: '#A16207',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Wait for PLC register %(register)d to become %(value)f',
          parameters: [
            {
              id: 'register',
              type: 'Reference',
              help: 'Select a specific PLC register, or select the <b>XYZ</b> icon to define a variable. Registers 1 to 100 are reserved for integers and registers from 101-199 for floating point numbers.',
              name: 'Register',
              constraints: {
                value_field: 'id',
                name_field: 'label',
                default: 1,
                choices: [
                  {
                    name: '',
                    value: 1,
                  },
                  {
                    name: '',
                    value: 2,
                  },
                  {
                    name: '',
                    value: 3,
                  },
                  {
                    name: '',
                    value: 4,
                  },
                  {
                    name: '',
                    value: 5,
                  },
                  {
                    name: '',
                    value: 6,
                  },
                  {
                    name: '',
                    value: 7,
                  },
                  {
                    name: '',
                    value: 8,
                  },
                  {
                    name: '',
                    value: 9,
                  },
                  {
                    name: '',
                    value: 10,
                  },
                  {
                    name: '',
                    value: 11,
                  },
                  {
                    name: '',
                    value: 12,
                  },
                  {
                    name: '',
                    value: 13,
                  },
                  {
                    name: '',
                    value: 14,
                  },
                  {
                    name: '',
                    value: 15,
                  },
                  {
                    name: '',
                    value: 16,
                  },
                  {
                    name: '',
                    value: 17,
                  },
                  {
                    name: '',
                    value: 18,
                  },
                  {
                    name: '',
                    value: 19,
                  },
                  {
                    name: '',
                    value: 20,
                  },
                  {
                    name: '',
                    value: 21,
                  },
                  {
                    name: '',
                    value: 22,
                  },
                  {
                    name: '',
                    value: 23,
                  },
                  {
                    name: '',
                    value: 24,
                  },
                  {
                    name: '',
                    value: 25,
                  },
                  {
                    name: '',
                    value: 26,
                  },
                  {
                    name: '',
                    value: 27,
                  },
                  {
                    name: '',
                    value: 28,
                  },
                  {
                    name: '',
                    value: 29,
                  },
                  {
                    name: '',
                    value: 30,
                  },
                  {
                    name: '',
                    value: 31,
                  },
                  {
                    name: '',
                    value: 32,
                  },
                  {
                    name: '',
                    value: 33,
                  },
                  {
                    name: '',
                    value: 34,
                  },
                  {
                    name: '',
                    value: 35,
                  },
                  {
                    name: '',
                    value: 36,
                  },
                  {
                    name: '',
                    value: 37,
                  },
                  {
                    name: '',
                    value: 38,
                  },
                  {
                    name: '',
                    value: 39,
                  },
                  {
                    name: '',
                    value: 40,
                  },
                  {
                    name: '',
                    value: 41,
                  },
                  {
                    name: '',
                    value: 42,
                  },
                  {
                    name: '',
                    value: 43,
                  },
                  {
                    name: '',
                    value: 44,
                  },
                  {
                    name: '',
                    value: 45,
                  },
                  {
                    name: '',
                    value: 46,
                  },
                  {
                    name: '',
                    value: 47,
                  },
                  {
                    name: '',
                    value: 48,
                  },
                  {
                    name: '',
                    value: 49,
                  },
                  {
                    name: '',
                    value: 50,
                  },
                  {
                    name: '',
                    value: 51,
                  },
                  {
                    name: '',
                    value: 52,
                  },
                  {
                    name: '',
                    value: 53,
                  },
                  {
                    name: '',
                    value: 54,
                  },
                  {
                    name: '',
                    value: 55,
                  },
                  {
                    name: '',
                    value: 56,
                  },
                  {
                    name: '',
                    value: 57,
                  },
                  {
                    name: '',
                    value: 58,
                  },
                  {
                    name: '',
                    value: 59,
                  },
                  {
                    name: '',
                    value: 60,
                  },
                  {
                    name: '',
                    value: 61,
                  },
                  {
                    name: '',
                    value: 62,
                  },
                  {
                    name: '',
                    value: 63,
                  },
                  {
                    name: '',
                    value: 64,
                  },
                  {
                    name: '',
                    value: 65,
                  },
                  {
                    name: '',
                    value: 66,
                  },
                  {
                    name: '',
                    value: 67,
                  },
                  {
                    name: '',
                    value: 68,
                  },
                  {
                    name: '',
                    value: 69,
                  },
                  {
                    name: '',
                    value: 70,
                  },
                  {
                    name: '',
                    value: 71,
                  },
                  {
                    name: '',
                    value: 72,
                  },
                  {
                    name: '',
                    value: 73,
                  },
                  {
                    name: '',
                    value: 74,
                  },
                  {
                    name: '',
                    value: 75,
                  },
                  {
                    name: '',
                    value: 76,
                  },
                  {
                    name: '',
                    value: 77,
                  },
                  {
                    name: '',
                    value: 78,
                  },
                  {
                    name: '',
                    value: 79,
                  },
                  {
                    name: '',
                    value: 80,
                  },
                  {
                    name: '',
                    value: 81,
                  },
                  {
                    name: '',
                    value: 82,
                  },
                  {
                    name: '',
                    value: 83,
                  },
                  {
                    name: '',
                    value: 84,
                  },
                  {
                    name: '',
                    value: 85,
                  },
                  {
                    name: '',
                    value: 86,
                  },
                  {
                    name: '',
                    value: 87,
                  },
                  {
                    name: '',
                    value: 88,
                  },
                  {
                    name: '',
                    value: 89,
                  },
                  {
                    name: '',
                    value: 90,
                  },
                  {
                    name: '',
                    value: 91,
                  },
                  {
                    name: '',
                    value: 92,
                  },
                  {
                    name: '',
                    value: 93,
                  },
                  {
                    name: '',
                    value: 94,
                  },
                  {
                    name: '',
                    value: 95,
                  },
                  {
                    name: '',
                    value: 96,
                  },
                  {
                    name: '',
                    value: 97,
                  },
                  {
                    name: '',
                    value: 98,
                  },
                  {
                    name: '',
                    value: 99,
                  },
                  {
                    name: '',
                    value: 100,
                  },
                  {
                    name: '',
                    value: 101,
                  },
                  {
                    name: '',
                    value: 102,
                  },
                  {
                    name: '',
                    value: 103,
                  },
                  {
                    name: '',
                    value: 104,
                  },
                  {
                    name: '',
                    value: 105,
                  },
                  {
                    name: '',
                    value: 106,
                  },
                  {
                    name: '',
                    value: 107,
                  },
                  {
                    name: '',
                    value: 108,
                  },
                  {
                    name: '',
                    value: 109,
                  },
                  {
                    name: '',
                    value: 110,
                  },
                  {
                    name: '',
                    value: 111,
                  },
                  {
                    name: '',
                    value: 112,
                  },
                  {
                    name: '',
                    value: 113,
                  },
                  {
                    name: '',
                    value: 114,
                  },
                  {
                    name: '',
                    value: 115,
                  },
                  {
                    name: '',
                    value: 116,
                  },
                  {
                    name: '',
                    value: 117,
                  },
                  {
                    name: '',
                    value: 118,
                  },
                  {
                    name: '',
                    value: 119,
                  },
                  {
                    name: '',
                    value: 120,
                  },
                  {
                    name: '',
                    value: 121,
                  },
                  {
                    name: '',
                    value: 122,
                  },
                  {
                    name: '',
                    value: 123,
                  },
                  {
                    name: '',
                    value: 124,
                  },
                  {
                    name: '',
                    value: 125,
                  },
                  {
                    name: '',
                    value: 126,
                  },
                  {
                    name: '',
                    value: 127,
                  },
                  {
                    name: '',
                    value: 128,
                  },
                  {
                    name: '',
                    value: 129,
                  },
                  {
                    name: '',
                    value: 130,
                  },
                  {
                    name: '',
                    value: 131,
                  },
                  {
                    name: '',
                    value: 132,
                  },
                  {
                    name: '',
                    value: 133,
                  },
                  {
                    name: '',
                    value: 134,
                  },
                  {
                    name: '',
                    value: 135,
                  },
                  {
                    name: '',
                    value: 136,
                  },
                  {
                    name: '',
                    value: 137,
                  },
                  {
                    name: '',
                    value: 138,
                  },
                  {
                    name: '',
                    value: 139,
                  },
                  {
                    name: '',
                    value: 140,
                  },
                  {
                    name: '',
                    value: 141,
                  },
                  {
                    name: '',
                    value: 142,
                  },
                  {
                    name: '',
                    value: 143,
                  },
                  {
                    name: '',
                    value: 144,
                  },
                  {
                    name: '',
                    value: 145,
                  },
                  {
                    name: '',
                    value: 146,
                  },
                  {
                    name: '',
                    value: 147,
                  },
                  {
                    name: '',
                    value: 148,
                  },
                  {
                    name: '',
                    value: 149,
                  },
                  {
                    name: '',
                    value: 150,
                  },
                  {
                    name: '',
                    value: 151,
                  },
                  {
                    name: '',
                    value: 152,
                  },
                  {
                    name: '',
                    value: 153,
                  },
                  {
                    name: '',
                    value: 154,
                  },
                  {
                    name: '',
                    value: 155,
                  },
                  {
                    name: '',
                    value: 156,
                  },
                  {
                    name: '',
                    value: 157,
                  },
                  {
                    name: '',
                    value: 158,
                  },
                  {
                    name: '',
                    value: 159,
                  },
                  {
                    name: '',
                    value: 160,
                  },
                  {
                    name: '',
                    value: 161,
                  },
                  {
                    name: '',
                    value: 162,
                  },
                  {
                    name: '',
                    value: 163,
                  },
                  {
                    name: '',
                    value: 164,
                  },
                  {
                    name: '',
                    value: 165,
                  },
                  {
                    name: '',
                    value: 166,
                  },
                  {
                    name: '',
                    value: 167,
                  },
                  {
                    name: '',
                    value: 168,
                  },
                  {
                    name: '',
                    value: 169,
                  },
                  {
                    name: '',
                    value: 170,
                  },
                  {
                    name: '',
                    value: 171,
                  },
                  {
                    name: '',
                    value: 172,
                  },
                  {
                    name: '',
                    value: 173,
                  },
                  {
                    name: '',
                    value: 174,
                  },
                  {
                    name: '',
                    value: 175,
                  },
                  {
                    name: '',
                    value: 176,
                  },
                  {
                    name: '',
                    value: 177,
                  },
                  {
                    name: '',
                    value: 178,
                  },
                  {
                    name: '',
                    value: 179,
                  },
                  {
                    name: '',
                    value: 180,
                  },
                  {
                    name: '',
                    value: 181,
                  },
                  {
                    name: '',
                    value: 182,
                  },
                  {
                    name: '',
                    value: 183,
                  },
                  {
                    name: '',
                    value: 184,
                  },
                  {
                    name: '',
                    value: 185,
                  },
                  {
                    name: '',
                    value: 186,
                  },
                  {
                    name: '',
                    value: 187,
                  },
                  {
                    name: '',
                    value: 188,
                  },
                  {
                    name: '',
                    value: 189,
                  },
                  {
                    name: '',
                    value: 190,
                  },
                  {
                    name: '',
                    value: 191,
                  },
                  {
                    name: '',
                    value: 192,
                  },
                  {
                    name: '',
                    value: 193,
                  },
                  {
                    name: '',
                    value: 194,
                  },
                  {
                    name: '',
                    value: 195,
                  },
                  {
                    name: '',
                    value: 196,
                  },
                  {
                    name: '',
                    value: 197,
                  },
                  {
                    name: '',
                    value: 198,
                  },
                  {
                    name: '',
                    value: 199,
                  },
                  {
                    name: '',
                    value: 200,
                  },
                ],
                url: '/registers',
                validator: 'PLCId',
                method: 'GET',
              },
            },
            {
              id: 'value',
              type: 'Float',
              help: 'Enter a value for the selected register, or select the <b>XYZ </b>icon to define a variable. If the selected register is between 1 and 100, the value must be an integer. If the selected value is between 101 and 200, the value must be a floating point number.',
              name: 'Value',
              constraints: {
                default: 1,
                max: 2147483647,
                min: -2147483648,
              },
            },
            {
              id: 'timeout',
              type: 'Duration',
              help: 'Define how long the robot should wait for the value in the set register before giving an error.',
              name: 'Timeout (seconds)',
              constraints: {
                default: null,
                max: '24:00:00.000000',
                null_option: 'Forever',
                nullable: true,
                min: '00:00:00.000000',
              },
            },
          ],
          help: 'A Wait for PLC register action is used to wait for a value and continue to the next action when the value is found in the set register.',
          action_type: 'wait_for_plc_register',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0005-missiongroup',
          name: 'Wait for PLC register',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/set_reset_plc',
          action_type: 'set_reset_plc',
          style: {
            icon: <Icons.Move />,
            color: '#A16207',
          },
        },
        detail: {
          allowed_methods: null,
          description:
            'PLC: Register %(register)d: Set %(value)f. Reset to %(reset_value)f when exited',
          parameters: [
            {
              id: 'register',
              type: 'Reference',
              help: 'Select a specific PLC register, or select the <b>XYZ</b> icon to define a variable. Registers 1 to 100 are reserved for integers and registers from 101-199 for floating point numbers.',
              name: 'Register',
              constraints: {
                value_field: 'id',
                name_field: 'label',
                default: 1,
                choices: [
                  {
                    name: '',
                    value: 1,
                  },
                  {
                    name: '',
                    value: 2,
                  },
                  {
                    name: '',
                    value: 3,
                  },
                  {
                    name: '',
                    value: 4,
                  },
                  {
                    name: '',
                    value: 5,
                  },
                  {
                    name: '',
                    value: 6,
                  },
                  {
                    name: '',
                    value: 7,
                  },
                  {
                    name: '',
                    value: 8,
                  },
                  {
                    name: '',
                    value: 9,
                  },
                  {
                    name: '',
                    value: 10,
                  },
                  {
                    name: '',
                    value: 11,
                  },
                  {
                    name: '',
                    value: 12,
                  },
                  {
                    name: '',
                    value: 13,
                  },
                  {
                    name: '',
                    value: 14,
                  },
                  {
                    name: '',
                    value: 15,
                  },
                  {
                    name: '',
                    value: 16,
                  },
                  {
                    name: '',
                    value: 17,
                  },
                  {
                    name: '',
                    value: 18,
                  },
                  {
                    name: '',
                    value: 19,
                  },
                  {
                    name: '',
                    value: 20,
                  },
                  {
                    name: '',
                    value: 21,
                  },
                  {
                    name: '',
                    value: 22,
                  },
                  {
                    name: '',
                    value: 23,
                  },
                  {
                    name: '',
                    value: 24,
                  },
                  {
                    name: '',
                    value: 25,
                  },
                  {
                    name: '',
                    value: 26,
                  },
                  {
                    name: '',
                    value: 27,
                  },
                  {
                    name: '',
                    value: 28,
                  },
                  {
                    name: '',
                    value: 29,
                  },
                  {
                    name: '',
                    value: 30,
                  },
                  {
                    name: '',
                    value: 31,
                  },
                  {
                    name: '',
                    value: 32,
                  },
                  {
                    name: '',
                    value: 33,
                  },
                  {
                    name: '',
                    value: 34,
                  },
                  {
                    name: '',
                    value: 35,
                  },
                  {
                    name: '',
                    value: 36,
                  },
                  {
                    name: '',
                    value: 37,
                  },
                  {
                    name: '',
                    value: 38,
                  },
                  {
                    name: '',
                    value: 39,
                  },
                  {
                    name: '',
                    value: 40,
                  },
                  {
                    name: '',
                    value: 41,
                  },
                  {
                    name: '',
                    value: 42,
                  },
                  {
                    name: '',
                    value: 43,
                  },
                  {
                    name: '',
                    value: 44,
                  },
                  {
                    name: '',
                    value: 45,
                  },
                  {
                    name: '',
                    value: 46,
                  },
                  {
                    name: '',
                    value: 47,
                  },
                  {
                    name: '',
                    value: 48,
                  },
                  {
                    name: '',
                    value: 49,
                  },
                  {
                    name: '',
                    value: 50,
                  },
                  {
                    name: '',
                    value: 51,
                  },
                  {
                    name: '',
                    value: 52,
                  },
                  {
                    name: '',
                    value: 53,
                  },
                  {
                    name: '',
                    value: 54,
                  },
                  {
                    name: '',
                    value: 55,
                  },
                  {
                    name: '',
                    value: 56,
                  },
                  {
                    name: '',
                    value: 57,
                  },
                  {
                    name: '',
                    value: 58,
                  },
                  {
                    name: '',
                    value: 59,
                  },
                  {
                    name: '',
                    value: 60,
                  },
                  {
                    name: '',
                    value: 61,
                  },
                  {
                    name: '',
                    value: 62,
                  },
                  {
                    name: '',
                    value: 63,
                  },
                  {
                    name: '',
                    value: 64,
                  },
                  {
                    name: '',
                    value: 65,
                  },
                  {
                    name: '',
                    value: 66,
                  },
                  {
                    name: '',
                    value: 67,
                  },
                  {
                    name: '',
                    value: 68,
                  },
                  {
                    name: '',
                    value: 69,
                  },
                  {
                    name: '',
                    value: 70,
                  },
                  {
                    name: '',
                    value: 71,
                  },
                  {
                    name: '',
                    value: 72,
                  },
                  {
                    name: '',
                    value: 73,
                  },
                  {
                    name: '',
                    value: 74,
                  },
                  {
                    name: '',
                    value: 75,
                  },
                  {
                    name: '',
                    value: 76,
                  },
                  {
                    name: '',
                    value: 77,
                  },
                  {
                    name: '',
                    value: 78,
                  },
                  {
                    name: '',
                    value: 79,
                  },
                  {
                    name: '',
                    value: 80,
                  },
                  {
                    name: '',
                    value: 81,
                  },
                  {
                    name: '',
                    value: 82,
                  },
                  {
                    name: '',
                    value: 83,
                  },
                  {
                    name: '',
                    value: 84,
                  },
                  {
                    name: '',
                    value: 85,
                  },
                  {
                    name: '',
                    value: 86,
                  },
                  {
                    name: '',
                    value: 87,
                  },
                  {
                    name: '',
                    value: 88,
                  },
                  {
                    name: '',
                    value: 89,
                  },
                  {
                    name: '',
                    value: 90,
                  },
                  {
                    name: '',
                    value: 91,
                  },
                  {
                    name: '',
                    value: 92,
                  },
                  {
                    name: '',
                    value: 93,
                  },
                  {
                    name: '',
                    value: 94,
                  },
                  {
                    name: '',
                    value: 95,
                  },
                  {
                    name: '',
                    value: 96,
                  },
                  {
                    name: '',
                    value: 97,
                  },
                  {
                    name: '',
                    value: 98,
                  },
                  {
                    name: '',
                    value: 99,
                  },
                  {
                    name: '',
                    value: 100,
                  },
                  {
                    name: '',
                    value: 101,
                  },
                  {
                    name: '',
                    value: 102,
                  },
                  {
                    name: '',
                    value: 103,
                  },
                  {
                    name: '',
                    value: 104,
                  },
                  {
                    name: '',
                    value: 105,
                  },
                  {
                    name: '',
                    value: 106,
                  },
                  {
                    name: '',
                    value: 107,
                  },
                  {
                    name: '',
                    value: 108,
                  },
                  {
                    name: '',
                    value: 109,
                  },
                  {
                    name: '',
                    value: 110,
                  },
                  {
                    name: '',
                    value: 111,
                  },
                  {
                    name: '',
                    value: 112,
                  },
                  {
                    name: '',
                    value: 113,
                  },
                  {
                    name: '',
                    value: 114,
                  },
                  {
                    name: '',
                    value: 115,
                  },
                  {
                    name: '',
                    value: 116,
                  },
                  {
                    name: '',
                    value: 117,
                  },
                  {
                    name: '',
                    value: 118,
                  },
                  {
                    name: '',
                    value: 119,
                  },
                  {
                    name: '',
                    value: 120,
                  },
                  {
                    name: '',
                    value: 121,
                  },
                  {
                    name: '',
                    value: 122,
                  },
                  {
                    name: '',
                    value: 123,
                  },
                  {
                    name: '',
                    value: 124,
                  },
                  {
                    name: '',
                    value: 125,
                  },
                  {
                    name: '',
                    value: 126,
                  },
                  {
                    name: '',
                    value: 127,
                  },
                  {
                    name: '',
                    value: 128,
                  },
                  {
                    name: '',
                    value: 129,
                  },
                  {
                    name: '',
                    value: 130,
                  },
                  {
                    name: '',
                    value: 131,
                  },
                  {
                    name: '',
                    value: 132,
                  },
                  {
                    name: '',
                    value: 133,
                  },
                  {
                    name: '',
                    value: 134,
                  },
                  {
                    name: '',
                    value: 135,
                  },
                  {
                    name: '',
                    value: 136,
                  },
                  {
                    name: '',
                    value: 137,
                  },
                  {
                    name: '',
                    value: 138,
                  },
                  {
                    name: '',
                    value: 139,
                  },
                  {
                    name: '',
                    value: 140,
                  },
                  {
                    name: '',
                    value: 141,
                  },
                  {
                    name: '',
                    value: 142,
                  },
                  {
                    name: '',
                    value: 143,
                  },
                  {
                    name: '',
                    value: 144,
                  },
                  {
                    name: '',
                    value: 145,
                  },
                  {
                    name: '',
                    value: 146,
                  },
                  {
                    name: '',
                    value: 147,
                  },
                  {
                    name: '',
                    value: 148,
                  },
                  {
                    name: '',
                    value: 149,
                  },
                  {
                    name: '',
                    value: 150,
                  },
                  {
                    name: '',
                    value: 151,
                  },
                  {
                    name: '',
                    value: 152,
                  },
                  {
                    name: '',
                    value: 153,
                  },
                  {
                    name: '',
                    value: 154,
                  },
                  {
                    name: '',
                    value: 155,
                  },
                  {
                    name: '',
                    value: 156,
                  },
                  {
                    name: '',
                    value: 157,
                  },
                  {
                    name: '',
                    value: 158,
                  },
                  {
                    name: '',
                    value: 159,
                  },
                  {
                    name: '',
                    value: 160,
                  },
                  {
                    name: '',
                    value: 161,
                  },
                  {
                    name: '',
                    value: 162,
                  },
                  {
                    name: '',
                    value: 163,
                  },
                  {
                    name: '',
                    value: 164,
                  },
                  {
                    name: '',
                    value: 165,
                  },
                  {
                    name: '',
                    value: 166,
                  },
                  {
                    name: '',
                    value: 167,
                  },
                  {
                    name: '',
                    value: 168,
                  },
                  {
                    name: '',
                    value: 169,
                  },
                  {
                    name: '',
                    value: 170,
                  },
                  {
                    name: '',
                    value: 171,
                  },
                  {
                    name: '',
                    value: 172,
                  },
                  {
                    name: '',
                    value: 173,
                  },
                  {
                    name: '',
                    value: 174,
                  },
                  {
                    name: '',
                    value: 175,
                  },
                  {
                    name: '',
                    value: 176,
                  },
                  {
                    name: '',
                    value: 177,
                  },
                  {
                    name: '',
                    value: 178,
                  },
                  {
                    name: '',
                    value: 179,
                  },
                  {
                    name: '',
                    value: 180,
                  },
                  {
                    name: '',
                    value: 181,
                  },
                  {
                    name: '',
                    value: 182,
                  },
                  {
                    name: '',
                    value: 183,
                  },
                  {
                    name: '',
                    value: 184,
                  },
                  {
                    name: '',
                    value: 185,
                  },
                  {
                    name: '',
                    value: 186,
                  },
                  {
                    name: '',
                    value: 187,
                  },
                  {
                    name: '',
                    value: 188,
                  },
                  {
                    name: '',
                    value: 189,
                  },
                  {
                    name: '',
                    value: 190,
                  },
                  {
                    name: '',
                    value: 191,
                  },
                  {
                    name: '',
                    value: 192,
                  },
                  {
                    name: '',
                    value: 193,
                  },
                  {
                    name: '',
                    value: 194,
                  },
                  {
                    name: '',
                    value: 195,
                  },
                  {
                    name: '',
                    value: 196,
                  },
                  {
                    name: '',
                    value: 197,
                  },
                  {
                    name: '',
                    value: 198,
                  },
                  {
                    name: '',
                    value: 199,
                  },
                  {
                    name: '',
                    value: 200,
                  },
                ],
                url: '/registers',
                validator: 'PLCId',
                method: 'GET',
              },
            },
            {
              id: 'value',
              type: 'Float',
              help: 'Enter a value for the selected register, or select the <b>XYZ </b>icon to define a variable. If the selected register is between 1 and 100, the value must be an integer. If the selected value is between 101 and 200, the value must be a floating point number.',
              name: 'Value',
              constraints: {
                default: 1,
                max: 2147483647,
                min: -2147483648,
              },
            },
            {
              id: 'reset_value',
              type: 'Float',
              help: 'Enter a value for the selected register, or select the <b>XYZ </b>icon to define a variable. If the selected register is between 1 and 100, the value must be an integer. If the selected value is between 101 and 200, the value must be a floating point number.',
              name: 'Reset value',
              constraints: {
                default: 0,
                max: 2147483647,
                min: -2147483648,
              },
            },
            {
              id: 'content',
              type: 'Scope',
              help: '',
              name: 'Content',
              constraints: {},
            },
          ],
          help: 'A Set and reset PLC register action is useful in missions where the robot is requested to set a value in a PLC register and reset the register to the original value when the action is finished. ',
          action_type: 'set_reset_plc',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0005-missiongroup',
          name: 'Set and reset PLC register',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/set_plc_register',
          action_type: 'set_plc_register',
          style: {
            icon: <Icons.Move />,
            color: '#A16207',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'PLC: Register %(register)d: %(action)s %(value)f',
          parameters: [
            {
              id: 'register',
              type: 'Reference',
              help: 'Select a specific PLC register, or select the <b>XYZ</b> icon to define a variable. Registers 1 to 100 are reserved for integers and registers from 101-199 for floating point numbers.',
              name: 'Register',
              constraints: {
                value_field: 'id',
                name_field: 'label',
                default: 1,
                choices: [
                  {
                    name: '',
                    value: 1,
                  },
                  {
                    name: '',
                    value: 2,
                  },
                  {
                    name: '',
                    value: 3,
                  },
                  {
                    name: '',
                    value: 4,
                  },
                  {
                    name: '',
                    value: 5,
                  },
                  {
                    name: '',
                    value: 6,
                  },
                  {
                    name: '',
                    value: 7,
                  },
                  {
                    name: '',
                    value: 8,
                  },
                  {
                    name: '',
                    value: 9,
                  },
                  {
                    name: '',
                    value: 10,
                  },
                  {
                    name: '',
                    value: 11,
                  },
                  {
                    name: '',
                    value: 12,
                  },
                  {
                    name: '',
                    value: 13,
                  },
                  {
                    name: '',
                    value: 14,
                  },
                  {
                    name: '',
                    value: 15,
                  },
                  {
                    name: '',
                    value: 16,
                  },
                  {
                    name: '',
                    value: 17,
                  },
                  {
                    name: '',
                    value: 18,
                  },
                  {
                    name: '',
                    value: 19,
                  },
                  {
                    name: '',
                    value: 20,
                  },
                  {
                    name: '',
                    value: 21,
                  },
                  {
                    name: '',
                    value: 22,
                  },
                  {
                    name: '',
                    value: 23,
                  },
                  {
                    name: '',
                    value: 24,
                  },
                  {
                    name: '',
                    value: 25,
                  },
                  {
                    name: '',
                    value: 26,
                  },
                  {
                    name: '',
                    value: 27,
                  },
                  {
                    name: '',
                    value: 28,
                  },
                  {
                    name: '',
                    value: 29,
                  },
                  {
                    name: '',
                    value: 30,
                  },
                  {
                    name: '',
                    value: 31,
                  },
                  {
                    name: '',
                    value: 32,
                  },
                  {
                    name: '',
                    value: 33,
                  },
                  {
                    name: '',
                    value: 34,
                  },
                  {
                    name: '',
                    value: 35,
                  },
                  {
                    name: '',
                    value: 36,
                  },
                  {
                    name: '',
                    value: 37,
                  },
                  {
                    name: '',
                    value: 38,
                  },
                  {
                    name: '',
                    value: 39,
                  },
                  {
                    name: '',
                    value: 40,
                  },
                  {
                    name: '',
                    value: 41,
                  },
                  {
                    name: '',
                    value: 42,
                  },
                  {
                    name: '',
                    value: 43,
                  },
                  {
                    name: '',
                    value: 44,
                  },
                  {
                    name: '',
                    value: 45,
                  },
                  {
                    name: '',
                    value: 46,
                  },
                  {
                    name: '',
                    value: 47,
                  },
                  {
                    name: '',
                    value: 48,
                  },
                  {
                    name: '',
                    value: 49,
                  },
                  {
                    name: '',
                    value: 50,
                  },
                  {
                    name: '',
                    value: 51,
                  },
                  {
                    name: '',
                    value: 52,
                  },
                  {
                    name: '',
                    value: 53,
                  },
                  {
                    name: '',
                    value: 54,
                  },
                  {
                    name: '',
                    value: 55,
                  },
                  {
                    name: '',
                    value: 56,
                  },
                  {
                    name: '',
                    value: 57,
                  },
                  {
                    name: '',
                    value: 58,
                  },
                  {
                    name: '',
                    value: 59,
                  },
                  {
                    name: '',
                    value: 60,
                  },
                  {
                    name: '',
                    value: 61,
                  },
                  {
                    name: '',
                    value: 62,
                  },
                  {
                    name: '',
                    value: 63,
                  },
                  {
                    name: '',
                    value: 64,
                  },
                  {
                    name: '',
                    value: 65,
                  },
                  {
                    name: '',
                    value: 66,
                  },
                  {
                    name: '',
                    value: 67,
                  },
                  {
                    name: '',
                    value: 68,
                  },
                  {
                    name: '',
                    value: 69,
                  },
                  {
                    name: '',
                    value: 70,
                  },
                  {
                    name: '',
                    value: 71,
                  },
                  {
                    name: '',
                    value: 72,
                  },
                  {
                    name: '',
                    value: 73,
                  },
                  {
                    name: '',
                    value: 74,
                  },
                  {
                    name: '',
                    value: 75,
                  },
                  {
                    name: '',
                    value: 76,
                  },
                  {
                    name: '',
                    value: 77,
                  },
                  {
                    name: '',
                    value: 78,
                  },
                  {
                    name: '',
                    value: 79,
                  },
                  {
                    name: '',
                    value: 80,
                  },
                  {
                    name: '',
                    value: 81,
                  },
                  {
                    name: '',
                    value: 82,
                  },
                  {
                    name: '',
                    value: 83,
                  },
                  {
                    name: '',
                    value: 84,
                  },
                  {
                    name: '',
                    value: 85,
                  },
                  {
                    name: '',
                    value: 86,
                  },
                  {
                    name: '',
                    value: 87,
                  },
                  {
                    name: '',
                    value: 88,
                  },
                  {
                    name: '',
                    value: 89,
                  },
                  {
                    name: '',
                    value: 90,
                  },
                  {
                    name: '',
                    value: 91,
                  },
                  {
                    name: '',
                    value: 92,
                  },
                  {
                    name: '',
                    value: 93,
                  },
                  {
                    name: '',
                    value: 94,
                  },
                  {
                    name: '',
                    value: 95,
                  },
                  {
                    name: '',
                    value: 96,
                  },
                  {
                    name: '',
                    value: 97,
                  },
                  {
                    name: '',
                    value: 98,
                  },
                  {
                    name: '',
                    value: 99,
                  },
                  {
                    name: '',
                    value: 100,
                  },
                  {
                    name: '',
                    value: 101,
                  },
                  {
                    name: '',
                    value: 102,
                  },
                  {
                    name: '',
                    value: 103,
                  },
                  {
                    name: '',
                    value: 104,
                  },
                  {
                    name: '',
                    value: 105,
                  },
                  {
                    name: '',
                    value: 106,
                  },
                  {
                    name: '',
                    value: 107,
                  },
                  {
                    name: '',
                    value: 108,
                  },
                  {
                    name: '',
                    value: 109,
                  },
                  {
                    name: '',
                    value: 110,
                  },
                  {
                    name: '',
                    value: 111,
                  },
                  {
                    name: '',
                    value: 112,
                  },
                  {
                    name: '',
                    value: 113,
                  },
                  {
                    name: '',
                    value: 114,
                  },
                  {
                    name: '',
                    value: 115,
                  },
                  {
                    name: '',
                    value: 116,
                  },
                  {
                    name: '',
                    value: 117,
                  },
                  {
                    name: '',
                    value: 118,
                  },
                  {
                    name: '',
                    value: 119,
                  },
                  {
                    name: '',
                    value: 120,
                  },
                  {
                    name: '',
                    value: 121,
                  },
                  {
                    name: '',
                    value: 122,
                  },
                  {
                    name: '',
                    value: 123,
                  },
                  {
                    name: '',
                    value: 124,
                  },
                  {
                    name: '',
                    value: 125,
                  },
                  {
                    name: '',
                    value: 126,
                  },
                  {
                    name: '',
                    value: 127,
                  },
                  {
                    name: '',
                    value: 128,
                  },
                  {
                    name: '',
                    value: 129,
                  },
                  {
                    name: '',
                    value: 130,
                  },
                  {
                    name: '',
                    value: 131,
                  },
                  {
                    name: '',
                    value: 132,
                  },
                  {
                    name: '',
                    value: 133,
                  },
                  {
                    name: '',
                    value: 134,
                  },
                  {
                    name: '',
                    value: 135,
                  },
                  {
                    name: '',
                    value: 136,
                  },
                  {
                    name: '',
                    value: 137,
                  },
                  {
                    name: '',
                    value: 138,
                  },
                  {
                    name: '',
                    value: 139,
                  },
                  {
                    name: '',
                    value: 140,
                  },
                  {
                    name: '',
                    value: 141,
                  },
                  {
                    name: '',
                    value: 142,
                  },
                  {
                    name: '',
                    value: 143,
                  },
                  {
                    name: '',
                    value: 144,
                  },
                  {
                    name: '',
                    value: 145,
                  },
                  {
                    name: '',
                    value: 146,
                  },
                  {
                    name: '',
                    value: 147,
                  },
                  {
                    name: '',
                    value: 148,
                  },
                  {
                    name: '',
                    value: 149,
                  },
                  {
                    name: '',
                    value: 150,
                  },
                  {
                    name: '',
                    value: 151,
                  },
                  {
                    name: '',
                    value: 152,
                  },
                  {
                    name: '',
                    value: 153,
                  },
                  {
                    name: '',
                    value: 154,
                  },
                  {
                    name: '',
                    value: 155,
                  },
                  {
                    name: '',
                    value: 156,
                  },
                  {
                    name: '',
                    value: 157,
                  },
                  {
                    name: '',
                    value: 158,
                  },
                  {
                    name: '',
                    value: 159,
                  },
                  {
                    name: '',
                    value: 160,
                  },
                  {
                    name: '',
                    value: 161,
                  },
                  {
                    name: '',
                    value: 162,
                  },
                  {
                    name: '',
                    value: 163,
                  },
                  {
                    name: '',
                    value: 164,
                  },
                  {
                    name: '',
                    value: 165,
                  },
                  {
                    name: '',
                    value: 166,
                  },
                  {
                    name: '',
                    value: 167,
                  },
                  {
                    name: '',
                    value: 168,
                  },
                  {
                    name: '',
                    value: 169,
                  },
                  {
                    name: '',
                    value: 170,
                  },
                  {
                    name: '',
                    value: 171,
                  },
                  {
                    name: '',
                    value: 172,
                  },
                  {
                    name: '',
                    value: 173,
                  },
                  {
                    name: '',
                    value: 174,
                  },
                  {
                    name: '',
                    value: 175,
                  },
                  {
                    name: '',
                    value: 176,
                  },
                  {
                    name: '',
                    value: 177,
                  },
                  {
                    name: '',
                    value: 178,
                  },
                  {
                    name: '',
                    value: 179,
                  },
                  {
                    name: '',
                    value: 180,
                  },
                  {
                    name: '',
                    value: 181,
                  },
                  {
                    name: '',
                    value: 182,
                  },
                  {
                    name: '',
                    value: 183,
                  },
                  {
                    name: '',
                    value: 184,
                  },
                  {
                    name: '',
                    value: 185,
                  },
                  {
                    name: '',
                    value: 186,
                  },
                  {
                    name: '',
                    value: 187,
                  },
                  {
                    name: '',
                    value: 188,
                  },
                  {
                    name: '',
                    value: 189,
                  },
                  {
                    name: '',
                    value: 190,
                  },
                  {
                    name: '',
                    value: 191,
                  },
                  {
                    name: '',
                    value: 192,
                  },
                  {
                    name: '',
                    value: 193,
                  },
                  {
                    name: '',
                    value: 194,
                  },
                  {
                    name: '',
                    value: 195,
                  },
                  {
                    name: '',
                    value: 196,
                  },
                  {
                    name: '',
                    value: 197,
                  },
                  {
                    name: '',
                    value: 198,
                  },
                  {
                    name: '',
                    value: 199,
                  },
                  {
                    name: '',
                    value: 200,
                  },
                ],
                url: '/registers',
                validator: 'PLCId',
                method: 'GET',
              },
            },
            {
              id: 'action',
              type: 'Selection',
              help: 'Select an action from the drop-down list, or select the <b>XYZ</b> icon to define a variable. The options are <b>Set</b>, <b>Add</b>, and <b>Subtract</b>.',
              name: 'Action',
              constraints: {
                default: 'set',
                choices: [
                  {
                    name: 'Set',
                    value: 'set',
                  },
                  {
                    name: 'Add',
                    value: 'add',
                  },
                  {
                    name: 'Subtract',
                    value: 'subtract',
                  },
                ],
              },
            },
            {
              id: 'value',
              type: 'Float',
              help: 'Enter a value for the selected register, or select the <b>XYZ </b>icon to define a variable. If the selected register is between 1 and 100, the value must be an integer. If the selected value is between 101 and 200, the value must be a floating point number.',
              name: 'Value',
              constraints: {
                default: 1,
                max: 2147483647,
                min: -2147483648,
              },
            },
          ],
          help: '<p>A Set PLC register action is used to set a value in a register. The register can be set in three ways:</p><ul><li><b>Set</b>: sets a value every time the mission is executed. </li><li><b>Add</b>: adds a value every time the mission is executed. </li><li><b>Subtract</b>: subtracts a value every time the mission is executed.</li></ul>',
          action_type: 'set_plc_register',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0005-missiongroup',
          name: 'Set PLC register',
        },
      },
    ],
  },
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0006-missiongroup',
      guid: 'mirconst-guid-0000-0006-missiongroup',
      name: 'E-mail',
      style: {
        icon: <Icons.Move />,
        color: '#0891B2',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/email',
          action_type: 'email',
          style: {
            icon: <Icons.Move />,
            color: '#0891B2',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Send email to %(recipient)s',
          parameters: [
            {
              id: 'recipient',
              type: 'Reference',
              help: 'Select a recipient from the drop-down list, or select the <b>XYZ</b> icon to define a variable. The recipients on the list come from the Users section.',
              name: 'Recipient',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: 'IS NOT',
                      fieldname: 'email',
                      value: null,
                    },
                  ],
                },
                value_field: 'guid',
                name_field: 'name',
                url: '/users/search',
                choices: [],
                method: 'POST',
              },
            },
            {
              id: 'subject',
              type: 'String',
              help: 'Type a subject of the email, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Subject',
              constraints: {
                default: '',
                min_length: 1,
                max_length: 255,
              },
            },
            {
              id: 'message',
              type: 'String',
              help: 'Write the message that the robot should send to the selected email address when the mission is executed, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Message',
              constraints: {
                default: '',
                min_length: 1,
                max_length: 255,
              },
            },
          ],
          help: 'A Send email action is used to send email messages to selected recipients as part of a mission, for example, to let an operator know that the robot has arrived at a specific location. Recipients must be set up in the Users section (<b>Setup</b> > <b>Users</b>) with an email address. Furthermore, an email account must be set up in the robot under <b>System</b> > <b>Settings</b> > <b>Email configuration</b>.',
          action_type: 'email',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0006-missiongroup',
          name: 'Send email',
        },
      },
    ],
  },
  {
    missionGroup: {
      url: '/v2.0.0/mission_groups/mirconst-guid-0000-0007-missiongroup',
      guid: 'mirconst-guid-0000-0007-missiongroup',
      name: 'IO module',
      style: {
        icon: <Icons.Move />,
        color: '#374151',
      },
    },
    actions: [
      {
        action: {
          url: '/v2.0.0/actions/disconnect_bluetooth',
          action_type: 'disconnect_bluetooth',
          style: {
            icon: <Icons.Move />,
            color: '#374151',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Disconnect the Bluetooth module',
          parameters: [],
          help: 'A Disconnect Bluetooth action is used when the robot must close the connection to a Bluetooth module.',
          action_type: 'disconnect_bluetooth',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0007-missiongroup',
          name: 'Disconnect Bluetooth',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/connect_bluetooth',
          action_type: 'connect_bluetooth',
          style: {
            icon: <Icons.Move />,
            color: '#374151',
          },
        },
        detail: {
          allowed_methods: null,
          description: 'Connect to Bluetooth module %(module)s',
          parameters: [
            {
              id: 'module',
              type: 'Reference',
              help: 'Select a Bluetooth module from the drop-down list, or select the <b>XYZ</b> icon to define a variable. Bluetooth modules are set up in the I/O modules section (<b>Setup</b> > <b>I/O modules</b>).',
              name: 'Module',
              constraints: {
                body: {
                  filters: [
                    {
                      operator: '=',
                      fieldname: 'type',
                      value: 'bluetooth',
                    },
                  ],
                },
                value_field: 'guid',
                name_field: 'name',
                url: '/io_modules/search',
                choices: [],
                method: 'POST',
              },
            },
          ],
          help: 'A Connect Bluetooth action is used when the robot must connect and stay connected to a Bluetooth module.',
          action_type: 'connect_bluetooth',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0007-missiongroup',
          name: 'Connect Bluetooth',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/wait_for_io',
          action_type: 'wait_for_io',
          style: {
            icon: <Icons.Move />,
            color: '#374151',
          },
        },
        detail: {
          allowed_methods: null,
          description:
            'Wait for port %(port)s on the I/O module %(module)s to become %(value)s.',
          parameters: [
            {
              id: 'module',
              type: 'Reference',
              help: 'Select an I/O module from the drop-down list, or select the <b>XYZ</b> icon to define a variable. I/O modules are set up in the section <b>Setup</b> > <b>I/O modules</b>.',
              name: 'Module',
              constraints: {
                url: '/io_modules',
                value_field: 'guid',
                name_field: 'name',
                method: 'GET',
                choices: [
                  {
                    name: 'ur5',
                    value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
                  },
                ],
              },
            },
            {
              id: 'port',
              type: 'Integer',
              help: 'Enter the input port number, or select the <b>XYZ </b>icon to define a variable.',
              name: 'Input',
              constraints: {
                default: 0,
                max: 4,
                min: 0,
              },
            },
            {
              id: 'value',
              type: 'Selection',
              help: 'Set operation to <b>On</b> or <b>Off</b>, or select the <b>XYZ</b> icon to define a variable. For example, select <b>Off</b> if the <b>Wait for input</b> action is used to stop a conveyor belt.',
              name: 'Value',
              constraints: {
                default: 'on',
                choices: [
                  {
                    name: 'Off',
                    value: 'off',
                  },
                  {
                    name: 'On',
                    value: 'on',
                  },
                ],
              },
            },
            {
              id: 'timeout',
              type: 'Duration',
              help: 'Define how long the robot should wait for the input to match the state set in Value before giving an error.',
              name: 'Timeout (seconds)',
              constraints: {
                default: null,
                max: '01:00:00.000000',
                null_option: 'Forever',
                nullable: true,
                min: '-00:00:01.000000',
              },
            },
          ],
          help: 'A Wait for input action is used when the robot needs to wait for an I/O module to respond.',
          action_type: 'wait_for_io',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0007-missiongroup',
          name: 'Wait for input',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/set_reset_io',
          action_type: 'set_reset_io',
          style: {
            icon: <Icons.Move />,
            color: '#374151',
          },
        },
        detail: {
          allowed_methods: null,
          description:
            'Set I/O port %(port)d %(operation)s on module %(module)s.',
          parameters: [
            {
              id: 'module',
              type: 'Reference',
              help: 'Select an I/O module from the drop-down list, or select the <b>XYZ</b> icon to define a variable. I/O modules are set up in the section <b>Setup</b> > <b>I/O modules</b>.',
              name: 'Module',
              constraints: {
                url: '/io_modules',
                value_field: 'guid',
                name_field: 'name',
                method: 'GET',
                choices: [
                  {
                    name: 'ur5',
                    value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
                  },
                ],
              },
            },
            {
              id: 'port',
              type: 'Integer',
              help: 'Enter which output port relay should be activated (1-4) , or select the <b>XYZ</b> icon to define a variable.',
              name: 'SMTP port',
              constraints: {
                default: 0,
                max: 4,
                min: 0,
              },
            },
            {
              id: 'operation',
              type: 'Selection',
              help: 'Set operation to <b>On</b> or <b>Off</b>, or select the <b>XYZ</b> icon to define a variable. For example, select <b>On</b> if the I/O module is used to open a door.',
              name: 'Operation',
              constraints: {
                default: 'on',
                choices: [
                  {
                    name: 'Off',
                    value: 'off',
                  },
                  {
                    name: 'On',
                    value: 'on',
                  },
                ],
              },
            },
            {
              help: 'Set an amount of time the relay should stay on, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Timeout (seconds)',
              dependencies: [
                {
                  dependency_id: 'operation',
                  value: 'on',
                },
              ],
              type: 'Duration',
              id: 'timeout',
              constraints: {
                default: null,
                max: '01:00:00.000000',
                null_option: 'Forever',
                nullable: true,
                min: '00:00:00.010000',
              },
            },
            {
              id: 'content',
              type: 'Scope',
              help: '',
              name: 'Content',
              constraints: {},
            },
          ],
          help: 'A Set and reset I/O action is useful in missions where the robot is requested to set an output on an I/O module and make sure the output is reset to the original value in case the robot is paused, goes into Protective stop, or the mission is aborted, for example, in raise and lower shelf missions.',
          action_type: 'set_reset_io',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0007-missiongroup',
          name: 'Set and reset I/O',
        },
      },
      {
        action: {
          url: '/v2.0.0/actions/set_io',
          action_type: 'set_io',
          style: {
            icon: <Icons.Move />,
            color: '#374151',
          },
        },
        detail: {
          allowed_methods: null,
          description:
            'Set I/O port %(port)d %(operation)s on module %(module)s',
          parameters: [
            {
              id: 'module',
              type: 'Reference',
              help: 'Select an I/O module from the drop-down list, or select the <b>XYZ</b> icon to define a variable. I/O modules are set up in the section <b>Setup</b> > <b>I/O modules</b>.',
              name: 'Module',
              constraints: {
                url: '/io_modules',
                value_field: 'guid',
                name_field: 'name',
                method: 'GET',
                choices: [
                  {
                    name: 'ur5',
                    value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
                  },
                ],
              },
            },
            {
              id: 'port',
              type: 'Integer',
              help: 'Enter which output port relay should be activated (1-4) , or select the <b>XYZ</b> icon to define a variable.',
              name: 'SMTP port',
              constraints: {
                default: 0,
                max: 4,
                min: 0,
              },
            },
            {
              id: 'operation',
              type: 'Selection',
              help: 'Set operation to <b>On</b> or <b>Off</b>, or select the <b>XYZ</b> icon to define a variable. For example, select <b>On</b> if the I/O module is used to open a door.',
              name: 'Operation',
              constraints: {
                default: 'on',
                choices: [
                  {
                    name: 'Off',
                    value: 'off',
                  },
                  {
                    name: 'On',
                    value: 'on',
                  },
                ],
              },
            },
            {
              help: 'Set an amount of time the relay should stay on, or select the <b>XYZ</b> icon to define a variable.',
              name: 'Timeout (seconds)',
              dependencies: [
                {
                  dependency_id: 'operation',
                  value: 'on',
                },
              ],
              type: 'Duration',
              id: 'timeout',
              constraints: {
                default: null,
                max: '01:00:00.000000',
                null_option: 'Forever',
                nullable: true,
                min: '00:00:00.010000',
              },
            },
          ],
          help: 'A Set output action is used when the robot needs to send a command to an I/O module.',
          action_type: 'set_io',
          descriptions: null,
          mission_group_id: 'mirconst-guid-0000-0007-missiongroup',
          name: 'Set output',
        },
      },
    ],
  },
];

export const existedAction = [
  {
    mission_id: '374052c7-38a4-11f0-b4c9-000129af8ea5',
    scope_reference: null,
    parameters: [
      {
        value: 'plc_register',
        input_name: null,
        guid: '0447ef47-3ba5-11f0-9176-000129af8ea5',
        id: 'compare',
        type: 'Selection',
        constraints: {
          default: 'battery',
          choices: [
            {
              name: 'Battery Percentage',
              value: 'battery',
            },
            {
              name: 'PLC Register',
              value: 'plc_register',
            },
            {
              name: 'Pending missions',
              value: 'mission_queue_length',
            },
            {
              name: 'I/O input',
              value: 'io_module',
            },
          ],
        },
      },
      {
        value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
        input_name: null,
        guid: '04481d00-3ba5-11f0-9176-000129af8ea5',
        id: 'module',
        type: 'Reference',
        constraints: {
          url: '/io_modules',
          value_field: 'guid',
          name_field: 'name',
          method: 'GET',
          choices: [
            {
              name: 'ur5',
              value: '339096ae-2ca7-11ef-95a5-000129af8ea5',
            },
          ],
        },
      },
      {
        value: '0',
        input_name: null,
        guid: '044845c0-3ba5-11f0-9176-000129af8ea5',
        id: 'io_port',
        type: 'Integer',
        constraints: {
          default: 0,
          max: 99,
          min: 0,
        },
      },
      {
        value: '1',
        input_name: null,
        guid: '04486f4a-3ba5-11f0-9176-000129af8ea5',
        id: 'register',
        type: 'Reference',
        constraints: {
          value_field: 'id',
          name_field: 'label',
          default: 1,
          choices: [
            {
              name: '',
              value: 1,
            },
            {
              name: '',
              value: 2,
            },
            {
              name: '',
              value: 3,
            },
            {
              name: '',
              value: 4,
            },
            {
              name: '',
              value: 5,
            },
            {
              name: '',
              value: 6,
            },
            {
              name: '',
              value: 7,
            },
            {
              name: '',
              value: 8,
            },
            {
              name: '',
              value: 9,
            },
            {
              name: '',
              value: 10,
            },
            {
              name: '',
              value: 11,
            },
            {
              name: '',
              value: 12,
            },
            {
              name: '',
              value: 13,
            },
            {
              name: '',
              value: 14,
            },
            {
              name: '',
              value: 15,
            },
            {
              name: '',
              value: 16,
            },
            {
              name: '',
              value: 17,
            },
            {
              name: '',
              value: 18,
            },
            {
              name: '',
              value: 19,
            },
            {
              name: '',
              value: 20,
            },
            {
              name: '',
              value: 21,
            },
            {
              name: '',
              value: 22,
            },
            {
              name: '',
              value: 23,
            },
            {
              name: '',
              value: 24,
            },
            {
              name: '',
              value: 25,
            },
            {
              name: '',
              value: 26,
            },
            {
              name: '',
              value: 27,
            },
            {
              name: '',
              value: 28,
            },
            {
              name: '',
              value: 29,
            },
            {
              name: '',
              value: 30,
            },
            {
              name: '',
              value: 31,
            },
            {
              name: '',
              value: 32,
            },
            {
              name: '',
              value: 33,
            },
            {
              name: '',
              value: 34,
            },
            {
              name: '',
              value: 35,
            },
            {
              name: '',
              value: 36,
            },
            {
              name: '',
              value: 37,
            },
            {
              name: '',
              value: 38,
            },
            {
              name: '',
              value: 39,
            },
            {
              name: '',
              value: 40,
            },
            {
              name: '',
              value: 41,
            },
            {
              name: '',
              value: 42,
            },
            {
              name: '',
              value: 43,
            },
            {
              name: '',
              value: 44,
            },
            {
              name: '',
              value: 45,
            },
            {
              name: '',
              value: 46,
            },
            {
              name: '',
              value: 47,
            },
            {
              name: '',
              value: 48,
            },
            {
              name: '',
              value: 49,
            },
            {
              name: '',
              value: 50,
            },
            {
              name: '',
              value: 51,
            },
            {
              name: '',
              value: 52,
            },
            {
              name: '',
              value: 53,
            },
            {
              name: '',
              value: 54,
            },
            {
              name: '',
              value: 55,
            },
            {
              name: '',
              value: 56,
            },
            {
              name: '',
              value: 57,
            },
            {
              name: '',
              value: 58,
            },
            {
              name: '',
              value: 59,
            },
            {
              name: '',
              value: 60,
            },
            {
              name: '',
              value: 61,
            },
            {
              name: '',
              value: 62,
            },
            {
              name: '',
              value: 63,
            },
            {
              name: '',
              value: 64,
            },
            {
              name: '',
              value: 65,
            },
            {
              name: '',
              value: 66,
            },
            {
              name: '',
              value: 67,
            },
            {
              name: '',
              value: 68,
            },
            {
              name: '',
              value: 69,
            },
            {
              name: '',
              value: 70,
            },
            {
              name: '',
              value: 71,
            },
            {
              name: '',
              value: 72,
            },
            {
              name: '',
              value: 73,
            },
            {
              name: '',
              value: 74,
            },
            {
              name: '',
              value: 75,
            },
            {
              name: '',
              value: 76,
            },
            {
              name: '',
              value: 77,
            },
            {
              name: '',
              value: 78,
            },
            {
              name: '',
              value: 79,
            },
            {
              name: '',
              value: 80,
            },
            {
              name: '',
              value: 81,
            },
            {
              name: '',
              value: 82,
            },
            {
              name: '',
              value: 83,
            },
            {
              name: '',
              value: 84,
            },
            {
              name: '',
              value: 85,
            },
            {
              name: '',
              value: 86,
            },
            {
              name: '',
              value: 87,
            },
            {
              name: '',
              value: 88,
            },
            {
              name: '',
              value: 89,
            },
            {
              name: '',
              value: 90,
            },
            {
              name: '',
              value: 91,
            },
            {
              name: '',
              value: 92,
            },
            {
              name: '',
              value: 93,
            },
            {
              name: '',
              value: 94,
            },
            {
              name: '',
              value: 95,
            },
            {
              name: '',
              value: 96,
            },
            {
              name: '',
              value: 97,
            },
            {
              name: '',
              value: 98,
            },
            {
              name: '',
              value: 99,
            },
            {
              name: '',
              value: 100,
            },
            {
              name: '',
              value: 101,
            },
            {
              name: '',
              value: 102,
            },
            {
              name: '',
              value: 103,
            },
            {
              name: '',
              value: 104,
            },
            {
              name: '',
              value: 105,
            },
            {
              name: '',
              value: 106,
            },
            {
              name: '',
              value: 107,
            },
            {
              name: '',
              value: 108,
            },
            {
              name: '',
              value: 109,
            },
            {
              name: '',
              value: 110,
            },
            {
              name: '',
              value: 111,
            },
            {
              name: '',
              value: 112,
            },
            {
              name: '',
              value: 113,
            },
            {
              name: '',
              value: 114,
            },
            {
              name: '',
              value: 115,
            },
            {
              name: '',
              value: 116,
            },
            {
              name: '',
              value: 117,
            },
            {
              name: '',
              value: 118,
            },
            {
              name: '',
              value: 119,
            },
            {
              name: '',
              value: 120,
            },
            {
              name: '',
              value: 121,
            },
            {
              name: '',
              value: 122,
            },
            {
              name: '',
              value: 123,
            },
            {
              name: '',
              value: 124,
            },
            {
              name: '',
              value: 125,
            },
            {
              name: '',
              value: 126,
            },
            {
              name: '',
              value: 127,
            },
            {
              name: '',
              value: 128,
            },
            {
              name: '',
              value: 129,
            },
            {
              name: '',
              value: 130,
            },
            {
              name: '',
              value: 131,
            },
            {
              name: '',
              value: 132,
            },
            {
              name: '',
              value: 133,
            },
            {
              name: '',
              value: 134,
            },
            {
              name: '',
              value: 135,
            },
            {
              name: '',
              value: 136,
            },
            {
              name: '',
              value: 137,
            },
            {
              name: '',
              value: 138,
            },
            {
              name: '',
              value: 139,
            },
            {
              name: '',
              value: 140,
            },
            {
              name: '',
              value: 141,
            },
            {
              name: '',
              value: 142,
            },
            {
              name: '',
              value: 143,
            },
            {
              name: '',
              value: 144,
            },
            {
              name: '',
              value: 145,
            },
            {
              name: '',
              value: 146,
            },
            {
              name: '',
              value: 147,
            },
            {
              name: '',
              value: 148,
            },
            {
              name: '',
              value: 149,
            },
            {
              name: '',
              value: 150,
            },
            {
              name: '',
              value: 151,
            },
            {
              name: '',
              value: 152,
            },
            {
              name: '',
              value: 153,
            },
            {
              name: '',
              value: 154,
            },
            {
              name: '',
              value: 155,
            },
            {
              name: '',
              value: 156,
            },
            {
              name: '',
              value: 157,
            },
            {
              name: '',
              value: 158,
            },
            {
              name: '',
              value: 159,
            },
            {
              name: '',
              value: 160,
            },
            {
              name: '',
              value: 161,
            },
            {
              name: '',
              value: 162,
            },
            {
              name: '',
              value: 163,
            },
            {
              name: '',
              value: 164,
            },
            {
              name: '',
              value: 165,
            },
            {
              name: '',
              value: 166,
            },
            {
              name: '',
              value: 167,
            },
            {
              name: '',
              value: 168,
            },
            {
              name: '',
              value: 169,
            },
            {
              name: '',
              value: 170,
            },
            {
              name: '',
              value: 171,
            },
            {
              name: '',
              value: 172,
            },
            {
              name: '',
              value: 173,
            },
            {
              name: '',
              value: 174,
            },
            {
              name: '',
              value: 175,
            },
            {
              name: '',
              value: 176,
            },
            {
              name: '',
              value: 177,
            },
            {
              name: '',
              value: 178,
            },
            {
              name: '',
              value: 179,
            },
            {
              name: '',
              value: 180,
            },
            {
              name: '',
              value: 181,
            },
            {
              name: '',
              value: 182,
            },
            {
              name: '',
              value: 183,
            },
            {
              name: '',
              value: 184,
            },
            {
              name: '',
              value: 185,
            },
            {
              name: '',
              value: 186,
            },
            {
              name: '',
              value: 187,
            },
            {
              name: '',
              value: 188,
            },
            {
              name: '',
              value: 189,
            },
            {
              name: '',
              value: 190,
            },
            {
              name: '',
              value: 191,
            },
            {
              name: '',
              value: 192,
            },
            {
              name: '',
              value: 193,
            },
            {
              name: '',
              value: 194,
            },
            {
              name: '',
              value: 195,
            },
            {
              name: '',
              value: 196,
            },
            {
              name: '',
              value: 197,
            },
            {
              name: '',
              value: 198,
            },
            {
              name: '',
              value: 199,
            },
            {
              name: '',
              value: 200,
            },
          ],
          url: '/registers',
          validator: 'PLCId',
          method: 'GET',
        },
      },
      {
        value: '==',
        input_name: null,
        guid: '04489459-3ba5-11f0-9176-000129af8ea5',
        id: 'operator',
        type: 'Selection',
        constraints: {
          default: '==',
          choices: [
            {
              name: '==',
              value: '==',
            },
            {
              name: '!=',
              value: '!=',
            },
            {
              name: '>',
              value: '>',
            },
            {
              name: '>=',
              value: '>=',
            },
            {
              name: '<',
              value: '<',
            },
            {
              name: '<=',
              value: '<=',
            },
          ],
        },
      },
      {
        value: 1,
        input_name: null,
        guid: '0448af2d-3ba5-11f0-9176-000129af8ea5',
        id: 'value',
        type: 'Float',
        constraints: {
          default: 1,
          max: 1000000000,
          min: -1000000000,
        },
      },
      {
        value: '',
        input_name: null,
        guid: '0448d1c7-3ba5-11f0-9176-000129af8ea5',
        id: 'true',
        type: 'Scope',
        constraints: {},
      },
      {
        value: '',
        input_name: null,
        guid: '0448f8e8-3ba5-11f0-9176-000129af8ea5',
        id: 'false',
        type: 'Scope',
        constraints: {},
      },
    ],
    priority: 1,
    action_type: 'if',
    guid: '0447511a-3ba5-11f0-9176-000129af8ea5',
  },
];
