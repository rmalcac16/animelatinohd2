import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchData } from '../../lib/api';
import ListAnimes from '../../components/ListAnimes';
import Layout from '../../components/Layout';
import styles from '../../styles/Animes.module.css';
import { decryptString } from '../../helpers/encryptDecrypt';
const Index = ({ data }) => {
    const [populars, setPopulars] = useState([]);
    useEffect(() => {
        const decryptedData = decryptString(data);
        setPopulars(JSON.parse(decryptedData));
    }, [data]);

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
                    animes={populars?.popular_today}
                />
            </main>
        </Layout>
    );
};

export async function getStaticProps() {
    const data = await fetchData(`anime/trending`);
    return {
        props: {
            data: data,
        },
        revalidate: 1,
    };
}

export default Index;
