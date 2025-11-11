import { loginButton } from "./loginButton.js";

export const menu = `
    <nav>
        <ul class="menu">
            <li id="home">Home</li>
            <li id="poke">Pokemóns</li>
            <li id="about">About</li>
        </ul>

        ${loginButton()}

    </nav>
`;

