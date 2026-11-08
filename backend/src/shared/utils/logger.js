
import colors from "@colors/colors/safe.js";
import { format } from "node:util";

const originalLog = console.log.bind(console);

const styles = {
    blue: colors.blue,
    green: colors.green,
    red: colors.red,
    yellow: colors.yellow,
    cyan: colors.cyan,
    magenta: colors.magenta,
    gray: colors.gray,
    white: colors.white
};

for (const [name, color] of Object.entries(styles)) {
    console.log[name] = (...args) => {
        originalLog(color(format(...args)));
    };
}
