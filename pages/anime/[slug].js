import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { fetchData } from '../../lib/api';
import Layout from '../../components/Layout';
import AnimeEpisodeCard from '../../components/AnimeEpisodeCard';
import AdsScript from '../../components/AdsScript';
import {
    bannerAnime,
    posterAnime,
    slugAnime,
    slugGenre,
    nFormatter,
} from '../../helpers/Functions';
import {
    getStatusAnime,
    getDateAiredAnime,
    getRatingAnime,
    getVoteAverageAnime,
} from '../../helpers/Strings';
import styles from '../../styles/Anime.module.css';
import { decryptString } from '../../helpers/encryptDecrypt';

export default function Page({ data }) {
    const animeData = JSON.parse(decryptString(data));
    const banner = () => {
        return (
            <div
                className={styles.banner}
                style={{
                    backgroundImage:
                        'url(' +
                        `${bannerAnime('original', animeData?.banner)}` +
                        ')',
                }}
            >
                <div className={styles.content}>
                    <div className={styles.column}>
                        <h1>{animeData?.name}</h1>
                        <div className={styles.genres}>
                            {animeData?.genres &&
                                animeData?.genres
                                    ?.split(',')
                                    ?.map((genre, idx) => (
                                        <Link
                                            key={idx}
                                            href={slugGenre(genre)}
                                            className={styles.item}
                                            title={genre.replace(/-/g, ' ')}
                                        >
                                            {genre.replace(/-/g, ' ')}
                                        </Link>
                                    ))}
                        </div>
                    </div>
                </div>
                <div className={styles.overlay}></div>
            </div>
        );
    };

    const info = () => {
        return (
            <div className={styles.info}>
                <div className={styles.cover}>
                    <img
                        className="poster"
                        alt={animeData?.name}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={'lazy'}
                        src={posterAnime('w300', animeData?.poster)}
                    />
                </div>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <div className={styles.stats}>
                            <div title="Total view" className={styles.stat}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path>
                                </svg>
                                {nFormatter(animeData?.totalviews, 1)}
                            </div>
                            <div title="Total favorite" className={styles.stat}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
                                </svg>
                                {animeData?.popularity}
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <small>Avg. Score</small>
                        <svg viewBox="0 0 24 24" className={styles.gold}>
                            <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"></path>
                        </svg>
                        {getVoteAverageAnime(animeData?.vote_average)}
                    </div>
                    <div className={styles.item}>
                        <small>Estado</small>{' '}
                        {getStatusAnime(animeData?.status)}
                    </div>
                    <div className={styles.item}>
                        <small>Clasificación</small>{' '}
                        {getRatingAnime(animeData?.rating)}
                    </div>
                    <div className={styles.item} suppressHydrationWarning>
                        <small>Estreno</small>{' '}
                        {getDateAiredAnime(animeData?.aired)}
                    </div>
                    <div className={styles.item}>
                        <small>Titulos Alternativos</small>{' '}
                        {animeData?.name_alternative}
                    </div>
                </div>
            </div>
        );
    };

    const details = () => {
        return (
            <div className={styles.details}>
                <div className={styles.overview}>
                    <p>
                        {animeData?.overview
                            ? animeData?.overview
                            : 'No hay sinopsis para este anime'}
                    </p>
                </div>
                <AdsScript />
                <div className={styles.listEpisodes}>
                    {animeData?.episodes?.map((episode, idx) => (
                        <AnimeEpisodeCard
                            anime={animeData}
                            episode={episode}
                            key={idx}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <Head>
                <title>{`Ver ${animeData?.name} Sub Español Latino en HD Online • ${process.env.NAME}`}</title>
                <meta
                    name="description"
                    content={`${
                        animeData?.overview?.length > 165
                            ? animeData?.overview?.slice(0, 165) + '...'
                            : animeData?.overview
                    }`}
                />
                <link
                    rel="canonical"
                    href={`${process.env.URL}${slugAnime(animeData?.slug)}`}
                />
                <meta
                    name="og:title"
                    content={`Ver ${animeData?.name} Sub Español Latino en HD Online • ${process.env.NAME}`}
                />
                <meta
                    name="og:description"
                    content={`${
                        animeData?.overview?.length > 165
                            ? animeData?.overview?.slice(0, 165) + '...'
                            : animeData?.overview
                    }`}
                />
                <meta
                    name="og:url"
                    content={`${process.env.URL}${slugAnime(animeData?.slug)}`}
                />
                <meta name="og:locale" content="es_LA" />
                <meta name="og:type" content="website" />
                <meta
                    name="og:image"
                    content={posterAnime(animeData?.poster)}
                />
                <meta property="og:image:width" content="310" />
                <meta property="og:image:height" content="440" />
                <meta
                    itemProp="image"
                    content={posterAnime('w780', animeData?.poster)}
                />
            </Head>
            <main className={styles.container}>
                {banner()}
                <div className={styles.contentAnime}>
                    {info()}
                    {details()}
                </div>
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    try {
        const data = await fetchData(`anime/${context.params.slug}`);
        return {
            props: {
                data: data,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
