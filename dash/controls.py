# flake8: noqa

# In[]:
# Controls for webapp
COUNTIES = {
    "001": "Albany",
    "003": "Allegany",
    "005": "Bronx",
    "007": "Broome",
    "009": "Cattaraugus",
    "011": "Cayuga",
    "013": "Chautauqua",
    "015": "Chemung",
    "017": "Chenango",
    "019": "Clinton",
    "021": "Columbia",
    "023": "Cortland",
    "025": "Delaware",
    "027": "Dutchess",
    "029": "Erie",
    "031": "Essex",
    "033": "Franklin",
    "035": "Fulton",
    "037": "Genesee",
    "039": "Greene",
    "041": "Hamilton",
    "043": "Herkimer",
    "045": "Jefferson",
    "047": "Kings",
    "049": "Lewis",
    "051": "Livingston",
    "053": "Madison",
    "055": "Monroe",
    "057": "Montgomery",
    "059": "Nassau",
    "061": "New York",
    "063": "Niagara",
    "065": "Oneida",
    "067": "Onondaga",
    "069": "Ontario",
    "071": "Orange",
    "073": "Orleans",
    "075": "Oswego",
    "077": "Otsego",
    "079": "Putnam",
    "081": "Queens",
    "083": "Rensselaer",
    "085": "Richmond",
    "087": "Rockland",
    "089": "St. Lawrence",
    "091": "Saratoga",
    "093": "Schenectady",
    "095": "Schoharie",
    "097": "Schuyler",
    "099": "Seneca",
    "101": "Steuben",
    "103": "Suffolk",
    "105": "Sullivan",
    "107": "Tioga",
    "109": "Tompkins",
    "111": "Ulster",
    "113": "Warren",
    "115": "Washington",
    "117": "Wayne",
    "119": "Westchester",
    "121": "Wyoming",
    "123": "Yates",
}

WELL_STATUSES = dict(
    AC="Active",
    AR="Application Received to Drill/Plug/Convert",
    CA="Cancelled",
    DC="Drilling Completed",
    DD="Drilled Deeper",
    DG="Drilling in Progress",
    EX="Expired Permit",
    IN="Inactive",
    NR="Not Reported on AWR",
    PA="Plugged and Abandoned",
    PI="Permit Issued",
    PB="Plugged Back",
    PM="Plugged Back Multilateral",
    RE="Refunded Fee",
    RW="Released - Water Well",
    SI="Shut-In",
    TA="Temporarily Abandoned",
    TR="Transferred Permit",
    UN="Unknown",
    UL="Unknown Located",
    UM="Unknown Not Found",
    VP="Voided Permit",
)

WELL_TYPES = dict(
    BR="Brine",
    Confidential="Confidential",
    DH="Dry Hole",
    DS="Disposal",
    DW="Dry Wildcat",
    GD="Gas Development",
    GE="Gas Extension",
    GW="Gas Wildcat",
    IG="Gas Injection",
    IW="Oil Injection",
    LP="Liquefied Petroleum Gas Storage",
    MB="Monitoring Brine",
    MM="Monitoring Miscellaneous",
    MS="Monitoring Storage",
    NL="Not Listed",
    OB="Observation Well",
    OD="Oil Development",
    OE="Oil Extension",
    OW="Oil Wildcat",
    SG="Stratigraphic",
    ST="Storage",
    TH="Geothermal",
    UN="Unknown",
)

WELL_COLORS = dict(
    GD="#FFEDA0",
    GE="#FA9FB5",
    GW="#A1D99B",
    IG="#67BD65",
    OD="#BFD3E6",
    OE="#B3DE69",
    OW="#FDBF6F",
    ST="#FC9272",
    BR="#D0D1E6",
    MB="#ABD9E9",
    IW="#3690C0",
    LP="#F87A72",
    MS="#CA6BCC",
    Confidential="#DD3497",
    DH="#4EB3D3",
    DS="#FFFF33",
    DW="#FB9A99",
    MM="#A6D853",
    NL="#D4B9DA",
    OB="#AEB0B8",
    SG="#CCCCCC",
    TH="#EAE5D9",
    UN="#C29A84",
)

LABELS_FROM =['Daddy of H8Qem',
 'Likely Vault Owner',
 'Top KINT Mover',
 '@blinkin',
 'chaos DAO',
 'Selfish',
 'Top KBTC Mover',
 'Top KBTC Sink',
 'Top KINT Sink',
 '@warinelly',
 'Social',
 'Top 20 Vault',
 'K>50',
 'Top KSM Mover',
 'Top KSM Sink',
 'shenanigans',
 '@timbotronic',
 'Self Issuer',
 'Top Issuer',
 'Daddy of 957PB',
 'Daddy of LLDD3',
 '74zdo',
 'Daddy of nPJjs',
 '@marvel',
 'pumpernickel',
 'hLPpe',
 'Poxg8',
 'Daddy of rEszH',
 'Daddy of eCQvW',
 '@spazcoin',
 'H8Qem',
 'Top Redeemer',
 'Daddy of TzRzQ',
 'TzRzQ',
 'Daddy of Dqajq',
 'Daddy of ceZ9g',
 '@seergeist',
 '@boyswan',
 'Daddy of Poxg8',
 'rEszH',
 '@dan',
 'interlay',
 'eCQvW',
 '@alibaba',
 'Daddy of ntQTS',
 '957PB',
 '@niko',
 '@DkA7s',
 '@whisperit',
 'Dqajq',
 'ceZ9g',
 '@paride',
 '@mafux777',
 'ntQTS',
 'Simon Kraus',
 'nPJjs',
 'Daddy of hLPpe',
 'LLDD3',
 'Daddy of 9v6eN',
 'Daddy of 74zdo',
 'VaaS',
 '9v6eN',
 'none']

LABELS_TO = ['Social',
 'Top 20 Vault',
 'H8Qem',
 'Top KINT Mover',
 'Top KINT Sink',
 '@blinkin',
 'chaos DAO',
 'Selfish',
 'Top Issuer',
 'Top KBTC Mover',
 'Top KBTC Sink',
 'shenanigans',
 '@warinelly',
 'K>50',
 '@marvel',
 'Top KSM Mover',
 'Top KSM Sink',
 '@0xvault',
 '@timbotronic',
 'Self Issuer',
 '@alibaba',
 'Top Redeemer',
 'Poxg8',
 'Daddy of rEszH',
 'Likely Vault Owner',
 'Daddy of 74zdo',
 'Daddy of nPJjs',
 '957PB',
 'LLDD3',
 'Daddy of 9v6eN',
 'Simon Kraus',
 'nPJjs',
 '@niko',
 'pumpernickel',
 'hLPpe',
 'Daddy of ntQTS',
 'Daddy of Poxg8',
 'rEszH',
 '@spazcoin',
 'eCQvW',
 'Daddy of TzRzQ',
 'TzRzQ',
 'Daddy of Dqajq',
 'Dqajq',
 'rodrigo.barrios',
 'hypersphere',
 '@dan',
 'interlay',
 '@DkA7s',
 '@whisperit',
 '@paride',
 'ceZ9g',
 '@seergeist',
 '@boyswan',
 'Daddy of eCQvW',
 '@mafux777',
 'ntQTS',
 'Daddy of 957PB',
 'Daddy of LLDD3',
 'Daddy of ceZ9g',
 'Daddy of hLPpe',
 '9v6eN',
 '74zdo',
 'VaaS',
 'none']