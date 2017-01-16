let environment = {
    " " : {fg : "darkgreen", bg : "forestgreen", name: "grass", description: "An empty piece of terrain."},
    '#' : {fg : "slategray", bg : "dimgray", name: "wall", description: "An impassable wall.", blocked : true},
    '~' : {fg : "dodgerblue", bg: "darkblue", name: "shallow water", description: "Some shallow water.", blocked : true},
    '=' : {fg : "blue", bg : "darkblue", name: "deep water", description: "Some deep water.", blocked : true},
    '.' : {fg : "brown", bg : "peru", name: "path", description: "A pathway!"},
    'T' : {fg: "lightgreen", bg: "green", name: "tree", descritpion: "A tree!", blocked : true}
};

// for (var symbol in environment)
//     environment[symbol].bg = "black";
