import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from "react";

const Preview = (props) => {
    const { list, clickEvent } = props;

    return (
        <Box id="preview-box">
            <Box className="preview-area">
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
            </Box>
            <Divider />
            <Box className="preview-area">
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
            </Box>
            <Divider />
            <Box className="preview-area">
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
                <Typography>
                    <ruby>いい<rt></rt></ruby><ruby>天気<rt>てんき</rt></ruby><ruby>ですね<rt></rt></ruby>
                </Typography>
            </Box>
        </Box>
    );
};

export default Preview;
