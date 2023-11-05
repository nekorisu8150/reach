import "./styles.css";
import React from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// ナビゲーション関連
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// アイコン関連
import Icon from '@mdi/react';
import { mdiSyllabaryHiragana } from '@mdi/js';
import { mdiIdeogramCjk } from '@mdi/js';
import { mdiPrinterEye } from '@mdi/js';
import { mdiListBox } from '@mdi/js';

const actionsSpeedDial = [
    { icon: <Icon path={mdiIdeogramCjk} size={3} />, name: '書き', key: 'Write' },
    { icon: <Icon path={mdiSyllabaryHiragana} size={3} />, name: '読み', key: 'Read' },
];

const actionsNavigation = [
    { icon: <Icon path={mdiListBox} />, label: '一覧', key: 'List' },
    { icon: <Icon path={mdiPrinterEye} />, label: 'プレビュー', key: 'Preview' },
];

export default function App() {
    const [navigationValue, setNavigationValue] = React.useState(0);

    return (
        <div className="App">
            <Box>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 70, right: 16 }}
                    icon={<SpeedDialIcon />}>
                    {actionsSpeedDial.map((action) => (
                        <SpeedDialAction
                            key={action.key}
                            icon={action.icon}
                            tooltipTitle={action.name} />
                    ))}
                </SpeedDial>

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={15}>
                    <BottomNavigation showLabels
                        value={navigationValue}
                        onChange={(event, newValue) => {
                            setNavigationValue(newValue);
                        }}
                    >
                        {actionsNavigation.map((action) => (
                            <BottomNavigationAction label={action.label} icon={action.icon} key={action.key} />
                        ))}
                    </BottomNavigation>
                </Paper>
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
            </Box>
        </div>
    );
}
