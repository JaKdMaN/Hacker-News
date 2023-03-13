import React, {FC, useEffect, useState} from 'react';
import NewsItem from "../../components/NewsItem/NewsItem";
import {INew} from "../../models/INew";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Button, CircularProgress, Container} from "@mui/material";
import classes from './NewsList.module.scss';
import ApiService from "../../api/ApiService";

const NewsList: FC = () => {

    const [newsList, setNewsList] = useState<INew[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            setIsLoaded(true);
            const ids = await ApiService.fetchIds();
            const newsList = await ApiService.fetchList<INew>(ids);
            setNewsList(newsList);
            setIsLoaded(false);
        }catch (e){
            console.log(e);
        }
    }

    const UpdateNewsList = () => {
        setInterval(() => {
            fetchNews();
        }, 60000)
    }

    useEffect(() => {
        fetchNews();
        UpdateNewsList();
    }, [])

    return (
        !isLoaded ?
            <Container className={classes.list}>
                <div>
                    {newsList.map(newsItem => (
                        <NewsItem
                            key={newsItem.id}
                            newsItem={newsItem}
                            onClick={(newsItem) => {
                                navigate('/news/' + newsItem.id);
                            }}
                        />
                    ))}
                </div>
                <div className={classes.list__btn}>
                    <Button variant='outlined' onClick={fetchNews}>
                        Обновить
                    </Button>
                </div>
            </Container> :
            <div className={classes.loader}>
                <CircularProgress color="inherit"/>
            </div>
    );
};

export default NewsList;
