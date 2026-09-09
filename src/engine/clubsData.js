/* ==========================================================================
   CLUBS & LEAGUES DATABASE • EXTRACTED FROM SOCCERWIKI
   Includes 160+ clubs across 15 national and global leagues
   ========================================================================== */

export const LEAGUES = {
  "REGIONAL": {
    "id": "regional",
    "name": "Série D / Acesso Regional",
    "category": "domestic_regional",
    "country": "🇧🇷",
    "repTier": 1,
    "avgSalaryRange": [
      2500,
      8000
    ],
    "signingBonusRange": [
      0,
      20000
    ]
  },
  "SERIE_C": {
    "id": "serie_c",
    "name": "Brasileirão Série C",
    "category": "domestic_c",
    "country": "🇧🇷",
    "repTier": 2,
    "avgSalaryRange": [
      8000,
      25000
    ],
    "signingBonusRange": [
      20000,
      100000
    ]
  },
  "SERIE_B": {
    "id": "serie_b",
    "name": "Brasileirão Série B",
    "category": "domestic_b",
    "country": "🇧🇷",
    "repTier": 2,
    "avgSalaryRange": [
      20000,
      60000
    ],
    "signingBonusRange": [
      60000,
      300000
    ]
  },
  "SERIE_A": {
    "id": "serie_a",
    "name": "Brasileirão Série A (Elite)",
    "category": "domestic_a",
    "country": "🇧🇷",
    "repTier": 3,
    "avgSalaryRange": [
      80000,
      450000
    ],
    "signingBonusRange": [
      500000,
      3000000
    ]
  },
  "ARGENTINA": {
    "id": "argentina",
    "name": "Liga Profesional (Argentina)",
    "category": "south_america",
    "country": "🇦🇷",
    "repTier": 3,
    "avgSalaryRange": [
      60000,
      320000
    ],
    "signingBonusRange": [
      300000,
      2000000
    ]
  },
  "LIGA_MX": {
    "id": "liga_mx",
    "name": "Liga MX (México)",
    "category": "americas",
    "country": "🇲🇽",
    "repTier": 3,
    "avgSalaryRange": [
      90000,
      450000
    ],
    "signingBonusRange": [
      500000,
      2500000
    ]
  },
  "MLS": {
    "id": "mls",
    "name": "Major League Soccer (EUA)",
    "category": "americas",
    "country": "🇺🇸",
    "repTier": 3,
    "avgSalaryRange": [
      150000,
      800000
    ],
    "signingBonusRange": [
      1000000,
      5000000
    ]
  },
  "SAUDI_PRO": {
    "id": "saudi_pro",
    "name": "Saudi Pro League (Petrodólares)",
    "category": "petrodollar",
    "country": "🇸🇦",
    "repTier": 3,
    "avgSalaryRange": [
      800000,
      3500000
    ],
    "signingBonusRange": [
      10000000,
      40000000
    ]
  },
  "PORTUGAL": {
    "id": "portugal",
    "name": "Liga Portugal (Vitrine Europeia)",
    "category": "europe_mid",
    "country": "🇵🇹",
    "repTier": 4,
    "avgSalaryRange": [
      120000,
      550000
    ],
    "signingBonusRange": [
      1000000,
      5000000
    ]
  },
  "PREMIER_LEAGUE": {
    "id": "premier_league",
    "name": "Premier League (Inglaterra)",
    "category": "europe_top",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "repTier": 5,
    "avgSalaryRange": [
      1500000,
      5500000
    ],
    "signingBonusRange": [
      15000000,
      60000000
    ]
  },
  "LA_LIGA": {
    "id": "la_liga",
    "name": "La Liga (Espanha)",
    "category": "europe_top",
    "country": "🇪🇸",
    "repTier": 5,
    "avgSalaryRange": [
      1200000,
      5000000
    ],
    "signingBonusRange": [
      12000000,
      50000000
    ]
  },
  "SERIE_A_ITALIA": {
    "id": "serie_a_italia",
    "name": "Serie A (Itália)",
    "category": "europe_top",
    "country": "🇮🇹",
    "repTier": 5,
    "avgSalaryRange": [
      1000000,
      4000000
    ],
    "signingBonusRange": [
      10000000,
      40000000
    ]
  },
  "BUNDESLIGA": {
    "id": "bundesliga",
    "name": "Bundesliga (Alemanha)",
    "category": "europe_top",
    "country": "🇩🇪",
    "repTier": 5,
    "avgSalaryRange": [
      1100000,
      4500000
    ],
    "signingBonusRange": [
      12000000,
      45000000
    ]
  },
  "J_LEAGUE": {
    "id": "j_league",
    "name": "J-League (Japão)",
    "category": "asia",
    "country": "🇯🇵",
    "repTier": 3,
    "avgSalaryRange": [
      100000,
      450000
    ],
    "signingBonusRange": [
      500000,
      2500000
    ]
  },
  "RUSSIA": {
    "id": "russia",
    "name": "Russian Premier League (Rússia)",
    "category": "europe_mid",
    "country": "🇷🇺",
    "repTier": 3,
    "avgSalaryRange": [
      180000,
      750000
    ],
    "signingBonusRange": [
      1500000,
      6000000
    ]
  },
  "GLOBAL_AVULSOS": {
    "id": "global_avulsos",
    "name": "Clubes Globais & Históricos",
    "category": "global",
    "country": "🌍",
    "repTier": 4,
    "avgSalaryRange": [
      150000,
      900000
    ],
    "signingBonusRange": [
      1200000,
      8000000
    ]
  }
};

export const CLUBS = [
  {
    "id": "club_2478",
    "wikiId": 2478,
    "name": "Brasil de Pelotas",
    "shortName": "GEB",
    "league": "REGIONAL",
    "city": "Pelotas (RS)",
    "country": "🇧🇷",
    "badge": "🔴⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2478.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 25,
    "stadium": "Bento Freitas",
    "rival": null
  },
  {
    "id": "club_3436",
    "wikiId": 3436,
    "name": "São José-RS",
    "shortName": "SJO",
    "league": "REGIONAL",
    "city": "Porto Alegre (RS)",
    "country": "🇧🇷",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3436.png",
    "colors": {
      "primary": "#0a3871",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 18,
    "stadium": "Passo D'Areia",
    "rival": null
  },
  {
    "id": "club_3426",
    "wikiId": 3426,
    "name": "Ferroviária",
    "shortName": "AFE",
    "league": "REGIONAL",
    "city": "Araraquara (SP)",
    "country": "🇧🇷",
    "badge": "🚂",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3426.png",
    "colors": {
      "primary": "#6b1d2f",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 22,
    "stadium": "Arena da Fonte",
    "rival": null
  },
  {
    "id": "club_3523",
    "wikiId": 3523,
    "name": "Maringá FC",
    "shortName": "MFC",
    "league": "REGIONAL",
    "city": "Maringá (PR)",
    "country": "🇧🇷",
    "badge": "🐕",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3523.png",
    "colors": {
      "primary": "#005a36",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 22,
    "stadium": "Willie Davids",
    "rival": null
  },
  {
    "id": "club_2396",
    "wikiId": 2396,
    "name": "Campinense",
    "shortName": "CPC",
    "league": "REGIONAL",
    "city": "Campina Grande (PB)",
    "country": "🇧🇷",
    "badge": "🦊",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2396.png",
    "colors": {
      "primary": "#c4122f",
      "secondary": "#1a1a1a",
      "text": "#111111"
    },
    "prestige": 21,
    "stadium": "Amigão",
    "rival": null
  },
  {
    "id": "club_2815",
    "wikiId": 2815,
    "name": "Bangu",
    "shortName": "BAN",
    "league": "REGIONAL",
    "city": "Rio de Janeiro (RJ)",
    "country": "🇧🇷",
    "badge": "🔴⚪",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2815.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 19,
    "stadium": "Moça Bonita",
    "rival": null
  },
  {
    "id": "club_603",
    "wikiId": 603,
    "name": "Santa Cruz",
    "shortName": "SCZ",
    "league": "REGIONAL",
    "city": "Recife (PE)",
    "country": "🇧🇷",
    "badge": "🐍",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/603.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 32,
    "stadium": "Arruda",
    "rival": null
  },
  {
    "id": "club_1232",
    "wikiId": 1232,
    "name": "Portuguesa",
    "shortName": "POR",
    "league": "REGIONAL",
    "city": "São Paulo (SP)",
    "country": "🇧🇷",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1232.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#00543d",
      "text": "#111111"
    },
    "prestige": 30,
    "stadium": "Canindé",
    "rival": null
  },
  {
    "id": "club_2475",
    "wikiId": 2475,
    "name": "Volta Redonda",
    "shortName": "VRE",
    "league": "SERIE_C",
    "city": "Volta Redonda (RJ)",
    "country": "🇧🇷",
    "badge": "⚡",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2475.png",
    "colors": {
      "primary": "#1a1a1a",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 36,
    "stadium": "Raulino de Oliveira",
    "rival": null
  },
  {
    "id": "club_4483",
    "wikiId": 4483,
    "name": "Brusque",
    "shortName": "BFC",
    "league": "SERIE_C",
    "city": "Brusque (SC)",
    "country": "🇧🇷",
    "badge": "🟡",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/4483.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 37,
    "stadium": "Augusto Bauer",
    "rival": null
  },
  {
    "id": "club_3017",
    "wikiId": 3017,
    "name": "Botafogo-PB",
    "shortName": "BPB",
    "league": "SERIE_C",
    "city": "João Pessoa (PB)",
    "country": "🇧🇷",
    "badge": "⭐",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3017.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 39,
    "stadium": "Almeidão",
    "rival": null
  },
  {
    "id": "club_3254",
    "wikiId": 3254,
    "name": "Operário-PR",
    "shortName": "VIC",
    "league": "SERIE_C",
    "city": "Ponta Grossa (PR)",
    "country": "🇧🇷",
    "badge": "⚪⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3254.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 38,
    "stadium": "Germano Krüger",
    "rival": null
  },
  {
    "id": "club_6455",
    "wikiId": 6455,
    "name": "Amazonas FC",
    "shortName": "EUR",
    "league": "SERIE_C",
    "city": "Manaus (AM)",
    "country": "🇧🇷",
    "badge": "🐆",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/6455.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 37,
    "stadium": "Arena da Amazônia",
    "rival": null
  },
  {
    "id": "club_301",
    "wikiId": 301,
    "name": "Paraná Clube",
    "shortName": "PAR",
    "league": "SERIE_C",
    "city": "Recife (PE)",
    "country": "🇧🇷",
    "badge": "🇦🇹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/301.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 45,
    "stadium": "Aflitos",
    "rival": null
  },
  {
    "id": "club_604",
    "wikiId": 604,
    "name": "Clube do Remo",
    "shortName": "BYE",
    "league": "SERIE_C",
    "city": "Belém (PA)",
    "country": "🇧🇷",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/604.png",
    "colors": {
      "primary": "#002244",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 44,
    "stadium": "Baenão",
    "rival": null
  },
  {
    "id": "club_293",
    "wikiId": 293,
    "name": "Figueirense",
    "shortName": "FIG",
    "league": "SERIE_C",
    "city": "Florianópolis (SC)",
    "country": "🇧🇷",
    "badge": "🌪️",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/293.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 43,
    "stadium": "Orlando Scarpelli",
    "rival": null
  },
  {
    "id": "club_1478",
    "wikiId": 1478,
    "name": "Club Rubio Ñú",
    "shortName": "RUB",
    "league": "SERIE_C",
    "city": "Maceió (AL)",
    "country": "🇧🇷",
    "badge": "🔵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1478.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 42,
    "stadium": "Rei Pelé",
    "rival": null
  },
  {
    "id": "club_3073",
    "wikiId": 3073,
    "name": "Ypiranga de Erechim",
    "shortName": "SV",
    "league": "SERIE_C",
    "city": "Erechim (RS)",
    "country": "🇧🇷",
    "badge": "🟡🟢",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3073.jpg",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#00543d",
      "text": "#111111"
    },
    "prestige": 35,
    "stadium": "Colosso da Lagoa",
    "rival": null
  },
  {
    "id": "club_923",
    "wikiId": 923,
    "name": "Sport Recife",
    "shortName": "SPO",
    "league": "SERIE_B",
    "city": "Recife (PE)",
    "country": "🇧🇷",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/923.png",
    "colors": {
      "primary": "#c4122f",
      "secondary": "#1a1a1a",
      "text": "#111111"
    },
    "prestige": 56,
    "stadium": "Ilha do Retiro",
    "rival": null
  },
  {
    "id": "club_1458",
    "wikiId": 1458,
    "name": "Ceará SC",
    "shortName": "CEA",
    "league": "SERIE_B",
    "city": "Fortaleza (CE)",
    "country": "🇧🇷",
    "badge": "👴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1458.png",
    "colors": {
      "primary": "#1a1a1a",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 55,
    "stadium": "Arena Castelão",
    "rival": null
  },
  {
    "id": "club_291",
    "wikiId": 291,
    "name": "Coritiba",
    "shortName": "CFC",
    "league": "SERIE_B",
    "city": "Curitiba (PR)",
    "country": "🇧🇷",
    "badge": "🟢",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/291.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 54,
    "stadium": "Couto Pereira",
    "rival": null
  },
  {
    "id": "club_297",
    "wikiId": 297,
    "name": "Goiás",
    "shortName": "GOI",
    "league": "SERIE_B",
    "city": "Goiânia (GO)",
    "country": "🇧🇷",
    "badge": "🦜",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/297.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 53,
    "stadium": "Serrinha",
    "rival": null
  },
  {
    "id": "club_303",
    "wikiId": 303,
    "name": "Ponte Preta",
    "shortName": "PP",
    "league": "SERIE_B",
    "city": "Campinas (SP)",
    "country": "🇧🇷",
    "badge": "🐵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/303.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 50,
    "stadium": "Moisés Lucarelli",
    "rival": null
  },
  {
    "id": "club_1515",
    "wikiId": 1515,
    "name": "Guarani FC",
    "shortName": "GUA",
    "league": "SERIE_B",
    "city": "Campinas (SP)",
    "country": "🇧🇷",
    "badge": "🏹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1515.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 49,
    "stadium": "Brinco de Ouro",
    "rival": null
  },
  {
    "id": "club_1414",
    "wikiId": 1414,
    "name": "Avaí FC",
    "shortName": "AFC",
    "league": "SERIE_B",
    "city": "Florianópolis (SC)",
    "country": "🇧🇷",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1414.png",
    "colors": {
      "primary": "#0047ab",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 51,
    "stadium": "Ressacada",
    "rival": null
  },
  {
    "id": "club_2379",
    "wikiId": 2379,
    "name": "Chapecoense",
    "shortName": "ACF",
    "league": "SERIE_B",
    "city": "Chapecó (SC)",
    "country": "🇧🇷",
    "badge": "🏹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2379.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 52,
    "stadium": "Arena Condá",
    "rival": null
  },
  {
    "id": "club_3481",
    "wikiId": 3481,
    "name": "Novorizontino",
    "shortName": "GEN",
    "league": "SERIE_B",
    "city": "Novo Horizonte (SP)",
    "country": "🇧🇷",
    "badge": "🐯",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3481.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 48,
    "stadium": "Jorjão",
    "rival": null
  },
  {
    "id": "club_302",
    "wikiId": 302,
    "name": "Paysandu",
    "shortName": "PAY",
    "league": "SERIE_B",
    "city": "Belém (PA)",
    "country": "🇧🇷",
    "badge": "🐺",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/302.png",
    "colors": {
      "primary": "#0080ff",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 52,
    "stadium": "Curuzu",
    "rival": null
  },
  {
    "id": "club_1457",
    "wikiId": 1457,
    "name": "Vila Nova",
    "shortName": "VN",
    "league": "SERIE_B",
    "city": "Goiânia (GO)",
    "country": "🇧🇷",
    "badge": "🐅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1457.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 49,
    "stadium": "OBA",
    "rival": null
  },
  {
    "id": "club_294",
    "wikiId": 294,
    "name": "Flamengo",
    "shortName": "FLA",
    "league": "SERIE_A",
    "city": "Rio de Janeiro (RJ)",
    "country": "🇧🇷",
    "badge": "🔴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/294.png",
    "colors": {
      "primary": "#c4122f",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 91,
    "stadium": "Maracanã",
    "rival": null
  },
  {
    "id": "club_300",
    "wikiId": 300,
    "name": "Palmeiras",
    "shortName": "PAL",
    "league": "SERIE_A",
    "city": "São Paulo (SP)",
    "country": "🇧🇷",
    "badge": "🐷",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/300.png",
    "colors": {
      "primary": "#006437",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 89,
    "stadium": "Allianz Parque",
    "rival": null
  },
  {
    "id": "club_306",
    "wikiId": 306,
    "name": "São Paulo FC",
    "shortName": "SAO",
    "league": "SERIE_A",
    "city": "São Paulo (SP)",
    "country": "🇧🇷",
    "badge": "⚪",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/306.png",
    "colors": {
      "primary": "#c4122f",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 87,
    "stadium": "MorumBIS",
    "rival": null
  },
  {
    "id": "club_290",
    "wikiId": 290,
    "name": "Corinthians",
    "shortName": "COR",
    "league": "SERIE_A",
    "city": "São Paulo (SP)",
    "country": "🇧🇷",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/290.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 86,
    "stadium": "Neo Química Arena",
    "rival": null
  },
  {
    "id": "club_602",
    "wikiId": 602,
    "name": "Grêmio",
    "shortName": "GR&",
    "league": "SERIE_A",
    "city": "Porto Alegre (RS)",
    "country": "🇧🇷",
    "badge": "🔵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/602.png",
    "colors": {
      "primary": "#0080ff",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 85,
    "stadium": "Arena do Grêmio",
    "rival": null
  },
  {
    "id": "club_298",
    "wikiId": 298,
    "name": "Internacional",
    "shortName": "INT",
    "league": "SERIE_A",
    "city": "Porto Alegre (RS)",
    "country": "🇧🇷",
    "badge": "🇦🇹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/298.png",
    "colors": {
      "primary": "#d4001a",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 84,
    "stadium": "Beira-Rio",
    "rival": null
  },
  {
    "id": "club_286",
    "wikiId": 286,
    "name": "Atlético Mineiro",
    "shortName": "CAM",
    "league": "SERIE_A",
    "city": "Belo Horizonte (MG)",
    "country": "🇧🇷",
    "badge": "🐔",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/286.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 84,
    "stadium": "Arena MRV",
    "rival": null
  },
  {
    "id": "club_292",
    "wikiId": 292,
    "name": "Cruzeiro",
    "shortName": "CRZ",
    "league": "SERIE_A",
    "city": "Belo Horizonte (MG)",
    "country": "🇧🇷",
    "badge": "🦊",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/292.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 83,
    "stadium": "Mineirão",
    "rival": null
  },
  {
    "id": "club_288",
    "wikiId": 288,
    "name": "Botafogo",
    "shortName": "BOT",
    "league": "SERIE_A",
    "city": "Rio de Janeiro (RJ)",
    "country": "🇧🇷",
    "badge": "⭐",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/288.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 85,
    "stadium": "Nilton Santos",
    "rival": null
  },
  {
    "id": "club_295",
    "wikiId": 295,
    "name": "Fluminense",
    "shortName": "FLU",
    "league": "SERIE_A",
    "city": "Rio de Janeiro (RJ)",
    "country": "🇧🇷",
    "badge": "🇭🇺",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/295.png",
    "colors": {
      "primary": "#8b1d2f",
      "secondary": "#005a36",
      "text": "#111111"
    },
    "prestige": 84,
    "stadium": "Maracanã",
    "rival": null
  },
  {
    "id": "club_307",
    "wikiId": 307,
    "name": "Vasco da Gama",
    "shortName": "VAS",
    "league": "SERIE_A",
    "city": "Rio de Janeiro (RJ)",
    "country": "🇧🇷",
    "badge": "⛵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/307.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 83,
    "stadium": "São Januário",
    "rival": null
  },
  {
    "id": "club_304",
    "wikiId": 304,
    "name": "Santos FC",
    "shortName": "SFC",
    "league": "SERIE_A",
    "city": "Santos (SP)",
    "country": "🇧🇷",
    "badge": "🐋",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/304.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 83,
    "stadium": "Vila Belmiro",
    "rival": null
  },
  {
    "id": "club_1473",
    "wikiId": 1473,
    "name": "Bahia",
    "shortName": "BAH",
    "league": "SERIE_A",
    "city": "Salvador (BA)",
    "country": "🇧🇷",
    "badge": "🔵🔴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1473.png",
    "colors": {
      "primary": "#0047ab",
      "secondary": "#d4001a",
      "text": "#111111"
    },
    "prestige": 81,
    "stadium": "Arena Fonte Nova",
    "rival": null
  },
  {
    "id": "club_296",
    "wikiId": 296,
    "name": "Fortaleza",
    "shortName": "FOR",
    "league": "SERIE_A",
    "city": "Fortaleza (CE)",
    "country": "🇧🇷",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/296.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#d4001a",
      "text": "#111111"
    },
    "prestige": 81,
    "stadium": "Arena Castelão",
    "rival": null
  },
  {
    "id": "club_287",
    "wikiId": 287,
    "name": "Athletico Paranaense",
    "shortName": "CAP",
    "league": "SERIE_A",
    "city": "Curitiba (PR)",
    "country": "🇧🇷",
    "badge": "🌪️",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/287.png",
    "colors": {
      "primary": "#c4122f",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 82,
    "stadium": "Ligga Arena",
    "rival": null
  },
  {
    "id": "club_1447",
    "wikiId": 1447,
    "name": "RB Bragantino",
    "shortName": "RBB",
    "league": "SERIE_A",
    "city": "Bragança Paulista (SP)",
    "country": "🇧🇷",
    "badge": "🐂",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1447.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#c4122f",
      "text": "#111111"
    },
    "prestige": 80,
    "stadium": "Nabi Abi Chedid",
    "rival": null
  },
  {
    "id": "club_270",
    "wikiId": 270,
    "name": "Boca Juniors",
    "shortName": "BOJ",
    "league": "ARGENTINA",
    "city": "Buenos Aires",
    "country": "🇦🇷",
    "badge": "🔷🔶",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/270.png",
    "colors": {
      "primary": "#002f6c",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 88,
    "stadium": "La Bombonera",
    "rival": null
  },
  {
    "id": "club_282",
    "wikiId": 282,
    "name": "River Plate",
    "shortName": "RIV",
    "league": "ARGENTINA",
    "city": "Buenos Aires",
    "country": "🇦🇷",
    "badge": "⚪🔴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/282.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 89,
    "stadium": "Mâs Monumental",
    "rival": null
  },
  {
    "id": "club_280",
    "wikiId": 280,
    "name": "Quilmes AC",
    "shortName": "QAC",
    "league": "ARGENTINA",
    "city": "Avellaneda",
    "country": "🇦🇷",
    "badge": "🩵🤍",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/280.png",
    "colors": {
      "primary": "#6ba4b8",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 82,
    "stadium": "El Cilindro",
    "rival": null
  },
  {
    "id": "club_275",
    "wikiId": 275,
    "name": "Independiente",
    "shortName": "IND",
    "league": "ARGENTINA",
    "city": "Avellaneda",
    "country": "🇦🇷",
    "badge": "👹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/275.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 82,
    "stadium": "Libertadores de América",
    "rival": null
  },
  {
    "id": "club_283",
    "wikiId": 283,
    "name": "Rosario Central",
    "shortName": "ROS",
    "league": "ARGENTINA",
    "city": "Buenos Aires",
    "country": "🇦🇷",
    "badge": "🔵🔴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/283.png",
    "colors": {
      "primary": "#002f6c",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 80,
    "stadium": "Pedro Bidegain",
    "rival": null
  },
  {
    "id": "club_273",
    "wikiId": 273,
    "name": "Gimnasia de Jujuy",
    "shortName": "GIM",
    "league": "ARGENTINA",
    "city": "La Plata",
    "country": "🇦🇷",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/273.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 80,
    "stadium": "Jorge Luis Hirschi",
    "rival": null
  },
  {
    "id": "club_281",
    "wikiId": 281,
    "name": "Racing Club",
    "shortName": "RAC",
    "league": "ARGENTINA",
    "city": "Rosario",
    "country": "🇦🇷",
    "badge": "🟡🔵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/281.png",
    "colors": {
      "primary": "#002f6c",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 79,
    "stadium": "Gigante de Arroyito",
    "rival": null
  },
  {
    "id": "club_277",
    "wikiId": 277,
    "name": "Newell's Old Boys",
    "shortName": "LAN",
    "league": "ARGENTINA",
    "city": "Rosario",
    "country": "🇦🇷",
    "badge": "🔴⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/277.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 79,
    "stadium": "Marcelo Bielsa",
    "rival": null
  },
  {
    "id": "club_284",
    "wikiId": 284,
    "name": "Talleres",
    "shortName": "SAN",
    "league": "ARGENTINA",
    "city": "Córdoba",
    "country": "🇦🇷",
    "badge": "⚪🔵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/284.png",
    "colors": {
      "primary": "#002f6c",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 79,
    "stadium": "Mario Kempes",
    "rival": null
  },
  {
    "id": "club_439",
    "wikiId": 439,
    "name": "América-MEX",
    "shortName": "AME",
    "league": "LIGA_MX",
    "city": "Cidade do México",
    "country": "🇲🇽",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/439.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#002f6c",
      "text": "#111111"
    },
    "prestige": 82,
    "stadium": "Estadio Azteca",
    "rival": null
  },
  {
    "id": "club_444",
    "wikiId": 444,
    "name": "Chivas Guadalajara",
    "shortName": "GDL",
    "league": "LIGA_MX",
    "city": "Guadalajara",
    "country": "🇲🇽",
    "badge": "🐐",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/444.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 81,
    "stadium": "Estadio Akron",
    "rival": null
  },
  {
    "id": "club_443",
    "wikiId": 443,
    "name": "Cruz Azul",
    "shortName": "CAZ",
    "league": "LIGA_MX",
    "city": "Cidade do México",
    "country": "🇲🇽",
    "badge": "🚂",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/443.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 80,
    "stadium": "Estadio Ciudad de los Deportes",
    "rival": null
  },
  {
    "id": "club_452",
    "wikiId": 452,
    "name": "Mineros de Zacatecas",
    "shortName": "MIN",
    "league": "LIGA_MX",
    "city": "Monterrey",
    "country": "🇲🇽",
    "badge": "🐯",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/452.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#003882",
      "text": "#111111"
    },
    "prestige": 82,
    "stadium": "Estadio Universitario",
    "rival": null
  },
  {
    "id": "club_446",
    "wikiId": 446,
    "name": "CF Monterrey",
    "shortName": "MZN",
    "league": "LIGA_MX",
    "city": "Monterrey",
    "country": "🇲🇽",
    "badge": "🤠",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/446.png",
    "colors": {
      "primary": "#002f6c",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 81,
    "stadium": "Estadio BBVA",
    "rival": null
  },
  {
    "id": "club_451",
    "wikiId": 451,
    "name": "Toluca",
    "shortName": "TOL",
    "league": "LIGA_MX",
    "city": "Toluca",
    "country": "🇲🇽",
    "badge": "👹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/451.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 79,
    "stadium": "Nemesio Díez",
    "rival": null
  },
  {
    "id": "club_453",
    "wikiId": 453,
    "name": "Pumas UNAM",
    "shortName": "PUM",
    "league": "LIGA_MX",
    "city": "Cidade do México",
    "country": "🇲🇽",
    "badge": "🐾",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/453.png",
    "colors": {
      "primary": "#00245d",
      "secondary": "#c59b27",
      "text": "#111111"
    },
    "prestige": 80,
    "stadium": "Olímpico Universitario",
    "rival": null
  },
  {
    "id": "club_447",
    "wikiId": 447,
    "name": "Pachuca",
    "shortName": "PAC",
    "league": "LIGA_MX",
    "city": "Pachuca",
    "country": "🇲🇽",
    "badge": "🐹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/447.png",
    "colors": {
      "primary": "#002f6c",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 79,
    "stadium": "Estadio Hidalgo",
    "rival": null
  },
  {
    "id": "club_5228",
    "wikiId": 5228,
    "name": "Inter Miami",
    "shortName": "MIA",
    "league": "MLS",
    "city": "Miami",
    "country": "🇺🇸",
    "badge": "🦩",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/5228.png",
    "colors": {
      "primary": "#f7b5cd",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 78,
    "stadium": "Chase Stadium",
    "rival": null
  },
  {
    "id": "club_461",
    "wikiId": 461,
    "name": "LA Galaxy",
    "shortName": "GAL",
    "league": "MLS",
    "city": "Los Angeles",
    "country": "🇺🇸",
    "badge": "⭐",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/461.png",
    "colors": {
      "primary": "#00245d",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 76,
    "stadium": "Dignity Health Sports Park",
    "rival": null
  },
  {
    "id": "club_4260",
    "wikiId": 4260,
    "name": "LAFC",
    "shortName": "LAF",
    "league": "MLS",
    "city": "Los Angeles",
    "country": "🇺🇸",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/4260.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#c59b27",
      "text": "#111111"
    },
    "prestige": 77,
    "stadium": "BMO Stadium",
    "rival": null
  },
  {
    "id": "club_1042",
    "wikiId": 1042,
    "name": "Caernarfon Town",
    "shortName": "CAE",
    "league": "MLS",
    "city": "Seattle",
    "country": "🇺🇸",
    "badge": "🌲",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1042.png",
    "colors": {
      "primary": "#5d9732",
      "secondary": "#005595",
      "text": "#111111"
    },
    "prestige": 75,
    "stadium": "Lumen Field",
    "rival": null
  },
  {
    "id": "club_3210",
    "wikiId": 3210,
    "name": "New York City",
    "shortName": "NYC",
    "league": "MLS",
    "city": "Nova York",
    "country": "🇺🇸",
    "badge": "🗽",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3210.png",
    "colors": {
      "primary": "#6cace4",
      "secondary": "#041e42",
      "text": "#111111"
    },
    "prestige": 75,
    "stadium": "Yankee Stadium",
    "rival": null
  },
  {
    "id": "club_3377",
    "wikiId": 3377,
    "name": "Lincoln Red Imps",
    "shortName": "LRI",
    "league": "MLS",
    "city": "Atlanta",
    "country": "🇺🇸",
    "badge": "🔴⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/3377.png",
    "colors": {
      "primary": "#80000a",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 74,
    "stadium": "Mercedes-Benz Stadium",
    "rival": null
  },
  {
    "id": "club_625",
    "wikiId": 625,
    "name": "Al-Hilal",
    "shortName": "HIL",
    "league": "SAUDI_PRO",
    "city": "Riad",
    "country": "🇸🇦",
    "badge": "🌙",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/625.png",
    "colors": {
      "primary": "#002b80",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 72,
    "stadium": "Kingdom Arena",
    "rival": null
  },
  {
    "id": "club_665",
    "wikiId": 665,
    "name": "Al-Nassr",
    "shortName": "NSR",
    "league": "SAUDI_PRO",
    "city": "Riad",
    "country": "🇸🇦",
    "badge": "👑",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/665.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#002b80",
      "text": "#111111"
    },
    "prestige": 72,
    "stadium": "Al-Awwal Park",
    "rival": null
  },
  {
    "id": "club_627",
    "wikiId": 627,
    "name": "Al-Ittihad",
    "shortName": "ITH",
    "league": "SAUDI_PRO",
    "city": "Jidá",
    "country": "🇸🇦",
    "badge": "🐅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/627.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 71,
    "stadium": "King Abdullah Sports City",
    "rival": null
  },
  {
    "id": "club_628",
    "wikiId": 628,
    "name": "Al-Ahli",
    "shortName": "AHL",
    "league": "SAUDI_PRO",
    "city": "Jidá",
    "country": "🇸🇦",
    "badge": "🟢",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/628.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 70,
    "stadium": "Prince Abdullah Al-Faisal",
    "rival": null
  },
  {
    "id": "club_626",
    "wikiId": 626,
    "name": "Al-Shabab",
    "shortName": "SHA",
    "league": "SAUDI_PRO",
    "city": "Riad",
    "country": "🇸🇦",
    "badge": "⚪⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/626.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 68,
    "stadium": "Al Shabab Stadium",
    "rival": null
  },
  {
    "id": "club_666",
    "wikiId": 666,
    "name": "Al-Ettifaq",
    "shortName": "ITF",
    "league": "SAUDI_PRO",
    "city": "Dammam",
    "country": "🇸🇦",
    "badge": "🟢🔴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/666.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 67,
    "stadium": "Prince Mohamed bin Fahd",
    "rival": null
  },
  {
    "id": "club_47",
    "wikiId": 47,
    "name": "Manchester City",
    "shortName": "MCI",
    "league": "PREMIER_LEAGUE",
    "city": "Manchester",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "⛵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/47.png",
    "colors": {
      "primary": "#6cabdd",
      "secondary": "#1c2c5b",
      "text": "#111111"
    },
    "prestige": 98,
    "stadium": "Etihad Stadium",
    "rival": null
  },
  {
    "id": "club_1",
    "wikiId": 1,
    "name": "Arsenal",
    "shortName": "ARS",
    "league": "PREMIER_LEAGUE",
    "city": "Londres",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "🔴⚪",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1.png",
    "colors": {
      "primary": "#db0007",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 95,
    "stadium": "Emirates Stadium",
    "rival": null
  },
  {
    "id": "club_44",
    "wikiId": 44,
    "name": "Liverpool",
    "shortName": "LIV",
    "league": "PREMIER_LEAGUE",
    "city": "Liverpool",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/44.png",
    "colors": {
      "primary": "#c8102e",
      "secondary": "#00b2a9",
      "text": "#111111"
    },
    "prestige": 96,
    "stadium": "Anfield",
    "rival": null
  },
  {
    "id": "club_2",
    "wikiId": 2,
    "name": "Aston Villa",
    "shortName": "AVL",
    "league": "PREMIER_LEAGUE",
    "city": "Birmingham",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2.png",
    "colors": {
      "primary": "#670e36",
      "secondary": "#95bfe5",
      "text": "#111111"
    },
    "prestige": 89,
    "stadium": "Villa Park",
    "rival": null
  },
  {
    "id": "club_56",
    "wikiId": 56,
    "name": "Tottenham",
    "shortName": "NCO",
    "league": "PREMIER_LEAGUE",
    "city": "Londres",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "🐓",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/56.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#132257",
      "text": "#111111"
    },
    "prestige": 90,
    "stadium": "Tottenham Hotspur Stadium",
    "rival": null
  },
  {
    "id": "club_38",
    "wikiId": 38,
    "name": "Ipswich Town",
    "shortName": "IPS",
    "league": "PREMIER_LEAGUE",
    "city": "Londres",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/38.png",
    "colors": {
      "primary": "#034694",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 92,
    "stadium": "Stamford Bridge",
    "rival": null
  },
  {
    "id": "club_48",
    "wikiId": 48,
    "name": "Newcastle",
    "shortName": "MAN",
    "league": "PREMIER_LEAGUE",
    "city": "Newcastle",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "🏰",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/48.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 89,
    "stadium": "St. James' Park",
    "rival": null
  },
  {
    "id": "club_46",
    "wikiId": 46,
    "name": "Macclesfield FC",
    "shortName": "MAC",
    "league": "PREMIER_LEAGUE",
    "city": "Manchester",
    "country": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "badge": "👹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/46.png",
    "colors": {
      "primary": "#da291c",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 93,
    "stadium": "Old Trafford",
    "rival": null
  },
  {
    "id": "club_163",
    "wikiId": 163,
    "name": "Real Madrid",
    "shortName": "RMA",
    "league": "LA_LIGA",
    "city": "Madri",
    "country": "🇪🇸",
    "badge": "👑",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/163.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#4d1e8c",
      "text": "#111111"
    },
    "prestige": 99,
    "stadium": "Santiago Bernabéu",
    "rival": null
  },
  {
    "id": "club_140",
    "wikiId": 140,
    "name": "FC Barcelona",
    "shortName": "BAR",
    "league": "LA_LIGA",
    "city": "Barcelona",
    "country": "🇪🇸",
    "badge": "🔴🔵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/140.png",
    "colors": {
      "primary": "#004d98",
      "secondary": "#a50044",
      "text": "#111111"
    },
    "prestige": 97,
    "stadium": "Spotify Camp Nou",
    "rival": null
  },
  {
    "id": "club_139",
    "wikiId": 139,
    "name": "Atlético Madrid",
    "shortName": "ATM",
    "league": "LA_LIGA",
    "city": "Madri",
    "country": "🇪🇸",
    "badge": "🐻",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/139.png",
    "colors": {
      "primary": "#cb3524",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 92,
    "stadium": "Cívitas Metropolitano",
    "rival": null
  },
  {
    "id": "club_138",
    "wikiId": 138,
    "name": "Athletic Club",
    "shortName": "ATH",
    "league": "LA_LIGA",
    "city": "Bilbao",
    "country": "🇪🇸",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/138.png",
    "colors": {
      "primary": "#ee2524",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 88,
    "stadium": "San Mamés",
    "rival": null
  },
  {
    "id": "club_164",
    "wikiId": 164,
    "name": "Real Murcia",
    "shortName": "RMU",
    "league": "LA_LIGA",
    "city": "San Sebastián",
    "country": "🇪🇸",
    "badge": "⚪🔵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/164.png",
    "colors": {
      "primary": "#0067b1",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 87,
    "stadium": "Reale Arena",
    "rival": null
  },
  {
    "id": "club_162",
    "wikiId": 162,
    "name": "Real Betis",
    "shortName": "BET",
    "league": "LA_LIGA",
    "city": "Sevilha",
    "country": "🇪🇸",
    "badge": "🟢⚪",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/162.png",
    "colors": {
      "primary": "#0bb364",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 86,
    "stadium": "Benito Villamarín",
    "rival": null
  },
  {
    "id": "club_166",
    "wikiId": 166,
    "name": "Sevilla",
    "shortName": "RCR",
    "league": "LA_LIGA",
    "city": "Sevilha",
    "country": "🇪🇸",
    "badge": "⚔️",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/166.png",
    "colors": {
      "primary": "#d4001a",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 86,
    "stadium": "Ramón Sánchez-Pizjuán",
    "rival": null
  },
  {
    "id": "club_109",
    "wikiId": 109,
    "name": "Internazionale",
    "shortName": "INT",
    "league": "SERIE_A_ITALIA",
    "city": "Milão",
    "country": "🇮🇹",
    "badge": "🐍",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/109.png",
    "colors": {
      "primary": "#001489",
      "secondary": "#000000",
      "text": "#111111"
    },
    "prestige": 95,
    "stadium": "San Siro",
    "rival": null
  },
  {
    "id": "club_115",
    "wikiId": 115,
    "name": "AC Milan",
    "shortName": "MIL",
    "league": "SERIE_A_ITALIA",
    "city": "Milão",
    "country": "🇮🇹",
    "badge": "🔴⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/115.png",
    "colors": {
      "primary": "#fb090b",
      "secondary": "#000000",
      "text": "#111111"
    },
    "prestige": 93,
    "stadium": "San Siro",
    "rival": null
  },
  {
    "id": "club_110",
    "wikiId": 110,
    "name": "Juventus",
    "shortName": "JUV",
    "league": "SERIE_A_ITALIA",
    "city": "Turim",
    "country": "🇮🇹",
    "badge": "⚪⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/110.png",
    "colors": {
      "primary": "#000000",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 93,
    "stadium": "Allianz Stadium",
    "rival": null
  },
  {
    "id": "club_116",
    "wikiId": 116,
    "name": "Modena",
    "shortName": "MOD",
    "league": "SERIE_A_ITALIA",
    "city": "Nápoles",
    "country": "🇮🇹",
    "badge": "🌋",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/116.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 90,
    "stadium": "Diego Armando Maradona",
    "rival": null
  },
  {
    "id": "club_122",
    "wikiId": 122,
    "name": "AS Roma",
    "shortName": "REG",
    "league": "SERIE_A_ITALIA",
    "city": "Roma",
    "country": "🇮🇹",
    "badge": "🐺",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/122.png",
    "colors": {
      "primary": "#8e1f2f",
      "secondary": "#f0bc42",
      "text": "#111111"
    },
    "prestige": 89,
    "stadium": "Stadio Olimpico",
    "rival": null
  },
  {
    "id": "club_111",
    "wikiId": 111,
    "name": "SS Lazio",
    "shortName": "LAZ",
    "league": "SERIE_A_ITALIA",
    "city": "Roma",
    "country": "🇮🇹",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/111.png",
    "colors": {
      "primary": "#87d8f7",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 88,
    "stadium": "Stadio Olimpico",
    "rival": null
  },
  {
    "id": "club_101",
    "wikiId": 101,
    "name": "Catania FC",
    "shortName": "CAT",
    "league": "SERIE_A_ITALIA",
    "city": "Bérgamo",
    "country": "🇮🇹",
    "badge": "女神",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/101.png",
    "colors": {
      "primary": "#1e71b8",
      "secondary": "#000000",
      "text": "#111111"
    },
    "prestige": 89,
    "stadium": "Gewiss Stadium",
    "rival": null
  },
  {
    "id": "club_391",
    "wikiId": 391,
    "name": "Bayern München",
    "shortName": "FCB",
    "league": "BUNDESLIGA",
    "city": "Munique",
    "country": "🇩🇪",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/391.png",
    "colors": {
      "primary": "#dc052d",
      "secondary": "#0066b2",
      "text": "#111111"
    },
    "prestige": 97,
    "stadium": "Allianz Arena",
    "rival": null
  },
  {
    "id": "club_395",
    "wikiId": 395,
    "name": "Eintracht Frankfurt",
    "shortName": "SGE",
    "league": "BUNDESLIGA",
    "city": "Dortmund",
    "country": "🇩🇪",
    "badge": "🐝",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/395.png",
    "colors": {
      "primary": "#fde100",
      "secondary": "#000000",
      "text": "#111111"
    },
    "prestige": 93,
    "stadium": "Signal Iduna Park",
    "rival": null
  },
  {
    "id": "club_389",
    "wikiId": 389,
    "name": "Arminia Bielefeld",
    "shortName": "ARM",
    "league": "BUNDESLIGA",
    "city": "Leverkusen",
    "country": "🇩🇪",
    "badge": "💊",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/389.png",
    "colors": {
      "primary": "#e32221",
      "secondary": "#000000",
      "text": "#111111"
    },
    "prestige": 94,
    "stadium": "BayArena",
    "rival": null
  },
  {
    "id": "club_2200",
    "wikiId": 2200,
    "name": "Sunshine Stars",
    "shortName": "SUN",
    "league": "BUNDESLIGA",
    "city": "Leipzig",
    "country": "🇩🇪",
    "badge": "🐂",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2200.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#d81e05",
      "text": "#111111"
    },
    "prestige": 91,
    "stadium": "Red Bull Arena",
    "rival": null
  },
  {
    "id": "club_397",
    "wikiId": 397,
    "name": "Erzgebirge Aue",
    "shortName": "ERZ",
    "league": "BUNDESLIGA",
    "city": "Frankfurt",
    "country": "🇩🇪",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/397.png",
    "colors": {
      "primary": "#e1000f",
      "secondary": "#000000",
      "text": "#111111"
    },
    "prestige": 88,
    "stadium": "Deutsche Bank Park",
    "rival": null
  },
  {
    "id": "club_418",
    "wikiId": 418,
    "name": "VfL Bochum",
    "shortName": "BOC",
    "league": "BUNDESLIGA",
    "city": "Stuttgart",
    "country": "🇩🇪",
    "badge": "🐊",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/418.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#e30613",
      "text": "#111111"
    },
    "prestige": 87,
    "stadium": "MHPArena",
    "rival": null
  },
  {
    "id": "club_1079",
    "wikiId": 1079,
    "name": "Vissel Kobe",
    "shortName": "VIS",
    "league": "J_LEAGUE",
    "city": "Kobe",
    "country": "🇯🇵",
    "badge": "⚓",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1079.png",
    "colors": {
      "primary": "#9e0039",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 73,
    "stadium": "Noevir Stadium Kobe",
    "rival": null
  },
  {
    "id": "club_506",
    "wikiId": 506,
    "name": "Yokohama F. Marinos",
    "shortName": "YFM",
    "league": "J_LEAGUE",
    "city": "Yokohama",
    "country": "🇯🇵",
    "badge": "⛵",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/506.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 73,
    "stadium": "Nissan Stadium",
    "rival": null
  },
  {
    "id": "club_527",
    "wikiId": 527,
    "name": "Kawasaki Frontale",
    "shortName": "KWF",
    "league": "J_LEAGUE",
    "city": "Kawasaki",
    "country": "🇯🇵",
    "badge": "🐬",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/527.png",
    "colors": {
      "primary": "#58b2dc",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 72,
    "stadium": "Todoroki Athletics Stadium",
    "rival": null
  },
  {
    "id": "club_505",
    "wikiId": 505,
    "name": "FK Mariupol",
    "shortName": "MAR",
    "league": "J_LEAGUE",
    "city": "Saitama",
    "country": "🇯🇵",
    "badge": "💎",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/505.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 73,
    "stadium": "Saitama Stadium 2002",
    "rival": null
  },
  {
    "id": "club_497",
    "wikiId": 497,
    "name": "OFI Crete",
    "shortName": "OFI",
    "league": "J_LEAGUE",
    "city": "Kashima",
    "country": "🇯🇵",
    "badge": "🦌",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/497.png",
    "colors": {
      "primary": "#9e1b32",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 72,
    "stadium": "Kashima Soccer Stadium",
    "rival": null
  },
  {
    "id": "club_500",
    "wikiId": 500,
    "name": "Nagoya Grampus",
    "shortName": "NAG",
    "league": "J_LEAGUE",
    "city": "Nagoya",
    "country": "🇯🇵",
    "badge": "🐋",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/500.png",
    "colors": {
      "primary": "#e4002b",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 71,
    "stadium": "Toyota Stadium",
    "rival": null
  },
  {
    "id": "club_265",
    "wikiId": 265,
    "name": "Zenit",
    "shortName": "ZEN",
    "league": "RUSSIA",
    "city": "São Petersburgo",
    "country": "🇷🇺",
    "badge": "🦁",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/265.png",
    "colors": {
      "primary": "#00bfff",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 82,
    "stadium": "Gazprom Arena",
    "rival": null
  },
  {
    "id": "club_263",
    "wikiId": 263,
    "name": "Spartak Moskva",
    "shortName": "SPM",
    "league": "RUSSIA",
    "city": "Moscou",
    "country": "🇷🇺",
    "badge": "🔴⚪",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/263.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 80,
    "stadium": "Lukoil Arena",
    "rival": null
  },
  {
    "id": "club_254",
    "wikiId": 254,
    "name": "CSKA Moskva",
    "shortName": "CSK",
    "league": "RUSSIA",
    "city": "Moscou",
    "country": "🇷🇺",
    "badge": "🐴",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/254.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 80,
    "stadium": "VEB Arena",
    "rival": null
  },
  {
    "id": "club_258",
    "wikiId": 258,
    "name": "Lokomotiv Moskva",
    "shortName": "LOK",
    "league": "RUSSIA",
    "city": "Moscou",
    "country": "🇷🇺",
    "badge": "🚂",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/258.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 79,
    "stadium": "RZD Arena",
    "rival": null
  },
  {
    "id": "club_2217",
    "wikiId": 2217,
    "name": "Krasnodar",
    "shortName": "APS",
    "league": "RUSSIA",
    "city": "Krasnodar",
    "country": "🇷🇺",
    "badge": "🐂",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2217.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 79,
    "stadium": "Krasnodar Stadium",
    "rival": null
  },
  {
    "id": "club_348",
    "wikiId": 348,
    "name": "Shakhtar Donetsk",
    "shortName": "SHA",
    "league": "GLOBAL_AVULSOS",
    "city": "Donetsk",
    "country": "🇺🇦",
    "badge": "⚒️",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/348.png",
    "colors": {
      "primary": "#f47920",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 84,
    "stadium": "Arena Lviv",
    "rival": null
  },
  {
    "id": "club_347",
    "wikiId": 347,
    "name": "Dynamo Kyiv",
    "shortName": "DYN",
    "league": "GLOBAL_AVULSOS",
    "city": "Kiev",
    "country": "🇺🇦",
    "badge": "🔷",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/347.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 82,
    "stadium": "Olimpiyskiy",
    "rival": null
  },
  {
    "id": "club_373",
    "wikiId": 373,
    "name": "Olympiacos",
    "shortName": "OLY",
    "league": "GLOBAL_AVULSOS",
    "city": "Pireu",
    "country": "🇬🇷",
    "badge": "🔴⚪",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/373.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 82,
    "stadium": "Karaiskakis Stadium",
    "rival": null
  },
  {
    "id": "club_374",
    "wikiId": 374,
    "name": "Panathinaikos",
    "shortName": "PAO",
    "league": "GLOBAL_AVULSOS",
    "city": "Atenas",
    "country": "🇬🇷",
    "badge": "☘️",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/374.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 81,
    "stadium": "Apostolos Nikolaidis",
    "rival": null
  },
  {
    "id": "club_372",
    "wikiId": 372,
    "name": "AEK Athens",
    "shortName": "AEK",
    "league": "GLOBAL_AVULSOS",
    "city": "Atenas",
    "country": "🇬🇷",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/372.png",
    "colors": {
      "primary": "#ffd700",
      "secondary": "#111111",
      "text": "#111111"
    },
    "prestige": 80,
    "stadium": "OPAP Arena",
    "rival": null
  },
  {
    "id": "club_755",
    "wikiId": 755,
    "name": "Aldershot Town",
    "shortName": "ALD",
    "league": "GLOBAL_AVULSOS",
    "city": "Salônica",
    "country": "🇬🇷",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/755.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 80,
    "stadium": "Toumba Stadium",
    "rival": null
  },
  {
    "id": "club_1251",
    "wikiId": 1251,
    "name": "Al Ahly (Egito)",
    "shortName": "AHL",
    "league": "GLOBAL_AVULSOS",
    "city": "Cairo",
    "country": "🇪🇬",
    "badge": "🦅",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1251.jpg",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 82,
    "stadium": "Cairo International",
    "rival": null
  },
  {
    "id": "club_1252",
    "wikiId": 1252,
    "name": "Zamalek (Egito)",
    "shortName": "SAD",
    "league": "GLOBAL_AVULSOS",
    "city": "Giza",
    "country": "🇪🇬",
    "badge": "🏹",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/1252.png",
    "colors": {
      "primary": "#ffffff",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 80,
    "stadium": "Cairo International",
    "rival": null
  },
  {
    "id": "club_512",
    "wikiId": 512,
    "name": "Ulsan HD",
    "shortName": "SAM",
    "league": "GLOBAL_AVULSOS",
    "city": "Ulsan",
    "country": "🇰🇷",
    "badge": "🐯",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/512.png",
    "colors": {
      "primary": "#003882",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 74,
    "stadium": "Ulsan Munsu",
    "rival": null
  },
  {
    "id": "club_515",
    "wikiId": 515,
    "name": "Jeonbuk Hyundai",
    "shortName": "APO",
    "league": "GLOBAL_AVULSOS",
    "city": "Jeonju",
    "country": "🇰🇷",
    "badge": "Motors",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/515.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 74,
    "stadium": "Jeonju World Cup",
    "rival": null
  },
  {
    "id": "club_516",
    "wikiId": 516,
    "name": "Gamba Osaka",
    "shortName": "GAM",
    "league": "GLOBAL_AVULSOS",
    "city": "Seul",
    "country": "🇰🇷",
    "badge": "🔴⚫",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/516.png",
    "colors": {
      "primary": "#111111",
      "secondary": "#d90429",
      "text": "#111111"
    },
    "prestige": 73,
    "stadium": "Seoul World Cup",
    "rival": null
  },
  {
    "id": "club_2470",
    "wikiId": 2470,
    "name": "AS Melfi",
    "shortName": "MEL",
    "league": "GLOBAL_AVULSOS",
    "city": "Xangai",
    "country": "🇨🇳",
    "badge": "🐉",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/2470.png",
    "colors": {
      "primary": "#d90429",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 72,
    "stadium": "Pudong Football Stadium",
    "rival": null
  },
  {
    "id": "club_509",
    "wikiId": 509,
    "name": "Sporting Cristal",
    "shortName": "SCL",
    "league": "GLOBAL_AVULSOS",
    "city": "Jinan",
    "country": "🇨🇳",
    "badge": "🟠",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/509.png",
    "colors": {
      "primary": "#f47920",
      "secondary": "#ffffff",
      "text": "#ffffff"
    },
    "prestige": 71,
    "stadium": "Jinan Olympic Sports Center",
    "rival": null
  },
  {
    "id": "club_507",
    "wikiId": 507,
    "name": "Egaleo",
    "shortName": "EGA",
    "league": "GLOBAL_AVULSOS",
    "city": "Pequim",
    "country": "🇨🇳",
    "badge": "🟢",
    "logoUrl": "https://cdn.soccerwiki.org/images/logos/clubs/507.png",
    "colors": {
      "primary": "#00543d",
      "secondary": "#ffd700",
      "text": "#111111"
    },
    "prestige": 71,
    "stadium": "Workers Stadium",
    "rival": null
  }
];

export function getStartingClubs() {
  return CLUBS.filter((c) => c.league === 'REGIONAL');
}

export function getClubById(clubId) {
  return CLUBS.find((c) => c.id === clubId || String(c.wikiId) === String(clubId)) || CLUBS[0];
}

export function getLeagueById(leagueId) {
  return LEAGUES[leagueId] || LEAGUES.REGIONAL;
}
