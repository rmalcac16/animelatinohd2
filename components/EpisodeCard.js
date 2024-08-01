import React, { Component } from 'react';
import Link from 'next/link';
import {
    bannerAnime,
    posterAnime,
    slugEpisode,
    slugAnime,
} from '../helpers/Functions';
import { getFromNow } from '../helpers/Strings';

import styles from '../styles/EpisodeCard.module.css';

export default class EpisodeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { episode } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.holder}>
                    <div className={styles.overlay}>
                        {episode?.languaje == 1 && (
                            <span className={styles.label}>Español Latino</span>
                        )}
                        {episode?.languaje == 2 && (
                            <span className={styles.labelCast}>Castellano</span>
                        )}
                        <span className={styles.time} suppressHydrationWarning>
                            {getFromNow(episode?.created_at)}
                        </span>
                        <Link
                            href={slugEpisode(episode?.slug, episode?.number)}
                            className={styles.play}
                            alt={`${episode?.name} ${episode?.number}`}
                            title={`${episode?.name} ${episode?.number}`}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
                            </svg>
                        </Link>
                        <Link
                            href={slugAnime(episode?.slug)}
                            className={styles.cover}
                            alt={episode?.name}
                            title={episode?.name}
                        >
                            <img
                                alt={episode?.name}
                                height={73}
                                width={53}
                                quality={95}
                                layout="intrinsic"
                                loading={'lazy'}
                                src={posterAnime('w154', episode?.poster)}
                            />
                        </Link>
                    </div>
                    <img
                        alt={`${episode?.name} ${episode?.number}`}
                        src={bannerAnime('w300', episode?.banner)}
                        layout="responsive"
                        width="auto"
                        height="auto"
                        quality={95}
                        loading={'lazy'}
                        sizes="(max-width: 360px) 22vw,
							   (max-width: 640px) 15vw,
							   (max-width: 800px) 12vw,
							   (max-width: 1024px) 11vw,
							   (max-width: 1280px) 9vw,
							   (max-width: 800px) 192px,
							   (max-width: 1366px) 250px"
                    />
                </div>
                <div className={styles.text}>
                    <Link
                        href={slugEpisode(episode?.slug, episode?.number)}
                        className={styles.title}
                        alt={`${episode?.name} ${episode?.number}`}
                        title={`${episode?.name} ${episode?.number}`}
                    >
                        <div className={styles.limit}>{episode?.name}</div>
                        <span
                            className={styles.episode}
                        >{`Ep. ${episode?.number}`}</span>
                    </Link>
                </div>
            </div>
        );
    }
}
