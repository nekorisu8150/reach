import { mdiIdeogramCjk, mdiSyllabaryHiragana } from '@mdi/js';
import Icon from '@mdi/react';
import { List } from "@mui/material";
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { Fragment } from "react";

const TextList = (props) => {
    const { list } = props;

    return (
        <List>
            {list.map((item, index) => (
                <Fragment key={item.key}>
                    <ListItemButton>
                        <ListItemText>
                            {item.text.map((_item, _index) => (
                                <ruby key={_item.key}>
                                    {_item.body}
                                    <rt>
                                        {_item.yomi}
                                    </rt>
                                </ruby>
                            ))}
                        </ListItemText>
                        {(item.mode === 0) && <Icon color="primary" path={mdiIdeogramCjk} size={1.5} />}
                        {(item.mode === 1) && <Icon color="primary" path={mdiSyllabaryHiragana} size={1.5} />}
                    </ListItemButton>
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
};

export default TextList;
