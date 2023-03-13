import React, {FC, useState} from 'react';
import {IComment} from "../../models/IComment";
import classes from './CommentItem.module.scss';
import CommentsList from "../CommentsList/CommentsList";

interface ICommentItemProps {
    comment: IComment;
}

const CommentItem: FC<ICommentItemProps> = ({comment}) => {

    const [isShowedSubComments, setIsShowedSubComments] = useState(false);

    return (
        <div className={classes.item}>
            <h4 className={classes.item__author}>
                {comment.by}: <br/>
            </h4>
            {
                <span dangerouslySetInnerHTML={{__html: comment.text}} className={classes.item__text}></span>
            }
            <div className={classes.item__subComments}>
                {
                    comment.kids &&
                    <>
                        <div className={classes.item__subComments_buttons}>
                            {
                                !isShowedSubComments ?
                                    <button className={classes.item__subComments_buttons_btn}
                                            onClick={() => setIsShowedSubComments(true)}>
                                        Показать ответы
                                    </button> :
                                    <button className={classes.item__subComments_buttons_btn}
                                            onClick={() => setIsShowedSubComments(false)}>
                                        Скрыть
                                    </button>
                            }
                        </div>
                        {
                            isShowedSubComments &&
                            <CommentsList commentsIds={comment.kids}/>
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default CommentItem;
