import "./styles.css";
import React from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

// アイコン関連
import Icon from '@mdi/react';
import { mdiSyllabaryHiragana } from '@mdi/js';
import { mdiIdeogramCjk } from '@mdi/js';

const actions = [
    { icon: <Icon path={mdiIdeogramCjk} size={3} />, name: '書き', key: 'Write' },
    { icon: <Icon path={mdiSyllabaryHiragana} size={3} />, name: '読み', key: 'Read' },
];

export default function App() {
    return (
        <div className="App">
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 30, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.key}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
        </div>
    );
}
