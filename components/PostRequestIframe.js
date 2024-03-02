import React from 'react';

const PostRequestIframe = ({ iframe }) => {
    return (
        <div>
            <iframe
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                src={iframe}
            ></iframe>
        </div>
    );
};

export default PostRequestIframe;
