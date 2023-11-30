import React, { Fragment } from "react";

const RubyText = (props) => {
    const { list, startIndex } = props;

    return (
        <Fragment>
            {list.map((item, index) => (
                <p key={item.key} className="text">
                    {index + startIndex + ". "}
                    {item.text.map((_item, _index) => (
                        <ruby key={_item.key}>
                            {_item.body}
                            {(_item.yomi !== "") && <rt>{_item.yomi}</rt>}
                        </ruby>
                    ))}
                </p>
            ))}
        </Fragment>
    );
};

export default RubyText;
