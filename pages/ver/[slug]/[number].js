import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { api, fetchData } from '../../../lib/api';
import Layout from '../../../components/Layout';

import {
    slugEpisode,
    slugAnime,
    posterAnime,
    bannerAnime,
} from '../../../helpers/Functions';
import {
    getLanguajePlayer,
    getCheckLatino,
    getUrlVideo,
} from '../../../helpers/Strings';

import styles from '../../../styles/Episode.module.css';

import PostRequestIframe from '../../../components/PostRequestIframe';
import { decryptString } from '../../../helpers/encryptDecrypt';
import Link from 'next/link';

import { isMobile } from 'react-device-detect';

export default function Page({ data }) {
    const episodeData = JSON.parse(decryptString(data));
    const [languaje, setLanguaje] = useState(
        Object.keys(episodeData.players)[0]
    );
    const [server, setServer] = useState(0);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (!isMobile) {
            const modifiedPlayers = { ...episodeData.players };
            Object.keys(modifiedPlayers).forEach((languaje) => {
                modifiedPlayers[languaje] = modifiedPlayers[languaje].filter(
                    (player) => player.server.title !== 'Gamma'
                );
            });
            setPlayers(modifiedPlayers);
        } else {
            setPlayers(episodeData.players);
        }
        setLanguaje(Object.keys(episodeData?.players)[0]);
        setServer(0);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'languaje') {
            setLanguaje(value);
            setServer(0);
        }
        if (name === 'server') {
            setServer(value);
        }
    };

    const videoPlayer = () => {
        if (Object.keys(players).length === 0) return null;
        const selectedPlayer = players[languaje]?.[server];
        const videoUrl = selectedPlayer ? getUrlVideo(selectedPlayer.id) : '';
        return (
            <div className={styles.videoPlayer}>
                {getCheckLatino(Object.keys(players)) && (
                    <div className={styles.msg}>
                        <span>
                            Este capítulo está disponible en{' '}
                            <b>Español Latino</b>
                        </span>
                    </div>
                )}
                <div className={styles.options}>
                    <div className={styles.type}>
                        <label htmlFor={'languaje'}>Idioma</label>
                        <select
                            name={'languaje'}
                            id={'languaje'}
                            value={languaje}
                            onChange={handleChange}
                        >
                            {Object.keys(players).map((languaje, idx) => (
                                <option value={languaje} key={idx}>
                                    {getLanguajePlayer(languaje)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.type}>
                        <label htmlFor={'server'}>Servidor</label>
                        <select
                            name={'server'}
                            value={server}
                            id={'server'}
                            onChange={handleChange}
                        >
                            {players[languaje].map((item, index) => (
                                <option value={index} key={index}>
                                    {item.server.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.video}>
                    <PostRequestIframe iframe={videoUrl} />
                </div>
            </div>
        );
    };

    const navCaps = () => {
        return (
            <div className={styles.navCaps}>
                <div className={styles.column}>
                    <div className={styles.info}>
                        <Link
                            href={slugAnime(episodeData?.anime?.slug)}
                            className={styles.cover}
                        >
                            <img
                                className={styles.cover}
                                alt={`${episodeData?.anime?.name} ${episodeData?.number}`}
                                height={68}
                                width={48}
                                quality={95}
                                layout="intrinsic"
                                loading={'lazy'}
                                src={posterAnime(
                                    'w154',
                                    episodeData?.anime?.poster
                                )}
                            />
                        </Link>
                        <div className={styles.details}>
                            <div className={styles.info}>
                                <h1>
                                    <Link
                                        href={slugAnime(
                                            episodeData?.anime?.slug
                                        )}
                                    >
                                        {episodeData?.anime?.name}
                                    </Link>
                                </h1>
                                <span
                                    className={styles.currentEp}
                                >{`Episodio ${episodeData?.number}`}</span>
                            </div>
                            <p className={styles.desc}>
                                {episodeData?.anime?.overview?.slice(0, 50)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        {episodeData?.anterior && (
                            <Link
                                href={slugEpisode(
                                    episodeData?.anime?.slug,
                                    episodeData?.anterior?.number
                                )}
                                className={styles.button}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                                </svg>
                                Ep. Anterior
                            </Link>
                        )}
                        {episodeData?.anime && (
                            <Link
                                href={slugAnime(episodeData?.anime?.slug)}
                                className={styles.button}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M7,13H21V11H7M7,19H21V17H7M7,7H21V5H7M2,11H3.8L2,13.1V14H5V13H3.2L5,10.9V10H2M3,8H4V4H2V5H3M2,17H4V17.5H3V18.5H4V19H2V20H5V16H2V17Z"></path>
                                </svg>
                            </Link>
                        )}
                        {episodeData?.siguiente && (
                            <Link
                                href={slugEpisode(
                                    episodeData?.anime?.slug,
                                    episodeData?.siguiente?.number
                                )}
                                className={styles.button}
                            >
                                Ep. Siguiente
                                <svg viewBox="0 0 24 24">
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <Head>
                <title>{`Ver ${episodeData?.anime?.name} Capítulo ${episodeData?.number} Sub Español Latino en HD Online • ${process.env.NAME}`}</title>
                <meta
                    name="description"
                    content={`Anime ${episodeData?.anime?.name} capitulo ${episodeData?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`}
                />
                <link
                    rel="canonical"
                    href={`${process.env.URL}${slugEpisode(
                        episodeData?.anime?.slug,
                        episodeData?.number
                    )}`}
                />
                <meta
                    name="og:title"
                    content={`Ver ${episodeData?.anime?.name} Capítulo ${episodeData?.number} Sub Español Latino en HD Online • ${process.env.NAME}`}
                />
                <meta
                    name="og:description"
                    content={`Anime ${episodeData?.anime?.name} capitulo ${episodeData?.number} Sub Español Latino, ver online y descargar en hd 720p sin ninguna limitación`}
                />
                <meta
                    name="og:url"
                    content={`${process.env.URL}${slugEpisode(
                        episodeData?.anime?.slug,
                        episodeData?.number
                    )}`}
                />
                <meta name="og:locale" content="es_LA" />
                <meta name="og:type" content="video.episode" />
                <meta
                    name="og:image"
                    content={bannerAnime(episodeData?.anime?.banner)}
                />
                <meta property="og:image:width" content="552" />
                <meta property="og:image:height" content="310" />
                <meta
                    itemProp="image"
                    content={bannerAnime('w780', episodeData?.anime?.banner)}
                />
            </Head>
            <main className={styles.container}>
                {videoPlayer()}
                {navCaps()}
            </main>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    try {
        const data = await fetchData(
            `anime/${context.params.slug}/episodes/${context.params.number}`
        );
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
