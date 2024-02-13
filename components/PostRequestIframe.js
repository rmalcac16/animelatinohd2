import React from 'react';

const PostRequestIframe = ({ id }) => {
    return (
        <div>
            <iframe
                allowFullScreen
                style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
                src={process.env.STREAMURL + `?id=` + id}
            ></iframe>
        </div>
    );
};

export default PostRequestIframe;
