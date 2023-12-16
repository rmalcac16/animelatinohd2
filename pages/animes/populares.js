import React from 'react';
import Head from 'next/head';
import { api } from '../../lib/api';

import ListAnimes from '../../components/ListAnimes';
import Layout from '../../components/Layout';

import styles from '../../styles/Animes.module.css';

export default function populares({ data }) {
    return (
        <Layout>
            <Head>
                <title>{`Lista de animes populares • ${process.env.NAME}`}</title>
                <meta
                    name="description"
                    content={`Anime Online Sub Español y Español Latino Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`}
                />
                <link
                    rel="canonical"
                    href={`${process.env.URL}/animes/populares`}
                />
                <meta
                    name="og:title"
                    content={`Lista de animes populares • ${process.env.NAME}`}
                />
                <meta
                    name="og:description"
                    content={`Anime Online Sub Español y Español Latino Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`}
                />
                <meta
                    name="og:url"
                    content={`${process.env.URL}/animes/populares`}
                />
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
                    title={'Animes populares'}
                    animes={data?.popular_today}
                />
            </main>
        </Layout>
    );
}

export async function getServerSideProps() {
    try {
        const res = await api.get(`anime/trending`);
        return { props: { data: res.data } };
    } catch (error) {
        return { props: { data: [] } };
    }
}
