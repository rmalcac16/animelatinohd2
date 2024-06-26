import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { api, fetchData } from '../../lib/api';
import ListAnimes from '../../components/ListAnimes';
import Layout from '../../components/Layout';

import styles from '../../styles/Animes.module.css';
import { decryptString } from '../../helpers/encryptDecrypt';

const Index = ({ data, error }) => {
    if (error) {
        return (
            <Layout>
                <Head>
                    <title>Error - {process.env.NAME}</title>
                </Head>
                <main className={styles.container}>
                    <h1>Error al cargar los datos</h1>
                    <p>{error}</p>
                </main>
            </Layout>
        );
    }

    let animeData;
    try {
        animeData = JSON.parse(decryptString(data));
    } catch (decryptError) {
        return (
            <Layout>
                <Head>
                    <title>Error - {process.env.NAME}</title>
                </Head>
                <main className={styles.container}>
                    <h1>Error al descifrar los datos</h1>
                    <p>{decryptError.message}</p>
                </main>
            </Layout>
        );
    }

    const router = useRouter();
    const [perPage] = useState(28);
    const [page, setPage] = useState(router.query.page ? router.query.page : 1);

    const changePage = (type) => {
        const currentPage = parseInt(page);
        if (type === 'prev' && currentPage > 1) {
            setPage(currentPage - 1);
        } else if (type === 'next') {
            setPage(currentPage + 1);
        }
    };

    const paginationAnimes = () => (
        <div className={styles.paginate}>
            {animeData[(page - 1) * perPage - 1] && (
                <a className={styles.item} onClick={() => changePage('prev')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                    </svg>
                </a>
            )}
            <a className={`${styles.item} ${styles.active}`}>{page}</a>
            {animeData[page * perPage + 1] && (
                <a className={styles.item} onClick={() => changePage('next')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                    </svg>
                </a>
            )}
        </div>
    );

    return (
        <Layout>
            <Head>
                <title>{`Lista de animes en Castellano • ${process.env.NAME}`}</title>
                <meta
                    name="description"
                    content={`Anime Online en Castellano Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion doblados al Castellano en ${process.env.NAME}`}
                />
                <link
                    rel="canonical"
                    href={`${process.env.URL}/animes/castellano`}
                />
                <meta
                    name="og:title"
                    content={`Lista de animes en Castellano • ${process.env.NAME}`}
                />
                <meta
                    name="og:description"
                    content={`Anime Online en Castellano Gratis, mira los últimos capitulos de los animes del momento sin ninguna restriccion doblados al Castellano en ${process.env.NAME}`}
                />
                <meta
                    name="og:url"
                    href={`${process.env.URL}/animes/castellano`}
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
                    title={'Animes en Castellano'}
                    animes={animeData?.slice(
                        (page - 1) * perPage,
                        page * perPage
                    )}
                    paginate={paginationAnimes()}
                />
            </main>
        </Layout>
    );
};

export async function getStaticProps() {
    try {
        const data = await fetchData(`anime/castellano`);
        return {
            props: {
                data: data,
            },
            revalidate: 1,
        };
    } catch (error) {
        return {
            props: {
                error: 'Error al conectar con la API.',
            },
        };
    }
}

export default Index;
