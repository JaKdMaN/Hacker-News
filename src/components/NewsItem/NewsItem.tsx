import React, {FC} from 'react';
import {INew} from "../../models/INew";
import {formatDate} from "../../utils/data";
import classes from "./NewsItem.module.scss";
import {Paper, styled} from "@mui/material";

interface INewsItemProps {
    newsItem: INew;
    onClick: (newsItem: INew) => void
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '15px',
    color: theme.palette.text.secondary,
}));

const NewsItem: FC<INewsItemProps> = ({newsItem, onClick}) => {

    const formatedDate = formatDate(newsItem.time);

    return (
        <div onClick={() => onClick(newsItem)} className={classes.item}>
            <Item>
                <h3 className={classes.item__title}>{newsItem.title}</h3>
                <p className={classes.item__score}>score: {newsItem.score}</p>
                <div className={classes.item__bottom}>
                    <p className={classes.item__bottom_author}><strong>writes by:</strong> {newsItem.by}</p>
                    <p className={classes.item__bottom_date}>
                        {formatedDate}
                    </p>
                </div>
            </Item>
        </div>
    );
};

export default NewsItem;