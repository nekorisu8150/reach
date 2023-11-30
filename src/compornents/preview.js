import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import React from "react";

const max = 50;
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
                {listFirst.map((item, index) => (
                    <Typography key={item.key}>
                        {index + 1 + ". "}
                        {item.text.map((_item, _index) => (
                            <ruby key={_item.key}>
                                {_item.body}
                                {(_item.yomi !== "") && <rt>{_item.yomi}</rt>}
                            </ruby>
                        ))}
                    </Typography>
                ))}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box className="preview-area">
                {listSecond.map((item, index) => (
                    <Typography key={item.key}>
                        {index + 1 + ". "}
                        {item.text.map((_item, _index) => (
                            <ruby key={_item.key}>
                                {_item.body}
                                {(_item.yomi !== "") && <rt>{_item.yomi}</rt>}
                            </ruby>
                        ))}
                    </Typography>
                ))}
            </Box>
        </Grid>
    );
};

export default Preview;
