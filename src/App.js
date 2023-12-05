import { mdiExport, mdiIdeogramCjk, mdiImport, mdiListBox, mdiPrinterEye, mdiSyllabaryHiragana } from '@mdi/js';
import Icon from '@mdi/react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, List, ListItem, TextField } from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from "react";
import Preview from './compornents/preview';
import TextList from './compornents/textList';
import { CREATE_MODE_NUMBER_READ, CREATE_MODE_NUMBER_WRITE, DIVIDERS_PAPER, KEY_SPEED_DIAL_EXPORT, KEY_SPEED_DIAL_IMPORT, KEY_SPEED_DIAL_READ, KEY_SPEED_DIAL_WRITE, KEY__NAVIGATION_LIST, KEY__NAVIGATION_PREVIEW, LABEL_NAVIGATION_LIST, LABEL_NAVIGATION_PREVIEW, NAME_SPEED_DIAL_EXPORT, NAME_SPEED_DIAL_IMPORT, NAME_SPEED_DIAL_READ, NAME_SPEED_DIAL_WRITE, VALUE_NAVIGATION_LIST, VALUE_NAVIGATION_PREVIEW } from "./Constant";
import dummyCreatedList from './dummy/dummy';
import "./styles/styles.css";

export default function App() {
    // ナビゲーション
    const [navigationValue, setNavigationValue] = React.useState(VALUE_NAVIGATION_LIST);
    // ダイアログのスクロール
    const [scroll, setScroll] = React.useState('paper');
    // 作成ダイアログ表示状態
    const [openStateDialogCreate, setOpenStateDialogCreate] = React.useState(false);
    // 編集ダイアログ表示状態
    const [openStateDialogEdit, setOpenStateDialogEdit] = React.useState(false);
    // スピードダイヤル
    const [openStateSpeedDial, setOpenStateSpeedDial] = React.useState(false);
    // 作成モード
    const [createMode, setCreateMode] = React.useState(0);
    // 作成中のテキスト
    const [workingTexts, setWorkingTexts] = React.useState([]);
    // 作成済みのテキストリスト
    const [createdTextList, setCreatedTextList] = React.useState([]);
    // スナックバー表示状態
    const [openStateSnackbar, setOpenStateSnackbar] = React.useState(false);
    // スナックバーメッセージ
    const [messageSnackbar, setMessageSnackbar] = React.useState('');

    /**
     * 作成ダイアログを表示
     * */
    const openDialog = () => {
        addTextPair();
        setOpenStateDialogCreate(true);
        closeSpeedDial();
    };

    /**
     * 作成ダイアログ 閉じる
     * */
    const closeDialog = () => {
        setOpenStateDialogCreate(false);
    };

    /**
     * スピードダイヤル開閉切替
     * */
    const switchOpenStateSpeedDial = () => {
        setOpenStateSpeedDial(!openStateSpeedDial);
    };

    /**
     * スピードダイヤル 閉じる
     * */
    const closeSpeedDial = () => {
        setOpenStateSpeedDial(false);
    };

    /**
     * 作成画面起動(書き)
     * */
    const openDialogWrite = () => {
        setCreateMode(CREATE_MODE_NUMBER_WRITE);
        openDialog();
    };

    /**
     * 作成画面起動(読み)
     * */
    const openDialogRead = () => {
        setCreateMode(CREATE_MODE_NUMBER_READ);
        openDialog();
    };

    // 作成ダイアログ キャンセル
    const cancelDialog = () => {
        setWorkingTexts([]);
        closeDialog();
    };

    /**
     * スナックバーを閉じる
     * */
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenStateSnackbar(false);
    };

    /**
     * 問題をreachファイルに保存する
     * */
    const saveAsFile = () => {
        try {
            const a = document.createElement('a');
            const fileName = 'test.reach';
            const blobData = new Blob([JSON.stringify(createdTextList, null, 4)], {
                type: 'text/json',
            });
            const jsonURL = URL.createObjectURL(blobData);
            a.href = jsonURL;
            a.download = fileName;
            a.click();
        } catch (e) {
            setMessageSnackbar('ファイルの保存に失敗しました');
            setOpenStateSnackbar(true);
        }
    };

    /**
     * reachファイルから問題を読み込む
     * */
    const importFromFile = () => {
        try {
            const reader = new FileReader();
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.reach';
            input.addEventListener('change', () => {
                //Fileオブジェクト(テキストファイル)のファイル内容を読み込む
                reader.readAsText(input.files[0], 'UTF-8');
                reader.onload = () => {
                    const result = JSON.parse(reader.result);
                    setCreatedTextList(result);
                };
            });
            input.click();
        } catch (e) {
            setMessageSnackbar('ファイルの読込に失敗しました');
            setOpenStateSnackbar(true);
        }
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
        {
            icon: <Icon path={mdiImport} size={3} />,
            name: NAME_SPEED_DIAL_IMPORT,
            key: KEY_SPEED_DIAL_IMPORT,
            clickEvent: importFromFile
        },
        {
            icon: <Icon path={mdiExport} size={3} />,
            name: NAME_SPEED_DIAL_EXPORT,
            key: KEY_SPEED_DIAL_EXPORT,
            clickEvent: saveAsFile
        },
    ];

    // スナックバー
    const actionSnackbar = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackbar}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    /**
     * テキストペアを追加
     * */
    const addTextPair = () => {
        const newWorkingTexts = [];
        workingTexts.map((item) => newWorkingTexts.push(item));
        newWorkingTexts.push({ key: Date.now().toString(), body: "", yomi: "" });
        setWorkingTexts(newWorkingTexts);
        console.log(workingTexts);
    };

    /**
     * 対象のテキストペアを削除
     * @param {Number} index
     */
    const removeTextPair = (index) => {
        console.log(index);
        const newWorkingTexts = [];
        workingTexts.map((item) => newWorkingTexts.push(item));
        newWorkingTexts.splice(index, 1);
        setWorkingTexts(newWorkingTexts);
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
            newWorkingTexts[idx1].body = value;
        } else {
            // ふりがなの編集
            newWorkingTexts[idx1].yomi = value;
        }
        setWorkingTexts(newWorkingTexts);
    };

    /**
     * 問題作成
     * */
    const createText = () => {
        const newCreatedTextList = [];
        createdTextList.map(item => newCreatedTextList.push(item));
        newCreatedTextList.push({ key: Date.now().toString(), mode: createMode, text: workingTexts });
        setCreatedTextList(newCreatedTextList);
        setWorkingTexts([]);
        closeDialog();
        console.log(createdTextList);
    };

    const isListNavigation = () => {
        return (navigationValue === VALUE_NAVIGATION_LIST);
    };

    const [first, setFirst] = useState(true);
    if (first) {
        first && setCreatedTextList(dummyCreatedList);
        setFirst(false);
    }

    return (
        <div className="App">
            {/* 共通UI */}
            <Box id="app-bar">
                <Typography variant="h4">
                    Reach
                </Typography>
                <Typography>問題数 {createdTextList.length}問</Typography>
            </Box>
            <Dialog id="dialog-create" open={openStateDialogCreate} aria-labelledby="dialog-title-create" aria-describedby="dialog-description-create" scroll={scroll}>
                <DialogTitle id="dialog-title-create">
                    <Grid container>
                        <Grid>
                            <Typography>問題作成（{(createMode === 0) ? '書き' : '読み'}）</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent id="dialog-description-create" dividers={scroll === DIVIDERS_PAPER}>
                    <List>
                        {workingTexts.map((item, index) => (
                            <ListItem key={item.key}>
                                <IconButton aria-label="delete" color="primary" disabled={index === 0} onClick={() => removeTextPair(index)}>
                                    <DeleteIcon />
                                </IconButton>
                                {/*<Button variant="contained" startIcon={<DeleteIcon />}></Button>*/}
                                <TextField id="filled-basic" label="本文" variant="filled" onChange={(event) => editTextPair(index, 0, event.target.value)} />
                                <TextField id="filled-basic" label="ふりがな" variant="filled" onChange={(event) => editTextPair(index, 1, event.target.value)} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={addTextPair}>追加</Button>
                    <Button variant="contained" onClick={cancelDialog}>キャンセル</Button>
                    <Button variant="contained" onClick={createText}>作成</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openStateSnackbar}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                message={messageSnackbar}
                action={actionSnackbar}/>

            <Box id="content">
                {/* 一覧表示 */}
                {(isListNavigation()) &&
                    (
                        <Box id="list-box">
                            {(createdTextList.length === 0) &&
                                <Typography>問題が未作成です。右下のボタンから問題を追加してください。</Typography>}
                            <TextList list={createdTextList}></TextList>
                            <SpeedDial
                                ariaLabel="SpeedDial basic example"
                                sx={{ position: 'fixed', bottom: 70, right: 16 }}
                                onClick={switchOpenStateSpeedDial}
                                open={openStateSpeedDial}
                                icon={<SpeedDialIcon />}>
                                {actionsSpeedDial.map((action) => (
                                    <SpeedDialAction
                                        key={action.key}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={action.clickEvent} />
                                ))}
                            </SpeedDial>
                        </Box>
                    )
                }

                {/* プレビュー表示 */}
                {(!isListNavigation()) &&
                    (
                        <Preview list={createdTextList}></Preview>
                    )
                }
            </Box>
            {/* ナビゲーション */}
            <Box id="navigation" >
                <Paper elevation={15}>
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
            </Box>
        </div>
    );
}
