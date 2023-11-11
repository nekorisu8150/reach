import { CREATE_MODE_READ, CREATE_MODE_WRITE, DIVIDERS_PAPER, KEY_SPEED_DIAL_READ, KEY_SPEED_DIAL_WRITE, KEY__NAVIGATION_LIST, KEY__NAVIGATION_PREVIEW, LABEL_NAVIGATION_LIST, LABEL_NAVIGATION_PREVIEW, NAME_SPEED_DIAL_READ, NAME_SPEED_DIAL_WRITE, VALUE_NAVIGATION_LIST, VALUE_NAVIGATION_PREVIEW } from "./Constant";

import "./styles.css";
import React from "react";
import { Button, TextField, List, ListItem } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// スピードダイアル関連
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

// ダイアログ関連
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// ナビゲーション関連
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// アイコン関連
import Icon from '@mdi/react';
import { mdiSyllabaryHiragana } from '@mdi/js';
import { mdiIdeogramCjk } from '@mdi/js';
import { mdiPrinterEye } from '@mdi/js';
import { mdiListBox } from '@mdi/js';
import { mdiClose } from '@mdi/js';

export default function App() {
    // ナビゲーション
    const [navigationValue, setNavigationValue] = React.useState(VALUE_NAVIGATION_LIST);
    // ダイアログのスクロール
    const [scroll, setScroll] = React.useState('paper');
    // ダイアログ
    const [openState, setOpenState] = React.useState(false);
    // 作成モード
    const [createMode, setCreateMode] = React.useState('');
    // 作成中のテキスト
    const [workingTexts, setWorkingTexts] = React.useState([]);

    // 作成ダイアログを表示
    const openDialog = () => {
        addTextPair();
        setOpenState(true);
    };

    // 作成ダイアログ 閉じる
    const closeDialog = () => {
        setOpenState(false);
    };

    /**
     * 作成画面起動(書き)
     * */
    const openDialogWrite = () => {
        setCreateMode(CREATE_MODE_WRITE);
        openDialog();
    };

    /**
     * 作成画面起動(読み)
     * */
    const openDialogRead = () => {
        setCreateMode(CREATE_MODE_READ);
        openDialog();
    };

    // 作成ダイアログ キャンセル
    const cancelDialog = () => {
        setWorkingTexts([]);
        setOpenState(false);
    };

    // ナビゲーション
    const actionsNavigation = [
        {
            icon: <Icon path={mdiListBox} />,
            label: LABEL_NAVIGATION_LIST,
            key: KEY__NAVIGATION_LIST,
            value: VALUE_NAVIGATION_LIST
        },
        {
            icon: <Icon path={mdiPrinterEye} />,
            label: LABEL_NAVIGATION_PREVIEW,
            key: KEY__NAVIGATION_PREVIEW,
            value: VALUE_NAVIGATION_PREVIEW
        },
    ];

    // スピードダイアル
    const actionsSpeedDial = [
        {
            icon: <Icon path={mdiIdeogramCjk} size={3} />,
            name: NAME_SPEED_DIAL_WRITE,
            key: KEY_SPEED_DIAL_WRITE,
            clickEvent: openDialogWrite
        },
        {
            icon: <Icon path={mdiSyllabaryHiragana} size={3} />,
            name: NAME_SPEED_DIAL_READ,
            key: KEY_SPEED_DIAL_READ,
            clickEvent: openDialogRead
        },
    ];

    /**
     * 作成中のテキストにペアを追加
     * */
    const addTextPair = () => {
        const newWorkingTexts = [];
        workingTexts.map((item) => newWorkingTexts.push(item));
        newWorkingTexts.push({ key: Date.now().toString(), kanji: "", yomi: "" });
        setWorkingTexts(newWorkingTexts);
        console.log(workingTexts);
    };

    /**
     * テキストのペアを編集
     * @param {number} idx1 n番目のペア
     * @param {number} idx2 0:本文, 1:ふりがな
     */
    const editTextPair = (idx1, idx2, value) => {
        //console.log(idx1, ", ", idx2, value);
        const newWorkingTexts = [];
        workingTexts.map((item) => newWorkingTexts.push(item));
        if (idx2 === 0) {
            // 本文の編集
            newWorkingTexts[idx1].kanji = value;
        } else {
            // ふりがなの編集
            newWorkingTexts[idx1].yomi = value;
        }
        setWorkingTexts(newWorkingTexts);
    };

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
                            tooltipTitle={action.name}
                            onClick={action.clickEvent} />
                    ))}
                </SpeedDial>

                <Dialog open={openState} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" scroll={scroll}>
                    <DialogTitle id="alert-dialog-title">
                        <Grid container>
                            <Grid>
                                <Typography>問題作成（{createMode}）</Typography>
                            </Grid>
                            <Grid>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent id="alert-dialog-description" dividers={scroll === DIVIDERS_PAPER}>
                        <List>
                            {workingTexts.map((item, index) => (
                                <ListItem key={item.key}>
                                    <Icon path={mdiClose} size={1} />
                                    <TextField id="filled-basic" label="本文" variant="filled" onChange={(event) => editTextPair(index, 0, event.target.value)} />
                                    <TextField id="filled-basic" label="ふりがな" variant="filled" onChange={(event) => editTextPair(index, 1, event.target.value)} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={addTextPair}>テキスト追加</Button>
                        <Button variant="contained" onClick={cancelDialog}>キャンセル</Button>
                        <Button variant="contained" onClick={closeDialog}>作成</Button>
                    </DialogActions>
                </Dialog>

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={15}>
                    <BottomNavigation showLabels
                        value={navigationValue}
                        onChange={(event, newValue) => {
                            setNavigationValue(newValue);
                        }}>
                        {actionsNavigation.map((action) => (
                            <BottomNavigationAction label={action.label} icon={action.icon} key={action.key} value={action.value} />
                        ))}
                    </BottomNavigation>
                </Paper>
                <Typography>Hello CodeSandbox</Typography>
                <Typography>Start editing to see some magic happen!</Typography>
            </Box>
        </div>
    );
}
