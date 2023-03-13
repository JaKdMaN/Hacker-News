import React, {FC, useEffect, useState} from 'react';
import CommentItem from "../CommentItem/CommentItem";
import {IComment} from "../../models/IComment";
import ApiService from "../../api/ApiService";
import classes from './CommentsList.module.scss';
import {Button, CircularProgress} from "@mui/material";

interface ICommentsListProps {
    commentsIds: number[];
}

const CommentsList: FC<ICommentsListProps> = ({commentsIds}) => {

    const [comments, setComments] = useState<IComment[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);


    const fetchComment = async () => {
        try {
            setIsLoaded(true);
            const comments = await ApiService.fetchList<IComment>(commentsIds);
            setComments(comments);
            setIsLoaded(false);
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        fetchComment();
    }, [])

    return (
        !isLoaded ?
            <div className={classes.item}>
                {
                    comments.map(comment => (
                        <CommentItem comment={comment} key={comment.id}/>
                    ))
                }
                <div className={classes.item__refreshBtn}>
                    <Button variant='outlined' onClick={fetchComment}>
                        Обновить
                    </Button>
                </div>
            </div> :
            <div style={{marginTop: '5px'}}>
                <CircularProgress color="inherit"/>
            </div>
    );
};

export default CommentsList;
