import "./styles.css";
import React from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

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
import { Button, TextField, List, ListItem } from "@mui/material";

export default function App() {
    // ナビゲーション
    const [navigationValue, setNavigationValue] = React.useState(0);
    // ダイアログのスクロール
    const [scroll, setScroll] = React.useState('paper');
    // ダイアログ
    const [openState, setOpenState] = React.useState(false);
    // 作成モード
    const [createMode, setCreateMode] = React.useState('');

    // 作成ダイアログを表示
    const openDialog = () => {
        setWorkingTexts([]);
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
        setCreateMode('書き');
        openDialog();
    };

    /**
     * 作成画面起動(読み)
     * */
    const openDialogRead = () => {
        setCreateMode('読み');
        openDialog();
    };

    // 作成ダイアログ キャンセル
    const cancelDialog = () => {
        setWorkingTexts([]);
        setOpenState(false);
    };

    // ナビゲーション
    const actionsNavigation = [
        { icon: <Icon path={mdiListBox} />, label: '一覧', key: 'List', value: 'list' },
        { icon: <Icon path={mdiPrinterEye} />, label: 'プレビュー', key: 'Preview', value: 'preview' },
    ];

    // スピードダイアル
    const actionsSpeedDial = [
        { icon: <Icon path={mdiIdeogramCjk} size={3} />, name: '書き', key: 'Write', clickEvent: openDialogWrite },
        { icon: <Icon path={mdiSyllabaryHiragana} size={3} />, name: '読み', key: 'Read', clickEvent: openDialogRead },
    ];

    // 作成中のテキスト
    const [workingTexts, setWorkingTexts] = React.useState([]);


    // 作成中のテキストにペアを追加
    const addTextPair = () => {
        const newWorkingTexts = [];
        workingTexts.map((item) => newWorkingTexts.push(item));
        newWorkingTexts.push({ key: Date.now().toString(), kanji: "", yomi: "" });
        setWorkingTexts(newWorkingTexts);
        console.log(workingTexts);
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
                    <DialogContent id="alert-dialog-description" dividers={scroll === 'paper'}>
                        <List>
                            {workingTexts.map((item, index) => (
                                <ListItem key={item.key}>
                                    <TextField id="filled-basic" label="Filled" variant="filled" />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={addTextPair}>追加</Button>
                        <Button onClick={closeDialog}>キャンセル</Button>
                        <Button onClick={closeDialog}>作成</Button>
                    </DialogActions>
                </Dialog>

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={15}>
                    <BottomNavigation showLabels
                        value={navigationValue}
                        onChange={(event, newValue) => {
                            setNavigationValue(newValue);
                        }}
                        children={<p>heiheihei</p>}
                    >
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
