// 10-point color scheme
const geoColor = d3.scaleThreshold()
    .domain([0, 0.1, 0.20, 0.30, 0.40, 0.50, 0.51, 0.60, 0.70, 0.80, 0.9, 1.0])
    // .range(["lightgray", "#00451b", "#197837", "#5aae61", "#a6dba0", "#d8f0d3", "#f7f7f7", "#e7d4e7", "#c2a5cf", "#9970ac", "#752a83", "#400b4b"]);
    // .range(["lightgray", "#276319", "#4e9220", "#7fbc40", "#b8e086", "#e6f5d1", "#f7f7f7", "#fee0ef", "#f1b6da", "#de78ae", "#c5237d", "#8e1552"]);
    // .range(["lightgray", "#2d094b", "#532688", "#8073ac", "#b2abd2", "#d8dbeb", "#f7f7f7", "#fee0b6", "#fdb863", "#e18215", "#b35805", "#7f3b09"]);
    // .range(["lightgray", "#003b2f", "#00665d", "#35968e", "#80cdc1", "#c6eae5", "#f7f7f7", "#fee0b6", "#fdb863", "#e18215", "#b35805", "#7f3b09"]);


// // 7-point color scheme
// const geoColor = d3.scaleThreshold()
//     .domain([0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0])
//     .range(["lightgray", "#009392", "#39B185", "#9CCB86", "#E9E29C", "#EEB479", "#E88471", "#CF597E"]); // color scheme 1 (green-red)
//     // .range(["lightgray", "#228B3B", "#6CBA7D", "#CDE5D2", "#FCE1A4", "#FABF7B", "#E05C5C", "#AB1866"]); // color scheme 2 (green-magenta)
//     // .range(["lightgray", "#3C93C2", "#6CB0D6", "#9EC9E2", "#E1F2E3", "#FEB24C", "#FD8D3C", "#FC4E2A"]); // color scheme 3 (blue-orange)
