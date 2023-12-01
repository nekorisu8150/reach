import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import React from "react";
import RubyText from './rubyText';

const max = 40;
const half = max / 2;

const Preview = (props) => {
    const { list, clickEvent } = props;
    const listFirst = [];
    const listSecond = [];

    for (let i = 0; i < list.length; i++) {
        if (i === max) {
            break;
        }
        if (i < half) {
            listFirst[i] = list[i];
        } else {
            listSecond[i % half] = list[i];
        }
    }

    return (
        <Grid container id="preview-box">
            <Box className="preview-area">
                <RubyText list={listFirst} startIndex={1}></RubyText>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box className="preview-area">
                <Box className="preview-area">
                    <RubyText list={listSecond} startIndex={half + 1}></RubyText>
                </Box>
            </Box>
        </Grid>
    );
};

export default Preview;
