import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ListEpisodes from '../components/ListEpisodes';
import { fetchData } from '../lib/api';
import styles from '../styles/Home.module.css';
import { decryptString } from '../helpers/encryptDecrypt';
import DecryptError from '../components/DecryptError';

const Index = ({ data }) => {
    try {
        const episodes = JSON.parse(decryptString(data));
        return <IndexComponent episodes={episodes} />;
    } catch (error) {
        return <DecryptError />;
    }
};

const IndexComponent = ({ episodes }) => {
    return (
        <Layout>
            <Head>
                <title>{`Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.NAME}`}</title>
                <meta
                    name="description"
                    content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`}
                />
                <link rel="canonical" href={`${process.env.URL}`} />
                <meta
                    name="og:title"
                    content={`Ver Anime Online en HD Sub Español Latino Gratis • ${process.env.NAME}`}
                />
                <meta
                    name="og:description"
                    content={`Anime Online Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion subtitulados al español latino en ${process.env.NAME}`}
                />
                <meta name="og:url" content={`${process.env.URL}`} />
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
                <ListEpisodes episodes={episodes} />
            </main>
        </Layout>
    );
};

export async function getServerSideProps() {
    try {
        const data = await fetchData(`releases`);
        return { props: { data: data } };
    } catch (error) {
        return { props: { data: [] } };
    }
}

export default Index;
