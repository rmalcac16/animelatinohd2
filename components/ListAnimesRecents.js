import React, { Component } from 'react';
import AnimeCard from './AnimeCard';

import styles from '../styles/ListAnimesRecents.module.css';

export default class ListAnimesRecents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { animes } = this.props;
        return (
            <div className={styles.box}>
                <h1>
                    <span className={styles.border}>Animes recientes</span>
                </h1>
                <div className={styles.listAnimes}>
                    {animes?.map((anime, idx) => (
                        <AnimeCard data={anime} key={idx} />
                    ))}
                </div>
            </div>
        );
    }
}
