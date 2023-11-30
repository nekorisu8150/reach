import React from "react";

const RubyText = (props) => {
    const { list, startIndex } = props;

    // ���ӏ��łȂ��e�L�X�g
    const getNoRbText = (str) => {
        return str;
    };

    // �������ӏ��̃e�L�X�g
    const getRbWrite = (str) => {
        return <rb className="rb-write">{str}</rb>;
    };

    // �ǂݖ��ӏ��̃e�L�X�g
    const getRbRead = (str) => {
        return <rb className="rb-read">{str}</rb>;
    };

    // �������ӏ��̃��r
    const getRtWrite = (str) => {
        return <rt className="rt-write">{str}</rt>;
    };

    // �ǂݖ��ӏ��̃��r
    const getRtRead = (str) => {
        return <rt className="rt-read">{str}</rt>;
    };

    return (
        <>
            {list.map((item, index) => (
                <p key={item.key} className="text">
                    {index + startIndex + ". "}
                    {item.text.map((_item, _index) => (
                        <ruby key={_item.key}>
                            {(_item.yomi === "") && getNoRbText(_item.body)}
                            {(_item.yomi !== "") && (item.mode === 0) && (
                                <>{getRbWrite(_item.body)}{getRtWrite(_item.yomi)}</>)}
                            {(_item.yomi !== "") && (item.mode === 1) && (
                                <>{getRbRead(_item.body)}{ getRtRead(_item.yomi)}</>)}
                        </ruby>
                    ))}
                </p>
            ))}
        </>
    );
};

export default RubyText;
