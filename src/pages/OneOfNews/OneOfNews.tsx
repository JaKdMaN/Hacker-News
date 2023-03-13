import React, {FC, useEffect, useState} from 'react';
import {INew} from "../../models/INew";
import axios from "axios";
import {useParams} from "react-router";
import {formatDate} from "../../utils/data";
import classes from "./OneOfNews.module.scss";
import {Breadcrumbs, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {RoutesNamesEnum} from "../../router";
import CommentsList from "../../components/CommentsList/CommentsList";
import ApiService from "../../api/ApiService";


const OneOfNews: FC = () => {

    const [oneOfNews, setOneOfNews] = useState<INew>({
        id: 0,
        by: '',
        title: '',
        score: 0,
        text: '',
        time: 0,
        url: '',
        descendants: '',
        kids: []
    });

    const formatedDate = formatDate(oneOfNews.time);
    const params = useParams();

    const fetchOneOfNews = async () => {
        const oneOfNews = await ApiService.fetchOne<INew>(Number(params.id));
        setOneOfNews(oneOfNews);
    }

    useEffect(() => {
        fetchOneOfNews();
    }, []);

    return (
        <div className={classes.item}>
            <Breadcrumbs className={classes.item__breadCrumbs}>
                <Link to={RoutesNamesEnum.NEWS_LIST} className={classes.item__breadCrumbs_link}>
                    News
                </Link>
                <Typography color="text.primary">{oneOfNews.id}</Typography>
            </Breadcrumbs>

            <div className={classes.item__mainInfo}>
                <h1 className={classes.item__mainInfo_title}>{oneOfNews.title}</h1>
                <p className={classes.item__mainInfo_date}>{formatedDate}</p>
            </div>

            <div className={classes.item__newsInfo}>
                <p>Автор новости: &nbsp;
                    <span className={classes.item__newsInfo_author}>{oneOfNews.by}</span>.
                </p>
                <p>
                    Для того чтобы прочитать новость полностью &nbsp;
                    <a href={oneOfNews.url} target="_blank" className={classes.item__newsInfo_url}>
                        перейдите по ссылке
                    </a>
                </p>
            </div>
            <div>
                <p>Комментарии: {oneOfNews.descendants}</p>
                {
                    oneOfNews.kids.length &&
                    <CommentsList commentsIds={oneOfNews.kids}/>
                }
            </div>
        </div>
    );
};

export default OneOfNews;
