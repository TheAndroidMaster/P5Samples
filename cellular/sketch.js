var _cellSize = 20;

var _backgroundColor = '#000000';
var _cellColor = '#FFFFFF';
var _mpm = 360; // mutations per minute

var _startMillis = 0;
var _mutation = 0;
var _grid = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
];

function parseArguments(args) {
    let array = args.split("&");
    let argObj = {};
    for (let i = 0; i < array.length; i++) {
        if (array[i].indexOf("=") >= 0) {
            let argArray = array[i].split("=");
            argObj[argArray[0]] = argArray[1];
        } else argObj[array[i]] = true;
    }

    return argObj;
}

/**
 * Set up the initial canvas size / data, parse
 * URL arguments if necessary.
 */
function setup() {
    createCanvas(windowWidth, windowHeight);
    _startMillis = millis();

    if (location.search && location.search.length > 1) {
        let args = parseArguments(location.search.substring(1));
        
        if (args.background)
            _backgroundColor = '#' + args.background;

        if (args.cell)
            _cellColor = '#' + args.cell;

        if (args.mpm)
            _mpm = args.mpm;

        if (args.size)
            _cellSize = args.size;
    }
}

/**
 * Resize the canvas dynamically to match
 * the size of the window.
 */
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

/**
 * Check the current time / mutation, mutate
 * the current data if necessary, and draw
 * the resulting data on the canvas.
 */
function draw() {
    noStroke();
    background(color(_backgroundColor));

    // get current mutation / time, compare to last mutation
    let mutation = Math.floor(_mpm * ((millis() - _startMillis) / 60000));
    if (_mutation != mutation) {
        _mutation = mutation;
        mutate();
    }

    // draw all cells
    let [mx, my] = maxCoords();
    for (let y = 0; y < my; y++) {
        if (!_grid[y])
            continue;

        let cellTop = y * _cellSize;
        for (let x = 0; x < mx; x++) {
            if (!_grid[y][x])
                continue;

            let cellLeft = x * _cellSize;
            fill(color(_cellColor));
            rect(cellLeft, cellTop, _cellSize, _cellSize);
        }
    }
}

/**
 * Calculate the maximum coordinate values
 * based on the current window size.
 *
 * @return An array, in the format [x, y].
 */
function maxCoords() {
    return [
        Math.round(windowWidth / _cellSize), 
        Math.round(windowHeight / _cellSize)
    ];
}

/**
 * Gets grid coordinates recursively,
 * accounting for negative values and
 * overflow for the edge of the screen.
 *
 * @param rx        The x coordinate.
 * @param ry        The y coordinate.
 * @return          An array, in the
 *                  format [x, y].
 */
function rCoords(rx, ry) {
    let [mx, my] = maxCoords();

    while (rx < 0)
        rx += mx;
    while (ry < 0)
        ry += my;

    rx %= mx;
    ry %= my;
    return [rx, ry];
}

/**
 * Returns the value at the passed
 * recursive coordinates.
 *
 * @param rx        The x coordinate.
 * @param ry        The y coordinate.
 * @param grid      The grid to use.
 * @return          The (boolean) value
 *                  at the passed coordinates.
 */
function rGet(rx, ry, grid) {
    grid = grid || _grid;
    
    let [x, y] = rCoords(rx, ry);
    return (grid[y] && grid[y][x]) || 0;
}

/**
 * Sets the value at the passed
 * recursive coordinates, accounting
 * for undefined positions, etc.
 *
 * @param rx        The x coordinate.
 * @param ry        The y coordinate.
 * @param value     The value to set.
 * @param grid      The grid to modify.
 */
function rSet(rx, ry, value, grid) {
    grid = grid || _grid;
    
    let [x, y] = rCoords(rx, ry);
    if (!grid[y])
        grid[y] = [];

    grid[y][x] = value;
}

/**
 * Mutate the grid according to the rules
 * of Conway's Game of Life - cellular automata.
 */
function mutate() {
    let [mx, my] = maxCoords();
    let newGrid = [];

    for (let y = 0; y < my; y++) {
        for (let x = 0; x < mx; x++) {
            let neighbors = 0;
            neighbors += rGet(x-1, y-1);
            neighbors += rGet(x-1, y);
            neighbors += rGet(x-1, y+1);
            neighbors += rGet(x, y-1);
            neighbors += rGet(x, y+1);
            neighbors += rGet(x+1, y-1);
            neighbors += rGet(x+1, y);
            neighbors += rGet(x+1, y+1);

            if (rGet(x, y) && (neighbors < 2 || neighbors > 3))
                rSet(x, y, 0, newGrid);
            else if (rGet(x, y) && (neighbors == 2 || neighbors == 3))
                rSet(x, y, 1, newGrid);
            else if (!rGet(x, y) && neighbors == 3)
                rSet(x, y, 1, newGrid);
            else rSet(x, y, 0, newGrid);
        }
    }

    _grid = newGrid;
}

/**
 * Create a new glider at the coordinates 
 * where the mouse was clicked.
 */
function mouseClicked() {
    let cx = Math.round((mouseX / _cellSize) - 0.5);
    let cy = Math.round((mouseY / _cellSize) - 0.5);

    rSet(cx + 1, cy, 1);
    rSet(cx + 2, cy + 1, 1);
    rSet(cx, cy + 2, 1);
    rSet(cx + 1, cy + 2, 1);
    rSet(cx + 2, cy + 2, 1);
}
