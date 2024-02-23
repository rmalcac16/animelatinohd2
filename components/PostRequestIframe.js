import React from 'react';
import { encryptString } from '../helpers/encryptDecrypt';

const PostRequestIframe = ({ iframe }) => {
    return (
        <div>
            <iframe
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                src={iframe}
                data-a={encryptString(process.env.SECRETKEY)}
            ></iframe>
        </div>
    );
};

export default PostRequestIframe;
