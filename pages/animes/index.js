import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { api } from '../../lib/api';
import ListAnimes from '../../components/ListAnimes';
import Layout from '../../components/Layout';
import { filterAnime } from '../../helpers/Functions';

import styles from '../../styles/Animes.module.css';

const Index = ({ data, query }) => {
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const queryParams = { ...query, [name]: value, page: 1 };
        const queryString = new URLSearchParams(queryParams).toString();

        window.location.href = `/animes?${queryString}`;
    };

    const changePage = async (type) => {
        const newPage =
            type === 'next'
                ? parseInt(data?.current_page) + 1
                : parseInt(data?.current_page) - 1;
        const queryParams = { ...query, page: newPage };
        const queryString = new URLSearchParams(queryParams).toString();

        window.location.href = `/animes?${queryString}`;
    };

    const filterAnimes = () => {
        return (
            <div className={styles.filter}>
                <div className={styles.ListTypes}>
                    <div className={styles.type}>
                        <label htmlFor={'type'}>Tipo</label>
                        <select
                            name={'type'}
                            value={query?.type}
                            id={'type'}
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            {filterAnime()?.types?.map((item, idx) => (
                                <option value={item?.slug} key={idx}>
                                    {item?.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={'status'}>Estado</label>
                        <select
                            name={'status'}
                            value={query?.status}
                            id={'status'}
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            {filterAnime()?.status?.map((item, idx) => (
                                <option value={item?.slug} key={idx}>
                                    {item?.status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={'year'}>Año</label>
                        <select
                            name={'year'}
                            value={query?.year}
                            id={'year'}
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            {filterAnime()?.years?.map((item, idx) => (
                                <option value={item?.year} key={idx}>
                                    {item?.year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={'genre'}>Genero</label>
                        <select
                            name={'genre'}
                            value={query?.genre}
                            id={'genre'}
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            {filterAnime()?.genres?.map((item, idx) => (
                                <option value={item?.slug} key={idx}>
                                    {item?.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        );
    };

    const paginationAnimes = () => {
        return (
            <div className={styles.paginate}>
                {data?.prev_page_url && (
                    <a
                        className={styles.item}
                        onClick={() => changePage('prev')}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                        </svg>
                    </a>
                )}
                {data?.current_page && (
                    <a className={`${styles.item} ${styles.active}`}>
                        {data?.current_page}
                    </a>
                )}
                {data?.next_page_url && (
                    <a
                        className={styles.item}
                        onClick={() => changePage('next')}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                        </svg>
                    </a>
                )}
            </div>
        );
    };

    return (
        <Layout>
            <Head>
                <title>{`Lista de animes • ${process.env.NAME}`}</title>
                <meta
                    name="description"
                    content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`}
                />
                <link rel="canonical" href={`${process.env.URL}/animes`} />
                <meta
                    name="og:title"
                    content={`Lista de animes • ${process.env.NAME}`}
                />
                <meta
                    name="og:description"
                    content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`}
                />
                <meta name="og:url" content={`${process.env.URL}/animes`} />
                <meta name="og:locale" content="es_LA" />
                <meta name="og:type" content="website" />
                <meta
                    name="og:image"
                    content="https://i.imgur.com/Iof3uSm.jpg"
                />
                <meta property="og:image:width" content="265" />
                <meta property="og:image:height" content="265" />
                <meta
                    itemProp="image"
                    content="https://i.imgur.com/Iof3uSm.jpg"
                />
            </Head>
            <main className={styles.container}>
                <ListAnimes
                    paginate={paginationAnimes()}
                    filters={filterAnimes()}
                    animes={data?.data}
                />
            </main>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    try {
        const { query } = context;
        const res = await api.get(`anime/list`, { params: { ...query } });
        return {
            props: {
                data: res.data,
                query,
            },
        };
    } catch (error) {
        return {
            props: {
                data: [],
                query: context.query,
            },
        };
    }
}

export default Index;
