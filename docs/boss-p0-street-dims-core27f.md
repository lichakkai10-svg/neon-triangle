# 老闆 P0 街景尺寸鎖（2026-10-24）

水平 `u=m×1.5`；高度／細 prop／≤1m 淨空 `1:1`。機器可讀：`assets/data/art-dims-street-acceptance-core27f.json`（已併入 p0）。

{
  "project": "neon-triangle",
  "for_version": "core27f",
  "locked": "boss P0 2026-10-24",
  "scale_rule_zh": "水平 u=m×1.5；角色／細 prop 高度／≤1m 淨空 1:1",
  "hk_arcade": {
    "col_from_kerb_m": 1.5,
    "col_from_kerb_u": 2.25,
    "col_from_shop_m": [
      1.2,
      1.5
    ],
    "col_from_shop_u": [
      1.8,
      2.25
    ],
    "gf_h_m": [
      3.0,
      3.5
    ],
    "gf_h_u": [
      3.0,
      3.5
    ],
    "upper_h_m": [
      2.7,
      3.2
    ],
    "upper_h_u": [
      2.7,
      3.2
    ],
    "window_w_m": [
      1.2,
      1.8
    ],
    "window_w_u": [
      1.8,
      2.7
    ],
    "clear_h_u": [
      2.7,
      3.5
    ],
    "depth_u": [
      2.25,
      3.75
    ],
    "post_u": [
      5.25,
      7.5
    ],
    "pick": {
      "depth": 3.0,
      "clear_h": 3.0,
      "post": 6.0,
      "col_from_kerb": 2.25
    }
  },
  "hk_housing_floor_h_u": [
    2.7,
    2.9
  ],
  "hk_ac": {
    "window_unit_share_old": [
      0.4,
      0.6
    ],
    "split_share_newtown": 0.8,
    "bracket_cm": [
      [
        20,
        40
      ],
      [
        30,
        50
      ]
    ],
    "outdoor_from_window_m": 0.15,
    "outdoor_from_ground_m": [
      1.5,
      2.5
    ],
    "split_box_u": {
      "w": 0.85,
      "h": 0.6,
      "d": 0.35
    }
  },
  "hk_laundry": {
    "floors": [
      2,
      8
    ],
    "avoid_under_canopy_longterm": true,
    "protrude_u": [
      1.5,
      2.25
    ]
  },
  "hk_canopy": {
    "extend_m": [
      0.8,
      1.5
    ],
    "extend_u": [
      1.2,
      2.25
    ],
    "clear_h_u": 2.5
  },
  "hk_sign": {
    "extend_m": [
      0.5,
      1.2
    ],
    "extend_u": [
      0.75,
      1.8
    ],
    "no_carriageway": true
  },
  "hk_footway_m": {
    "main": [
      2.0,
      3.5
    ],
    "side": [
      1.5,
      2.5
    ]
  },
  "hk_kerb_m": [
    0.1,
    0.15
  ],
  "hk_kerb_pick": 0.125,
  "hk_bin_spacing_main_m": [
    20,
    50
  ],
  "hk_bin_spacing_main_u": [
    30,
    75
  ],
  "hk_railing_h_m": {
    "iron": [
      0.9,
      1.1
    ],
    "concrete": [
      0.9,
      1.0
    ],
    "pick": 1.0
  },
  "hk_market": {
    "canvas_colors_zh": "藍綠紅白",
    "pipe_mm": [
      40,
      60
    ]
  },
  "hk_mtr_kiosk_m": {
    "w": [
      2.5,
      3.5
    ],
    "h": [
      2.8,
      3.5
    ],
    "d": [
      1.5,
      2.5
    ],
    "glass_pct": [
      0.6,
      0.7
    ]
  },
  "vehicles_m": {
    "dd_bus": [
      12,
      2.5,
      4.4
    ],
    "minibus": [
      [
        7,
        7.5
      ],
      [
        2.0,
        2.2
      ],
      [
        2.5,
        2.8
      ]
    ],
    "taxi": [
      [
        4.5,
        5
      ],
      [
        1.7,
        1.8
      ],
      1.5
    ],
    "tram_double": [
      20,
      2.4,
      3.5
    ],
    "tram_gauge_mm": 1067
  },
  "bus_shelter_m": {
    "l": [
      4,
      6
    ],
    "w": [
      2.5,
      3.0
    ]
  },
  "pole_spacing_main_m": [
    20,
    40
  ],
  "blacklist_zh": [
    "7-Eleven",
    "OK",
    "Circle K",
    "VanGO",
    "周大福",
    "六福",
    "謝瑞麟",
    "中原",
    "美聯",
    "利嘉閣",
    "天仁",
    "春水堂",
    "貢茶"
  ],
  "doc": "docs/boss-p0-street-dims-core27f.md"
}